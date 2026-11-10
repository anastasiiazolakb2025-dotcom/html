import { useEffect, useState } from 'react';
import { FORMSPREE_ENDPOINT } from '../config';

const MODAL_DELAY_MS = 60000; // 1 хвилина
const CLOSED_KEY = 'contactModalClosed';

function ContactForm() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Якщо користувач уже закрив вікно під час цієї сесії — більше не показуємо
    if (sessionStorage.getItem(CLOSED_KEY)) return;

    const timer = setTimeout(() => setIsOpen(true), MODAL_DELAY_MS);
    return () => clearTimeout(timer); // очищення таймера при розмонтуванні
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem(CLOSED_KEY, 'true');
  };

  const inputClass =
    'w-full p-2 rounded-md border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500';

  return (
    isOpen && (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
        onClick={(e) => e.target === e.currentTarget && handleClose()}
      >
        <div className="relative w-full max-w-md bg-white dark:bg-slate-800 rounded-xl shadow-2xl p-6">
          <button
            type="button"
            onClick={handleClose}
            className="absolute top-2 right-3 text-2xl text-gray-500 hover:text-red-500"
            aria-label="Закрити"
          >
            &times;
          </button>

          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4">Зв'яжіться зі мною</h2>

          <form action={FORMSPREE_ENDPOINT} method="POST" className="space-y-3">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Ім'я</label>
              <input id="name" name="name" type="text" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
              <input id="email" name="email" type="email" required className={inputClass} />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Номер телефону</label>
              <input id="phone" name="phone" type="tel" placeholder="+380..." required className={inputClass} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300">Повідомлення</label>
              <textarea id="message" name="message" rows="4" required className={inputClass} />
            </div>

            <div className="flex gap-3 pt-2">
              <button type="submit" className="flex-1 py-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white font-semibold">
                Надіслати
              </button>
              <button type="button" onClick={handleClose} className="flex-1 py-2 rounded-md bg-gray-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 hover:bg-gray-300">
                Закрити
              </button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
export default ContactForm;
