# zahrakrm.github.io

Personal website of **Zahra Karami**: research, projects, education, skills, CV and contact,
plus a project page for the preprint *Pixels or Queues? A Careful Evaluation of Deep and Tabular
Reinforcement Learning for Traffic Signal Control*.

Plain HTML, CSS and a little JavaScript. There is no build step, no framework and no external
request (fonts are self-hosted), so GitHub Pages can serve the files exactly as they are.

## Publish on GitHub Pages

1. Sign in to GitHub as **zahraKrm** and create a new **public** repository named exactly
   `zahraKrm.github.io`. Don't add a README, .gitignore or license; this folder already has what it needs.
2. Upload the **contents** of this folder (not the folder itself) to the repository root.
   - In the browser: open the empty repository, choose **uploading an existing file**, drag in every file
     and folder from here, then **Commit changes**.
     Hidden files such as `.nojekyll` are easy to miss when dragging; if it doesn't come along, create it
     with **Add file → Create new file**, name it `.nojekyll`, leave it empty and commit.
   - Or with git:
     ```bash
     cd zahraKrm.github.io
     git init -b main
     git add .
     git commit -m "Personal website"
     git remote add origin https://github.com/zahraKrm/zahraKrm.github.io.git
     git push -u origin main
     ```
3. In the repository go to **Settings → Pages**. Under *Build and deployment*, set **Source** to
   *Deploy from a branch*, choose the **main** branch and the **/ (root)** folder, then **Save**.
4. After a minute or two the site is live at **https://zahrakrm.github.io/**.

Every later commit to `main` republishes the site automatically.

> **Using a different repository name?** The site then lives at `https://zahrakrm.github.io/<repo>/`.
> All links inside the site are relative and keep working. Only the absolute addresses used by search
> engines and link previews need updating: search the project for `https://zahrakrm.github.io/` and add
> `<repo>/` (in both `index.html` files, `sitemap.xml` and `robots.txt`). The 404 page links to `/`;
> change it to `/<repo>/`.

## What's where

```
index.html                     Homepage: about, research, projects, education, skills, contact
pixels-or-queues/index.html    Project page of the paper: abstract, key findings, figures, BibTeX
404.html                       "Page not found" page (self-contained)
assets/css/style.css           All styles. Colours and fonts are set at the top (design tokens)
assets/js/main.js              Theme switch, mobile menu, active-section highlight, copy buttons
assets/files/                  Zahra_Karami_CV.pdf and the paper PDF
assets/img/paper/              Figures from the paper (WebP)
assets/img/                    Favicons and the link-preview images (og-home.png, og-paper.png)
assets/fonts/                  Inter and Source Serif 4 (SIL Open Font License, licence files included)
sitemap.xml, robots.txt        Help search engines find the pages
.nojekyll                      Tells GitHub Pages to serve the files as they are
```

## Common edits

- **Text.** Open `index.html`; each part of the page starts with a comment such as `<!-- ===== PROJECTS -->`.
  Edit the text between the tags and commit. Project cards, courses and skills are plain lists, so you can
  copy one `<li>…</li>` block to add an item.
- **New CV or paper version.** Replace the file in `assets/files/` and keep the same file name, so
  every link keeps working.
- **Add a photo.** Save a square photo as `assets/img/profile.jpg` (about 400×400 px). In `index.html`,
  replace `<div class="avatar" aria-hidden="true">ZK</div>` with
  `<img class="avatar" src="assets/img/profile.jpg" alt="Zahra Karami" width="84" height="84">`.
- **When the paper is on arXiv.** On both pages, add a button next to the PDF button, for example
  `<a class="btn btn-secondary btn-sm" href="https://arxiv.org/abs/XXXX.XXXXX">arXiv</a>`, and replace the
  BibTeX entries with the one arXiv provides. You can keep the PDF here or point the PDF buttons to arXiv.
- **Colours.** Change the variables at the top of `assets/css/style.css` (`--accent` is the navy used in
  the CV). The dark theme has its own block just below.

## Google Scholar

The paper page carries the `citation_*` meta tags that Google Scholar reads, and the PDF is hosted on the
same site. Indexing can take several weeks. To show the paper on a Scholar profile sooner, add it manually
(**+ → Add article manually**) or add it once it is on arXiv.

## Checking the site locally

Open `index.html` in a browser, or run a small local server so every path behaves as on GitHub Pages:

```bash
python3 -m http.server 8000
# then open http://localhost:8000
```

## Credits

Fonts: [Inter](https://rsms.me/inter/) and [Source Serif 4](https://github.com/adobe-fonts/source-serif),
both under the SIL Open Font License 1.1. Figures are from the paper. Content © Zahra Karami.
