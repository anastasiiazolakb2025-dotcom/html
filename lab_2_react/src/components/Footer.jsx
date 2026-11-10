import { useEffect, useState } from 'react';

function Footer() {
  const [systemInfo, setSystemInfo] = useState({});

  useEffect(() => {
    // 1. Зчитуємо дані про систему під час монтування компонента
    const info = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookieEnabled: String(navigator.cookieEnabled),
      screenResolution: `${window.screen.width}x${window.screen.height}`,
    };

    // 2. Зберігаємо їх у localStorage
    Object.entries(info).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    // 3. Отримуємо ВСІ дані з localStorage і кладемо у стан для відображення
    const stored = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      stored[key] = localStorage.getItem(key);
    }
    setSystemInfo(stored);
  }, []);

  return (
    <footer className="mt-10 py-6 px-4 text-center text-gray-500 dark:text-slate-400 border-t border-gray-200 dark:border-slate-700">
      <p>&copy; 2026 Зьола Анастасія. Всі права захищені.</p>

      <div className="max-w-3xl mx-auto mt-4 text-left">
        <h3 className="font-semibold text-slate-700 dark:text-slate-200 text-center mb-2">
          Інформація про систему (з localStorage)
        </h3>
        <ul className="text-sm space-y-1 break-words">
          {Object.entries(systemInfo).map(([key, value]) => (
            <li key={key} className="border-b border-gray-200 dark:border-slate-700 py-1">
              <strong className="text-slate-700 dark:text-slate-200">{key}:</strong> {value}
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
export default Footer;
