const API_URL =
  "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

export async function getQuestions() {
  const res = await fetch(API_URL);
  const data = await res.json();
  return data.map((q) => ({
    id: String(q.ID ?? ""),
    subject: String(q.Subject ?? "").trim(),
    question: String(q.Question ?? "").trim(),
    options: [
      String(q.A ?? "").trim(),
      String(q.B ?? "").trim(),
      String(q.C ?? "").trim(),
      String(q.D ?? "").trim(),
    ],
    answer: String(q.Answer ?? "").trim().toUpperCase(),
  }));
}