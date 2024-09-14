const skillGroups = [
  {
    label: "Languages - Frontend",
    icons: [
      "https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white",
      "https://img.shields.io/badge/CSS-1572B6?style=for-the-badge&logo=css3&logoColor=white",
      "https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black",
      "https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white",
      "https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white",
      "https://img.shields.io/badge/SvelteKit-FF3E00?style=for-the-badge&logo=Svelte&logoColor=white",
      "https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white",
    ],
  },
  {
    label: "Languages - Backend",
    icons: [
      "https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white",
      "https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white",
    ],
  },
  {
    label: "Languages - General",
    icons: [
      "https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white",
      "https://img.shields.io/badge/Rust-black?style=for-the-badge&logo=rust&logoColor=#E57324",
    ],
  },
  {
    label: "Operating Systems",
    icons: [
      "https://img.shields.io/badge/Proxmox-E57000?style=for-the-badge&logo=proxmox&logoColor=white",
      "https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white",
      "https://img.shields.io/badge/Arch_Linux-1793D1?style=for-the-badge&logo=arch-linux&logoColor=white",
      "https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white",
    ],
  },
  {
    label: "Tools",
    icons: [
      "https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white",
      "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white",
      "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white",
      "https://img.shields.io/badge/Zed-white?style=for-the-badge&logo=zedindustries&logoColor=084CCF",
      "https://img.shields.io/badge/Godot-478CBF?style=for-the-badge&logo=godot-engine&logoColor=white",
    ],
  },
];

var skill_holder = document.getElementById("skill_holder");

skillGroups.forEach((group) => {
  var label = document.createElement("h3");
  label.className = "font-semibold mt-1";
  label.innerHTML = group.label;
  skill_holder.append(label);

  var container = document.createElement("div");
  container.className = "flex flex-row flex-wrap";

  group.icons.forEach((icon) => {
    var img = document.createElement("img");
    img.src = icon;
    container.append(img);
  });

  skill_holder.append(container);
});
