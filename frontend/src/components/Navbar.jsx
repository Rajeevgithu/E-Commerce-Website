import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about-us" },
  { id: 3, name: "Contact", link: "/contact" },
];

const ProductsMenu = [
  { id: 1, name: "Consumable Items", link: "/all-products/consumable-items" },
  { id: 2, name: "Testing Products", link: "/all-products/testing-products" },
  { id: 3, name: "Paint & Coating", link: "/all-products/paint-and-coating" },
];

const InsightsMenu = [
  { id: 1, name: "Blogs", link: "/blogs" },
  { id: 2, name: "Gallery", link: "/our-gallery" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/all-products?query=${encodeURIComponent(searchInput.trim())}`);
      setSearchInput("");
    }
  };

  return (
    <header className="w-full sticky top-0 z-50 bg-white border-b border-gray-200">

      {/* ================= TOP BAR ================= */}
<div className="bg-gray-900 text-white">
  <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">

    {/* Logo */}
    <Link to="/" className="flex items-center gap-3">
      <img src={Logo} alt="Text Tech Enterprises" className="w-8" />
      <span className="font-semibold text-lg hidden sm:block">
        Text Tech Enterprises
      </span>
    </Link>

    {/* Right Actions */}
    <div className="flex items-center gap-4">

      {/* Search (Desktop only) */}
      <div className="hidden md:block relative">
        <input
          type="text"
          placeholder="Search machinery…"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          onKeyDown={handleSearch}
          className="w-56 px-4 py-2 rounded-full text-sm text-gray-900 outline-none"
        />
        <IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
      </div>

      {/* Admin Login (Desktop only) */}
      <NavLink
        to="/login"
        className="hidden md:inline-flex items-center px-5 py-2 
        border border-yellow-500 text-yellow-500 
        rounded-lg font-semibold text-sm
        hover:bg-yellow-500 hover:text-black transition"
      >
        Admin Login
      </NavLink>

      {/* Mobile Menu Toggle */}
      <button
        className="md:hidden text-white"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <IoClose size={22} /> : <HiMenuAlt3 size={22} />}
      </button>
    </div>

  </div>
</div>


      {/* ================= MAIN NAV (DESKTOP) ================= */}
      <nav className="hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center gap-8">

            {Menu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `py-4 font-medium transition ${
                      isActive
                        ? "text-yellow-600"
                        : "text-gray-700 hover:text-yellow-600"
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}

            {/* Products Dropdown */}
            <li className="relative group">
              <span className="py-4 font-medium text-gray-700 hover:text-yellow-600 cursor-pointer flex items-center gap-1">
                Products <FaCaretDown size={12} />
              </span>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-md w-56">
                {ProductsMenu.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.link}
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </li>

            {/* Insights Dropdown */}
            <li className="relative group">
              <span className="py-4 font-medium text-gray-700 hover:text-yellow-600 cursor-pointer flex items-center gap-1">
                Insights <FaCaretDown size={12} />
              </span>
              <div className="absolute left-0 top-full hidden group-hover:block bg-white border border-gray-200 rounded-lg shadow-md w-48">
                {InsightsMenu.map((item) => (
                  <NavLink
                    key={item.id}
                    to={item.link}
                    className="block px-5 py-3 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-6 py-4 space-y-4">
            {[...Menu, { name: "Blogs", link: "/blogs" }].map((item, i) => (
              <NavLink
                key={i}
                to={item.link}
                onClick={() => setMobileOpen(false)}
                className="block text-gray-700 font-medium"
              >
                {item.name}
              </NavLink>
            ))}

            <div className="pt-4 border-t">
              <p className="text-sm font-semibold mb-2">Products</p>
              {ProductsMenu.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-gray-600 py-1"
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
