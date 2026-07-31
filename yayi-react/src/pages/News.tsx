import { Link } from "react-router-dom";
import { sanityClient } from "../lib/sanity";

const posts = await sanityClient.fetch(`
  *[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    mainImage,
    author->{
      name
    },
    categories[]->{
      title
    }
  }
`);

const articles = [
  {
    source: "Punch",
    date: "14 April 2026",
    dateTime: "2026-04-14",
    title:
      "Abiodun, Osoba, Amosun, Daniel endorse YAYI as Ogun APC governorship candidate",
    excerpt:
      "Prominent APC leaders backed the campaign following a wave of endorsements across the state.",
    url: "https://punchng.com/abiodun-osoba-amosun-daniel-endorse-yayi-ogun-apc-gov-candidate/",
  },
  {
    source: "The Sun",
    date: "July 2026",
    dateTime: "2026-07-12",
    title:
      "Ogun 2027: Late Awujale endorsed Adeola as preferred successor, says Orimolusi",
    excerpt:
      "Community leaders and allies reaffirmed support for the campaign’s vision for Ogun State.",
    url: "https://thesun.ng/ogun-2027-late-awujale-endorsed-adeola-as-preferred-successor-to-abiodun-orimolusi/",
  },
  {
    source: "Guardian",
    date: "14 April 2026",
    dateTime: "2026-04-14",
    title:
      "“I’ll not let Ogun, APC down,” says Adeola after party endorsement",
    excerpt:
      "The campaign’s message of service and continuity was amplified by fresh party support.",
    url: "https://guardian.ng/politics/ill-not-let-ogun-apc-down-says-adeola-after-party-endorsement/",
  },
];

export default function News() {
  return (
    <div className="min-h-screen bg-white text-[#1B1B1B]">
      <div className="bg-[#F4A900] px-4 py-2 text-center text-sm font-semibold">
        Official campaign website · Sen. Solomon Olamilekan Adeola (YAYI) · APC
        Candidate for Governor, Ogun State 2027
      </div>

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

          <nav className="hidden items-center gap-6 md:flex">
            <Link to="/" className="font-semibold hover:text-[#0B7A3B]">
              Home
            </Link>
            <Link to="/about" className="font-semibold hover:text-[#0B7A3B]">
              About
            </Link>
            <Link
              to="/track-record"
              className="font-semibold hover:text-[#0B7A3B]"
            >
              Track Record
            </Link>
            <Link to="/agenda" className="font-semibold hover:text-[#0B7A3B]">
              Agenda
            </Link>
            <Link to="/news" className="font-semibold text-[#0B7A3B]">
              News
            </Link>
            <Link
              to="/gallery"
              className="font-semibold hover:text-[#0B7A3B]"
            >
              Gallery
            </Link>
            <Link
              to="/#involve"
              className="rounded-full bg-[#F4A900] px-5 py-2.5 font-bold"
            >
              Get Involved
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="bg-[#064F26] py-[72px] text-white">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <p className="mb-4 text-sm text-white/65">
              <Link to="/" className="text-white/85 hover:text-[#F4A900]">
                Home
              </Link>{" "}
              / News
            </p>

            <h1 className="max-w-4xl text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-tight">
              News, updates and{" "}
              <span className="text-[#F4A900]">campaign coverage</span>
            </h1>

            <p className="mt-4 max-w-2xl text-[1.05rem] text-white/85">
              Stay connected to the latest announcements, press features and
              public engagements shaping the movement for Ogun State.
            </p>

            <div className="mt-7 flex flex-wrap gap-3.5">
              <a
                href="#latest-news"
                className="rounded-full bg-[#F4A900] px-6 py-3 font-bold text-[#1B1B1B]"
              >
                Read the latest
              </a>

              <Link
                to="/#involve"
                className="rounded-full border-2 border-[#0B7A3B] px-6 py-3 font-bold text-white"
              >
                Join the movement
              </Link>
            </div>
          </div>
        </section>

        <section id="latest-news" className="bg-[#F6F8F5] py-[88px]">
          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">
            <div>
              <div className="mb-11 max-w-2xl">
                <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                  Latest from the{" "}
                  <span className="text-[#0B7A3B]">campaign</span>
                </h2>

                <p className="mt-3.5 text-[#5C665F]">
                  Selected stories and media features covering the movement and
                  its growing momentum.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                {articles.map((article) => (
                  <article
                    key={article.title}
                    className="flex overflow-hidden rounded-2xl border border-[#E1E8E1] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    <div className="flex w-full flex-col">
                      <div className="flex h-[120px] items-end bg-[#064F26] p-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-[#F4A900]">
                          {article.source}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <time
                          dateTime={article.dateTime}
                          className="text-xs text-[#5C665F]"
                        >
                          {article.date}
                        </time>

                        <h3 className="mt-2 text-base font-bold leading-snug text-[#064F26]">
                          {article.title}
                        </h3>

                        <p className="mt-2 text-sm text-[#5C665F]">
                          {article.excerpt}
                        </p>

                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-auto pt-5 text-sm font-bold text-[#0B7A3B] hover:text-[#F4A900]"
                        >
                          Read on {article.source.toLowerCase()} →
                        </a>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <aside className="self-start rounded-2xl border border-[#E1E8E1] bg-white p-6">
              <h3 className="text-lg font-extrabold text-[#064F26]">
                What&apos;s next
              </h3>

              <ul className="mt-4 space-y-3">
                <li>
                  <Link
                    to="/agenda"
                    className="font-semibold text-[#0B7A3B] hover:text-[#F4A900]"
                  >
                    Read the policy agenda
                  </Link>
                </li>

                <li>
                  <Link
                    to="/#involve"
                    className="font-semibold text-[#0B7A3B] hover:text-[#F4A900]"
                  >
                    Volunteer for the campaign
                  </Link>
                </li>

                <li>
                  <Link
                    to="/gallery"
                    className="font-semibold text-[#0B7A3B] hover:text-[#F4A900]"
                  >
                    View campaign moments
                  </Link>
                </li>
              </ul>
            </aside>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-[#04371B] text-white/80">
      <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-10 py-16 md:grid-cols-3 lg:grid-cols-4">
        <div>
          <Link to="/" className="text-2xl font-black text-white">
            YAYI <span className="text-[#F4A900]">2027</span>
          </Link>

          <p className="mt-3 max-w-xs text-sm">
            Forward Together, Ogun. The official campaign of Sen. Solomon
            Olamilekan Adeola for Governor of Ogun State, 2027.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#F4A900]">
            Campaign
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about">About YAYI</Link></li>
            <li><Link to="/track-record">Track Record</Link></li>
            <li><Link to="/agenda">Agenda for Ogun</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#F4A900]">
            Take Action
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/#involve">Volunteer</Link></li>
            <li>
              <a href="https://cvr.inecnigeria.org">Check your PVC</a>
            </li>
            <li>
              <a href="https://yayiadeola.com.ng">Senator&apos;s official site</a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#F4A900]">
            Contact
          </h4>
          <p className="text-sm">
            Senator Solomon Adeola Crescent,
            <br />
            Ilaro, Ogun State
          </p>
          <p className="mt-2 text-sm">aremoyayiadeola@gmail.com</p>
          <p className="mt-1 text-sm">+234 813 933 8112</p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex w-[92%] max-w-[1160px] flex-wrap justify-between gap-3 py-5 text-xs text-white/60">
          <span>© 2026 YAYI 2027 Campaign Organisation. All rights reserved.</span>
          <span>Not an INEC website.</span>
        </div>
      </div>
    </footer>
  );
}