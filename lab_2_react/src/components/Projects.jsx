function Projects() {
  return (
    <section className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
      <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b-2 border-blue-500 pb-2 inline-block">Курсові та практичні роботи</h2>
      <ul className="space-y-4 text-gray-700">
        <li>
          <strong className="text-slate-800">Лабораторні з:</strong>
          <ol className="list-decimal list-inside mt-1 ml-4 space-y-1 text-gray-600">
            <li>Бази даних</li>
            <li>Комп'ютерних мереж та їх захисту</li>
            <li>Програмування скриптовими мовами</li>
            <li>Технології вебпрограмування</li>
          </ol>
        </li>
        <li>
          <strong className="text-slate-800">Практичні з "Теорія інформації та кодування"</strong> — розробка алгоритмів кодування та декодування інформації.
        </li>
      </ul>
    </section>
  );
}
export default Projects;