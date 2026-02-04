import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.jpeg";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { MdAdminPanelSettings } from "react-icons/md";
import { useProductNames } from "../hooks/useProductNames";

/* ================= MENUS ================= */
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about-us" },
  { id: 3, name: "Contact", link: "/contact" },
  { id: 4, name: "Products", link: "/all-products" }, // 🔹 Direct link
  { id: 5, name: "Blogs", link: "/blogs" },            // 🔹 Replaced Insights
];

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const products = useProductNames();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  /* ================= SEARCH ================= */
  useEffect(() => {
    if (!searchInput.trim()) {
      setSuggestions([]);
      return;
    }

    const filtered = products
      .filter((p) =>
        p.name.toLowerCase().includes(searchInput.toLowerCase())
      )
      .slice(0, 6);

    setSuggestions(filtered);
  }, [searchInput, products]);

  const activeGlow =
    "bg-yellow-50 text-yellow-600 ring-1 ring-yellow-400/60";

  return (
    <header className="sticky top-0 z-50 bg-white border-b">

      {/* ================= TOP DARK BAR ================= */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
          {/* 🔹 Reduced height (py-2 instead of py-3/4) */}

         <div className="flex items-center gap-3">
  <img
    src={Logo}
    alt="Text Tech"
    className="h-8 w-8 rounded-md object-cover"
  />
  <span className="font-semibold text-base">
    Text Tech Enterprises
  </span>
</div>

          <div className="flex items-center gap-4">
            {/* ADMIN LOGIN */}
            <NavLink
              to="/login"
              title="Admin Login"
              className="hidden md:inline-flex items-center justify-center
              w-9 h-9 rounded-full
              border border-yellow-500 text-yellow-500
              hover:bg-yellow-500 hover:text-black transition"
            >
              <MdAdminPanelSettings size={18} />
            </NavLink>

            {/* HAMBURGER */}
            <button
              className="md:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <IoClose size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">
          {Menu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md font-medium transition ${
                  isActive
                    ? activeGlow
                    : "text-gray-700 hover:bg-gray-100 hover:text-yellow-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}

      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center gap-8">

            {Menu.map((item) => (
              <NavLink
                key={item.id}
                to={item.link}
                className={({ isActive }) =>
                  `py-3 font-medium transition ${
                    isActive
                      ? "text-yellow-600"
                      : "text-gray-700 hover:text-yellow-600"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
