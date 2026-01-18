Shield: [![CC BY-NC-SA 4.0][cc-by-nc-sa-shield]][cc-by-nc-sa]

# Nekaslinasebe

Website of the Nekaslinasebe project - a mental health tips platform built with React and TypeScript.

## Technology Stack

- **React 18** - Modern UI library for building component-based interfaces
- **TypeScript** - Type-safe JavaScript for better development experience
- **Vite** - Fast build tool and development server
- **React Router** - Client-side routing
- **Bootstrap 5** - CSS framework for styling
- **AOS** - Animate On Scroll library

## Development

### Prerequisites

- Node.js (v18 or higher)
- npm

### Installation

```bash
npm install
```

### Development Server

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Production Build

Build the application for production:

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
nekaslinasebe/
├── src/
│   ├── components/      # Reusable React components
│   │   ├── Layout.tsx
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   └── TipCard.tsx
│   ├── pages/           # Page components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── ArchivePage.tsx
│   │   ├── ContactPage.tsx
│   │   ├── WeekPlannerPage.tsx
│   │   ├── WorkshopPage.tsx
│   │   └── TipDetailPage.tsx
│   ├── hooks/           # Custom React hooks
│   │   └── useTips.ts
│   ├── types/           # TypeScript type definitions
│   │   └── tips.ts
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
├── public/              # Static assets
│   ├── assets/          # CSS, images, vendor files
│   ├── data/            # JSON data files
│   └── tips/            # Tip HTML content
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies and scripts
```

## Features

- **Current Week Tips**: Homepage displays 6 tips for the current week
- **Archive**: Browse all historical tips organized by week
- **Week Planner**: Generate random tip selections for personalized planning
- **Responsive Design**: Works on all device sizes
- **Type Safety**: Full TypeScript support for better code quality
- **Fast Development**: Vite provides instant HMR for rapid development

## Based on MyPortfolio template

Template Name: MyPortfolio
Template URL: https://bootstrapmade.com/myportfolio-bootstrap-portfolio-website-template/
Author: BootstrapMade.com
License: https://bootstrapmade.com/license/

[![CC BY-NC-SA 4.0][cc-by-nc-sa-image]][cc-by-nc-sa]
