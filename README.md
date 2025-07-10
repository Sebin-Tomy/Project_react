
# Project_react
A/B Visual Split Comparison Tool

This project provides a simple web-based tool for visually comparing two design/image variants (A and B) — useful for CRO, marketing, or design teams.

Features

1. Upload and preview two images (Variant A and B) side-by-side
2. Detailed comparison view:
3. File name, size, and dimensions
4. Aspect ratio and total pixel count
5. Smart summary comparison
6. Responsive, clean UI using Tailwind CSS
7. Modular code (React + Vite)

Tech Stack


1.React with Hooks
2.Vite
3.Tailwind CSS
4.Lucide Icons



To run locally:
npm run dev

Folder Structure:
src/
├── App/Login/
|         ├── page.jsx
├── Components/
│   ├── badge.jsx
│   ├── button.jsx
│   ├── card.jsx
│   └── separator.jsx
├── contexts/
├── index.css
├── main.jsx

Assumptions:
1.Users will upload valid image formats (PNG, JPG, GIF)
2.Max size supported: ~10MB
3.Files are not saved, only processed in-browser

Future Improvements with time:
1.Drag-and-drop upload support
Allow users to drag and drop images instead of using file inputs.
2.Animated transitions
Smooth UI animations for image rendering, switching views, or replacing images.
3.Image difference (pixel-level) detection
Visual highlighting or diff maps for detecting small differences between variants.
4.Export/download comparison summary
Allow users to export the results (file info, dimension comparison, etc.) as PDF or image.

Live Demo:-
The project is deplyed using vercel
Click here to view the live site-(https://project-react-topaz-seven.vercel.app/)





