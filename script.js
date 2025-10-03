const backendURL = "https://fakenews-backend01-5.onrender.com";  // ✅ your Render backend URL

document.getElementById("predictBtn").addEventListener("click", async () => {
  const inputText = document.getElementById("newsInput").value.trim();
  if (!inputText) {
    alert("⚠️ Please enter some text");
    return;
  }

  try {
    const res = await fetch(`${backendURL}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: inputText }),
    });

    if (!res.ok) throw new Error("Backend not responding");

    const data = await res.json();
    document.getElementById("result").innerHTML =
      `Prediction: <b>${data.prediction}</b><br/>Confidence: ${data.confidence}%`;

  } catch (err) {
    console.error(err);
    document.getElementById("result").innerHTML = "❌ Failed to connect to backend";
  }
});
