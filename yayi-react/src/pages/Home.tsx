import { useEffect, useState, type FormEvent } from "react";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import { Link } from "react-router-dom";

const GREEN = "#0B7A3B";
const DEEP = "#064F26";
const GOLD = "#F4A900";

const agendaItems = [
  {
    title: "Education & Human Capital",
    items: [
      "Rehabilitate public schools and expand teacher recruitment and training.",
      "Scale the scholarship and bursary schemes statewide.",
      "Link technical colleges to industry apprenticeships in Agbara, Ota and Sagamu corridors.",
    ],
  },
  {
    title: "Infrastructure & Transport",
    items: [
      "Complete and connect: prioritise ongoing road projects before new ones.",
      "Rural access roads to move farm produce to markets.",
      "Leverage federal partnerships for rail, housing and the Gateway agro-cargo airport.",
    ],
  },
  {
    title: "Jobs, SMEs & Industry",
    items: [
      "Make Ogun Nigeria's easiest state to open and run a factory.",
      "Single-digit micro-credit and market infrastructure for traders and artisans.",
      "A youth employment compact tied to the state's industrial clusters.",
    ],
  },
  {
    title: "Agriculture & Food",
    items: [
      "Inputs, extension services and storage for smallholder farmers.",
      "Agro-processing zones so Ogun's harvest is packaged, not just planted.",
      "Farmer–herder peace frameworks that protect lives and livelihoods.",
    ],
  },
  {
    title: "Health & Welfare",
    items: [
      "A functional primary health centre within reach of every ward.",
      "Expand state health insurance enrolment for informal workers.",
      "Maternal and child health as a measured, published priority.",
    ],
  },
  {
    title: "Security & Community",
    items: [
      "Better-equipped community policing in partnership with traditional institutions.",
      "Border-community security for Yewa and Ipokia axis.",
      "Streetlighting and safe-town programmes in urban centres.",
    ],
  },
];

const stats = [
  {
    number: 6,
    suffix: "",
    text: "Consecutive elections won across two states",
  },
  {
    number: 20,
    suffix: "+",
    text: "Years of legislative service",
  },
  {
    number: 20,
    suffix: "",
    text: "Local governments reached with projects & empowerment",
  },
  {
    number: 4,
    suffix: "",
    text: "Major committees chaired: Public Accounts, Finance, Appropriations",
  },
];

const milestones = [
  {
    date: "April 2026",
    title: "APC Consensus Candidate",
    text: "Announced by Governor Dapo Abiodun at a statewide caucus attended by former governors Osoba, Amosun and Daniel.",
  },
  {
    date: "May 2026",
    title: "Affirmed at the Primary",
    text: "Emerged as the party's flagbearer at a primary described by the Governor as peaceful, transparent and orderly.",
  },
  {
    date: "June 2026",
    title: "Ijebu Traditional Council",
    text: "Unanimously backed by the Ijebu Obas, honouring the late Awujale's publicly declared preference at Ojude Oba 2024.",
  },
  {
    date: "July 2026",
    title: "Received by Obasanjo",
    text: "Hosted at the Olusegun Obasanjo Presidential Library, Abeokuta, with counsel to reach every voter regardless of party.",
  },
  {
    date: "Ogun West",
    title: "The Equity Question",
    text: "Ogun West remains the only senatorial district yet to produce an elected governor. 2027 is the chance to complete Ogun's story.",
  },
  {
    date: "Statewide",
    title: "All Three Districts",
    text: "Support groups and stakeholders across Ogun East, Central and West. One movement, moving forward together.",
  },
];

const lgas = [
  "Abeokuta North",
  "Abeokuta South",
  "Ado-Odo/Ota",
  "Ewekoro",
  "Ifo",
  "Ijebu East",
  "Ijebu North",
  "Ijebu North-East",
  "Ijebu Ode",
  "Ikenne",
  "Imeko Afon",
  "Ipokia",
  "Obafemi Owode",
  "Odeda",
  "Odogbolu",
  "Ogun Waterside",
  "Remo North",
  "Sagamu",
  "Yewa North",
  "Yewa South",
  "Outside Ogun State (Diaspora supporter)",
];

export default function Home() {
  const [openPillar, setOpenPillar] = useState<number | null>(null);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [showTop, setShowTop] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    lga: "",
    role: "Ward mobilisation",
  });

  const [errors, setErrors] = useState({
    name: false,
    phone: false,
    lga: false,
  });

  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const electionDate = new Date("2027-03-06T08:00:00+01:00");

    const tick = () => {
      const difference = electionDate.getTime() - Date.now();

      if (difference <= 0) {
        setDays(0);
        setHours(0);
        setMins(0);
        setSecs(0);
        return;
      }

      setDays(Math.floor(difference / 86400000));
      setHours(Math.floor(difference / 3600000) % 24);
      setMins(Math.floor(difference / 60000) % 60);
      setSecs(Math.floor(difference / 1000) % 60);
    };

    tick();

    const timer = window.setInterval(tick, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
      setShowTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValid = form.name.trim().split(/\s+/).length >= 2;
    const phoneValid = /^(\+?234|0)[789][01]\d{8}$/.test(
      form.phone.replace(/[\s-]/g, ""),
    );
    const lgaValid = Boolean(form.lga);

    setErrors({
      name: !nameValid,
      phone: !phoneValid,
      lga: !lgaValid,
    });

    if (!nameValid || !phoneValid || !lgaValid) {
      return;
    }

    setSubmitted(true);

    setForm({
      name: "",
      phone: "",
      lga: "",
      role: "Ward mobilisation",
    });

    window.setTimeout(() => {
      document
        .getElementById("form-success")
        ?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-white text-[#1B1B1B]">
      {/* Announcement */}
      {/* <div
        className="px-4 py-2 text-center text-sm font-semibold"
        style={{ backgroundColor: GOLD }}
      >
        Official campaign website · Sen. Solomon Olamilekan Adeola (YAYI) · APC
        Candidate for Governor, Ogun State 2027
      </div> */}

      {/* Header */}
      <header
        className={`sticky top-0 z-[100] border-b border-[#E1E8E1] bg-white/95 backdrop-blur-md transition-shadow ${
          scrolled ? "shadow-lg" : ""
        }`}
      >
        <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between py-3.5">
          <Link
            to="/"
            className="flex items-center gap-2.5 no-underline"
            aria-label="YAYI 2027 home"
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
                  fontFamily="Montserrat, Arial"
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

            <span
              className="text-[1.35rem] font-black tracking-wide"
              style={{ color: DEEP }}
            >
              YAYI{" "}
              <em className="not-italic" style={{ color: GREEN }}>
                2027
              </em>
            </span>
          </Link>

          <MobileNav />

          <ul
            className="hidden list-none items-center gap-[26px] p-0 lg:flex lg:flex-row"
          >
            <li>
              <a
                href="#about"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                About
              </a>
            </li>

            <li>
              <Link
                to="/track-record"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                Track Record
              </Link>
            </li>

            <li>
              <Link
                to="/agenda"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                Agenda
              </Link>
            </li>

            <li>
              <a
                href="#momentum"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                Momentum
              </a>
            </li>

            <li>
              <Link
                to="/news"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                News
              </Link>
            </li>

            <li>
              <Link
                to="/gallery"
                className="whitespace-nowrap border-b-2 border-transparent px-0.5 py-1.5 text-lg font-semibold text-white no-underline transition hover:text-[#0B7A3B] hover:border-[#F4A900] md:text-[.92rem] md:text-[#1B1B1B]"
              >
                Gallery
              </Link>
            </li>

            <li>
              <a
                href="#involve"
                className="shrink-0 whitespace-nowrap rounded-full px-6 py-3 font-bold no-underline"
                style={{
                  backgroundColor: GOLD,
                  color: "#1B1B1B",
                }}
              >
                Get Involved
              </a>
            </li>
          </ul>
        </div>
      </header>

      <main>
        {/* HERO */}
        <section
          id="home"
          className="relative overflow-hidden text-white page-hero hero"
          style={{ backgroundColor: 'var(--deep)', backgroundImage: 'var(--chev)' }}
        >
          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 items-center gap-12 pb-0 pt-20 lg:grid-cols-[1.15fr_.85fr]">
            <div className="relative z-10">
              <span
                className="mb-[18px] inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[.14em]"
                style={{ color: GOLD }}
              >
                <span
                  className="h-[3px] w-[26px] rounded"
                  style={{ backgroundColor: GOLD }}
                />
                Ogun State Governorship · 2027
              </span>

              <h1 className="text-[clamp(2.5rem,5.5vw,4.4rem)] font-black leading-[1.06] tracking-tight">
                <em className="not-italic" style={{ color: GOLD }}>
                  Forward
                </em>{" "}
                Together,
                <br />
                Ogun.
              </h1>

              <p className="mt-5 max-w-[34rem] text-[1.1rem] leading-relaxed text-white/85">
                Two decades of proven public service, from the Lagos Assembly
                to the chairmanship of the Senate Appropriations Committee.
                Now, Senator Solomon Olamilekan Adeola (YAYI) is ready to serve
                as Governor of Ogun State: continuity, competence, and equity
                for every district.
              </p>

              <div className="mt-8 flex flex-wrap gap-3.5">
                <a
                  href="#involve"
                  className="rounded-full px-6 py-3 font-bold no-underline transition hover:scale-[.98]"
                  style={{ backgroundColor: GOLD, color: "#1B1B1B" }}
                >
                  Join the Movement
                </a>

                <a
                  href="#agenda"
                  className="rounded-full border-2 border-white/60 px-6 py-3 font-bold text-white no-underline transition hover:border-[#F4A900] hover:text-[#F4A900]"
                >
                  Read the Agenda
                </a>
              </div>
            </div>

            <div className="relative z-10 rounded-2xl border border-white/15 bg-white/[.06] p-6 backdrop-blur-sm">
              <h3
                className="text-xs font-extrabold uppercase tracking-[.12em]"
                style={{ color: GOLD }}
              >
                Countdown to Election Day
              </h3>

              <div className="mt-3.5 grid grid-cols-4 gap-2.5">
                {[
                  ["Days", days],
                  ["Hours", hours],
                  ["Mins", mins],
                  ["Secs", secs],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="rounded-xl bg-white/[.08] px-1.5 py-3 text-center"
                  >
                    <b className="block text-[1.6rem] font-extrabold">
                      {String(value).padStart(2, "0")}
                    </b>
                    <span className="text-[.68rem] uppercase tracking-[.08em] text-white/70">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-sm text-white/80">
                Your voice is your vote. Get your{" "}
                <a
                  href="https://cvr.inecnigeria.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold"
                  style={{ color: GOLD }}
                >
                  Permanent Voter's Card (PVC)
                </a>{" "}
                ready before the register closes.
              </p>
            </div>
          </div>

          <div className="relative z-10 mt-14 overflow-hidden border-t border-white/15 py-4">
            <div className="flex w-max animate-[ribbon_26s_linear_infinite] gap-14 whitespace-nowrap font-montserrat text-base font-bold uppercase tracking-[.22em] text-white/55">
              <span>
                Yewa <b style={{ color: GOLD }}>▲</b> Egba{" "}
                <b style={{ color: GOLD }}>▲</b> Ijebu{" "}
                <b style={{ color: GOLD }}>▲</b> Remo{" "}
                <b style={{ color: GOLD }}>▲</b> One Ogun. One Future.
              </span>
              <span>
                Yewa <b style={{ color: GOLD }}>▲</b> Egba{" "}
                <b style={{ color: GOLD }}>▲</b> Ijebu{" "}
                <b style={{ color: GOLD }}>▲</b> Remo{" "}
                <b style={{ color: GOLD }}>▲</b> One Ogun. One Future.
              </span>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#0B7A3B] py-8 text-white">
          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.text}>
                <b className="block text-[clamp(1.7rem,3vw,2.4rem)] font-black">
                  {stat.number}
                  <span className="text-[.6em]" style={{ color: GOLD }}>
                    {stat.suffix}
                  </span>
                </b>
                <span className="text-sm text-white/85">{stat.text}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ABOUT */}
        <section id="about" className="py-20 lg:py-[88px]">
          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-10 lg:grid-cols-[.9fr_1.1fr] lg:gap-14">
            <div className="relative">
              <div
                className="grid aspect-[4/5] place-items-center overflow-hidden rounded-[20px] shadow-xl"
                style={{
                  background: `linear-gradient(160deg, ${DEEP}, ${GREEN})`,
                }}
              >
              <img
                src="/images/image.png"
                alt="Aremo YAYI Portrait"
                className="relative h-full w-full object-cover"
              />
              </div>

              <span
                className="absolute -left-3 top-[18px] rounded-lg px-4 py-2 text-xs font-extrabold uppercase tracking-wider shadow-lg"
                style={{
                  backgroundColor: GOLD,
                  color: "#1B1B1B",
                }}
              >
                Aremo YAYI
              </span>
            </div>

            <div>
              <div className="mb-7 max-w-[44rem]">
                <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight text-[#064F26]">
                  Meet{" "}
                  <em className="not-italic" style={{ color: GREEN }}>
                    Senator Solomon Olamilekan Adeola
                  </em>
                </h2>
              </div>

              <p className="mb-4 text-[#33403a]">
                Born on 10 August 1969 and raised in Alimosho,{" "}
                <b style={{ color: DEEP }}>YAYI</b> is a chartered accountant
                (FCA) who spent 12 years at The Guardian Newspapers before
                founding his own tax consultancy. That grounding in discipline
                and accountability has defined his public life.
              </p>

              <p className="mb-4 text-[#33403a]">
                He is the Senator for <b>Ogun West</b>, Chairman of the{" "}
                <b>Senate Committee on Appropriations</b>, and the All
                Progressives Congress consensus candidate for the{" "}
                <b>2027 Ogun State governorship election</b>, with ancestral
                roots in Ilaro, the headquarters of Ogun West.
              </p>

              <div className="relative mt-8 border-l-2 border-[#E1E8E1] pl-6">
                {[
                  [
                    "1969 · Lagos",
                    "Born at Lagos Island Maternity Hospital; educated in Alimosho and Akowonjo; HND Accounting, Ondo State Polytechnic (now Rufus Giwa Polytechnic).",
                  ],
                  [
                    "2003–2011 · Lagos State House of Assembly",
                    "Member, Alimosho Constituency II; instrumental in reforms that grew Lagos IRS monthly revenue from ₦5bn to ₦20bn.",
                  ],
                  [
                    "2011–2015 · House of Representatives",
                    "Chairman, Public Accounts Committee as a first-term member.",
                  ],
                  [
                    "2015–2023 · Senator, Lagos West",
                    "Chairman, Senate Committee on Finance; re-elected 2019.",
                  ],
                  [
                    "2023–Present · Senator, Ogun West",
                    "Chairman, Senate Committee on Appropriations; projects and empowerment across Ogun's 20 LGAs.",
                  ],
                  [
                    "2026 · APC Governorship Candidate",
                    "Adopted as consensus candidate (April 2026) and affirmed at a peaceful statewide primary (May 2026).",
                  ],
                ].map(([title, description], index) => (
                  <div key={title} className="relative pb-5 pl-3 last:pb-0">
                    <span
                      className="absolute -left-[34px] top-1 h-4 w-4 rounded-full border-4 border-white"
                      style={{
                        backgroundColor: "#fff",
                        boxShadow: `0 0 0 3px ${
                          index === 5 ? GOLD : GREEN
                        }`,
                      }}
                    />

                    <b
                      className="block text-sm font-extrabold"
                      style={{ color: DEEP }}
                    >
                      {title}
                    </b>

                    <span className="text-sm text-[#5C665F]">
                      {description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRACK RECORD PREVIEW */}
        <section
          id="record"
          className="bg-[#F6F8F5] py-20 lg:py-[88px]"
        >
          <div className="mx-auto w-[92%] max-w-[1160px]" style={{ backgroundColor: 'var(--cream)', backgroundImage: 'var(--chev-light)' }}>
            <div className="mx-auto mb-11 max-w-[44rem] text-center">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                Proven. Prepared.{" "}
                <em className="not-italic" style={{ color: GREEN }}>
                  YAYI.
                </em>
              </h2>
              <p className="mt-3.5 text-[#5C665F]">
                Not promises. Receipts. A record of delivery at every level of
                government.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
              {[
                [
                  "Grew Lagos Revenue 4×",
                  "Championed the reforms that lifted Lagos IRS collections from ₦5bn to ₦20bn monthly, the fiscal backbone of modern Lagos.",
                  "Public Finance",
                ],
                [
                  "Guardian of the Public Purse",
                  "Chaired Public Accounts, Finance and Appropriations: the three rooms where Nigeria's money is watched, raised and shared.",
                  "Accountability",
                ],
                [
                  "250+ Projects, 40,000+ Lives",
                  "Classrooms, health centres, boreholes, roads, markets and the Mega Empowerment Programme, delivered across Ogun West in under three years.",
                  "Grassroots Delivery",
                ],
              ].map(([title, text, tag]) => (
                <div
                  key={title}
                  className="flex flex-col rounded-2xl border border-[#E1E8E1] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div
                    className="mb-[18px] grid h-[52px] w-[52px] place-items-center rounded-[14px]"
                    style={{ backgroundColor: "#FFF3D6" }}
                  >
                    <span className="text-2xl" style={{ color: GREEN }}>
                      ▲
                    </span>
                  </div>

                  <h3 className="mb-2.5 text-[1.08rem] font-extrabold text-[#064F26]">
                    {title}
                  </h3>

                  <p className="flex-1 text-[.93rem] text-[#5C665F]">
                    {text}
                  </p>

                  <span
                    className="mt-4 text-[.74rem] font-bold uppercase tracking-wider"
                    style={{ color: GREEN }}
                  >
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/track-record"
                className="inline-block rounded-full px-6 py-3 font-bold text-white no-underline transition hover:scale-[.98]"
                style={{ backgroundColor: GREEN }}
              >
                See the Full Track Record →
              </Link>
            </div>
          </div>
        </section>

        {/* AGENDA */}
        <section id="agenda" className="py-20 lg:py-[88px]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mx-auto mb-11 max-w-[44rem] text-center">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                The Agenda for{" "}
                <em className="not-italic" style={{ color: GREEN }}>
                  Ogun
                </em>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                Six pillars for the Gateway State, built on the progress of the
                current administration. A budget expert's plan sits behind
                every promise. Tap a pillar to expand.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {agendaItems.map((item, index) => {
                const open = openPillar === index;

                return (
                  <div
                    key={item.title}
                    className="overflow-hidden rounded-2xl border border-[#E1E8E1] bg-white transition-shadow hover:shadow-xl"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() =>
                        setOpenPillar(open ? null : index)
                      }
                      className="flex w-full items-center gap-3.5 border-0 bg-transparent p-6 text-left text-base font-extrabold text-[#064F26]"
                    >
                      <span
                        className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-lg text-white"
                        style={{ backgroundColor: GREEN }}
                      >
                        ▲
                      </span>

                      <span>{item.title}</span>

                      <svg
                        className={`ml-auto shrink-0 transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke={GREEN}
                        strokeWidth="2.5"
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>

                    <div
                      className={`grid transition-all duration-300 ${
                        open
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <ul className="list-none px-6 pb-6">
                          {item.items.map((point) => (
                            <li
                              key={point}
                              className="relative py-2 pl-7 text-[.92rem] text-[#33403a]"
                            >
                              <span
                                className="absolute left-0 top-3 h-3 w-3"
                                style={{
                                  backgroundColor: GOLD,
                                  clipPath:
                                    "polygon(50% 0,100% 100%,74% 100%,50% 45%,26% 100%,0 100%)",
                                }}
                              />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <p className="mt-7 text-center text-sm text-[#5C665F]">
              Policy summaries shown for illustration. The full costed
              manifesto is published by the campaign.
            </p>

            <div className="mt-10 text-center">
              <Link
                to="/agenda"
                className="inline-block rounded-full px-6 py-3 font-bold text-white no-underline"
                style={{ backgroundColor: GREEN }}
              >
                Explore the Full Agenda →
              </Link>

              <button
                type="button"
                onClick={() =>
                  alert("Link the published manifesto PDF here.")
                }
                className="ml-2 rounded-full border-2 px-6 py-3 font-bold"
                style={{ borderColor: GREEN, color: GREEN }}
              >
                Download Manifesto (PDF)
              </button>
            </div>
          </div>
        </section>

        {/* MOMENTUM */}
        <section
          id="momentum"
          className="relative overflow-hidden py-20 text-white lg:py-[88px] page-hero"
          style={{ backgroundColor: DEEP }}
      >
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mb-11 max-w-[44rem]">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-white">
                The Momentum Behind{" "}
                <em className="not-italic" style={{ color: GOLD }}>
                  YAYI
                </em>
              </h2>

              <p className="mt-3.5 text-white/80">
                A movement built across party structures, traditional
                institutions and communities, as reported in the national
                press.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {milestones.map((mile) => (
                <div
                  key={mile.title}
                  className="rounded-2xl border border-white/15 bg-white/[.06] p-7"
                >
                  <time
                    className="text-xs font-bold uppercase tracking-widest"
                    style={{ color: GOLD }}
                  >
                    {mile.date}
                  </time>

                  <h3 className="mb-2 mt-2 text-[1.05rem] font-extrabold text-white">
                    {mile.title}
                  </h3>

                  <p className="text-[.9rem] text-white/80">{mile.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GALLERY PREVIEW */}
        <section id="gallery" className="py-20 lg:py-[88px]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mx-auto mb-11 max-w-[44rem] text-center">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                On the{" "}
                <em className="not-italic" style={{ color: GREEN }}>
                  Ground
                </em>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                Moments from across Yewa, Egba, Ijebu and Remo: rallies,
                project commissionings, market walks and quiet conversations.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3.5 md:grid-cols-4">
              {[
                {
                  image: "/images/gallery-01.jpg",
                  title: "Town hall · Ilaro",
                },
                {
                  image: "/images/gallery-02.jpg",
                  title: "Market walk · Abeokuta",
                },
                {
                  image: "/images/gallery-03.jpg",
                  title: "Project commissioning · Ota",
                },
                {
                  image: "/images/gallery-04.jpg",
                  title: "Ojude Oba · Ijebu Ode",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="relative overflow-hidden rounded-[14px] aspect-square group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-110"
                  />

                  <div className="absolute inset-0 bg-black/35 flex items-end p-3">
                    <span className="text-xs font-semibold uppercase tracking-wide text-white">
                      {item.title}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                to="/gallery"
                className="inline-block rounded-full px-6 py-3 font-bold text-white no-underline"
                style={{ backgroundColor: GREEN }}
              >
                View the Full Gallery →
              </Link>
            </div>
          </div>
        </section>

        {/* INVOLVE */}
        <section id="involve" className="bg-[#F6F8F5] py-20 lg:py-[88px]" style={{ backgroundColor: 'var(--cream)', backgroundImage: 'var(--chev-light)' }}>
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mx-auto mb-11 max-w-[44rem] text-center">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                Join the{" "}
                <em className="not-italic" style={{ color: GREEN }}>
                  Movement
                </em>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                This campaign is powered by people, in every ward, every LGA.
                Add your hands.
              </p>
            </div>

            <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2 lg:gap-12">
              <div className="rounded-2xl border-t-[6px] bg-white p-7 shadow-xl lg:p-9" style={{ borderColor: GOLD }}>
                <h3 className="text-xl font-extrabold text-[#064F26]">
                  Volunteer with YAYI 2027
                </h3>

                <p className="mb-5 mt-1 text-sm text-[#5C665F]">
                  Tell us where you are and how you'd like to help. The
                  mobilisation team will reach out.
                </p>

                {submitted && (
                  <div
                    id="form-success"
                    className="mb-4 rounded-xl border border-green-600 bg-green-50 p-4 text-sm text-green-800"
                  >
                    ✓ Thank you! Your details have been received. The
                    mobilisation team for your LGA will contact you shortly.
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-semibold text-[#064F26]">
                      Full name
                    </label>

                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      placeholder="e.g. Adebayo Ogunleye"
                      className={`w-full rounded-[10px] border px-3.5 py-3 text-[.95rem] outline-none ${
                        errors.name
                          ? "border-red-500"
                          : "border-[#E1E8E1] focus:border-[#0B7A3B]"
                      }`}
                    />

                    {errors.name && (
                      <span className="mt-1 block text-xs text-red-600">
                        Please enter your full name.
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-semibold text-[#064F26]">
                      Phone (WhatsApp preferred)
                    </label>

                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      placeholder="e.g. 0803 123 4567"
                      className={`w-full rounded-[10px] border px-3.5 py-3 text-[.95rem] outline-none ${
                        errors.phone
                          ? "border-red-500"
                          : "border-[#E1E8E1] focus:border-[#0B7A3B]"
                      }`}
                    />

                    {errors.phone && (
                      <span className="mt-1 block text-xs text-red-600">
                        Please enter a valid Nigerian phone number.
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-semibold text-[#064F26]">
                      Local Government Area
                    </label>

                    <select
                      value={form.lga}
                      onChange={(e) =>
                        setForm({ ...form, lga: e.target.value })
                      }
                      className={`w-full rounded-[10px] border bg-white px-3.5 py-3 text-[.95rem] outline-none ${
                        errors.lga
                          ? "border-red-500"
                          : "border-[#E1E8E1] focus:border-[#0B7A3B]"
                      }`}
                    >
                      <option value="">Select your LGA</option>
                      {lgas.map((lga) => (
                        <option key={lga}>{lga}</option>
                      ))}
                    </select>

                    {errors.lga && (
                      <span className="mt-1 block text-xs text-red-600">
                        Please select your local government area.
                      </span>
                    )}
                  </div>

                  <div className="mb-4">
                    <label className="mb-1.5 block text-xs font-semibold text-[#064F26]">
                      How would you like to help?
                    </label>

                    <select
                      value={form.role}
                      onChange={(e) =>
                        setForm({ ...form, role: e.target.value })
                      }
                      className="w-full rounded-[10px] border border-[#E1E8E1] bg-white px-3.5 py-3 text-[.95rem]"
                    >
                      <option>Ward mobilisation</option>
                      <option>Youth Vanguard</option>
                      <option>Women Network</option>
                      <option>Digital & social media</option>
                      <option>Logistics & events</option>
                      <option>Polling unit agent (trained)</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full px-6 py-3 font-bold text-white"
                    style={{ backgroundColor: GREEN }}
                  >
                    Sign Up to Volunteer
                  </button>

                  <p className="mt-3.5 text-xs text-[#5C665F]">
                    Demo form: connect the submit handler to your campaign CRM
                    or a secure endpoint before launch. Personal data must be
                    handled in line with the Nigeria Data Protection Act.
                  </p>
                </form>
              </div>

              <div>
                <div className="mb-7">
                  <h3 className="mb-2 text-lg font-extrabold text-[#064F26]">
                    Why your hands matter
                  </h3>

                  <p className="text-[.94rem] text-[#5C665F]">
                    Elections in Ogun are won ward by ward, conversation by
                    conversation. Volunteers knock on doors, host neighbours,
                    share verified information and protect the vote on election
                    day.
                  </p>
                </div>

                <div className="mb-7">
                  <h3 className="mb-2 text-lg font-extrabold text-[#064F26]">
                    Support groups
                  </h3>

                  <p className="text-[.94rem] text-[#5C665F]">
                    Join the <b>YAYI Youth Vanguard</b>, the{" "}
                    <b>YAYI Women Network</b> or the{" "}
                    <b>YAYI Volunteers</b>, organised structures in all 20 LGAs
                    with training and coordination.
                  </p>
                </div>

                <div
                  className="rounded-2xl p-7 text-white"
                  style={{ backgroundColor: 'var(--deep)', backgroundImage: 'var(--chev)' }}
                >
                  <h3
                    className="mb-2 text-lg font-extrabold"
                    style={{ color: GOLD }}
                  >
                    No PVC, no voice
                  </h3>

                  <p className="text-sm text-white/85">
                    The single most important thing you can do today: confirm
                    your voter registration and collect your PVC. Visit your
                    INEC LGA office or{" "}
                    <a
                      href="https://cvr.inecnigeria.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: GOLD }}
                    >
                      cvr.inecnigeria.org
                    </a>{" "}
                    to check your status.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* BACK TO TOP */}
      {showTop && (
        <button
          type="button"
          onClick={scrollTop}
          aria-label="Back to top"
          className="fixed bottom-[22px] right-[22px] z-[90] grid h-12 w-12 place-items-center rounded-[14px] shadow-xl"
          style={{ backgroundColor: GOLD }}
        >
          <svg
            width="20"
            height="20"
            fill="none"
            stroke="#1B1B1B"
            strokeWidth="2.5"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
        </button>
      )}

      <style>{`
        @keyframes ribbon {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </div>
  );
}