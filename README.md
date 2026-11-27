# Beyond the Abstract

An editorial research journal for explaining computational biology, scientific machine learning, mathematical methods, and scientific software. The site is designed to document a developing research path without implying credentials or results that have not been earned.

## Run locally

Requirements: Node.js 22.23.4 or newer and npm.

    npm install
    npm run dev

Astro prints a local preview URL in the terminal. Build the static site with npm run build; review it with npm run preview.

## Add a research note

1. Copy templates/research-note.md into src/content/research/.
2. Use a lowercase, hyphen-separated filename. It becomes the article URL.
3. Fill in and verify the frontmatter. Keep the status as draft until the paper details and claims have been checked.
4. Write the article in Markdown. Use display-math delimiters for equations and fenced code blocks with a language label for code.
5. Add a publication date and set the status to published only when the note is ready. Published notes appear in the archive and RSS feed.

The content collection validates frontmatter during the build. Invalid metadata stops the build so errors are caught before deployment.

## Editorial checklist

- Link the original paper, DOI, supplementary material, code, and data where available.
- Label preprints and conference papers accurately.
- Separate the authors' reported findings from your interpretation and from future hypotheses.
- Check metrics, baselines, limitations, and experimental claims against the full paper.
- Attribute figures and provide alt text; prefer original explanatory diagrams.
- Keep unfinished projects labelled as planned or in progress.

The included GPFlow page is explicitly a draft based on an abstract supplied during site planning. It has no verified citation metadata. Replace or verify it before publishing. The other two notes are outlines, not published analyses.

## Personal details

Edit src/data/profile.ts to add a name, email, GitHub and LinkedIn URLs, and a CV path. Blank fields are omitted from the public site.

Edit src/data/projects.ts to update project scope and status. The starter projects are plans and placeholders; they do not claim completed results.

## GitHub Pages

The repository includes a GitHub Actions workflow at .github/workflows/deploy.yml. It builds and deploys the static site after pushes to main.

After creating the GitHub repository:

1. Push this project to its main branch.
2. Open repository Settings → Pages and choose GitHub Actions as the source.
3. Wait for the deploy workflow to finish. The workflow sets the GitHub Pages origin and repository base path from GitHub's repository variables.

For a local build, astro.config.mjs defaults to https://your-github-username.github.io/beyond-the-abstract. Set SITE_URL and BASE_PATH in .env if your username, repository name, or custom domain differs. Do not commit personal secrets.

## Included features

- Responsive editorial homepage and academic portfolio pages.
- Markdown research archive with title/content search, category, year, publication-status, and sorting filters.
- Individual article pages with citation metadata, table of contents, reading progress, related notes, and previous/next navigation.
- KaTeX math rendering and Shiki syntax highlighting with copy buttons.
- Light/dark theme toggle, visible keyboard focus, reduced-motion support, and semantic page structure.
- RSS feed containing only published notes, XML sitemap generation, robots.txt, canonical metadata, Open Graph tags, and Article structured data.
- No accounts, database, analytics, or tracking scripts.

## Checks

Run npm run check for Astro and TypeScript diagnostics, then npm run build to create the static site.

## Technical notes

This is a static Astro site, so GitHub Pages can host it without a server or database. Content is authored as Markdown and rendered during the build. Search and filters run locally in the browser.
