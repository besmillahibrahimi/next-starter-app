This is a [Next.js](https://nextjs.org/) app router starter project. It has some basic and infrastructure configs/setup to save your time.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Folder Structure
```plain/text
your-project/  
|── public/      // Static assets (images, fonts)  
|── src/  
|   ├── app/  
|   │   ├── layout.tsx  // Base layout for your application pages  
|   │   └── page.tsx    // Default page component  
|   │  
|   ├── components/  // Reusable UI components  
│   │   ├── atoms/   // Basic building blocks (buttons, icons, etc.)  
│   │   ├── molecules/  // Groups of atoms (forms, navigation, etc.)  
│   │   └── organisms/  // More complex components (cards, modals, etc.)  
|   │  
│   ├── styles/   
│   │   ├── globals.css  // Global styles for your entire application  
│   │   └── theme.js     // Theme configuration (colors, fonts, etc.)  
|   │  
│   ├── locales/     // Internationalization files  
│   │   ├── en/        // English language files  
│   │   │   └── messages.json  
│   │   └── fr/        // French language files (and so on)  
│   │       └── messages.json    
|   │  
│   ├── configs/      // Configuration files (app settings, environment variables)  
│   │   └── next.config.js  
|   │  
│   ├── api/         // RESTful API routes (server-side logic)  
│   │   └── ...your_api_routes.js...  
|   │  
│   ├── utils/        // Utility functions and helpers  
│   │   └── ...your_utility_functions.js...  
|   │  
│   └── hooks/        // Custom React hooks (optional)  
│       └── ...your_custom_hooks.js...  
├── package.json  
└── ...other project files...  
```
