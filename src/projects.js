/*  All rights reserved © Cyteon 2024 */

const projects = [
  {
    title: "CatOS",
    description: "An OS in Rust",
    image: "public/catos.webp",
    icons: [
      "https://img.shields.io/badge/Rust-black?style=for-the-badge&logo=rust&logoColor=#E57324",
    ],
    links: [
      {
        label: "GitHub",
        url: "https://github.com/cyteon/catos",
      },
    ],
  },
];

var project_holder = document.getElementById("project_holder");

projects.forEach((project) => {
  var card = document.createElement("div");
  card.className = "card";

  var img = document.createElement("img");
  img.width = 250;
  img.height = 250;
  img.alt = project.title + " image";
  img.src = project.image;
  card.append(img);

  var title = document.createElement("h1");
  title.innerHTML = project.title;
  card.append(title);

  var description = document.createElement("p");
  description.innerHTML = project.description;
  card.append(description);

  var icons = document.createElement("div");
  project.icons.forEach((icon) => {
    var img = document.createElement("img");
    img.src = icon;
    icons.append(img);
  });
  card.append(icons);

  var links = document.createElement("div");
  project.links.forEach((linkData) => {
    var link = document.createElement("a");
    link.href = linkData.url;
    link.innerHTML = linkData.label;
    links.append(link);
  });
  card.append(links);

  project_holder.append(card);
});
