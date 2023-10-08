import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "process.env": {},
  //   global: {},
  //   "window.global": {},
  //   Buffer: Buffer,
  //   Uint8Array: Uint8Array,
  // },
});
