let images = document.querySelector(".img-box");
let imagegrid = document.querySelector(".images");
let promptinp = document.querySelector("input");
let load = document.querySelector("p");
let btn = document.querySelector("button");
let api = "UpckIIXhBxxdQDSZKS6mzHoAHxdZ3MIC7VLQohZrF7BZBuzGqUiL1AAD"; // Add "Bearer " prefix
const maximgs = 3;

async function generate(inp) {
  imagegrid.innerHTML = "";
  images.style.display = "block";
  load.style.display = "block";
  btn.disabled = true;
  btn.style.color = "black";
  const imgsurl = [];

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(
        inp
      )}&per_page=${maximgs}`,
      {
        headers: {
          Authorization: api,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch images: ${response.statusText}`);
    }

    const data = await response.json();
    const photos = data.photos;

    photos.forEach((photo, i) => {
      const imgurl = photo.src.large;
      imgsurl.push(imgurl);
      const img = document.createElement("img");
      img.src = imgurl;
      img.alt = `art-${i + 1}`;
      img.onclick = () => download(imgurl, i);
      imagegrid.appendChild(img);
    });

    load.style.display = "none";
    btn.disabled = false;
    btn.style.color = "black";
  } catch (error) {
    console.error("Error fetching images:", error);
    alert("Failed to fetch images. Please try again later.");
    load.style.display = "none";
    btn.disabled = false;
    btn.style.color = "black";
  }
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

  // Append the anchor element to the body
  document.body.appendChild(a);

  // Simulate a click on the anchor element
  a.click();

  // Remove the anchor element from the body
  document.body.removeChild(a);
};

