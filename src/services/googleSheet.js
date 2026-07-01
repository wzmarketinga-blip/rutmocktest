const API_URL =
  "https://script.google.com/macros/s/AKfycbwT93_uEIy_OnI7FRiU-9L1v9lajiiGT5WDFU-0qG4XcEHAINDQ8Nu0jKQ1g_y3heZDrQ/exec";

export async function getQuestions() {
  const response = await fetch(API_URL);
  const data = await response.json();

  return data.map((q) => ({
    id: q.ID,
    subject: q.Subject,
    question: q.Question,
    options: [q.A, q.B, q.C, q.D],
    answer: q.Answer,
  }));
}