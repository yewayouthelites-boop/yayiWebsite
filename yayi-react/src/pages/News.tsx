import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import MobileNav from "../components/MobileNav";
import { useEffect, useState } from "react";
import { sanityClient } from "../lib/sanity";
import { urlFor } from "../lib/image";

type Post = {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
  publishedAt: string;
  mainImage?: any;

  author?: {
    name: string;
    image?: any;
  };

  categories?: {
    title: string;
  }[];
};

export default function News() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPosts() {
      try {
        const data = await sanityClient.fetch(`
          *[_type == "post"] | order(publishedAt desc){
            _id,
            title,
            slug,
            publishedAt,
            mainImage,
            author->{
              name,
              image
            },
            categories[]->{
              title
            }
          }
        `);

        setPosts(data);
      } catch (error) {
        console.error("Failed to load posts:", error);
      } finally {
        setLoading(false);
      }
    }

    loadPosts();
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1B1B1B]">

      {/* <div className="bg-[#F4A900] px-4 py-2 text-center text-sm font-semibold">
        Official campaign website · Sen. Solomon Olamilekan Adeola (YAYI) · APC
        Candidate for Governor, Ogun State 2027
      </div> */}

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

            <Link
              to="/agenda"
              className="whitespace-nowrap font-semibold hover:text-[#0B7A3B]"
            >
              Agenda
            </Link>

            <Link to="/news" className="whitespace-nowrap font-semibold text-[#0B7A3B]">
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

        <section className="bg-[#064F26] py-[72px] text-white page-hero">

          <div className="mx-auto w-[92%] max-w-[1160px]">

            <p className="mb-4 text-sm text-white/65">
              <Link
                to="/"
                className="text-white/85 hover:text-[#F4A900]"
              >
                Home
              </Link>{" "}
              / News
            </p>


            <h1 className="max-w-4xl text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-tight">
              News, updates and{" "}
              <span className="text-[#F4A900]">
                campaign coverage
              </span>
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


        <section
          id="latest-news"
          className="bg-[#F6F8F5] py-[88px]" style={{ backgroundColor: 'var(--cream)', backgroundImage: 'var(--chev-light)' }}
        >

          <div className="mx-auto grid w-[92%] max-w-[1160px] grid-cols-1 gap-10 lg:grid-cols-[1fr_280px]">


            <div>

              <div className="mb-11 max-w-2xl">

                <h2 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-extrabold text-[#064F26]">
                  Latest from the{" "}
                  <span className="text-[#0B7A3B]">
                    campaign
                  </span>
                </h2>


                <p className="mt-3.5 text-[#5C665F]">
                  Selected stories and media features covering the movement and
                  its growing momentum.
                </p>

              </div>
                            <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">

                {loading ? (

                  <div className="col-span-full py-20 text-center">
                    <h3 className="text-xl font-bold text-[#064F26]">
                      Loading latest news...
                    </h3>
                  </div>

                ) : posts.length === 0 ? (

                  <div className="col-span-full py-20 text-center">

                    <h3 className="text-2xl font-bold text-[#064F26]">
                      No News Yet
                    </h3>

                    <p className="mt-3 text-[#5C665F]">
                      Publish your first post in Sanity Studio and it will appear here.
                    </p>

                  </div>

                ) : (

                  posts.map((post) => (

                    <article
                      key={post._id}
                      className="flex overflow-hidden rounded-2xl border border-[#E1E8E1] bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >

                      <div className="flex w-full flex-col">


                        {/* POST IMAGE */}

                        <div className="relative aspect-[16/10] overflow-hidden">

                          {post.mainImage ? (

                            <img
                              src={
                                urlFor(post.mainImage)
                                  .width(700)
                                  .height(450)
                                  .fit("crop")
                                  .auto("format")
                                  .url()
                              }
                              alt={post.title}
                              loading="lazy"
                              className="h-full w-full object-cover transition duration-500 hover:scale-105"
                            />

                          ) : (

                            <div className="flex h-full items-center justify-center bg-[#064F26]">

                              <span className="text-sm font-bold uppercase tracking-widest text-[#F4A900]">
                                YAYI 2027
                              </span>

                            </div>

                          )}

                        </div>



                        <div className="flex flex-1 flex-col p-5">


                          <time
                            dateTime={post.publishedAt}
                            className="text-xs text-[#5C665F]"
                          >

                            {new Date(post.publishedAt).toLocaleDateString(
                              "en-GB",
                              {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                              }
                            )}

                          </time>



                          <h3 className="mt-3 text-lg font-bold leading-snug text-[#064F26]">

                            {post.title}

                          </h3>



                          {post.categories?.length ? (

                            <div className="mt-3 flex flex-wrap gap-2">

                              {post.categories.map((category) => (

                                <span
                                  key={category.title}
                                  className="rounded-full bg-[#F6F8F5] px-3 py-1 text-xs font-semibold text-[#0B7A3B]"
                                >
                                  {category.title}
                                </span>

                              ))}

                            </div>

                          ) : null}




                          {/* AUTHOR */}

                          {post.author && (

                            <div className="mt-5 flex items-center gap-3">


                              {post.author.image ? (

                                <img
                                  src={
                                    urlFor(post.author.image)
                                      .width(80)
                                      .height(80)
                                      .fit("crop")
                                      .auto("format")
                                      .url()
                                  }
                                  alt={post.author.name}
                                  loading="lazy"
                                  className="h-9 w-9 rounded-full object-cover"
                                />

                              ) : (

                                <div className="grid h-9 w-9 place-items-center rounded-full bg-[#064F26] text-sm font-bold text-white">
                                  Y
                                </div>

                              )}



                              <span className="text-sm font-medium text-[#5C665F]">
                                {post.author.name}
                              </span>


                            </div>

                          )}



                          <Link
                            to={`/news/${post.slug.current}`}
                            className="mt-6 text-sm font-bold text-[#0B7A3B] transition hover:text-[#F4A900]"
                          >
                            Read Article →
                          </Link>


                        </div>

                      </div>


                    </article>

                  ))

                )}

              </div>


            </div>



            {/* SIDEBAR */}

            <aside className="self-start rounded-2xl border border-[#E1E8E1] bg-white p-6">


              <h3 className="text-lg font-extrabold text-[#064F26]">
                What's next
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
