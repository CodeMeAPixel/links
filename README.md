# Pixel Links

[![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js&style=flat-square)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&style=flat-square&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&style=flat-square&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38bdf8?logo=tailwindcss&style=flat-square&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-11.15.0-0055FF?logo=framer&style=flat-square&logoColor=white)](https://www.framer.com/motion/)
[![License: MIT](https://img.shields.io/github/license/CodeMeAPixel/portfolio?style=flat-square)](LICENSE)
[![Open in GitHub Codespaces](https://img.shields.io/badge/Codespaces-Open%20in%20GitHub-181717?logo=github&style=flat-square)](https://github.com/codemeapixel/portfolio/codespaces)

> **A modern, customizable link hub for showcasing social media profiles, projects, and music playlists. Similar to Linktree but with enhanced features and customization options.**

---

## ✨ Features

- 🎨 **Multiple Theme Options**: Choose from a variety of color themes to match your personal brand
- 🎵 **Music Player Integration**: Share your favorite playlists with an integrated music player
- 🌓 **Dark/Light Mode**: Automatic theme detection with manual override option
- 📱 **Fully Responsive**: Optimized for all devices from mobile to desktop
- ⚡ **Fast Performance**: Built with Next.js for optimal loading speeds
- 🔗 **Categorized Links**: Organize your links by categories for better navigation
- 💅 **Sleek Animations**: Smooth transitions and interactions using Framer Motion
- 🧩 **Modular Components**: Easy to extend and customize

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/codemeapixel/pixellinks.git
   cd pixellinks
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 🛠️ Project Structure

```
pixellinks/
├── public/              # Static assets
├── src/
│   ├── app/             # Next.js app router pages
│   ├── components/      # Reusable UI components
│   │   ├── layouts/     # Layout components
│   │   │   └── links/   # Link hub specific components
│   │   └── ui/          # Basic UI components
│   ├── context/         # React context providers
│   ├── data/            # Data models and content
│   ├── styles/          # Global styles
│   └── types/           # TypeScript type definitions
└── ...config files
```

## 🎨 Customization

### Modifying Your Profile

Edit the data in `src/data/linksData.ts` to update your profile information, links, and playlists.

### Changing Themes

The application includes multiple built-in themes that can be selected from the theme switcher interface. Users can click the color palette icon to change themes.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgements

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - For styling
- [Framer Motion](https://www.framer.com/motion/) - For animations