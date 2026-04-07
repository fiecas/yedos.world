import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('svelte').Config} */
const config = {
    preprocess: vitePreprocess({ script: true }),
};

export default config;
