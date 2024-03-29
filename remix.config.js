/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  ignoredRouteFiles: [".*"],
  appDirectory: "app",
  assetsBuildDirectory: "public/build",
  // serverBuildPath: "api/_build",
  // serverBuildTarget: "vercel",
  publicPath: "/build/",
  // devServerPort: 8002,
  future: {
    v2_normalizeFormMethod: true,
    v2_meta: true,
    v2_headers: true,
    v2_errorBoundary: true,
  },
  // serverModuleFormat: "esm",
};
