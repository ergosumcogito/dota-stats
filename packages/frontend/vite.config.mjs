import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
    plugins: [
        react(),
        tailwindcss(),
    ],
    resolve: {
        alias: {
         assets: path.resolve(__dirname, './src/assets'),
         components: path.resolve(__dirname, 'src/components'),
         hooks: path.resolve(__dirname, 'src/hooks'),
         pages: path.resolve(__dirname, 'src/pages'),
         services: path.resolve(__dirname, 'src/services'),
         utils: path.resolve(__dirname, 'src/utils'),
        }
    }

});