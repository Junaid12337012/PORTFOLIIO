import React, { useEffect, useRef } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
  CubeTransparentIcon,
  CodeBracketSquareIcon,
  HomeIcon,
} from "@heroicons/react/24/solid";
import { HiPencilAlt } from "react-icons/hi";





const navListMenuItems = [
  { title: "Technology", path: "/category/technology" },
  { title: "Health", path: "/category/health" },
  // More items...
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className="relative"
      ref={menuRef}
      onMouseEnter={() => setIsMenuOpen(true)}
      onMouseLeave={() => setIsMenuOpen(false)}
    >
      <button className="flex items-center gap-2 font-medium text-blue-gray-900 cursor-pointer">
        <CubeTransparentIcon className="h-5 w-5 text-gray-500" />
        Category
        <ChevronDownIcon
          className={`h-3 w-3 transition-transform ${
            isMenuOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black opacity-50 z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <div className="absolute mt-2 w-52 bg-white border border-gray-200 shadow-lg rounded-md z-20 max-h-60 overflow-y-auto">
            {navListMenuItems.map((item) => (
              <Link
                to={item.path}
                key={item.title}
                className="flex flex-col p-2 hover:bg-rose-50 rounded-lg"
              >
                <span className="font-semibold text-gray-800">{item.title}</span>
              </Link>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const navListItems = [
  { label: "Home", path: "/", icon: HomeIcon },
  { label: "Top-Blogs", path: "/top-blogs", icon: CubeTransparentIcon },
  { label: "Docs", path: "/docs", icon: CodeBracketSquareIcon },
];

function NavList() {
  return (
    <ul className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-center">
      {navListItems.map(({ label, path, icon }) => (
        <li key={label} className="flex items-center gap-2">
          <NavLink
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-2 ${
                isActive ? "text-rose-500" : "text-gray-600"
              } hover:text-rose-500 cursor-pointer`
            }
          >
            {React.createElement(icon, { className: "w-5 h-5" })}
            <span>{label}</span>
          </NavLink>
        </li>
      ))}
      <NavListMenu />
      <li className="block lg:hidden">
        <NavLink to={"/blog-write"}>
          <button className="flex items-center gap-2 text-gray-600 hover:text-rose-500 cursor-pointer">
            <HiPencilAlt className="mt-1" />
            Write
          </button>
        </NavLink>  
      </li>
    </ul>
  );
}

const Navbar = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false);

  return (
    <nav className="bg-white p-4">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between lg:justify-center lg:gap-8">
        <button
          className="lg:hidden p-2"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          <Bars3Icon className="w-6 h-6 text-gray-600" />
        </button>
        <NavList className="hidden lg:block" />
      </div>
      {isNavOpen && (
        <div className="lg:hidden">
          <NavList />
        </div>
      )}
    </nav>
  );
};

export default Navbar