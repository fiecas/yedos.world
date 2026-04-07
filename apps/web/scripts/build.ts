import { exists, mkdir, readdir, rm } from "node:fs/promises";
import path from "node:path";
import { render } from "svelte/server";
import { createServer } from "vite";

process.env.NODE_ENV = "production";

export const build = async () => {
    const doc = await Bun.file("./apps/web/layout.html").text();
    const document = (head: string, body: string, base: string) => {
        return doc
            .replaceAll("%base%", base)
            .replace("%head%", head)
            .replace("%body%", body);
    };

    const files = await readdir("./apps/web/routes", { recursive: true });
    const svelteFiles = files.filter((fileName) =>
        fileName.toLowerCase().trim().endsWith(".svelte"),
    );
    const vite = await createServer({
        mode: "production",
        server: { middlewareMode: true, hmr: false },
        appType: "custom",
    });

    await Promise.all(
        svelteFiles.map(async (fileName) => {
            const routePath = path.posix.join("routes", fileName);
            const component = await vite.ssrLoadModule(
                `./apps/web/${routePath}`,
            );
            const { head, body } = render(component.default);

            const normalizedRoute = fileName
                .toLowerCase()
                .trim()
                .endsWith("index.svelte")
                ? fileName.slice(0, fileName.length - "index.svelte".length)
                : fileName.slice(0, fileName.length - ".svelte".length);
            const outputDir = path.join(
                "apps",
                "web",
                "generated",
                normalizedRoute,
            );
            const routeSegments = normalizedRoute.split("/").filter(Boolean);
            const base = "../".repeat(routeSegments.length + 1).slice(0, -1);

            await mkdir(outputDir, { recursive: true });
            await Bun.write(
                path.join(outputDir, "index.html"),
                document(head, body, base),
            );
        }),
    );

    await vite.close();

    if (await exists("./dist/web"))
        await rm("./dist/web", { recursive: true, force: true });

    const generatedFiles = await readdir("./apps/web/generated", {
        recursive: true,
    }).then((f) =>
        f
            .filter((filePath) =>
                filePath.toLocaleLowerCase().endsWith(".html"),
            )
            .map((filePath) => "./apps/web/generated/" + filePath),
    );
    Bun.build({
        entrypoints: generatedFiles,
        minify: true,
        splitting: true,
        outdir: "./dist/web",
    });
};

if (import.meta.main) build();
