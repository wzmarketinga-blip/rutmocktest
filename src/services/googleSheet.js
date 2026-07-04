const API_URL =
  "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec";

// ---------------- QUESTIONS ----------------

export async function getQuestions() {
  const res = await fetch(API_URL + "?action=questions");
  const data = await res.json();

  return data.map((q) => ({
    id: String(q.ID ?? ""),
    subject: String(q.Subject ?? "").trim(),
    topic: String(q.Topic ?? "").trim(),
    question: String(q.Question ?? "").trim(),

    options: [
      String(q.A ?? "").trim(),
      String(q.B ?? "").trim(),
      String(q.C ?? "").trim(),
      String(q.D ?? "").trim(),
    ],

    answer: String(q.Answer ?? "").trim(),
    explanation: String(q.Explanation ?? "").trim(),
  }));
}

// ---------------- PASSWORD ----------------

export async function getPassword() {
  const res = await fetch(API_URL + "?action=password");
  return await res.json();
}

// ---------------- LEADERBOARD ----------------

export async function getLeaderboard() {
  const res = await fetch(API_URL + "?action=leaderboard");
  return await res.json();
}

// ---------------- SAVE RESULT ----------------

export async function saveResult(result) {
  const res = await fetch(API_URL, {
    method: "POST",
    body: JSON.stringify(result),
  });

  return await res.json();
}