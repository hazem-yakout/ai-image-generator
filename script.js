let images = document.querySelector(".img-box");
let imagegrid = document.querySelector(".images"); // Corrected to select the 'images' div
let promptinp = document.querySelector("input");
let load = document.querySelector("p");
let btn = document.querySelector("button");
let api = "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";
const maximgs = 3;

let getrand = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

async function generate(inp) {
  imagegrid.innerHTML = "";
  images.style.display = "block";
  load.style.display = "block";
  btn.disabled = true;
  btn.style.color = "black";
  const imgsurl = [];

  for (let i = 0; i < maximgs; i++) {
    let rand = getrand(1, 100); //
    const prompt = `${inp} ${rand}`;
    let url =
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${api}`,
      },
      body: JSON.stringify({ inputs: prompt }),
    });
    if (!response.ok) {
      // alert("Failed to generate images");
      // continue;
    }
    const blob = await response.blob();
    const imgurl = URL.createObjectURL(blob);
    imgsurl.push(imgurl);
    const img = document.createElement("img");
    img.src = imgurl;
    img.alt = `art-${i + 1}`;
    img.onclick = () => download(imgurl, i);
    imagegrid.appendChild(img);
  }

  load.style.display = "none";
  btn.disabled = false;
  btn.style.color = "black";
}

btn.addEventListener("click", () => {
  if (promptinp.value.trim() !== "") {
    generate(promptinp.value.trim());
  }
});

let download = (imgurl, imgnum) => {
  let a = document.createElement("a");
  a.href = imgurl;
  a.download = `image-${imgnum + 1}.jpg`;
  a.click();
};
