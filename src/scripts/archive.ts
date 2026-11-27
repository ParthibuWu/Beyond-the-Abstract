const form = document.querySelector<HTMLFormElement>("[data-archive-form]");
const cards = Array.from(document.querySelectorAll<HTMLElement>("[data-archive-card]"));
const results = document.querySelector<HTMLElement>("[data-archive-results]");
const empty = document.querySelector<HTMLElement>("[data-empty-results]");
const count = document.querySelector<HTMLElement>("[data-result-count]");
const search = document.querySelector<HTMLInputElement>("[data-filter-search]");
const category = document.querySelector<HTMLSelectElement>("[data-filter-category]");
const year = document.querySelector<HTMLSelectElement>("[data-filter-year]");
const paperStatus = document.querySelector<HTMLSelectElement>("[data-filter-paper-status]");
const status = document.querySelector<HTMLSelectElement>("[data-filter-status]");
const sort = document.querySelector<HTMLSelectElement>("[data-filter-sort]");

if (form && results && empty && count && search && category && year && paperStatus && status && sort) {
  const params = new URLSearchParams(window.location.search);
  if (params.has("category")) category.value = params.get("category") || "";
  if (params.has("q")) search.value = params.get("q") || "";

  const updateArchive = () => {
    const term = search.value.trim().toLowerCase();
    const shown = cards.filter((card) => {
      const matchesText = !term || (card.dataset.search || "").includes(term);
      const matchesCategory = !category.value || card.dataset.category === category.value;
      const matchesYear = !year.value || card.dataset.year === year.value;
      const matchesPaperStatus = !paperStatus.value || card.dataset.paperStatus === paperStatus.value;
      const matchesStatus = !status.value || card.dataset.status === status.value;
      return matchesText && matchesCategory && matchesYear && matchesPaperStatus && matchesStatus;
    });

    shown.sort((a, b) => {
      if (sort.value === "title") return (a.dataset.title || "").localeCompare(b.dataset.title || "");
      if (sort.value === "reading") return Number(a.dataset.reading) - Number(b.dataset.reading);
      if (sort.value === "newest") return (b.dataset.date || "").localeCompare(a.dataset.date || "");
      const featured = Number(b.dataset.featured === "true") - Number(a.dataset.featured === "true");
      return featured || (b.dataset.date || "").localeCompare(a.dataset.date || "");
    });

    cards.forEach((card) => { card.hidden = true; });
    shown.forEach((card) => {
      card.hidden = false;
      results.insertBefore(card, empty);
    });
    count.textContent = String(shown.length);
    empty.hidden = shown.length !== 0;
  };

  form.addEventListener("submit", (event) => event.preventDefault());
  search.addEventListener("input", updateArchive);
  [category, year, paperStatus, status, sort].forEach((control) => control.addEventListener("change", updateArchive));
  updateArchive();
}
