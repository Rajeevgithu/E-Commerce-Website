import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

// Menu Links
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about-us" },
  { id: 3, name: "Contact Us", link: "/contact" },
];

const DropdownLinks1 = [
  { id: 1, title: "Consumable Items", link: "/all-products/consumable-items" },
  { id: 2, title: "Testing Products", link: "/all-products/testing-products" },
  { id: 3, title: "Paint & Coating", link: "/all-products/paint-and-coating" },
];

const DropdownLinks2 = [
  { id: 1, name: "Our Gallery", link: "/our-gallery" },
  { id: 2, name: "Blogs", link: "/blogs" },
];

const Navbar = () => {
  const { cart } = useCart();
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);
  const [isOpen, setIsOpen] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const [showNews, setShowNews] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    if (e.key === "Enter" && searchInput.trim() !== "") {
      navigate(`/all-products?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="shadow-md text-white duration-200 relative z-40">
      {/* Top Navbar */}
      <div className="bg-gray-700 py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="font-bold text-xl sm:text-2xl md:text-3xl flex gap-2 items-center text-white">
            <img src={Logo} alt="Logo" className="w-8 sm:w-10" />
            <span className="hidden sm:inline">Text Tech Enterprises</span>
            <span className="sm:hidden">TTE</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <div className="relative group hidden md:block">
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                className="w-[150px] md:w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-amber-500 dark:border-gray-500 dark:bg-gray-800"
              />
              <IoMdSearch className="text-gray-500 group-hover:text-amber-500 absolute top-1/2 right-3 -translate-y-1/2" />
            </div>

            <Link
              to="/cart"
              className="relative bg-gradient-to-r from-orange-400 to-yellow-500 text-white py-1 px-2 sm:px-4 rounded-full flex items-center gap-2 group hover:bg-orange-300 border-2 border-gray-600 
              focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100
              hover:border-gray-100 transition duration-200"
            >
              <span className="hidden sm:inline group-hover:inline">Cart</span>
              <FaCartShopping className="text-xl" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>

            <NavLink
              to="/login"
              className="text-gray-100 font-medium transition px-2 sm:px-3 py-1 rounded-md border border-white hover:bg-white hover:text-gray-700 text-sm sm:text-base"
            >
              Login
            </NavLink>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white p-2"
            >
              {isOpen ? <IoClose size={24} /> : <HiMenuAlt3 size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar - Desktop */}
      <div className="hidden md:flex justify-center bg-gray-200">
        <ul className="flex items-center gap-4">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                title={item.name}
                className={({ isActive }) =>
                  `inline-block px-4 py-2 duration-200 hover:text-yellow-400 ${
                    isActive ? "text-yellow-400 font-semibold" : "text-gray-700"
                  }`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* All Products Dropdown */}
          <li className="group relative cursor-pointer">
            <NavLink
              to="/all-products"
              className={({ isActive }) =>
                `flex items-center gap-1 py-2 ${
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-400"
                }`
              }
            >
              All Products{" "}
              <FaCaretDown className="group-hover:rotate-180 transition duration-200" />
            </NavLink>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks1.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="block w-full rounded-md p-2 hover:bg-yellow-400"
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          {/* Latest News Dropdown */}
          <li className="group relative cursor-pointer">
            <NavLink
              to="/latest-news"
              className={({ isActive }) =>
                `flex items-center gap-1 py-2 ${
                  isActive
                    ? "text-yellow-400 font-semibold"
                    : "hover:text-yellow-400"
                }`
              }
            >
              Latest News{" "}
              <FaCaretDown className="group-hover:rotate-180 transition duration-200" />
            </NavLink>
            <div className="absolute z-[9999] hidden group-hover:block w-[200px] rounded-md bg-white p-2 text-black shadow-md">
              <ul>
                {DropdownLinks2.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="block w-full rounded-md p-2 hover:bg-yellow-400"
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        </ul>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden backdrop-blur bg-gray-600 shadow-md absolute w-full transition-all duration-300 z-30 ${
          isOpen ? "max-h-screen" : "max-h-0 overflow-hidden"
        }`}
      >
        <ul className="px-4 py-2">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `block py-2 ${
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "text-gray-200 hover:text-gray-300"
                  }`
                }
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* Mobile Dropdown - All Products */}
          <li className="py-2 border-t border-gray-700">
            <button
              onClick={() => setShowProducts(!showProducts)}
              className="w-full text-left font-semibold flex items-center justify-between py-2 hover:text-yellow-500 transition"
            >
              All Products
              <FaCaretDown
                className={`transition-transform duration-200 ${
                  showProducts ? "rotate-180" : ""
                }`}
              />
            </button>
            {showProducts && (
              <ul className="pl-4 space-y-2 animate-fade-in">
                {DropdownLinks1.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="block py-1 text-sm text-gray-200 hover:text-yellow-500"
                      onClick={() => {
                        setIsOpen(false);
                        setShowProducts(false);
                      }}
                    >
                      {item.title}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Mobile Dropdown - Latest News */}
          <li className="py-2 border-t border-gray-700">
            <button
              onClick={() => setShowNews(!showNews)}
              className="w-full text-left font-semibold flex items-center justify-between py-2 hover:text-yellow-500 transition"
            >
              Latest News
              <FaCaretDown
                className={`transition-transform duration-200 ${
                  showNews ? "rotate-180" : ""
                }`}
              />
            </button>
            {showNews && (
              <ul className="pl-4 space-y-2 animate-fade-in">
                {DropdownLinks2.map((item) => (
                  <li key={item.id}>
                    <NavLink
                      to={item.link}
                      className="block py-1 text-sm text-gray-200 hover:text-yellow-500"
                      onClick={() => {
                        setIsOpen(false);
                        setShowNews(false);
                      }}
                    >
                      {item.name}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
