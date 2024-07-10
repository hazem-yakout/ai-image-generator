
const api = "4b16dceec3745598edf7c95d784a4096";
const inp = document.getElementById("inp");
const images = document.querySelector(".images");

async function getImage() {
  const formData = new FormData();
  formData.append('image', inp.files[0]);

  const methods = {
    method: "POST",
    body: formData,
  };

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${api}`, methods);
  const data = await res.json();

  if (data.success) {
    const photo = data.data;
    const cont = document.createElement("div");
    images.append(cont);
    const img = document.createElement("img");
    cont.append(img);
    img.src = photo.url;
  } else {
    console.error('Error uploading image:', data);
  }
}

// Add an event listener to call getImage when a file is selected
inp.addEventListener('change', getImage);
