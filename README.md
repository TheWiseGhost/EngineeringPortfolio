# Advanced Multi-Sensing Mobility System - Portfolio Website

A professional, modern portfolio website showcasing the Smart Glasses for the Visually Impaired project.

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion**

## Features

- 🎨 Modern, high-tech design aesthetic
- ✨ Smooth animations and page transitions
- 🌊 Dynamic particle field background animation
- 📱 Fully responsive design
- 🎯 Four main pages: Home, Problem Statement, About, and Engineering Notebook

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Configuration

### Google Docs Integration

1. **Problem Statement Page**: Update the iframe src in `app/problem-statement/page.tsx` with your Google Doc embed URL.
   - To get the embed URL: Open your Google Doc → File → Share → Publish to web → Copy the embed URL

2. **Engineering Notebook Page**: Update the URL in `app/notebook/page.tsx` in the `handleOpenNotebook` function with your actual Google Doc URL.

### Placeholder Content

Replace the following placeholder text throughout the site:
- `[INSERT PROBLEM STATEMENT TEXT HERE]` - In Home and Problem Statement pages
- `[INSERT MORE INFO ABOUT THE PROJECT HERE]` - In Home page
- `[INSERT PERSONAL MOTIVATION TEXT HERE]` - In About page
- `[INSERT PORTFOLIO URL HERE]` - In About page

## Project Structure

```
├── app/
│   ├── about/
│   │   └── page.tsx
│   ├── notebook/
│   │   └── page.tsx
│   ├── problem-statement/
│   │   └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── BackgroundAnimation.tsx
│   └── Navigation.tsx
└── ...
```

## Build

To create a production build:

```bash
npm run build
npm start
```

