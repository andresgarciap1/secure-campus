import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Configuración idéntica a la plantilla de INF-133 con React y Tailwind CSS v4
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
});
