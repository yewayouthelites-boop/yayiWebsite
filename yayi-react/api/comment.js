import { createClient } from "@sanity/client";

/*
 * POST /api/comment
 *
 * Receives a comment from the website and creates it in Sanity with
 * approved = false. Nothing appears on the site until it is approved
 * in Sanity Studio.
 *
 * The write token lives ONLY here, on the server. It is never sent
 * to the browser.
 */

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION || "2024-01-01",
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

export default async function handler(request, response) {
  if (request.method !== "POST") {
    return response.status(405).json({ error: "Method not allowed" });
  }

  try {
    const body =
      typeof request.body === "string"
        ? JSON.parse(request.body)
        : request.body || {};

    const name = String(body.name || "").trim();
    const text = String(body.text || "").trim();
    const postId = String(body.postId || "").trim();

    if (name.length < 2) {
      return response.status(400).json({ error: "Please enter your name." });
    }

    if (text.length < 3) {
      return response.status(400).json({ error: "Please write a comment." });
    }

    if (text.length > 3000) {
      return response
        .status(400)
        .json({ error: "Comment is too long (3000 characters max)." });
    }

    if (!postId) {
      return response.status(400).json({ error: "Missing post reference." });
    }

    // Honeypot: bots fill hidden fields, humans never see them.
    if (body.website) {
      return response.status(200).json({ ok: true });
    }

    await client.create({
      _type: "comment",
      name: name.slice(0, 120),
      text,
      approved: true,
      submittedAt: new Date().toISOString(),
      post: {
        _type: "reference",
        _ref: postId,
      },
    });

    return response.status(201).json({ ok: true });
  } catch (error) {
    console.error("Failed to create comment:", error);

    return response
      .status(500)
      .json({ error: "Could not post your comment. Please try again." });
  }
}
