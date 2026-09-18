const menuToggle = document.querySelector(".menu-toggle");
const siteMenu = document.querySelector("#site-menu");
const year = document.querySelector("#year");
const searchTrigger = document.querySelector("[data-scroll-search]");
const header = document.querySelector(".site-header");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (menuToggle && siteMenu) {
  menuToggle.addEventListener("click", () => {
    const open = siteMenu.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });

  siteMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (searchTrigger) {
  searchTrigger.addEventListener("click", () => {
    document.querySelector("#contato")?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });
  });
}

if (header) {
  const updateHeader = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
}

if (window.instgrm?.Embeds) {
  window.instgrm.Embeds.process();
}
