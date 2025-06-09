import { NavLink, Link } from "react-router-dom";
import Logo from "../assets/images/Logo.png";
import { IoMdSearch } from "react-icons/io";
import { FaCartShopping, FaCaretDown } from "react-icons/fa6";
import { useCart } from "../contexts/CartContext";

// Top-level navigation links
const Menu = [
  { id: 1, name: "Home", link: "/" },
  { id: 2, name: "About Us", link: "/about-us" },
  { id: 3, name: "Contact Us", link: "/contact" },
];

// All Products dropdown
const DropdownLinks1 = [
  {
    id: 1,
    title: "Texttiles Testing Instruments",
    link: "/texttiles-testing-instruments",
  },
  { id: 2, title: "Consumables", link: "/consumables" },
  { id: 3, title: "Paint & Coating", link: "/paint-&-coating" },
  { id: 4, title: "Test Chambers", link: "/test-chambers" },
];

// Latest News dropdown
const DropdownLinks2 = [
  { id: 1, name: "Our Gallery", link: "/our-gallery" },
  { id: 2, name: "Blogs", link: "/blogs" },
];

// Test Instruments dropdown with submenus
const DropdownLinks3 = [
  {
    id: 1,
    title: "Testing By Property",
    link: "/testing-by-property",
    subLinks: [
      {
        id: 1.1,
        title: "Abrasion & Pilling",
        link: "/testing-by-property/abrasion-pilling",
      },
      {
        id: 1.2,
        title: "Tensile Strength",
        link: "/testing-by-property/tensile-strength",
      },
      {
        id: 1.3,
        title: "Flexing & Bending",
        link: "/testing-by-property/flexing-bending",
      },
    ],
  },
  {
    id: 2,
    title: "Testing By Application",
    link: "/testing-by-application",
    subLinks: [
      {
        id: 2.1,
        title: "Textile & Fabric",
        link: "/testing-by-application/textile-fabric",
      },
      {
        id: 2.2,
        title: "Paint & Coatings",
        link: "/testing-by-application/paint-coatings",
      },
      {
        id: 2.3,
        title: "Leather & Footwear",
        link: "/testing-by-application/leather-footwear",
      },
    ],
  },
  {
    id: 3,
    title: "Testing By Standard",
    link: "/testing-by-standard",
    subLinks: [
      { id: 3.1, title: "ASTM", link: "/testing-by-standard/astm" },
      { id: 3.2, title: "ISO", link: "/testing-by-standard/iso" },
      { id: 3.3, title: "DIN", link: "/testing-by-standard/din" },
    ],
  },
  {
    id: 4,
    title: "Accessories",
    link: "/accessories",
    subLinks: [
      {
        id: 4.1,
        title: "Testing Fixtures",
        link: "/accessories/testing-fixtures",
      },
      {
        id: 4.2,
        title: "Calibration Tools",
        link: "/accessories/calibration-tools",
      },
    ],
  },
];

// --- NAVBAR COMPONENT ---
const Navbar = () => {
  const { cart } = useCart();
  const totalItems = (cart || []).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="shadow-md text-white duration-200 relative z-40">
        {/* Top Navbar */}
        <div className="bg-gray-700 py-2">
          <div className="w-full px-4 flex justify-between items-center">
            <div className="font-bold text-2xl sm:text-3xl flex gap-2 items-center text-white">
              <img src={Logo} alt="Logo" className="w-10" />
              Text Tech Enterprises
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group hidden sm:block">
                <input
                  type="text"
                  placeholder="Search"
                  className="w-[200px] group-hover:w-[300px] transition-all duration-300 rounded-full border border-gray-300 px-3 py-1 focus:outline-none focus:border-amber-500 dark:border-gray-500 dark:bg-gray-800"
                />
                <IoMdSearch className="text-gray-500 group-hover:text-amber-500 absolute top-1/2 right-3 -translate-y-1/2" />
              </div>

              <Link
                to="/cart"
                className="relative bg-gradient-to-r from-orange-400 to-yellow-500  text-white py-1 px-4 rounded-full flex items-center gap-2 group hover:bg-orange-300 border-2 border-gray-600 
             focus:outline-none focus:border-gray-100 focus:ring-1 focus:ring-gray-100
             hover:border-gray-100 transition duration-200"
              >
                <span className="hidden group-hover:inline">Cart</span>
                <FaCartShopping className="text-xl" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Login/Signup Modal Trigger */}
              <NavLink
                to="/login"
                className="text-gray-100 font-medium transition px-3 py-1 rounded-md border border-white hover:bg-white hover:text-gray-700"
              >
                Login/SignUp
              </NavLink>
            </div>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="flex justify-center">
          <ul className="sm:flex hidden items-center gap-4">
            {Menu.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `inline-block px-4 py-2 duration-200 ${
                      isActive
                        ? "text-yellow-400 font-semibold"
                        : "hover:text-yellow-400"
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
                to="/our-products"
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

            {/* Test Instruments Dropdown with Submenus */}
            <li className="group relative cursor-pointer">
              <NavLink
                to="/test-instruments"
                className={({ isActive }) =>
                  `flex items-center gap-1 py-2 ${
                    isActive
                      ? "text-yellow-400 font-semibold"
                      : "hover:text-yellow-400"
                  }`
                }
              >
                Test Instruments{" "}
                <FaCaretDown className="group-hover:rotate-180 transition duration-200" />
              </NavLink>
              <div className="absolute z-[9999] hidden group-hover:block w-[250px] rounded-md bg-white p-2 text-black shadow-md">
                <ul>
                  {DropdownLinks3.map((item) => (
                    <li key={item.id} className="relative group/submenu">
                      <NavLink
                        to={item.link}
                        className="flex justify-between items-center w-full rounded-md p-2 hover:bg-yellow-400"
                      >
                        {item.title}
                        {item.subLinks && (
                          <FaCaretDown className="group-hover/submenu:rotate-180 transition duration-200" />
                        )}
                      </NavLink>
                      {item.subLinks && (
                        <div className="absolute left-full top-0 hidden group-hover/submenu:block w-[250px] bg-white p-2 text-black shadow-md rounded-md">
                          <ul>
                            {item.subLinks.map((subItem) => (
                              <li key={subItem.id}>
                                <NavLink
                                  to={subItem.link}
                                  className="block w-full rounded-md p-2 hover:bg-yellow-400"
                                >
                                  {subItem.title}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;
