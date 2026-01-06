import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";
import { useState } from "react";
import { HiMenuAlt3 } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { COLORS } from "../theme/colors";

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
    if (e.key === "Enter" && searchInput.trim()) {
      navigate(`/all-products?query=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  return (
    <div className="shadow-md relative z-40">
      {/* ================= TOP NAVBAR ================= */}
      <div style={{ backgroundColor: COLORS.navbarTopBg }} className="py-2">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex gap-2 items-center text-white font-bold text-xl">
            <img src={Logo} alt="Logo" className="w-8" />
            <span className="hidden sm:inline">Text Tech Enterprises</span>
            <span className="sm:hidden">TTE</span>
          </div>

          <div className="flex items-center gap-3">
            {/* Search – NO HOVER EFFECT */}
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={handleSearch}
                className="w-[200px] rounded-full px-3 py-1 border outline-none"
              />
              <IoMdSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            {/* Cart */}
            <Link
              to="/cart"
              style={{ backgroundColor: COLORS.buttonPrimaryBg }}
              className="relative px-4 py-1 rounded-full flex items-center gap-2 font-medium transition"
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  COLORS.buttonPrimaryHover)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  COLORS.buttonPrimaryBg)
              }
            >
              <span className="hidden sm:inline">Cart</span>
              <FaCartShopping />
              {totalItems > 0 && (
                <span
                  style={{ backgroundColor: COLORS.danger }}
                  className="absolute -top-2 -right-2 text-xs w-5 h-5 rounded-full flex items-center justify-center text-white"
                >
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Login */}
            <NavLink
              to="/login"
              className="px-3 py-1 rounded-md border text-white transition"
              style={{ borderColor: COLORS.accent }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.accent;
                e.currentTarget.style.color = COLORS.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = COLORS.textInverse;
              }}
            >
              Login
            </NavLink>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
              {isOpen ? <IoClose size={22} /> : <HiMenuAlt3 size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* ================= MAIN NAVBAR (DESKTOP) ================= */}
      <div
        className="hidden md:flex justify-center border-b"
        style={{ backgroundColor: COLORS.navbarMainBg, borderColor: COLORS.navbarBorder }}
      >
        <ul className="flex gap-6">
          {Menu.map((item) => (
            <li key={item.id}>
              <NavLink
                to={item.link}
                className={({ isActive }) =>
                  `px-4 py-3 inline-block font-medium transition`
                }
                style={({ isActive }) => ({
                  color: isActive
                    ? COLORS.navbarActive
                    : COLORS.navbarLink,
                })}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = COLORS.navbarLinkHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = COLORS.navbarLink)
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}

          {/* All Products */}
          <li className="group relative">
            <span
              className="flex items-center gap-1 px-4 py-3 cursor-pointer font-medium"
              style={{ color: COLORS.navbarLink }}
            >
              All Products <FaCaretDown />
            </span>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md w-[200px]">
              {DropdownLinks1.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className="block px-4 py-2 transition"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.accent)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {item.title}
                </NavLink>
              ))}
            </div>
          </li>

          {/* Latest News */}
          <li className="group relative">
            <span
              className="flex items-center gap-1 px-4 py-3 cursor-pointer font-medium"
              style={{ color: COLORS.navbarLink }}
            >
              Latest News <FaCaretDown />
            </span>
            <div className="absolute hidden group-hover:block bg-white shadow-md rounded-md w-[200px]">
              {DropdownLinks2.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.link}
                  className="block px-4 py-2 transition"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.accent)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
