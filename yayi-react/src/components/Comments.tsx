import { useEffect, useState, type FormEvent } from "react";

const DEEP = "#064F26";
const GREEN = "#0B7A3B";
const GOLD = "#F4A900";

export type Comment = {
  _id: string;
  name: string;
  text: string;
  createdAt: string;
};

/*
 * ---------------------------------------------------------------
 * TEMPORARY STORAGE LAYER
 *
 * Comments currently live in the visitor's own browser
 * (localStorage), so they are NOT shared between devices or users.
 *
 * When the Sanity backend is ready, only these two functions need
 * to change — the UI below stays exactly as it is:
 *
 *   loadComments  -> sanityClient.fetch(...)
 *   saveComment   -> sanityClient.create({ _type: "comment", ... })
 * ---------------------------------------------------------------
 */

const storageKey = (slug: string) => `yayi-comments:${slug}`;

function loadComments(slug: string): Comment[] {
  try {
    const raw = window.localStorage.getItem(storageKey(slug));

    return raw ? (JSON.parse(raw) as Comment[]) : [];
  } catch {
    return [];
  }
}

function saveComment(slug: string, comment: Comment): Comment[] {
  const next = [comment, ...loadComments(slug)];

  try {
    window.localStorage.setItem(storageKey(slug), JSON.stringify(next));
  } catch {
    // Storage full or blocked — comment still shows for this session.
  }

  return next;
}

function initials(name: string) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function timeAgo(iso: string) {
  const seconds = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);

  if (seconds < 60) return "just now";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;

  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Comments({ slug }: { slug: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [errors, setErrors] = useState({ name: false, text: false });
  const [justPosted, setJustPosted] = useState(false);

  useEffect(() => {
    setComments(loadComments(slug));
  }, [slug]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValid = name.trim().length >= 2;
    const textValid = text.trim().length >= 3;

    setErrors({ name: !nameValid, text: !textValid });

    if (!nameValid || !textValid) return;

    const comment: Comment = {
      _id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    setComments(saveComment(slug, comment));

    setName("");
    setText("");
    setJustPosted(true);

    window.setTimeout(() => setJustPosted(false), 4000);
  };

  return (
    <section className="mt-14 border-t border-[#E1E8E1] pt-10">
      <h2
        className="text-2xl font-black sm:text-3xl"
        style={{ color: DEEP }}
      >
        Comments
        {comments.length > 0 && (
          <span className="ml-2 text-lg font-bold text-[#5C665F]">
            ({comments.length})
          </span>
        )}
      </h2>

      <p className="mt-2 text-[#5C665F]">
        Share your thoughts on this story. Keep it respectful — we moderate
        for abuse.
      </p>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="mt-7 rounded-2xl border border-[#E1E8E1] bg-[#F6F8F5] p-5 sm:p-6"
      >
        <label
          htmlFor="comment-name"
          className="block text-sm font-bold"
          style={{ color: DEEP }}
        >
          Your name
        </label>

        <input
          id="comment-name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          placeholder="e.g. Adebayo Ogunlesi"
          className={`mt-2 w-full rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#0B7A3B] ${
            errors.name ? "border-red-500" : "border-[#E1E8E1]"
          }`}
        />

        {errors.name && (
          <p className="mt-1.5 text-sm font-semibold text-red-600">
            Please enter your name.
          </p>
        )}

        <label
          htmlFor="comment-text"
          className="mt-5 block text-sm font-bold"
          style={{ color: DEEP }}
        >
          Your comment
        </label>

        <textarea
          id="comment-text"
          rows={4}
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder="Write your comment..."
          className={`mt-2 w-full resize-y rounded-xl border bg-white px-4 py-3 outline-none transition focus:border-[#0B7A3B] ${
            errors.text ? "border-red-500" : "border-[#E1E8E1]"
          }`}
        />

        {errors.text && (
          <p className="mt-1.5 text-sm font-semibold text-red-600">
            Please write a comment before posting.
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-4">
          <button
            type="submit"
            className="rounded-full px-7 py-3 font-bold transition active:scale-95"
            style={{ backgroundColor: GOLD, color: "#1B1B1B" }}
          >
            Post comment
          </button>

          {justPosted && (
            <span
              className="text-sm font-bold"
              style={{ color: GREEN }}
            >
              ✓ Comment posted
            </span>
          )}
        </div>
      </form>

      {/* LIST */}
      <div className="mt-9">
        {comments.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-[#E1E8E1] px-5 py-10 text-center text-[#5C665F]">
            No comments yet. Be the first to share your thoughts.
          </p>
        ) : (
          <ul className="list-none space-y-4 p-0">
            {comments.map((comment) => (
              <li
                key={comment._id}
                className="flex gap-4 rounded-2xl border border-[#E1E8E1] bg-white p-5"
              >
                <span
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-sm font-black text-white"
                  style={{ backgroundColor: GREEN }}
                >
                  {initials(comment.name)}
                </span>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3">
                    <p
                      className="font-bold"
                      style={{ color: DEEP }}
                    >
                      {comment.name}
                    </p>

                    <time
                      dateTime={comment.createdAt}
                      className="text-xs text-[#5C665F]"
                    >
                      {timeAgo(comment.createdAt)}
                    </time>
                  </div>

                  <p className="mt-1.5 whitespace-pre-wrap leading-7 text-[#404840]">
                    {comment.text}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
