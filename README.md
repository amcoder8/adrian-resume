# Adrian's Professional Resume Website

A modern, responsive one-page resume website built with Astro, React, TypeScript, and Bootstrap 5.

## 🚀 Features

- **Modern Tech Stack**: Built with Astro for performance, React for interactivity, and TypeScript for type safety
- **Responsive Design**: Mobile-first approach using Bootstrap 5
- **Dark/Light Theme**: Toggle between themes with persistent preference storage
- **Smooth Animations**: AOS (Animate On Scroll) library for elegant animations
- **Interactive Components**: Dynamic skill progress bars, contact form with validation
- **SEO Optimized**: Proper meta tags, semantic HTML, and Astro's static generation
- **Accessibility**: WCAG compliant with proper ARIA labels and keyboard navigation
- **Professional Design**: Clean, modern aesthetic suitable for employers

## �️ Tech Stack

- **Framework**: Astro 5.x
- **Frontend**: React 19.x with TypeScript
- **Styling**: Bootstrap 5 + Custom SCSS
- **Animations**: AOS (Animate On Scroll)
- **Icons**: React Icons (Font Awesome, Simple Icons)
- **Fonts**: Google Fonts (Inter, JetBrains Mono)

## 📋 Sections

1. **Hero Section**: Professional header with name, title, and call-to-action buttons
2. **About Section**: Personal introduction with interests and hobbies
3. **Skills Section**: Technical skills with progress bars and categorized display
4. **Contact Section**: Functional contact form with validation

## 🚀 Quick Start

1. **Clone and Install Dependencies**:
   ```bash
   cd "Adrian Resume"
   npm install
   ```

2. **Start Development Server**:
   ```bash
   npm run dev
   ```

3. **Build for Production**:
   ```bash
   npm run build
   ```

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## 📁 Project Structure

```
src/
├── components/           # React components
│   ├── Layout.tsx       # Main layout wrapper
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section
│   ├── About.tsx        # About section
│   ├── Skills.tsx       # Skills section
│   ├── Contact.tsx      # Contact form
│   ├── Footer.tsx       # Footer
│   └── ThemeProvider.tsx # Theme context
├── pages/
│   └── index.astro      # Main page
├── styles/
│   └── main.scss        # Global styles
├── types/
│   └── index.ts         # TypeScript interfaces
└── assets/              # Static assets
```

## 🎨 Customization

### Personal Information
Edit the `personalInfo` object in `src/components/Layout.tsx`:

```typescript
const personalInfo = {
  name: 'Your Name',
  title: 'Your Title',
  tagline: 'Your tagline...',
  email: 'your.email@example.com',
  // ... other details
};
```

### Skills
Modify the `skills` array in `src/components/Skills.tsx`:

```typescript
const skills: Skill[] = [
  { name: 'Your Skill', level: 90, category: 'Category', icon: 'iconName' },
  // ... add more skills
];
```

### Theme Colors
Customize colors in `src/styles/main.scss`:

```scss
:root {
  --primary-color: #your-color;
  --secondary-color: #your-color;
  // ... other custom properties
}
```

### Resume PDF
1. Create your resume in PDF format
2. Name it `resume.pdf`
3. Place it in the `public/` folder

## 🌐 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository to Netlify
2. Build command: `npm run build`
3. Publish directory: `dist`

### Vercel
1. Connect your GitHub repository to Vercel
2. Framework preset: Astro
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages
1. Install the GitHub Pages adapter:
   ```bash
   npx astro add @astrojs/cloudflare
   ```
2. Update `astro.config.mjs` with the adapter
3. Deploy using GitHub Actions

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                | Action                                           |
| :--------------------- | :----------------------------------------------- |
| `npm install`          | Installs dependencies                            |
| `npm run dev`          | Starts local dev server at `localhost:4321`     |
| `npm run build`        | Build your production site to `./dist/`         |
| `npm run preview`      | Preview your build locally, before deploying    |
| `npm run astro ...`    | Run CLI commands like `astro add`, `astro check` |

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit your changes: `git commit -am 'Add feature'`
4. Push to the branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Adrian** - Frontend Developer

- GitHub: [@adrian](https://github.com/adrian)
- LinkedIn: [Adrian](https://linkedin.com/in/adrian)
- Email: adrian@example.com

---

Built with ❤️ using Astro and React
