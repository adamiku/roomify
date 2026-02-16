# Roomify

AI-powered room design and visualization tool that transforms floor plans into stunning 3D renderings.

🌐 **Live Demo:** [https://roomifyy-qejdt.puter.site/](https://roomifyy-qejdt.puter.site/)

## Features

- 🎨 **AI 3D Visualization** - Transform floor plans into photorealistic 3D renders
- 📤 **Image Upload** - Supports JPG/PNG formats up to 10MB
- 🔄 **Before/After Comparison** - Interactive slider to compare original and rendered images
- 💾 **Project Management** - Save and organize multiple design projects
- 📥 **Image Export** - Download rendered visualizations
- ☁️ **Cloud Storage** - Powered by Puter.js for seamless data persistence
- ⚡️ **Real-time Rendering** - Live generation feedback with processing indicators

## Tech Stack

- **Frontend Framework:** React 19 + React Router 7
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4
- **Backend/Storage:** Puter.js
- **Build Tool:** Vite
- **UI Components:**
  - Lucide React (icons)
  - react-compare-slider (comparison tool)

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

App available at `http://localhost:5173`

### Production Build

```bash
npm run build
npm run start
```

## Project Structure

```
├── app/
│   ├── routes/
│   │   ├── home.tsx              # Landing page & project list
│   │   └── visualizer.$id.tsx    # 3D visualization editor
│   ├── components/
│   │   ├── Upload.tsx            # File upload component
│   │   └── ui/                   # Reusable UI components
│   └── lib/
│       ├── ai.action.ts          # AI generation logic
│       └── puter.action.ts       # Storage/project management
└── build/
    ├── client/                    # Static assets
    └── server/                    # SSR server code
```

## Deployment

Currently deployed on Puter.site. For custom deployments, build and serve the SSR application:

```bash
npm run build
npm run start
```

---

Built with ❤️ using React Router and Puter.js
