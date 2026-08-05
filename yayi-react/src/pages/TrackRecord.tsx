import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import { Link } from "react-router-dom";

const stats = [
  {
    target: 250,
    suffix: "+",
    label: "Constituency projects delivered in Ogun West",
  },
  {
    target: 40,
    suffix: "k+",
    label: "Beneficiaries of the Mega Empowerment Programme",
  },
  {
    target: 5,
    suffix: "k+",
    label: "Students on bursaries & scholarships",
  },
  {
    target: 100,
    suffix: "+",
    label: "Communities given electricity transformers",
  },
  {
    target: 53,
    suffix: "",
    label: "New mega-projects commissioned in 2026 alone",
  },
];

const legislativeRecords = [
  {
    period: "2003–2011 · Lagos State House of Assembly",
    title: "Member, Alimosho Constituency II",
    text: (
      <>
        Two terms in the Lagos Assembly, where he was instrumental in the tax
        administration reforms that grew Lagos IRS monthly collections from{" "}
        <strong>₦5 billion to ₦20 billion</strong>, the fiscal foundation of
        modern Lagos. Chaired and served on key finance-related committees.
      </>
    ),
  },
  {
    period: "2011–2015 · House of Representatives",
    title: "Chairman, Public Accounts Committee",
    text: (
      <>
        Appointed chairman of the House&apos;s only constitutionally-mandated
        committee <strong>as a first-term member</strong>, an early recognition
        of his accountancy expertise, leading the scrutiny of the
        Auditor-General&apos;s reports on federal spending.
      </>
    ),
  },
  {
    period: "2015–2023 · Senate, Lagos West",
    title: "Chairman, Senate Committee on Finance",
    text: (
      <>
        Two terms representing Nigeria&apos;s largest senatorial district by
        population. As Finance Chairman, he steered revenue frameworks, finance
        bills and the fiscal assumptions behind national budgets. Re-elected in
        2019 with a renewed mandate.
      </>
    ),
  },
  {
    period: "2023–Present · Senate, Ogun West",
    title: "Chairman, Senate Committee on Appropriations",
    text: (
      <>
        Now chairs the committee through which <strong>every naira of the
        federal budget</strong> passes, the bridge between the executive&apos;s
        proposals and the legislature&apos;s power of the purse. Honoured as
        Commander of the Order of the Niger (CON).
      </>
    ),
  },
];

const sectors = [
  {
    title: "Education",
    intro:
      "Classrooms built and renovated, school furniture supplied, libraries and ICT centres established across the district, paired with human investment: over 5,000 students supported with bursaries and scholarships.",
    tags: [
      "Classroom blocks",
      "Libraries",
      "ICT centres",
      "5,000+ scholarships & bursaries",
      "Digital literacy programmes",
    ],
  },
  {
    title: "Health",
    intro:
      "Primary healthcare facilities constructed and renovated across the five LGAs, bringing care closer to rural and border communities, alongside recurring free medical outreach programmes.",
    tags: [
      "Primary health centres",
      "Facility renovations",
      "Medical outreach missions",
    ],
  },
  {
    title: "Water, Power & Light",
    intro:
      "Motorised and solar-powered boreholes bringing clean water to rural hubs; solar streetlights across rural and semi-urban communities; and electricity transformers supplied to over 100 communities to improve power supply.",
    tags: [
      "Motorised boreholes",
      "Solar boreholes",
      "Solar streetlights",
      "100+ community transformers",
      "Rural electrification",
    ],
  },
  {
    title: "Roads, Markets & Commerce",
    intro:
      "Strategic construction and rehabilitation of road networks to move farm produce to urban markets, plus modern market infrastructure, including the landmark Agbara and Igbesa ultramodern markets designed to boost cross-border commerce.",
    tags: [
      "Road construction & rehab",
      "Farm-to-market access roads",
      "Agbara Ultramodern Market",
      "Igbesa Ultramodern Market",
      "Modern market facilities district-wide",
    ],
  },
  {
    title: "Agriculture",
    intro:
      "A comprehensive farm-support programme: tractors, ploughs, tricycles and water pumps; improved seeds, stems, seedlings, fertilisers and pesticides; plus direct cash grants reported at ₦100,000 each to 5,000 farmers.",
    tags: [
      "Tractors & ploughs",
      "Improved inputs",
      "Water pumps",
      "₦100k grants × 5,000 farmers",
      "Tricycles for agro-logistics",
    ],
  },
  {
    title: "Security & Border Communities",
    intro:
      "Investment in the security of Ogun's border axis, including the construction of the Idiroko Police Station to strengthen border security in Ipokia, alongside streetlighting that makes communities safer after dark.",
    tags: [
      "Idiroko Police Station",
      "Border-community security",
      "Safe-streets lighting",
    ],
  },
  {
    title: "Empowerment & Human Capital",
    intro:
      "The flagship Mega Empowerment Programme has directly benefitted over 40,000 constituents (some reports count beyond 50,000), cutting across students, farmers, traders, artisans and the elderly: training first, then grants and equipment so beneficiaries become economically independent.",
    tags: [
      "40,000+ direct beneficiaries",
      "Skills acquisition, youth & women",
      "Grants & start-up equipment",
      "Support for market women & artisans",
      "Care for the elderly",
    ],
  },
];

function AnimatedNumber({
  target,
  suffix,
}: {
  target: number;
  suffix: string;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 1200;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const progress = Math.min(
        (currentTime - startTime) / duration,
        1
      );

      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(target * eased);

      setValue(start);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return (
    <>
      {value}
      <span className="text-[0.6em] text-[#F4A900]">{suffix}</span>
    </>
  );
}

export default function TrackRecord() {
  return (
    <div className="min-h-screen bg-white text-[#1B1B1B]">
      {/* Announcement */}
      <div className="bg-[#F4A900] px-4 py-2 text-center text-sm font-semibold">
        Official campaign website · Sen. Solomon Olamilekan Adeola (YAYI) · APC
        Candidate for Governor of Ogun State 2027
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[#E1E8E1] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-2.5">
            <span className="grid h-11 w-11 place-items-center rounded-[22%] bg-[#0B7A3B] text-2xl font-black text-white">
              Y
            </span>

            <span className="text-[1.35rem] font-black text-[#064F26]">
              YAYI <span className="text-[#0B7A3B]">2027</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/#about" className="font-semibold hover:text-[#0B7A3B]">
              About
            </Link>

            <Link
              to="/track-record"
              className="border-b-2 border-[#F4A900] font-semibold text-[#0B7A3B]"
            >
              Track Record
            </Link>

            <Link to="/agenda" className="font-semibold hover:text-[#0B7A3B]">
              Agenda
            </Link>

            <Link to="/#momentum" className="font-semibold hover:text-[#0B7A3B]">
              Momentum
            </Link>

            <Link to="/news" className="font-semibold hover:text-[#0B7A3B]">
              News
            </Link>

            <Link to="/gallery" className="font-semibold hover:text-[#0B7A3B]">
              Gallery
            </Link>

            <Link
              to="/#involve"
              className="rounded-full bg-[#F4A900] px-5 py-2.5 font-bold"
            >
              Get Involved
            </Link>
          </nav>

          <MobileNav />
        </div>
      </header>

      <main>
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#064F26] py-[72px] text-white">
          <div className="relative z-10 mx-auto w-[92%] max-w-[1160px]">
            <p className="mb-4 text-sm text-white/65">
              <Link to="/" className="text-white/85 hover:text-[#F4A900]">
                Home
              </Link>{" "}
              / Track Record
            </p>

            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-tight">
              The Track <span className="text-[#F4A900]">Record</span>
            </h1>

            <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-white/85">
              &quot;Performance is the ultimate currency.&quot; Twenty-plus
              years of legislative service and three years of unprecedented
              delivery in Ogun West, documented here sector by sector, with
              sources. Not promises. Receipts.
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href="#legislative"
                className="rounded-full bg-[#F4A900] px-6 py-3 font-bold text-[#1B1B1B]"
              >
                Legislative Record
              </a>

              <a
                href="#constituency"
                className="rounded-full border-2 border-white/60 px-6 py-3 font-bold text-white"
              >
                Constituency Delivery
              </a>
            </div>
          </div>
        </section>

        {/* Statistics */}
        <section className="bg-[#0B7A3B] py-8 text-white">
          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {stats.map((stat) => (
              <div key={stat.label}>
                <strong className="block text-[clamp(1.7rem,3vw,2.4rem)] font-black">
                  <AnimatedNumber
                    target={stat.target}
                    suffix={stat.suffix}
                  />
                </strong>

                <span className="text-sm text-white/85">{stat.label}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Legislative */}
        <section id="legislative" className="py-[88px]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mb-11 max-w-2xl">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight text-[#064F26]">
                The Legislative <span className="text-[#0B7A3B]">Record</span>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                Six consecutive election victories across two states, and a
                career spent in the rooms where Nigeria&apos;s money is watched,
                raised and shared.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-[22px] md:grid-cols-2">
              {legislativeRecords.map((record) => (
                <article
                  key={record.period}
                  className="rounded-2xl border border-[#E1E8E1] bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0B7A3B]">
                    {record.period}
                  </span>

                  <h3 className="mt-3 text-lg font-extrabold text-[#064F26]">
                    {record.title}
                  </h3>

                  <p className="mt-3 text-[0.93rem] leading-relaxed text-[#5C665F]">
                    {record.text}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Constituency Delivery */}
        <section id="constituency" className="bg-[#F6F8F5] py-[88px]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mb-11 max-w-3xl">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight text-[#064F26]">
                Constituency Delivery:{" "}
                <span className="text-[#0B7A3B]">Ogun West &amp; Beyond</span>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                In under three years as Senator for Ogun West, press reports
                document over 250 projects across the five LGAs, Ado-Odo/Ota,
                Imeko Afon, Ipokia, Yewa North and Yewa South, described by
                party leaders as unprecedented in the state&apos;s history.
              </p>
            </div>

            <div>
              {sectors.map((sector) => (
                <article
                  key={sector.title}
                  className="border-b border-[#E1E8E1] py-10 last:border-b-0"
                >
                  <div className="mb-5 flex items-center gap-4">
                    <div className="grid h-[52px] w-[52px] shrink-0 place-items-center rounded-[14px] bg-[#FFF3D6] text-[#0B7A3B]">
                      <span className="text-xl">◆</span>
                    </div>

                    <h2 className="text-[1.35rem] font-extrabold text-[#064F26]">
                      {sector.title}
                    </h2>
                  </div>

                  <p className="max-w-4xl text-[0.96rem] text-[#5C665F]">
                    {sector.intro}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {sector.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[#EAF3EE] px-3 py-1.5 text-xs font-semibold text-[#064F26]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Beyond Ogun West */}
        <section className="py-[88px]">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="mb-11 max-w-3xl">
              <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold leading-tight text-[#064F26]">
                Beyond Ogun West:{" "}
                <span className="text-[#0B7A3B]">A Statewide Signal</span>
              </h2>

              <p className="mt-3.5 text-[#5C665F]">
                In June 2026, on his third Senate anniversary, 53 new
                mega-projects were commissioned: 43 across Ogun West&apos;s
                five LGAs, and 10 deliberately extended to Ogun Central and
                Ogun East.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-[22px] md:grid-cols-3">
              <article className="rounded-2xl border border-[#E1E8E1] bg-white p-7 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B7A3B]">
                  Ogun West · 43 projects
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#064F26]">
                  Deep Infrastructure
                </h3>
                <p className="mt-3 text-sm text-[#5C665F]">
                  Focused on socio-economic revival and eradicating
                  long-standing infrastructural deficits in border
                  communities, roads, markets, water, power and security
                  assets.
                </p>
              </article>

              <article className="rounded-2xl border border-[#E1E8E1] bg-white p-7 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B7A3B]">
                  Ogun Central
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#064F26]">
                  Urban Renewal &amp; Youth
                </h3>
                <p className="mt-3 text-sm text-[#5C665F]">
                  Projects centred on urban renewal and youth empowerment,
                  boosting local commerce and providing technology tools for
                  the next generation.
                </p>
              </article>

              <article className="rounded-2xl border border-[#E1E8E1] bg-white p-7 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0B7A3B]">
                  Ogun East
                </span>
                <h3 className="mt-3 text-lg font-extrabold text-[#064F26]">
                  Rural Essentials
                </h3>
                <p className="mt-3 text-sm text-[#5C665F]">
                  Rural electrification, solar boreholes and clean water
                  access, electricity transformers to boost power supply, and
                  renovated health facilities.
                </p>
              </article>
            </div>

            <p className="mt-7 max-w-4xl text-[0.95rem] text-[#5C665F]">
              Extending delivery into all three senatorial districts before a
              single vote is cast is the campaign&apos;s clearest statement:{" "}
              <strong className="text-[#064F26]">
                what was done for Ogun West is the model for all of Ogun State.
              </strong>
            </p>
          </div>
        </section>

        {/* Sources + CTA */}
        <section className="bg-[#F6F8F5] py-14">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="rounded-2xl bg-white p-7 text-sm text-[#5C665F]">
              <h3 className="mb-3 text-xs font-extrabold uppercase tracking-widest text-[#064F26]">
                Sources · as reported in the press
              </h3>

              <ul className="list-inside list-disc space-y-2">
                <li>
                  Punch Newspapers, &quot;How YAYI is turning projects into
                  political capital&quot; (project commissioning across the
                  five Ogun West LGAs).
                </li>
                <li>
                  Platform Times, &quot;Senator Adeola executes over 250
                  projects, empowers 40,000 in Ogun West&quot; (project and
                  beneficiary counts as stated by the Ogun West Initiative).
                </li>
                <li>
                  ThisDay, &quot;Yayi: Born in Lagos, made by hard work,
                  crowned by consensus&quot; (boreholes, solar streetlights,
                  farm-to-market roads; legislative career).
                </li>
                <li>
                  TG News, &quot;Three years, 53 milestones&quot; (53
                  mega-projects, Idiroko Police Station, Agbara &amp; Igbesa
                  markets, transformers to 100+ communities).
                </li>
                <li>
                  Guardian / ThisDay opinion coverage, empowerment programme
                  scope, agriculture support and scholarship schemes.
                </li>
              </ul>

              <p className="mt-3">
                Figures are as reported by the cited publications and
                campaign-aligned groups; the campaign maintains the verified
                project register.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-between gap-7 rounded-2xl bg-[#0B7A3B] p-8 text-white md:p-11">
              <div>
                <h2 className="text-2xl font-extrabold">
                  The record is the argument.
                </h2>
                <p className="mt-1 text-sm text-white/85">
                  Now read the plan it makes possible: the six-pillar Agenda
                  for Ogun.
                </p>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <Link
                  to="/agenda"
                  className="rounded-full bg-[#F4A900] px-6 py-3 font-bold text-[#1B1B1B]"
                >
                  Read the Agenda
                </Link>

                <Link
                  to="/#involve"
                  className="rounded-full border-2 border-white/60 px-6 py-3 font-bold text-white"
                >
                  Join the Movement
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}