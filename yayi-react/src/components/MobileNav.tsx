import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";

const PANEL = "#0A2419";
const GOLD = "#F4A900";

const links = [
  { label: "Home", to: "/" },
  { label: "About", to: "/#about" },
  { label: "Track record", to: "/track-record" },
  { label: "Agenda", to: "/agenda" },
  { label: "Momentum", to: "/#momentum" },
  { label: "News", to: "/news" },
  { label: "Gallery", to: "/gallery" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKey);

    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const close = () => setOpen(false);

  const handleLinkClick = (to: string) => {
    close();

    // If it's a hash link, scroll to it after a brief delay
    if (to.startsWith("/#")) {
      const hash = to.substring(1); // Remove the leading /
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);
    }
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label="Open menu"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="block border-0 bg-transparent p-2"
      >
        <span className="my-1 block h-[3px] w-[26px] rounded bg-[#064F26]" />
        <span className="my-1 block h-[3px] w-[26px] rounded bg-[#064F26]" />
        <span className="my-1 block h-[3px] w-[26px] rounded bg-[#064F26]" />
      </button>

      {createPortal(
        <>
          {/* Overlay */}
          <div
            onClick={close}
            aria-hidden="true"
            className={`fixed inset-0 z-[9998] bg-black/50 transition-opacity duration-300 md:hidden ${
              open ? "opacity-100" : "pointer-events-none opacity-0"
            }`}
          />

          {/* Drawer */}
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className={`fixed right-0 top-0 z-[9999] flex h-[100dvh] w-[86%] max-w-[360px] flex-col shadow-2xl transition-transform duration-300 md:hidden ${
              open ? "translate-x-0" : "translate-x-full"
            }`}
            style={{ backgroundColor: PANEL }}
          >
            {/* Top bar: logo + close */}
            <div className="flex shrink-0 items-center justify-between border-b border-white/10 px-5 py-4">
              <Link
                to="/"
                onClick={close}
                className="flex items-center gap-2.5 no-underline"
              >
                <span
                  className="grid h-9 w-9 place-items-center rounded-lg text-lg font-black"
                  style={{ backgroundColor: GOLD, color: PANEL }}
                >
                  Y
                </span>

                <span className="text-lg font-black text-white">
                  YAYI <span style={{ color: GOLD }}>2027</span>
                </span>
              </Link>

              <button
                type="button"
                onClick={close}
                aria-label="Close menu"
                className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-white transition active:scale-95"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M3 3l12 12M15 3L3 15" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <nav className="flex-1 overflow-y-auto px-5">
              <ul className="list-none p-0">
                {links.map((item) => (
                  <li key={item.label} className="border-b border-white/10">
                    <Link
                      to={item.to}
                      onClick={() => handleLinkClick(item.to)}
                      className="flex items-center justify-between py-[18px] text-lg font-bold text-white no-underline"
                    >
                      {item.label}

                      <span aria-hidden="true" className="text-lg text-white/35">
                        ›
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Get involved */}
            <div className="shrink-0 px-5 pb-7 pt-4">
              <Link
                to="/#involve"
                onClick={() => handleLinkClick("/#involve")}
                className="flex items-center justify-center gap-2 rounded-full py-4 text-base font-black no-underline shadow-[0_0_34px_-4px_rgba(244,169,0,.55)] transition active:scale-[.98]"
                style={{ backgroundColor: GOLD, color: "#1B1B1B" }}
              >
                Get involved
                <span aria-hidden="true">→</span>
              </Link>

              <p className="mt-4 text-center text-sm text-white/35">
                Forward Together, Ogun
              </p>
            </div>
          </aside>
        </>,
        document.body,
      )}
    </div>
  );
}
