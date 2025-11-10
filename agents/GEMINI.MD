# Project: Chronicle

## Project Overview

This is a Next.js project that uses [Fumadocs](https://fumadocs.dev/) to create a documentation and blog website. The content is written in MDX (Markdown with JSX) and is located in the `content` directory. The project is configured to have separate sections for general documentation and blog posts.

## Building and Running

To get the project running locally, use the following commands:

*   **Development:** `npm run dev`
    *   This will start the Next.js development server with Turbo, available at http://localhost:3000.
*   **Build:** `npm run build`
    *   This will create a production-ready build of the application.
*   **Start:** `npm run start`
    *   This will start the production server. You need to run `npm run build` first.

There are no explicit test commands defined in the project.

## Development Conventions

*   **Content:** All documentation and blog content is stored in the `content` directory.
    *   `content/docs`: Contains the documentation pages. The structure of the documentation is defined by the directory structure and `meta.json` files.
    *   `content/blog`: Contains the blog posts.
*   **Configuration:**
    *   `source.config.ts`: Configures how Fumadocs processes the content, including frontmatter schemas for blog posts.
    *   `next.config.mjs`: The main Next.js configuration file. It's set up to use the Fumadocs MDX plugin.
*   **Styling:** The project uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js` and `postcss.config.mjs`.
*   **Components:** Reusable React components are located in the `src/components` directory.