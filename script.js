const api = "4b16dceec3745598edf7c95d784a4096";
const inp = document.getElementById("inp");
const images = document.querySelector(".images");

// make a request to open api
async function getImage() {
  const methods = {
    method: "POST",

    body: JSON.stringify({
      data: {
        id: "2ndCYJK",
        title: "c1f64245afb2",
        url_viewer: "https://ibb.co/2ndCYJK",
        url: "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
        display_url: "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
        width: "1",
        height: "1",
        size: "42",
        time: "1552042565",
        expiration: "0",
        image: {
          filename: "c1f64245afb2.gif",
          name: "c1f64245afb2",
          mime: "image/gif",
          extension: "gif",
          url: "https://i.ibb.co/w04Prt6/c1f64245afb2.gif",
        },
        thumb: {
          filename: "c1f64245afb2.gif",
          name: "c1f64245afb2",
          mime: "image/gif",
          extension: "gif",
          url: "https://i.ibb.co/2ndCYJK/c1f64245afb2.gif",
        },
        medium: {
          filename: "c1f64245afb2.gif",
          name: "c1f64245afb2",
          mime: "image/gif",
          extension: "gif",
          url: "https://i.ibb.co/98W13PY/c1f64245afb2.gif",
        },
        delete_url: "https://ibb.co/2ndCYJK/670a7e48ddcb85ac340c717a41047e5c",
      },
      success: true,
      status: 200,
    }),
  };
  const res = await fetch("https://api.imgbb.com/1/upload", methods);
  //parse the response as json
  const data = await res.json();

  const listimages = data.data;
  const x =
    listimages &&
    listimages.map((photo) => {
      const cont = document.createElement("div");
      images.append(cont);
      const img = document.createElement("img");
      cont.append(img);
      img.src = photo.url;
    });
}
