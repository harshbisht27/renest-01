import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  define: {
    // This will make sure your environment variables are accessible in your code
    'process.env': process.env,
  },
});
