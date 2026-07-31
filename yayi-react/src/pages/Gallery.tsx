import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type GalleryCategory =
  | "all"
  | "events"
  | "projects"
  | "community"
  | "leaders";

type GalleryItem = {
  id: number;
  category: Exclude<GalleryCategory, "all">;
  title: string;
  image: string;
};

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "events",
    title: "Campaign flag-off rally, Abeokuta",
    image: "/images/gallery-01.jpg",
  },
  {
    id: 2,
    category: "leaders",
    title: "Visit to the Olusegun Obasanjo Presidential Library",
    image: "/images/gallery-02.jpg",
  },
  {
    id: 3,
    category: "events",
    title: "Ojude Oba festival, Ijebu Ode",
    image: "/images/gallery-03.jpg",
  },
  {
    id: 4,
    category: "projects",
    title: "Commissioning a motorised borehole, Yewa North",
    image: "/images/gallery-04.jpg",
  },
  {
    id: 5,
    category: "projects",
    title: "Agbara Ultramodern Market",
    image: "/images/gallery-05.jpg",
  },
  {
    id: 6,
    category: "community",
    title: "Market walk, Kuto, Abeokuta",
    image: "/images/gallery-06.jpg",
  },
  {
    id: 7,
    category: "community",
    title: "Town hall meeting, Ilaro",
    image: "/images/gallery-07.jpg",
  },
  {
    id: 8,
    category: "leaders",
    title: "With the Ijebu Traditional Council",
    image: "/images/gallery-08.jpg",
  },
  {
    id: 9,
    category: "projects",
    title: "Renovated classroom block handover",
    image: "/images/gallery-09.jpg",
  },
  {
    id: 10,
    category: "events",
    title: "Mega Empowerment Programme, Ota",
    image: "/images/gallery-10.jpg",
  },
  {
    id: 11,
    category: "community",
    title: "Farmers' forum, Imeko Afon",
    image: "/images/gallery-11.jpg",
  },
  {
    id: 12,
    category: "leaders",
    title: "APC caucus, consensus announcement",
    image: "/images/gallery-12.jpg",
  },
];

const filters: {
  label: string;
  value: GalleryCategory;
}[] = [
  { label: "All", value: "all" },
  { label: "Rallies & Events", value: "events" },
  { label: "Projects", value: "projects" },
  { label: "Community", value: "community" },
  { label: "With Leaders", value: "leaders" },
];

export default function Gallery() {
  const [filter, setFilter] = useState<GalleryCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const filteredItems =
    filter === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter);

  const selectedItem =
    selectedIndex !== null ? filteredItems[selectedIndex] : null;

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setSelectedIndex(null);
    document.body.style.overflow = "";
  };

  const previousImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === 0
        ? filteredItems.length - 1
        : selectedIndex - 1
    );
  };

  const nextImage = () => {
    if (selectedIndex === null) return;

    setSelectedIndex(
      selectedIndex === filteredItems.length - 1
        ? 0
        : selectedIndex + 1
    );
  };

  useEffect(() => {
    const handleKeyboard = (event: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (event.key === "Escape") {
        closeLightbox();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
      document.body.style.overflow = "";
    };
  }, [selectedIndex, filteredItems.length]);

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
              className="font-semibold hover:text-[#0B7A3B]"
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

            <Link
              to="/gallery"
              className="border-b-2 border-[#F4A900] font-semibold text-[#0B7A3B]"
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
        {/* Hero */}
        <section className="relative overflow-hidden bg-[#064F26] py-[72px] text-white">
          <div className="relative z-10 mx-auto w-[92%] max-w-[1160px]">
            <p className="mb-4 text-sm text-white/65">
              <Link to="/" className="text-white/85 hover:text-[#F4A900]">
                Home
              </Link>{" "}
              / Gallery
            </p>

            <h1 className="text-[clamp(2.1rem,4.6vw,3.4rem)] font-black leading-tight">
              On the <span className="text-[#F4A900]">Ground</span>
            </h1>

            <p className="mt-4 max-w-3xl text-[1.05rem] leading-relaxed text-white/85">
              Moments from across Yewa, Egba, Ijebu and Remo: rallies, project
              commissionings, market walks and quiet conversations. This is
              what the movement looks like.
            </p>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-14 md:py-20">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            {/* Filters */}
            <div
              className="mb-9 flex flex-wrap justify-center gap-2.5"
              role="tablist"
              aria-label="Filter gallery"
            >
              {filters.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    setFilter(item.value);
                    setSelectedIndex(null);
                  }}
                  className={`rounded-full border-[1.5px] px-5 py-2.5 text-sm font-bold transition ${
                    filter === item.value
                      ? "border-[#0B7A3B] bg-[#0B7A3B] text-white"
                      : "border-[#E1E8E1] bg-white text-[#064F26] hover:border-[#0B7A3B] hover:text-[#0B7A3B]"
                  }`}
                  aria-selected={filter === item.value}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-3">
              {filteredItems.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => openLightbox(index)}
                  className="group relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F6F8F5] text-left"
                  aria-label={`View photo: ${item.title}`}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Placeholder */}
                  <div className="absolute inset-0 -z-0 flex flex-col items-center justify-center gap-3 bg-[#0B7A3B] p-5 text-center text-white">
                    <div className="grid h-12 w-12 place-items-center rounded-[14px] bg-white/15 text-xl">
                      📷
                    </div>

                    <span className="text-sm font-semibold">
                      {item.title}
                    </span>

                    <span className="text-[10px] uppercase tracking-wider text-white/65">
                      Add images/gallery-{String(item.id).padStart(2, "0")}.jpg
                    </span>
                  </div>

                  {/* Image */}
                  <img
                    src={item.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="absolute inset-0 z-10 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    onError={(event) => {
                      event.currentTarget.style.display = "none";
                    }}
                  />

                  {/* Caption */}
                  <span className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[#04371B] to-transparent px-4 pb-4 pt-12 text-sm font-semibold text-white opacity-0 transition group-hover:opacity-100">
                    {item.title}
                  </span>
                </button>
              ))}
            </div>

            <p className="mt-7 text-center text-xs text-[#5C665F]">
              Tiles showing the camera icon are placeholders. Drop your photos
              into an <strong>images</strong> folder using the filenames shown
              and they will appear automatically. Use only photos the campaign
              owns or has permission to publish.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#F6F8F5] py-14">
          <div className="mx-auto w-[92%] max-w-[1160px]">
            <div className="flex flex-wrap items-center justify-between gap-7 rounded-2xl bg-[#0B7A3B] p-8 text-white md:p-11">
              <div>
                <h2 className="text-2xl font-extrabold">
                  Be in the next photo.
                </h2>

                <p className="mt-1 text-sm text-white/85">
                  Rallies, outreach days and town halls are happening across
                  all 20 LGAs.
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
                  to="/news"
                  className="rounded-full border-2 border-white/60 px-6 py-3 font-bold text-white"
                >
                  Campaign News
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Lightbox */}
      {selectedItem && selectedIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center bg-[#04371B]/95 p-5"
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-5 top-5 z-20 grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-2xl text-white transition hover:bg-[#F4A900] hover:text-[#1B1B1B]"
            aria-label="Close viewer"
          >
            ×
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              previousImage();
            }}
            className="absolute left-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-xl bg-white/10 text-3xl text-white transition hover:bg-[#F4A900] hover:text-[#1B1B1B] md:left-7"
            aria-label="Previous photo"
          >
            ‹
          </button>

          <div
            className="w-full max-w-[1000px]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex aspect-[4/3] w-full items-center justify-center overflow-hidden rounded-2xl bg-[#0B7A3B]">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="h-full w-full object-contain"
                onError={(event) => {
                  event.currentTarget.style.display = "none";
                }}
              />

              <div className="absolute px-8 text-center text-white">
                <div className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-white/10 text-2xl">
                  📷
                </div>

                <p className="text-sm">
                  Add this image to display it here:
                </p>

                <p className="mt-1 text-xs text-white/60">
                  {selectedItem.image}
                </p>
              </div>
            </div>

            <p className="mt-4 text-center text-base font-semibold text-white">
              {selectedItem.title}
            </p>

            <p className="mt-1 text-center text-xs text-white/60">
              {selectedIndex + 1} / {filteredItems.length}
            </p>
          </div>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
            className="absolute right-3 top-1/2 z-20 grid h-12 w-12 -translate-y-1/2 place-items-center rounded-xl bg-white/10 text-3xl text-white transition hover:bg-[#F4A900] hover:text-[#1B1B1B] md:right-7"
            aria-label="Next photo"
          >
            ›
          </button>
        </div>
      )}

      {/* Footer */}
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
              <li>
                <Link to="/#about">About YAYI</Link>
              </li>
              <li>
                <Link to="/track-record">Track Record</Link>
              </li>
              <li>
                <Link to="/agenda">Agenda for Ogun</Link>
              </li>
              <li>
                <Link to="/news">News</Link>
              </li>
              <li>
                <Link to="/gallery">Gallery</Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs font-extrabold uppercase tracking-widest text-[#F4A900]">
              Take Action
            </h4>

            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/#involve">Volunteer</Link>
              </li>
              <li>
                <a
                  href="https://cvr.inecnigeria.org"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Check your PVC
                </a>
              </li>
              <li>
                <a
                  href="https://yayiadeola.com.ng"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Senator&apos;s official site
                </a>
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
            <span>
              © 2026 YAYI 2027 Campaign Organisation. All rights reserved.
            </span>

            <span>
              Produced in compliance with the Electoral Act &amp; INEC
              guidelines. Not an INEC website.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}