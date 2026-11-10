// Лабораторна робота №4. Робота з JavaScript
// Зьола Анастасія, КБ-204, варіант №7

const VARIANT = 7;
const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;
const MODAL_DELAY_MS = 60 * 1000; // 1 хвилина

// 1. Зберігання даних у браузері (localStorage)
function saveSystemInfo() {
  const info = {
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    language: navigator.language,
    languages: navigator.languages
      ? navigator.languages.join(", ")
      : navigator.language,
    cookieEnabled: navigator.cookieEnabled,
    online: navigator.onLine,
    cpuCores: navigator.hardwareConcurrency ?? "невідомо",
    deviceMemoryGB: navigator.deviceMemory ?? "невідомо",
    screenResolution: `${screen.width}x${screen.height}`,
    colorDepth: screen.colorDepth,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    visitTime: new Date().toLocaleString("uk-UA"),
  };

  // localStorage зберігає лише рядки, тому кожне значення перетворюємо на рядок
  for (const [key, value] of Object.entries(info)) {
    localStorage.setItem(key, String(value));
  }
}

function renderLocalStorage() {
  const container = document.getElementById("storage-info");
  container.innerHTML = "";

  const list = document.createElement("ul");
  list.className = "storage-list";

  // Виводимо ВСЮ інформацію, що є у localStorage
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);

    const item = document.createElement("li");
    const name = document.createElement("strong");
    name.textContent = `${key}: `;
    item.append(name, document.createTextNode(value));
    list.appendChild(item);
  }

  container.appendChild(list);
}

// 2. Динамічний вміст із сервера (Fetch API, async/await)
async function loadComments() {
  const container = document.getElementById("comments-list");
  container.textContent = "Завантаження відгуків...";

  try {
    const response = await fetch(COMMENTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const comments = await response.json();

    container.innerHTML = "";
    // Коментарі відображаються у порядку їх отримання
    comments.forEach((comment) => {
      const card = document.createElement("article");
      card.className = "comment-card";

      const title = document.createElement("h3");
      title.textContent = comment.name;

      const email = document.createElement("a");
      email.href = `mailto:${comment.email}`;
      email.textContent = comment.email;
      email.className = "comment-email";

      const body = document.createElement("p");
      body.textContent = comment.body;

      card.append(title, email, body);
      container.appendChild(card);
    });
  } catch (error) {
    console.error("Помилка завантаження відгуків:", error);
    container.textContent =
      "Не вдалося завантажити відгуки. Спробуйте пізніше.";
  }
}

// 3. Модальне вікно з формою зворотного зв'язку
function openModal() {
  document.getElementById("contact-modal").classList.add("open");
}

function closeModal() {
  document.getElementById("contact-modal").classList.remove("open");
}

function initModal() {
  const modal = document.getElementById("contact-modal");

  document.getElementById("modal-close").addEventListener("click", closeModal);

  // Закриття кліком по затемненому фону
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal();
  });

  // Закриття клавішею Escape
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeModal();
  });

  // Показати форму, коли користувач пробуде на сайті 1 хвилину
  setTimeout(openModal, MODAL_DELAY_MS);
}

// 4. Денна / нічна тема
function isDayTime(date = new Date()) {
  const hours = date.getHours();
  return hours >= 7 && hours < 21; // денна тема з 07:00 до 21:00
}

function applyTheme(theme) {
  document.body.classList.toggle("dark-theme", theme === "dark");
  const button = document.getElementById("theme-toggle");
  button.textContent = theme === "dark" ? " Денна тема" : " Нічна тема";
}

function initTheme() {
  // Автоматичний вибір теми залежно від часу доби
  let currentTheme = isDayTime() ? "light" : "dark";
  applyTheme(currentTheme);

  // Ручний перемикач
  document.getElementById("theme-toggle").addEventListener("click", () => {
    currentTheme = currentTheme === "dark" ? "light" : "dark";
    applyTheme(currentTheme);
  });
}

// Запуск після завантаження сторінки
document.addEventListener("DOMContentLoaded", () => {
  saveSystemInfo();
  renderLocalStorage();
  loadComments();
  initModal();
  initTheme();
});
