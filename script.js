async function checkNews() {
  const input = document.getElementById("newsInput").value.trim();
  const resultDiv = document.getElementById("result");

  if (!input) {
    resultDiv.innerHTML = "⚠️ Please enter some text.";
    return;
  }

  resultDiv.innerHTML = "⏳ Checking...";

  try {
    // ✅ Change backend URL if deployed on Render
    const backendURL = "https://fakenews-backend01-5.onrender.com";

    const response = await fetch(backendURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: input })
    });

    const data = await response.json();

    if (data.result) {
      resultDiv.innerHTML = `✅ Prediction: <span style="color:yellow">${data.result}</span>`;
    } else {
      resultDiv.innerHTML = `⚠️ Error: ${data.error || "Unknown issue"}`;
    }

  } catch (error) {
    resultDiv.innerHTML = `❌ Failed to connect to backend`;
  }
}
