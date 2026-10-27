function Skills() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">Навички</h2>
      <ul className="space-y-2 text-gray-700">
        <li className="p-2 bg-gray-50 rounded hover:bg-blue-50 transition-colors"><strong>Мережі:</strong> TCP/IP, OSI, Wireshark (базово)</li>
        <li className="p-2 bg-gray-50 rounded hover:bg-blue-50 transition-colors"><strong>ОС:</strong> Windows, Linux (Kali Linux — базово)</li>
        <li className="p-2 bg-gray-50 rounded hover:bg-blue-50 transition-colors"><strong>Мови програмування:</strong> Python (базово), C++ (базово), HTML</li>
        <li className="p-2 bg-gray-50 rounded hover:bg-blue-50 transition-colors"><strong>Інструменти:</strong> Git, GitHub, VS Code, VirtualBox</li>
        <li className="p-2 bg-gray-50 rounded hover:bg-blue-50 transition-colors"><strong>Мови спілкування:</strong> Українська (native), Англійська (B1-B2)</li>
      </ul>
    </section>
  );
}
export default Skills;