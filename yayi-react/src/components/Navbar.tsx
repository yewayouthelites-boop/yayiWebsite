import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

interface NavbarProps {
  variant?: "white" | "brown";
}

export default function Navbar({
  variant = "brown",
}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const isHome = variant === "white";

  const headerClass = isHome
    ? "bg-white/95 backdrop-blur shadow-sm"
    : "bg-[#6B3F1D] shadow-lg";

  const textClass = isHome ? "text-gray-900" : "text-white";

  const activeClass = isHome
    ? "text-[#8B5E3C] font-semibold"
    : "text-yellow-300 font-semibold";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${headerClass}`}
      >
        <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">          
        {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="flex items-center gap-3"
          >
            <img
              src="/images/logo.png"
              alt="YAYI Logo"
              className="h-12 w-auto"
            />

            <div className="hidden sm:block">
              <h1 className={`font-bold text-lg ${textClass}`}>
                YAYI 2027
              </h1>

              <p className={`text-xs ${textClass}`}>
                Ogun State
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            <Link
              to="/"
              className={`${textClass} hover:text-[#C69214] transition ${
                location.pathname === "/" ? activeClass : ""
              }`}
            >
              Home
            </Link>

            <a
              href="/#about"
              className={`${textClass} hover:text-[#C69214] transition`}
            >
              About
            </a>

            <Link
              to="/track-record"
              className={`${textClass} hover:text-[#C69214] transition ${
                location.pathname === "/track-record"
                  ? activeClass
                  : ""
              }`}
            >
              Track Record
            </Link>

            <Link
              to="/agenda"
              className={`${textClass} hover:text-[#C69214] transition ${
                location.pathname === "/agenda" ? activeClass : ""
              }`}
            >
              Agenda
            </Link>

            <Link
              to="/news"
              className={`${textClass} hover:text-[#C69214] transition ${
                location.pathname === "/news" ? activeClass : ""
              }`}
            >
              News
            </Link>

            <Link
              to="/gallery"
              className={`${textClass} hover:text-[#C69214] transition ${
                location.pathname === "/gallery" ? activeClass : ""
              }`}
            >
              Gallery
            </Link>

            <a
              href="/#involve"
              className={`${textClass} hover:text-[#C69214] transition`}
            >
              Get Involved
            </a>
          </nav>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex flex-col justify-center items-center w-10 h-10"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              } ${textClass}`}
            />

            <span
              className={`block w-6 h-0.5 bg-current my-1 transition-all duration-300 ${
                menuOpen ? "opacity-0" : ""
              } ${textClass}`}
            />

            <span
              className={`block w-6 h-0.5 bg-current transition-all duration-300 ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              } ${textClass}`}
            />
          </button></div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            menuOpen ? "max-h-screen" : "max-h-0"
          }`}
        >
          <nav className="bg-[#6B3F1D] px-6 py-6 flex flex-col space-y-6">

            <Link
              to="/"
              onClick={closeMenu}
              className={`${
                location.pathname === "/" ? "text-yellow-300" : "text-white"
              } text-lg font-medium`}
            >
              Home
            </Link>

            <a
              href="/#about"
              onClick={closeMenu}
              className="text-white text-lg font-medium hover:text-yellow-300"
            >
              About
            </a>

            <Link
              to="/track-record"
              onClick={closeMenu}
              className={`${
                location.pathname === "/track-record"
                  ? "text-yellow-300"
                  : "text-white"
              } text-lg font-medium`}
            >
              Track Record
            </Link>

            <Link
              to="/agenda"
              onClick={closeMenu}
              className={`${
                location.pathname === "/agenda"
                  ? "text-yellow-300"
                  : "text-white"
              } text-lg font-medium`}
            >
              Agenda
            </Link>

            <Link
              to="/news"
              onClick={closeMenu}
              className={`${
                location.pathname === "/news"
                  ? "text-yellow-300"
                  : "text-white"
              } text-lg font-medium`}
            >
              News
            </Link>

            <Link
              to="/gallery"
              onClick={closeMenu}
              className={`${
                location.pathname === "/gallery"
                  ? "text-yellow-300"
                  : "text-white"
              } text-lg font-medium`}
            >
              Gallery
            </Link>

            <a
              href="/#involve"
              onClick={closeMenu}
              className="text-white text-lg font-medium hover:text-yellow-300"
            >
              Get Involved
            </a>
          </nav>
        </div>
      </header>

      {/* Spacer */}
      <div className="h-20"></div>
    </>
  );
}