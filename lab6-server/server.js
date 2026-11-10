// =====================================================
// Лабораторна робота №6. Використання Node.js
// Зьола Анастасія, КБ-204, варіант №7
// Фреймворк: Koa; додаткове поле: phone (необов'язкове)
// =====================================================

const path = require('node:path');
const { mkdir, appendFile } = require('node:fs/promises');
const { randomUUID } = require('node:crypto');

const Koa = require('koa');
const serve = require('koa-static');
const bodyParser = require('koa-bodyparser');

// ---------- Налаштування сервера ----------
const HOST = '0.0.0.0'; // приймати з'єднання з усіх мережевих інтерфейсів
const PORT = 3000;
const PUBLIC_DIR = path.join(__dirname, 'public'); // абсолютний шлях до статичних файлів
const DATA_DIR = path.join(__dirname, 'data'); // поза public/ — не віддається браузеру
const FEEDBACK_FILE = path.join(DATA_DIR, 'feedback.jsonl');

// Обмеження довжини полів
const LIMITS = { name: 100, email: 254, subject: 150, message: 2000, phone: 30 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^[0-9+\s()-]+$/; // лише +, цифри, пробіли, (, ) і -

const app = new Koa();

// ---------- 1. Обробка помилок ----------
// Перехоплює всі помилки і завжди повертає JSON без технічних деталей
app.use(async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    const status = err.status || err.statusCode || 500;
    if (status >= 500) {
      console.error('[server error]', err); // технічні деталі — лише в журнал сервера
      ctx.status = 500;
      ctx.body = { ok: false, error: 'Internal server error.' };
    } else {
      // напр. некоректний JSON (400) або завелике тіло запиту (413)
      ctx.status = status;
      ctx.body = { ok: false, error: status === 413 ? 'Request body is too large.' : 'Invalid request body.' };
    }
  }
});

// ---------- 2. Журнал запитів ----------
app.use(async (ctx, next) => {
  await next();
  console.log(`${new Date().toISOString()} ${ctx.method} ${ctx.url} -> ${ctx.status}`);
});

// ---------- 3. Читання JSON із тіла запиту (не більше 10 КБ) ----------
app.use(bodyParser({ enableTypes: ['json'], jsonLimit: '10kb', strict: true }));

// ---------- 4. Валідація ----------
function validate(body) {
  // тіло запиту має бути JSON-об'єктом (не масивом, не null)
  if (typeof body !== 'object' || body === null || Array.isArray(body)) {
    return 'Request body must be a JSON object.';
  }

  const { name, email, subject, message, phone } = body;

  // обов'язкові поля мають бути рядками
  for (const [field, value] of Object.entries({ name, email, subject, message })) {
    if (typeof value !== 'string') return `Field "${field}" must be a string.`;
    if (value.trim() === '') return `Field "${field}" is required.`;
    if (value.trim().length > LIMITS[field]) return `Field "${field}" is too long (max ${LIMITS[field]}).`;
  }

  if (!EMAIL_RE.test(email.trim())) return 'A valid email address is required.';

  // додаткове поле варіанта 7: phone — необов'язкове
  if (phone !== undefined && phone !== null) {
    if (typeof phone !== 'string') return 'Field "phone" must be a string.';
    const p = phone.trim();
    if (p.length > LIMITS.phone) return `Field "phone" is too long (max ${LIMITS.phone}).`;
    if (p !== '' && !PHONE_RE.test(p)) {
      return 'Phone may contain only digits, spaces, "+", "(", ")" and "-".';
    }
  }

  return null; // помилок немає
}

// ---------- 5. Маршрут POST /api/contact ----------
app.use(async (ctx, next) => {
  if (ctx.path !== '/api/contact') return next();

  if (ctx.method !== 'POST') {
    ctx.status = 405;
    ctx.set('Allow', 'POST');
    ctx.body = { ok: false, error: 'Method not allowed.' };
    return;
  }

  const body = ctx.request.body;
  const error = validate(body);
  if (error) {
    ctx.status = 400;
    ctx.body = { ok: false, error };
    return;
  }

  // id і createdAt створює сервер, а не браузер
  const record = {
    id: randomUUID(),
    createdAt: new Date().toISOString(),
    name: body.name.trim(),
    email: body.email.trim(),
    subject: body.subject.trim(),
    message: body.message.trim(),
    phone: typeof body.phone === 'string' ? body.phone.trim() : '',
  };

  // Створюємо data/ за потреби і дописуємо один рядок у JSON Lines
  await mkdir(DATA_DIR, { recursive: true });
  await appendFile(FEEDBACK_FILE, JSON.stringify(record) + '\n', 'utf8');

  ctx.status = 201;
  ctx.body = { ok: true, message: 'Feedback saved locally.', id: record.id };
});

// ---------- 6. Роздача статичного сайту з public/ ----------
app.use(serve(PUBLIC_DIR));

// ---------- Запуск ----------
app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`In local network: http://<IP-адреса комп'ютера>:${PORT}`);
});
