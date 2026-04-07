import { file } from "bun";
import { watch } from "fs";
import { resolve } from "path";
import { build } from "./build";

const rootDir = resolve(import.meta.dir, "..");

await build();
const watcher = watch(
    rootDir,
    {
        recursive: true,
    },
    (event, filename) => {
        if (filename?.startsWith("generated/")) return;
        console.log(`Detected ${event} in ${filename}`);
        build();
    },
);

Bun.spawn({
    cmd: ["bun", import.meta.dir + "/../generated/**/*.html"],
});

process.on("SIGINT", () => {
    // close watcher when Ctrl-C is pressed
    console.log("Closing watcher...");
    watcher.close();

    process.exit(0);
});
