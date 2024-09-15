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
  {
    title: "Rabbit",
    description: "An reddit clone made with svelte",
    image: "public/rabbit.webp",
    icons: [
      "https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white",
      "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
      "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
    ],
    links: [
      {
        label: "Webiste",
        url: "https://rabbit.cyteon.tech",
      },
      {
        label: "GitHub",
        url: "https://github.com/cyteon/rabbit",
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
  img.className = "mx-auto";
  card.append(img);

  var title = document.createElement("h1");
  title.innerHTML = project.title;
  card.append(title);

  var description = document.createElement("p");
  description.innerHTML = project.description;
  card.append(description);

  var icons = document.createElement("div");
  icons.className = "flex flex-row flex-wrap";
  project.icons.forEach((icon) => {
    var img = document.createElement("img");
    img.src = icon;
    icons.append(img);
  });
  card.append(icons);

  var links = document.createElement("div");
  links.className = "flex flex-row";
  project.links.forEach((linkData, index) => {
    var link = document.createElement("a");
    link.href = linkData.url;
    link.innerHTML = linkData.label;
    links.append(link);

    if (project.links.length > 1 && index + 1 < project.links.length) {
      var p = document.createElement("p");
      p.className = "mx-1";
      p.innerHTML = "-";
      links.append(p);
    }
  });
  card.append(links);

  project_holder.append(card);
});
