import { useCallback, useEffect, useState, type FormEvent } from "react";
import { sanityClient } from "../lib/sanity";

const DEEP = "#064F26";
const GREEN = "#0B7A3B";
const GOLD = "#F4A900";

type Comment = {
  _id: string;
  name: string;
  text: string;
  submittedAt: string;
};

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

export default function Comments({ postId }: { postId: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [website, setWebsite] = useState(""); // honeypot

  const [errors, setErrors] = useState({ name: false, text: false });
  const [sending, setSending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const loadComments = useCallback(async () => {
    if (!postId) {
      setLoading(false);
      return;
    }

    try {
      const data = await sanityClient.fetch<Comment[]>(
        `
        *[_type == "comment" && approved == true && post._ref == $postId]
          | order(submittedAt desc){
            _id,
            name,
            text,
            submittedAt
          }
        `,
        { postId },
      );

      setComments(data || []);
    } catch (error) {
      console.error("Failed to load comments:", error);
    } finally {
      setLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nameValid = name.trim().length >= 2;
    const textValid = text.trim().length >= 3;

    setErrors({ name: !nameValid, text: !textValid });
    setServerError("");

    if (!nameValid || !textValid) return;

    setSending(true);

    try {
      const response = await fetch("/api/comment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          text: text.trim(),
          postId,
          website,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));

        throw new Error(data.error || "Could not post your comment.");
      }

      setName("");
      setText("");
      setSubmitted(true);
    } catch (error) {
      setServerError(
        error instanceof Error
          ? error.message
          : "Could not post your comment. Please try again.",
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="mt-14 border-t border-[#E1E8E1] pt-10">
      <h2 className="text-2xl font-black sm:text-3xl" style={{ color: DEEP }}>
        Comments
        {comments.length > 0 && (
          <span className="ml-2 text-lg font-bold text-[#5C665F]">
            ({comments.length})
          </span>
        )}
      </h2>

      <p className="mt-2 text-[#5C665F]">
        Share your thoughts on this story. Comments are reviewed before they
        appear.
      </p>

      {/* FORM */}
      {submitted ? (
        <div
          className="mt-7 rounded-2xl border-2 p-6 text-center"
          style={{ borderColor: GREEN, backgroundColor: "#F6F8F5" }}
        >
          <p className="text-lg font-black" style={{ color: DEEP }}>
            Thank you — your comment has been submitted.
          </p>

          <p className="mt-2 text-[#5C665F]">
            It will appear here once our team has reviewed it.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="mt-5 rounded-full border-2 px-6 py-2.5 font-bold transition active:scale-95"
            style={{ borderColor: GREEN, color: DEEP }}
          >
            Write another comment
          </button>
        </div>
      ) : (
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

          {/* Honeypot — hidden from people, tempting to bots */}
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            aria-hidden="true"
            className="absolute left-[-9999px] h-0 w-0 opacity-0"
          />

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

          {serverError && (
            <p className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {serverError}
            </p>
          )}

          <button
            type="submit"
            disabled={sending}
            className="mt-5 rounded-full px-7 py-3 font-bold transition active:scale-95 disabled:cursor-not-allowed disabled:opacity-60"
            style={{ backgroundColor: GOLD, color: "#1B1B1B" }}
          >
            {sending ? "Posting..." : "Post comment"}
          </button>
        </form>
      )}

      {/* LIST */}
      <div className="mt-9">
        {loading ? (
          <p className="py-8 text-center text-[#5C665F]">Loading comments...</p>
        ) : comments.length === 0 ? (
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
                    <p className="font-bold" style={{ color: DEEP }}>
                      {comment.name}
                    </p>

                    <time
                      dateTime={comment.submittedAt}
                      className="text-xs text-[#5C665F]"
                    >
                      {timeAgo(comment.submittedAt)}
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
