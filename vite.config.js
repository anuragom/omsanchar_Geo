// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5000,  // Set default port to 5000
    allowedHosts: [
      'trackinguat.omlogistics.co.in',  // Add your specific host here
      // You can add other allowed hosts if needed
    ],
  },
});
