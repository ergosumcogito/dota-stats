import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        react()
    ],
    test: {
        environment: 'jsdom',
        globals: true,
        include: ['src/tests/**/*.{test,spec}.{js,ts,jsx,tsx}'],
        setupFiles: 'src/setupTests.js',
    },
});
