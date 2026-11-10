function Skills() {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b-2 border-blue-500 pb-2 inline-block">Навички</h2>
      <ul className="space-y-2 text-gray-700 dark:text-slate-300">
        <li className="p-2 bg-gray-50 dark:bg-slate-900 rounded hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"><strong>Мережі:</strong> TCP/IP, OSI, Wireshark (базово)</li>
        <li className="p-2 bg-gray-50 dark:bg-slate-900 rounded hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"><strong>ОС:</strong> Windows, Linux (Kali Linux — базово)</li>
        <li className="p-2 bg-gray-50 dark:bg-slate-900 rounded hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"><strong>Мови програмування:</strong> Python (базово), C++ (базово), HTML</li>
        <li className="p-2 bg-gray-50 dark:bg-slate-900 rounded hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"><strong>Інструменти:</strong> Git, GitHub, VS Code, VirtualBox</li>
        <li className="p-2 bg-gray-50 dark:bg-slate-900 rounded hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors"><strong>Мови спілкування:</strong> Українська (native), Англійська (B1-B2)</li>
      </ul>
    </section>
  );
}
export default Skills;