// vite.config.ts
import path from "path";
import react from "file:///D:/New%20Projects/Zonta/botAppUi/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { defineConfig } from "file:///D:/New%20Projects/Zonta/botAppUi/node_modules/vite/dist/node/index.js";
import { nodePolyfills } from "file:///D:/New%20Projects/Zonta/botAppUi/node_modules/vite-plugin-node-polyfills/dist/index.js";
var __vite_injected_original_dirname = "D:\\New Projects\\Zonta\\botAppUi";
var vite_config_default = defineConfig({
  plugins: [react(), nodePolyfills()],
  resolve: {
    alias: {
      "@": path.resolve(__vite_injected_original_dirname, "./src")
    }
  }
  // server: {
  //   proxy: {
  //     "/api": {
  //       target: "http://clicker-game-api.me",
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJEOlxcXFxOZXcgUHJvamVjdHNcXFxcWm9udGFcXFxcYm90QXBwVWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkQ6XFxcXE5ldyBQcm9qZWN0c1xcXFxab250YVxcXFxib3RBcHBVaVxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRDovTmV3JTIwUHJvamVjdHMvWm9udGEvYm90QXBwVWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tIFwicGF0aFwiO1xyXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCI7XHJcbmltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gXCJ2aXRlXCI7XHJcbmltcG9ydCB7IG5vZGVQb2x5ZmlsbHMgfSBmcm9tIFwidml0ZS1wbHVnaW4tbm9kZS1wb2x5ZmlsbHNcIjtcclxuXHJcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXHJcbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XHJcbiAgcGx1Z2luczogW3JlYWN0KCksIG5vZGVQb2x5ZmlsbHMoKV0sXHJcbiAgcmVzb2x2ZToge1xyXG4gICAgYWxpYXM6IHtcclxuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXHJcbiAgICB9LFxyXG4gIH0sXHJcbiAgLy8gc2VydmVyOiB7XHJcbiAgLy8gICBwcm94eToge1xyXG4gIC8vICAgICBcIi9hcGlcIjoge1xyXG4gIC8vICAgICAgIHRhcmdldDogXCJodHRwOi8vY2xpY2tlci1nYW1lLWFwaS5tZVwiLFxyXG4gIC8vICAgICAgIGNoYW5nZU9yaWdpbjogdHJ1ZSxcclxuICAvLyAgICAgfSxcclxuICAvLyAgIH0sXHJcbiAgLy8gfSxcclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1IsT0FBTyxVQUFVO0FBQ3ZTLE9BQU8sV0FBVztBQUNsQixTQUFTLG9CQUFvQjtBQUM3QixTQUFTLHFCQUFxQjtBQUg5QixJQUFNLG1DQUFtQztBQU16QyxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztBQUFBLEVBQ2xDLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssS0FBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBU0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
