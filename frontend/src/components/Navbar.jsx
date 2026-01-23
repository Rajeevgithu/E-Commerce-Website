import { NavLink, Link, useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/images/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCaretDown } from "react-icons/fa6";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import api from "../api/axios";
import { useProductNames } from "../hooks/useProductNames";
import { MdAdminPanelSettings } from "react-icons/md";

/* ================= MENUS ================= */
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
  const navigate = useNavigate();
  const location = useLocation();

  const products = useProductNames();
  /* ================= STATES ================= */
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
const [insightsOpen, setInsightsOpen] = useState(false);

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const isProductsActive = location.pathname.startsWith("/all-products");

  const handleSearchSubmit = () => {
  if (!searchInput.trim()) return;

  navigate(
    `/all-products?query=${encodeURIComponent(searchInput.trim())}`
  );

  setSearchOpen(false);
  setMobileOpen(false);
};

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

const handleSelect = (name) => {
  navigate(`/all-products?query=${encodeURIComponent(name)}`);
  setSearchInput("");
  setSuggestions([]);
  setSearchOpen(false);
  setMobileOpen(false);
};


  const activeGlow =
    "bg-yellow-50 text-yellow-600 ring-1 ring-yellow-400/60";

  return (
    <header className="sticky top-0 z-50 bg-white border-b">
      {/* ================= TOP BAR ================= */}
      <div className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-6 py-3 flex justify-between items-center">
          {/* LOGO */}
          <div className="flex items-center gap-4">
            <img src={Logo} className="h-9 sm:h-12 invert" />
            <span className="font-semibold text-lg">
              Text Tech Enterprises
            </span>
          </div>

         {/* ACTIONS */}
<div className="flex items-center gap-4">

  {/* ADMIN LOGIN (DESKTOP ONLY) */}
  <NavLink
  to="/login"
  title="Admin Login"
  className="hidden md:inline-flex items-center justify-center
  w-10 h-10 rounded-full
  border border-yellow-500 text-yellow-500
  hover:bg-yellow-500 hover:text-black transition"
>
  <MdAdminPanelSettings size={20} />
</NavLink>


</div>


            
            {/* HAMBURGER */}
            <button
              className="md:hidden"
              onClick={() => {
                setMobileOpen(!mobileOpen);
                setSearchOpen(false);
              }}
            >
              {mobileOpen ? <IoClose size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>

     
     {/* ================= MOBILE MENU ================= */}
{mobileOpen && (
  <div className="md:hidden bg-white border-t px-6 py-4 space-y-3">

    {/* MAIN LINKS */}
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

    {/* PRODUCTS */}
    <div className="pt-2 border-t">
      <button
        className="w-full flex justify-between items-center px-3 py-2 rounded-md
        font-medium text-gray-800 hover:bg-gray-100 hover:text-yellow-600 transition"
      >
        {/* Navigate to ALL PRODUCTS */}
        <span
          onClick={() => {
            navigate("/all-products");
            setMobileOpen(false);
          }}
        >
          Products
        </span>

        {/* Toggle dropdown */}
        <FaCaretDown
          onClick={(e) => {
            e.stopPropagation();
            setProductsOpen(!productsOpen);
          }}
          className={`cursor-pointer transition-transform ${
            productsOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {productsOpen && (
        <div className="mt-2 ml-3 space-y-1">
          {ProductsMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? activeGlow
                    : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>

    {/* INSIGHTS (DROPDOWN LIKE PRODUCTS) */}
    <div className="pt-2 border-t">
      <button
        className="w-full flex justify-between items-center px-3 py-2 rounded-md
        font-medium text-gray-800 hover:bg-gray-100 hover:text-yellow-600 transition"
      >
        <span>Insights</span>

        <FaCaretDown
          onClick={(e) => {
            e.stopPropagation();
            setInsightsOpen(!insightsOpen);
          }}
          className={`cursor-pointer transition-transform ${
            insightsOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {insightsOpen && (
        <div className="mt-2 ml-3 space-y-1">
          {InsightsMenu.map((item) => (
            <NavLink
              key={item.id}
              to={item.link}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-md text-sm transition ${
                  isActive
                    ? activeGlow
                    : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}
        </div>
      )}
    </div>

  </div>
)}


      {/* ================= DESKTOP NAV ================= */}
      <nav className="hidden md:block bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <ul className="flex items-center gap-8">

  {/* MAIN LINKS */}
  {Menu.map((item) => (
    <NavLink
      key={item.id}
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
  ))}

  {/* ================= PRODUCTS (DESKTOP) ================= */}
  <li className="relative group">
    <Link
      to="/all-products"
      className={`py-4 font-medium flex items-center gap-1 transition ${
        isProductsActive
          ? "text-yellow-600"
          : "text-gray-700 hover:text-yellow-600"
      }`}
    >
      Products <FaCaretDown size={12} />
    </Link>

    <div className="absolute left-0 top-full hidden group-hover:block
      bg-white border rounded-lg shadow-md w-56 z-50">
      {ProductsMenu.map((item) => (
        <NavLink
          key={item.id}
          to={item.link}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm rounded-md transition ${
              isActive
                ? activeGlow
                : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  </li>

  {/* ================= INSIGHTS (DESKTOP) ================= */}
  <li className="relative group">
    <span
      className="py-4 font-medium flex items-center gap-1 cursor-pointer
      text-gray-700 hover:text-yellow-600 transition"
    >
      Insights <FaCaretDown size={12} />
    </span>

    <div className="absolute left-0 top-full hidden group-hover:block
      bg-white border rounded-lg shadow-md w-48 z-50">
      {InsightsMenu.map((item) => (
        <NavLink
          key={item.id}
          to={item.link}
          className={({ isActive }) =>
            `block px-4 py-2 text-sm rounded-md transition ${
              isActive
                ? activeGlow
                : "text-gray-600 hover:bg-gray-100 hover:text-yellow-600"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  </li>

</ul>

        </div>
      </nav>
    </header>
  );
};

export default Navbar;
