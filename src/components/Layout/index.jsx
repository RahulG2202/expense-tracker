import { Link, Outlet } from "react-router-dom";

const index = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 py-4 px-6 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-800 flex items-center gap-2"
          >
            <span className="bg-blue-800 text-white px-2 py-1 rounded">C</span>
            Partnership Tracker
          </Link>
          <nav className="flex gap-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-800 font-medium px-3 py-2 transition"
            >
              Dashboard
            </Link>
            <Link
              to="/add"
              className="bg-blue-800 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition font-medium shadow-sm"
            >
              + New Expense
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6">
        <Outlet />
      </main>

      <footer className="bg-white border-t border-gray-200 py-6 text-center text-gray-500 text-sm">
        Collaboratory Partnership Tracker | Spring 2026
      </footer>
    </div>
  );
};

export default index;
