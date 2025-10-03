const backendURL = "https://fakenews-backend01-9.onrender.com/predict";

async function checkNews() {
  const inputText = document.getElementById("newsInput").value;
  if (!inputText) {
    alert("⚠️ Please enter some text first!");
    return;
  }

  try {
    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText })
    });

    if (!response.ok) {
      throw new Error("Server error: " + response.status);
    }

    const data = await response.json();
    document.getElementById("result").innerText =
      `📰 Prediction: ${data.result}`;
  } catch (err) {
    console.error("❌ Request failed:", err);
    document.getElementById("result").innerText =
      "❌ Failed to connect to backend.";
  }
}
