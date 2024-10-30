const featured_projects = [
  {
    name: "The Watcher",
    img: "public/the-watcher.png",
    description: "An uptime monitor built in SolidJS. Batteries Included.",
    links: [
      {
        label: "Repository",
        url: "https://github.com/cyteon/the-watcher",
      },
      {
        label: "My Instance",
        url: "https://status2.cyteon.tech",
      },
    ],
  },
  {
    name: "CatOS",
    img: "public/catos.webp",
    description: "A small AMD64 kernel written in Rust.",
    links: [
      {
        label: "Repository",
        url: "https://github.com/cyteon/catos",
      },
    ],
  },
  {
    name: "Hell's Cat",
    img: "public/hells_cat.png",
    description: "Made in ~3 weeks for MVM 23!",
    links: [
      {
        label: "Game",
        url: "https://cyteon.itch.io/hell-cat",
      },
    ],
  },
];

for (let project of featured_projects) {
  document.getElementById("featuredcontainer").innerHTML += `
    <div class="project-card">
      <img src="${project.img}" alt="${project.name}" />
      <div class="project-content">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
        <div class="project-links mt-auto">
          ${project.links
            .map(
              (link) =>
                `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${link.label}</a>`,
            )
            .join(" | ")}
        </div>
      </div>
    </div>
  `;
}

const repos = fetch("https://api.github.com/users/cyteon/repos");

repos
  .then((response) => response.json())
  .then((data) => {
    const sorted = data.sort((a, b) => b.stargazers_count - a.stargazers_count);

    for (let repo of sorted) {
      document.getElementById("repocontainer").innerHTML += `
      <div class="project-card">
        <div class="project-content">
          <h3>${repo.name}</h3>
          <p>${repo.description || ""}</p>
          <div class="mt-auto">
            <p>⭐ ${repo.stargazers_count} | 🍴 ${repo.forks_count} | 🛠️ ${repo.language || "Unkown"}</p>
            <p>📜 ${repo.license ? repo.license.name : "Unkown"}</p>
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">Repository</a>
          </div>
        </div>
      </div>
    `;
    }
  });

function setTab(event, tab) {
  var i, tabcontent, tabButton;

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tabButton = document.getElementsByClassName("tabButton");
  for (i = 0; i < tabButton.length; i++) {
    tabButton[i].className = tabButton[i].className.replace(" active", "");
  }

  document.getElementById(tab).style.display = "block";
  event.currentTarget.className += " active";
}
