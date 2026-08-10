import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";

const pillars = [
  {
    number: "1",
    title: "Education & Human Capital",
    goal: "every Ogun child in a classroom that works, taught by a teacher who is trained, paid and proud, with a clear path from school to skill to work.",
    points: [
      "Statewide school rehabilitation programme (classrooms, furniture, water and sanitation), starting with the most dilapidated schools in each LGA.",
      "Recruit and train teachers to close staffing gaps, with rural-posting incentives so village schools are not left behind.",
      "Scale the scholarship and bursary model proven in Ogun West to a statewide scheme for indigent and high-performing students.",
      "Equip technical colleges and link them to apprenticeships with industries in the Agbara, Ota and Sagamu corridors.",
      "ICT centres and digital literacy programmes in every constituency, building on centres already delivered in Ogun West.",
    ],
    funding:
      "Blend of state budget prioritisation, UBEC counterpart funds fully drawn down, and private-sector adopt-a-school partnerships. Measured by: enrolment, transition rates and WAEC performance, published annually.",
  },
  {
    number: "2",
    title: "Infrastructure & Transport",
    goal: "complete and connect. Finish what has been started, then link every farm, factory and border town to markets.",
    points: [
      '"Complete-First" policy: audit and finish ongoing state road projects before commissioning new ones.',
      "Rural access roads programme so farm produce moves from Imeko Afon, Ipokia and Ogun Waterside to urban markets.",
      "Extend the solar streetlight and motorised borehole model delivered across Ogun West to underserved communities statewide.",
      "Partner with the Federal Government on rail, housing and the Gateway agro-cargo airport to multiply state investment.",
      "Transformer and rural electrification programme, building on the 100+ communities already connected in Ogun West.",
    ],
    funding:
      "State capital budget with strict project-completion gates, federal partnership facilitation (the Appropriations advantage), and PPP concessions for commercial corridors. Measured by: km of road completed and communities electrified, published quarterly.",
  },
  {
    number: "3",
    title: "Jobs, SMEs & Industry",
    goal: "make Ogun Nigeria's easiest state to open and run a business, and make sure the jobs created reach Ogun's young people.",
    points: [
      "One-stop investment desk with time-bound approvals for factories and warehouses in the state's industrial clusters.",
      "Single-digit micro-credit scheme for market women, artisans and small business owners, modelled on the Ogun West empowerment programme.",
      "Modern market infrastructure statewide, extending the Agbara and Igbesa ultramodern market model.",
      "A Youth Employment Compact: industries siting in Ogun commit to local hiring and apprenticeship quotas.",
      "Harness the border economy: trade facilitation at Idiroko and the Ipokia axis, turning geography into prosperity.",
    ],
    funding:
      "Regulatory reform costs little, it takes will. Credit schemes funded via state counterpart with BOI/DBN windows. Measured by: business registrations, jobs reported by cluster industries, loans disbursed and repaid.",
  },
  {
    number: "4",
    title: "Agriculture & Food Security",
    goal: "Ogun's harvest packaged, processed and sold, not just planted, with farmers earning more from every hectare.",
    points: [
      "Inputs programme at scale: improved seeds, seedlings, fertilisers and pesticides, extending the model that has already supported thousands of Ogun West farmers.",
      "Mechanisation access: tractors, ploughs and water pumps available through cooperatives, not connections.",
      "Agro-processing zones near production belts so value is added inside Ogun State.",
      "Storage and aggregation centres to cut post-harvest losses.",
      "Farmer–herder peace frameworks with traditional rulers and security agencies to protect lives and livelihoods.",
    ],
    funding:
      "State budget plus CBN/federal agriculture windows and development-partner programmes. Measured by: tonnage processed in-state, farmer incomes surveyed, verified reduction in farm-related conflict incidents.",
  },
  {
    number: "5",
    title: "Health & Social Welfare",
    goal: "a functional primary health centre within reach of every ward, and no family pushed into poverty by a hospital bill.",
    points: [
      "PHC revitalisation (staffing, equipment, drugs and power), building on health centres already built and renovated across Ogun West.",
      "Expand state health insurance enrolment aggressively into the informal sector: traders, artisans, farmers.",
      "Maternal and child health as a published, measured priority with dedicated budget lines.",
      "Free medical outreach missions institutionalised as a rolling statewide programme.",
      "Social register for vulnerable and elderly residents, connected to targeted support programmes.",
    ],
    funding:
      "Basic Health Care Provision Fund fully accessed, state counterpart funding protected in the budget, and health-partner programmes. Measured by: PHC functionality audits, insurance enrolment numbers, maternal-health outcomes.",
  },
  {
    number: "6",
    title: "Security & Community",
    goal: "safe towns, secure borders and communities that trust the people protecting them.",
    points: [
      "Better-equipped community policing in partnership with traditional institutions and the Amotekun corps.",
      "Border-community security investment for the Yewa and Ipokia axis, extending the Idiroko police station model.",
      "Streetlighting and safe-town programmes in urban centres, proven to cut night-time crime.",
      "Youth engagement programmes as prevention: sport, skills and enterprise instead of recruitment into crime.",
      "Emergency response coordination centre with functional lines for every LGA.",
    ],
    funding:
      "State security trust fund with transparent reporting, federal security partnership, and community co-design of priorities. Measured by: response times, incident data trends, community-confidence surveys.",
  },
];

const accountabilityPoints = [
  "Publish the state budget and quarterly performance reports in plain language, every quarter, without fail.",
  "Open contracting: major project awards published with contractor, cost and completion dates.",
  "Grow internally generated revenue without punishing small traders. The Lagos IRS playbook, done fairly.",
  "A citizens' feedback channel in every LGA that reports directly to the Governor's delivery unit.",
];

export default function Agenda() {
  return (
    <div className="min-h-screen bg-white text-[#1B1B1B]">
      {/* <div className="bg-[#F4A900] px-4 py-2 text-center text-sm font-semibold">
        Official campaign website · Sen. Solomon Olamilekan Adeola (YAYI) · APC
        Candidate for Governor, Ogun State 2027
      </div> */}

      <header className="sticky top-0 z-50 border-b border-[#E1E8E1] bg-white/95 backdrop-blur">
        <div className="mx-auto flex w-[92%] max-w-[1160px] items-center justify-between py-3.5">
          <Link to="/" className="flex items-center gap-2.5 no-underline">
            <span className="grid h-11 w-11 place-items-center rounded-[22%] bg-[#0B7A3B] text-2xl font-black text-white">
              Y
            </span>
            <span className="text-[1.35rem] font-black text-[#064F26]">
              YAYI <span className="text-[#0B7A3B]">2027</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            <Link to="/" className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]">
              Home
            </Link>
            <Link to="/about" className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]">
              About
            </Link>
            <Link
              to="/track-record"
              className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]"
            >
              Track Record
            </Link>
            <Link to="/agenda" className="whitespace-nowrap font-semibold text-[#0B7A3B]">
              Agenda
            </Link>
            <Link to="/news" className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]">
              News
            </Link>
            <Link
              to="/gallery"
              className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]"
            >
              Gallery
            </Link>
            <Link
              to="/#involve"
              className="shrink-0 whitespace-nowrap rounded-full bg-[#F4A900] px-5 py-2.5 font-bold"
            >
              Get Involved
            </Link>
          </nav>

          <MobileNav />
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden bg-[#064F26] py-[72px] text-white page-hero">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <p className="mb-4 text-sm text-white/65">
              <Link to="/" className="text-white/85 hover:text-[#F4A900]">
                Home
              </Link>{" "}
              / Agenda
            </p>

            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-tight">
              The Agenda for <span className="text-[#F4A900]">Ogun</span>
            </h1>

            <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-white/85">
              Six pillars for the Gateway State: built on continuity with the
              progress of the current administration, costed with an
              Appropriations Chairman&apos;s discipline, and delivered ward by
              ward. Every commitment below comes with how we will fund it and
              how you will measure us.
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href="#pillar-1"
                className="rounded-full bg-[#F4A900] px-6 py-3 font-bold text-[#1B1B1B]"
              >
                Start Reading
              </a>

              <button
                type="button"
                onClick={() => alert("Link the published manifesto PDF here.")}
                className="rounded-full border-2 border-white/60 px-6 py-3 font-bold"
              >
                Download Full Manifesto (PDF)
              </button>
            </div>
          </div>
        </section>

        <section className="py-8 md:py-14">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            {pillars.map((pillar, index) => (
              <article
                key={pillar.number}
                id={`pillar-${pillar.number}`}
                className="grid grid-cols-1 gap-5 border-b border-[#E1E8E1] py-11 md:grid-cols-[64px_1fr] md:gap-6"
              >
                <div
                  className={`grid h-16 w-16 place-items-center rounded-[18px] text-xl font-black ${
                    index % 2 === 1
                      ? "bg-[#F4A900] text-[#1B1B1B]"
                      : "bg-[#0B7A3B] text-white"
                  }`}
                >
                  ▲
                </div>

                <div>
                  <h2 className="text-2xl font-extrabold text-[#064F26]">
                    {pillar.number} · {pillar.title}
                  </h2>

                  <p className="mt-2 max-w-3xl text-[#5C665F]">
                    <strong>The goal:</strong> {pillar.goal}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-[1.2fr_.8fr]">
                    <ul className="space-y-2">
                      {pillar.points.map((point) => (
                        <li
                          key={point}
                          className="relative pl-7 text-[#33403a]"
                        >
                          <span className="absolute left-0 top-2 text-[#F4A900]">
                            ◆
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>

                    <div className="self-start rounded-[14px] bg-[#F6F8F5] p-5 text-sm text-[#33403a]">
                      <strong className="mb-2 block text-xs uppercase tracking-widest text-[#0B7A3B]">
                        Delivery & funding
                      </strong>
                      {pillar.funding}
                    </div>
                  </div>
                </div>
              </article>
            ))}

            <article className="grid grid-cols-1 gap-5 border-t border-[#E1E8E1] py-11 md:grid-cols-[64px_1fr] md:gap-6">
              <div className="grid h-16 w-16 place-items-center rounded-[18px] bg-[#064F26] text-xl font-black text-white">
                ✓
              </div>

              <div>
                <h2 className="text-2xl font-extrabold text-[#064F26]">
                  How We Will Govern: The Accountability Promise
                </h2>

                <p className="mt-2 text-[#5C665F]">
                  Underpinning all six pillars: the discipline of a chartered
                  accountant applied to Ogun&apos;s treasury.
                </p>

                <div className="mt-6 grid grid-cols-1 gap-7 lg:grid-cols-[1.2fr_.8fr]">
                  <ul className="space-y-2">
                    {accountabilityPoints.map((point) => (
                      <li
                        key={point}
                        className="relative pl-7 text-[#33403a]"
                      >
                        <span className="absolute left-0 top-2 text-[#F4A900]">
                          ◆
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="rounded-[14px] bg-[#F6F8F5] p-5 text-sm text-[#33403a]">
                    <strong className="mb-2 block text-xs uppercase tracking-widest text-[#0B7A3B]">
                      The standard
                    </strong>
                    &quot;If we cannot show you the receipt, we have not done
                    the work.&quot; Every commitment on this page will have a
                    named owner, a budget line and a public deadline in the
                    first 100 days.
                  </div>
                </div>
              </div>
            </article>

            <p className="mx-auto mb-8 max-w-3xl text-center text-sm text-[#5C665F]">
              Policy positions summarised here for the campaign website; the
              authoritative, fully costed programme is the published manifesto
              document.
            </p>

            <div className="flex flex-wrap items-center justify-between gap-6 rounded-2xl bg-[#0B7A3B] p-8 text-white md:p-11" style={{ backgroundColor: 'var(--deep)', backgroundImage: 'var(--chev)' }}>
              <div>
                <h2 className="text-2xl font-extrabold">
                  An agenda is only as strong as the people behind it.
                </h2>
                <p className="mt-1 text-white/85">
                  Join the movement carrying this plan to every ward in Ogun
                  State.
                </p>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <Link
                  to="/#involve"
                  className="rounded-full bg-[#F4A900] px-6 py-3 font-bold text-[#1B1B1B]"
                >
                  Volunteer Now
                </Link>

                <Link
                  to="/track-record"
                  className="rounded-full border-2 border-white/60 px-6 py-3 font-bold text-white"
                >
                  See the Track Record
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
