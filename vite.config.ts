import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Remove problematic import
// import { componentTagger } from "lovable-tagger";

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
