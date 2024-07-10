
const apiKey = "4b16dceec3745598edf7c95d784a4096";
const generateBtn = document.getElementById("generateBtn");
const promptInput = document.getElementById("prompt");
const images = document.querySelector(".images");

async function generateImage(prompt) {
  const response = await fetch("https://api.openai.com/v1/images/generations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt: prompt,
      n: 1,
      size: "1024x1024"
    })
  });

  const data = await response.json();
  if (data.data && data.data.length > 0) {
    const imageUrl = data.data[0].url;
    const img = document.createElement("img");
    img.src = imageUrl;
    images.appendChild(img);
  } else {
    console.error("No image generated.");
  }
}

generateBtn.addEventListener("click", () => {
  const prompt = promptInput.value;
  if (prompt) {
    generateImage(prompt);
  } else {
    alert("Please enter a prompt.");
  }
});
