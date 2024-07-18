
// const api = "4b16dceec3745598edf7c95d784a4096";
// const inp = document.getElementById("inp");
// const images = document.querySelector(".images");

// // make a request to open api
// async function getImage() {
//   const methods = {
//     method: "POST",

//     body: JSON.stringify({
//       data: {
//         id: "2ndCYJK",
//         title: "c1f64245afb2",
//         url_viewer: "https://ibb.co/2ndCYJK",
//         url: "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
//         display_url: "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
//         width: "1",
//         height: "1",
//         size: "42",
//         time: "1552042565",
//         expiration: "0",
//         image: {
//           filename: "c1f64245afb2.gif",
//           name: "c1f64245afb2",
//           mime: "image/gif",
//           extension: "gif",
//           url: "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
//         },
//         thumb: {
//           filename: "c1f64245afb2.gif",
//           name: "c1f64245afb2",
//           mime: "image/gif",
//           extension: "gif",
//           url: "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif",
//         },
//         medium: {
//           filename: "c1f64245afb2.gif",
//           name: "c1f64245afb2",
//           mime: "image/gif",
//           extension: "gif",
//           url: "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
//         },
//         delete_url: "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c",
//       },
//       success: true,
//       status: 200,
//     }),
//   };
//   const res = await fetch("https://api.imgbb.com/1/upload", methods);
//   //parse the response as json
//   const data = await res.json();

//   const listimages = data.data;
//   const x =
//     listimages &&
//     listimages.map((photo) => {
//       const cont = document.createElement("div");
//       images.append(cont);
//       const img = document.createElement("img");
//       cont.append(img);
//       img.src = photo.url;
//     });
// }
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
        let rand = getrand(1, 100);
        const prompt = `${inp} ${rand}`;
        let url =
            "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0";
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
