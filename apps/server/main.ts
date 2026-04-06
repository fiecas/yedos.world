import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/bun-ws";
import { router } from "./router";

Bun.serve({
    port: 3000,
    fetch: () => {
        return new Response("Not Found", { status: 404 });
    },
});

const handler = new RPCHandler(router, {
    interceptors: [
        onError((error) => {
            console.error(error);
        }),
    ],
});

Bun.serve({
    port: 3001,
    fetch(req, server) {
        if (server.upgrade(req)) {
            return;
        }

        return new Response("Upgrade failed", { status: 500 });
    },
    websocket: {
        open(ws) {
            console.log("Running on 3001");
        },
        message(ws, message) {
            handler.message(ws, message, {
                context: {}, // Provide initial context if needed
            });
        },
        close(ws) {
            handler.close(ws);
        },
    },
});
