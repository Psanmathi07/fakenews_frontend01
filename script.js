async function checkNews() {
  const text = document.getElementById("newsInput").value;
  const resultElement = document.getElementById("result");

  if (!text.trim()) {
    resultElement.innerText = "⚠️ Please enter some text to analyze.";
    return;
  }

  resultElement.innerText = "⏳ Analyzing...";

  try {
    const response = await fetch("https://fakenews-backend01-4.onrender.com/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });

    if (!response.ok) {
      resultElement.innerText = "❌ Server error.";
      return;
    }

    const data = await response.json();
    resultElement.innerText =
      `🔎 Prediction: ${data.prediction}\n🎯 Confidence: ${data.confidence}%`;
  } catch (error) {
    resultElement.innerText = "⚠️ Failed to connect to backend.";
  }
}
