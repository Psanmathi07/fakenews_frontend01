// Replace with your actual backend Render URL
const backendURL = "https://fakenews-backend01-11.onrender.com";  

document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("predictBtn");
  const input = document.getElementById("newsInput");
  const result = document.getElementById("result");

  btn.addEventListener("click", async () => {
    const text = input.value.trim();
    if (!text) {
      result.innerHTML = "⚠️ Please enter some text";
      return;
    }

    try {
      const res = await fetch(`${backendURL}/predict`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text })
      });

      if (!res.ok) {
        result.innerHTML = "❌ Backend error";
        return;
      }

      const data = await res.json();
      result.innerHTML = `
        Prediction: <b>${data.prediction}</b><br>
        Confidence: ${data.confidence}%
      `;
    } catch (err) {
      console.error(err);
      result.innerHTML = "❌ Failed to connect to backend";
    }
  });
});
