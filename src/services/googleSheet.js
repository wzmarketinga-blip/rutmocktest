const API_URL =
  "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec";

// QUESTIONS
export async function getQuestions() {
  const response = await fetch(API_URL);
  const data = await response.json();

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

// GOVT EXAMS
export async function getGovtExams() {
  const res = await fetch(
    "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec?sheet=Govt%20exam"
  );

  return await res.json();
}