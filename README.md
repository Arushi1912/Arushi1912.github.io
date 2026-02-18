# Portfolio Website

A modern, elegant portfolio website built with React, Vite, and Tailwind CSS.

## Design Philosophy

- Elegant, calm, and structured aesthetic
- Professional and trustworthy presentation
- Minimal animations with strong typography
- Light mode only with warm, inviting color palette

## Tech Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **React Router** - Client-side routing
- **React Markdown** - Markdown rendering for writing content
- **Gray Matter** - Frontmatter parsing

## Development

### Prerequisites

- Node.js 20+ (use `nvm` to switch versions)
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

The site will be available at `http://localhost:5173`

### Building

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

This site is configured for deployment to GitHub Pages as a user site (`<username>.github.io`).

### Setup

1. Create a repository named `<username>.github.io` on GitHub
2. Update the `homepage` field in `package.json` with your actual GitHub username
3. Initialize git and connect to your repository:

```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/<username>/<username>.github.io.git
git branch -M main
git push -u origin main
```

### Deploy

```bash
# Build and deploy to GitHub Pages
npm run deploy
```

This will:
1. Build the production version
2. Push the `dist` folder to the `gh-pages` branch
3. GitHub will automatically serve your site at `https://<username>.github.io`

### GitHub Pages Configuration

After first deployment:
1. Go to your repository Settings > Pages
2. Ensure the source is set to the `gh-pages` branch
3. Your site will be live within a few minutes

## Project Structure

```
portfolio/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable components (Navbar, etc.)
│   ├── pages/           # Page components
│   ├── content/         # Markdown content
│   │   ├── writing/     # Blog posts, poetry, prose
│   │   └── books/       # Book reviews
│   ├── utils/           # Helper functions
│   ├── App.jsx          # Main app component
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── tailwind.config.js   # Tailwind configuration
├── vite.config.js       # Vite configuration
└── package.json
```

## Customization

### Colors

Edit `tailwind.config.js` to customize the color palette:

```javascript
colors: {
  cream: '#FFF9E6',    // Background
  beige: '#F4EDE0',    // Section backgrounds
  slate: '#2C3E50',    // Text
  emerald: '#0F766E',  // Primary accent
  gold: '#C9A227',     // Secondary accent
  sage: '#A3BFA8',     // Dividers
}
```

### Content

- **Story**: Edit `src/pages/Story.jsx` to update your journey milestones
- **Writing**: Add `.md` files to `src/content/writing/` (currently uses sample data in `src/utils/content.js`)
- **Bookshelf**: Update `src/pages/Bookshelf.jsx` with your reading list
- **Work**: Edit `src/pages/Work.jsx` to showcase your projects
- **Contact**: Update links in `src/pages/Contact.jsx`

### Personal Information

1. Update your name in `src/pages/Landing.jsx`
2. Update the tagline and descriptions
3. Update contact information in `src/pages/Contact.jsx`
4. Replace placeholder project images and descriptions

## License

MIT
