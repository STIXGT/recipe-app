export default function Navbar() {
  return (
    <div>
      <nav className="bg-slate-950">
        <ul className="flex p-5 gap-8">
          <li>
            <a
              className="text-slate-300 text-base p-2 rounded-md hover:bg-slate-700 "
              href="/"
            >
              Home
            </a>
          </li>
          <li>
            <a
              className="text-slate-300 text-base p-2 rounded-md hover:bg-slate-700"
              href="/users"
            >
              Users
            </a>
          </li>
          <li>
            <a
              className="text-slate-300 text-base p-2 rounded-md hover:bg-slate-700"
              href="/recipes"
            >
              Recipes
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
}
