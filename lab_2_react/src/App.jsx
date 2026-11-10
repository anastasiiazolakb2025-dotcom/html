import { useEffect, useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Reviews from './components/Reviews';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

// Денна тема з 07:00 до 21:00, нічна — увесь інший час
function getThemeByTime() {
  const hours = new Date().getHours();
  return hours >= 7 && hours < 21 ? 'light' : 'dark';
}

function App() {
  const [theme, setTheme] = useState('light');

  // Автоматичне перемикання під час першого завантаження
  useEffect(() => {
    setTheme(getThemeByTime());
  }, []);

  // Застосовуємо клас dark до <html>, коли змінюється theme
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  // Ручне перемикання
  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 pb-10 font-sans transition-colors">
      <Header theme={theme} onToggleTheme={toggleTheme} />
      <main className="max-w-5xl mx-auto mt-8 px-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <About />
          <Education />
        </div>
        <div className="space-y-6">
          <Skills />
          <Projects />
        </div>
      </main>
      <Reviews />
      <ContactForm />
      <Footer />
    </div>
  );
}
export default App;
