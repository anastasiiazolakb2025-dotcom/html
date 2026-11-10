function Education() {
  return (
    <section className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-md border border-gray-100 dark:border-slate-700">
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-4 border-b-2 border-blue-500 pb-2 inline-block">Освіта</h2>
      <article>
        <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-2">Національний університет "Львівська політехніка"</h3>
        <p className="text-gray-600 dark:text-slate-400 italic mb-1">Спеціальність: 125 "Кібербезпека"</p>
        <p className="text-gray-600 dark:text-slate-400 italic mb-3">Роки навчання: 2025 - 2029 (очікується)</p>
        <p className="text-gray-700 dark:text-slate-300">
          Курси: Основи інформаційної безпеки, Комплексні системи захисту інформації, 
          Безпека комп'ютерних мереж, Технічні засоби захисту інформації.
        </p>
      </article>
    </section>
  );
}
export default Education;