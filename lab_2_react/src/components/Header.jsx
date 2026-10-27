function Header() {
  return (
    <header className="flex flex-col items-center bg-slate-900 text-white p-8 shadow-lg rounded-b-2xl">
      <h1 className="text-4xl font-bold mb-2 tracking-wide text-blue-400">Зьола Анастасія</h1>
      <p className="text-lg text-gray-300 mb-4">Студентка спеціальності «Кібербезпека»</p>
      <div className="flex gap-4 text-sm">
        <a href="mailto:anastasiia.zola.kb.2025@lpnu.ua" className="hover:text-blue-400 transition-colors">Email</a>
        <span className="text-gray-500">|</span>
        <a href="tel:+380986030321" className="hover:text-blue-400 transition-colors">+38 (098) 603 0321</a>
      </div>
    </header>
  );
}
export default Header;