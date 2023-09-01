const path = require("path");

const buildEslintCommand = (filenames) =>
  `next lint --fix --file ${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}`;

const buildTscCommand = () => {
  return "tsc --noEmit -p tsconfig.json";
};

module.exports = {
  "*.{js,cjs,mjs,ts,tsx}": ["prettier --write --", buildEslintCommand],
  "*.{json,md,mdx,yaml,yml}": ["prettier --write --"],
  "*.{ts,tsx}": [buildTscCommand],
  "*.prisma": ["prisma format"],
};
