const path = require("path");
const { getDefaultConfig } = require("expo/metro-config");

const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, "..");

const config = getDefaultConfig(projectRoot);

// Watch the workspace (so local packages can be imported)
config.watchFolders = [workspaceRoot];

// Always resolve modules from the APP's node_modules first,
// then fall back to the workspace root (for hoisted deps).
config.resolver.nodeModulesPaths = [
  path.join(projectRoot, "node_modules"),
  path.join(workspaceRoot, "node_modules"),
];

module.exports = config;
