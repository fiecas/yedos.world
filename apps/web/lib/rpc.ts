import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/websocket";
import type { RouterClient } from "@orpc/server";
import { WebSocket as WS } from "partysocket";
import type { router } from "../../server/router";

const websocket = new WS(process.env.PUBLIC_WS_URL ?? "");

const link = new RPCLink({ websocket: websocket as any as WebSocket });

export const rpc: RouterClient<typeof router> = createORPCClient(link);
