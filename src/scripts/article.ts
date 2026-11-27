const article = document.querySelector<HTMLElement>("[data-article-body]");
const tocLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-toc-link]"));
const headings = Array.from(article?.querySelectorAll<HTMLElement>("h2[id]") || []);

if (article) {
  article.querySelectorAll<HTMLElement>("pre").forEach((pre) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "code-copy";
    button.textContent = "Copy";
    button.setAttribute("aria-label", "Copy code block");
    button.addEventListener("click", async () => {
      const code = pre.querySelector("code")?.innerText || pre.innerText;
      try {
        await navigator.clipboard.writeText(code);
        button.textContent = "Copied";
        window.setTimeout(() => { button.textContent = "Copy"; }, 1400);
      } catch {
        button.textContent = "Select code to copy";
      }
    });
    pre.append(button);
  });
}

if ("IntersectionObserver" in window && headings.length) {
  const observer = new IntersectionObserver((items) => {
    const visible = items
      .filter((item) => item.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
    if (!visible) return;
    tocLinks.forEach((link) => {
      link.classList.toggle("is-active", link.hash === "#" + visible.target.id);
    });
  }, { rootMargin: "-12% 0px -72% 0px", threshold: 0 });
  headings.forEach((heading) => observer.observe(heading));
}

const shareButton = document.querySelector<HTMLButtonElement>("[data-share-article]");
shareButton?.addEventListener("click", async () => {
  const shareData = { title: document.title, url: window.location.href };
  if (navigator.share) {
    try { await navigator.share(shareData); } catch {}
    return;
  }
  try {
    await navigator.clipboard.writeText(shareData.url);
    shareButton.textContent = "Link copied";
    window.setTimeout(() => { shareButton.textContent = "Share this note ↗"; }, 1400);
  } catch {
    shareButton.textContent = "Copy the page URL from your browser";
  }
});
