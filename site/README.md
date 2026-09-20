# Loop — Web Engineering Assignment 01

A multi-page marketing site for **Loop**, a habit-tracking app, built with HTML, Tailwind CSS, and Flowbite for the Assignment 01 brief (Home, About, Contact, Sign Up, Sign In).

## Folder structure

```
.
├── index.html                 Home page
├── src/
│   └── pages/
│       ├── about.html
│       ├── contact.html
│       ├── signup.html
│       └── signin.html
└── assets/
    ├── css/style.css          Shared design tokens + small helpers
    └── js/main.js             Nav toggle, accordions, tabs, carousel, form validation
```

## Before you deploy

1. **Formspree**: open `src/pages/contact.html` and replace `your-form-id` in both `<form action="https://formspree.io/f/your-form-id" ...>` tags with your real Formspree form ID (create one free at https://formspree.io/).
2. Update the placeholder contact details (email, office, hours) in the Contact page's info card if you want real ones.

## Running locally

No build step — open `index.html` in a browser, or serve the folder with any static server, e.g.:

```
npx serve .
```

## Deploying to GitHub Pages

1. Push this folder to a new GitHub repository.
2. In the repo, go to **Settings → Pages**, set the source to the `main` branch, root folder.
3. Your live site will appear at `https://<username>.github.io/<repo-name>/`.
4. Put that live link and the repository link at the top of your submitted PDF, as the assignment requires.

## What's on each page

- **Home** — hero, logo strip, feature grid, "how it works" steps, stats, testimonial carousel, pricing, FAQ accordion, newsletter band, CTA banner, footer (10 components below the hero, plus the hero and footer).
- **About** — timeline, statistics, team section, testimonial, accordion.
- **Contact** — Flowbite tabs, alert, card, accordion, and a floating-label form wired to Formspree with client-side validation.
- **Sign Up** — Tailwind form card, floating-label inputs, checkbox, divider with social buttons, link to Sign In.
- **Sign In** — Flowbite-styled card, floating-label inputs, checkbox, alert, link to Sign Up.
