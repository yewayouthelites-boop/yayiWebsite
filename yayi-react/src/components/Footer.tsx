import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const GREEN = "#0B7A3B";
const DEEPER = "#04371B";
const GOLD = "#F4A900";

const socials = [
  {
    name: "Facebook",
    url: "https://web.facebook.com/YAYIAdeola.ng",
    icon: <FaFacebookF />,
  },
  {
    name: "X",
    url: "https://x.com/AdeolaYAYI",
    icon: <FaXTwitter />,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/yayiadeola",
    icon: <FaInstagram />,
  },
  {
    name: "TikTok",
    url: "https://www.tiktok.com/@senatoryayi",
    icon: <FaTiktok />,
  },
  {
    name: "YouTube",
    url: "https://www.youtube.com/@yayiadeola",
    icon: <FaYoutube />,
  },
];

export default function Footer() {
  return (
    <>
      {/* FOOTER */}
      <footer
        className="text-white/80"
        style={{ backgroundColor: DEEPER }}
      >
        <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-8 py-16 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <Link
              to="/"
              className="flex items-center gap-2.5 no-underline"
            >
              <span
                className="grid h-11 w-11 place-items-center rounded-[22%]"
                style={{ backgroundColor: GREEN }}
              >
                <svg width="44" height="44" viewBox="0 0 44 44">
                  <text
                    x="22"
                    y="31"
                    textAnchor="middle"
                    fontFamily="Montserrat"
                    fontWeight="900"
                    fontSize="24"
                    fill="#fff"
                  >
                    Y
                  </text>
                  <polygon
                    points="32,6 34,10.6 39,11.1 35.3,14.5 36.3,19.4 32,16.9 27.7,19.4 28.7,14.5 25,11.1 30,10.6"
                    fill={GOLD}
                  />
                </svg>
              </span>

              <span className="text-[1.35rem] font-black text-white">
                YAYI <em className="not-italic" style={{ color: GOLD }}>2027</em>
              </span>
            </Link>

            <p className="mt-3.5 max-w-xs text-sm">
              Forward Together, Ogun. The official campaign of Sen. Solomon
              Olamilekan Adeola for Governor of Ogun State, 2027.
            </p>

            <div className="mt-4 flex flex-wrap gap-2.5">
              <div className="mt-5 flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-xl text-white transition-all duration-300 hover:-translate-y-1 hover:bg-[#F4A900] hover:text-[#064F26]"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h4
              className="mb-4 text-xs font-extrabold uppercase tracking-[.12em]"
              style={{ color: GOLD }}
            >
              Campaign
            </h4>

            <ul className="list-none space-y-2.5 p-0">
              <li>
                <a href="#about" className="text-sm hover:text-[#F4A900]">
                  About YAYI
                </a>
              </li>
              <li>
                <Link
                  to="/track-record"
                  className="text-sm hover:text-[#F4A900]"
                >
                  Track Record
                </Link>
              </li>
              <li>
                <Link
                  to="/agenda"
                  className="text-sm hover:text-[#F4A900]"
                >
                  Agenda for Ogun
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-sm hover:text-[#F4A900]"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/gallery"
                  className="text-sm hover:text-[#F4A900]"
                >
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="mb-4 text-xs font-extrabold uppercase tracking-[.12em]"
              style={{ color: GOLD }}
            >
              Take Action
            </h4>

            <ul className="list-none space-y-2.5 p-0">
              <li>
                <a href="#involve" className="text-sm hover:text-[#F4A900]">
                  Volunteer
                </a>
              </li>
              <li>
                <a
                  href="https://cvr.inecnigeria.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#F4A900]"
                >
                  Check your PVC
                </a>
              </li>
              <li>
                <a
                  href="https://yayiadeola.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-[#F4A900]"
                >
                  Senator's official site
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4
              className="mb-4 text-xs font-extrabold uppercase tracking-[.12em]"
              style={{ color: GOLD }}
            >
              Contact
            </h4>

            <ul className="list-none space-y-2.5 p-0 text-sm">
              <li>
                Senator Solomon Adeola Crescent,
                <br />
                Ilaro, Ogun State
              </li>
              <li>
                <a
                  href="mailto:aremoyayiadeola@gmail.com"
                  className="hover:text-[#F4A900]"
                >
                  aremoyayiadeola@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+2348139338112"
                  className="hover:text-[#F4A900]"
                >
                  +234 813 933 8112
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mx-auto flex w-[92%] max-w-[1160px] flex-wrap justify-between gap-3.5 border-t border-white/10 py-5 text-xs text-white/60">
          <span>© 2026 YAYI 2027 Campaign Organisation. All rights reserved.</span>
          <span>
            Produced in compliance with the Electoral Act & INEC guidelines.
            Not an INEC website.
          </span>
        </div>
      </footer>
    </>
  );
}