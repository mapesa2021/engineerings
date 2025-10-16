<<<<<<< HEAD
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
=======
# Olerum Engineering 🌱

A modern, responsive website built with Next.js, TypeScript, and Tailwind CSS for environmental engineering and sustainability projects.

## Features

- 🌿 **Modern Design**: Clean, professional interface with smooth animations
- 📱 **Responsive**: Works perfectly on all devices
- ⚡ **Fast Performance**: Optimized for speed and SEO
- 🔧 **Admin Panel**: Easy content management system
- 📝 **Blog System**: Dynamic blog with markdown support
- 🌳 **Project Showcase**: Beautiful project galleries
- 📧 **Contact Forms**: Integrated contact and newsletter systems
- 💳 **Payment Integration**: Secure donation and payment processing

## Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd olerum-engineering/
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
olerum-engineering/
├── components/          # Reusable React components
├── pages/              # Next.js pages and routing
├── styles/             # Global styles and Tailwind config
├── public/             # Static assets
├── lib/                # Database and utility functions
├── hooks/              # Custom React hooks
└── utils/              # Helper functions
```

## Admin Panel

Access the admin panel at `/admin` with:
- **Username**: `admin`
- **Password**: `olerum2024`

## Deployment

The project is configured for easy deployment to:
- Netlify
- Vercel
- Any static hosting provider

## Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Supabase** - Database and authentication
- **React Hot Toast** - Notifications

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.

---

Built with ❤️ for environmental sustainability and engineering excellence. # engineering
>>>>>>> 9c54f16c83725b749e0a47f0a4fda0964b83b1b6

```
# Addiction Recovery App

This is a React application built with Vite for helping people overcome addiction.

## Deployment Requirements

### Node.js Version
This project requires Node.js version 20.19.0 or higher. Vite 7.x requires this version.

For local development with nvm:
```bash
nvm use
```

### Environment Variables
The following environment variables are required for deployment:
- `ZENOPAY_API_KEY` - API key for the Zeno payment system

### Netlify Deployment
This project is configured for deployment on Netlify with the following settings:
- Build command: `npm run build`
- Publish directory: `dist`
- Node.js version: 20.19.0

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Troubleshooting

### Node.js Version Issues
If you encounter Node.js version errors, ensure you're using Node.js 20.19.0 or higher:
```bash
node --version
```

### Build Issues
If you encounter build errors related to Rollup modules, they are typically platform-specific optional dependencies that can be safely ignored on macOS.
