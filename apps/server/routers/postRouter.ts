import { os } from "@orpc/server";
import z from "zod";
import {
    createPost,
    deletePost,
    editPost,
    getPost,
    listPosts,
} from "../services/postService";

const corePost = z.object({
    slug: z.string(),
    title: z.string(),
    body: z.string(),
});

export const getPostRouter = os
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
        return await getPost(input.id);
    });

export const listPostRouter = os.handler(async () => {
    return await listPosts();
});

export const createPostRouter = os
    .input(
        z.object({
            data: corePost,
        }),
    )
    .handler(async ({ input }) => {
        return await createPost(input.data);
    });

export const editPostRouter = os
    .input(
        z.object({
            id: z.string(),
            data: corePost.partial(),
        }),
    )
    .handler(async ({ input }) => {
        return await editPost(input.id, input.data);
    });

export const deletePostRouter = os
    .input(z.object({ id: z.string() }))
    .handler(async ({ input }) => {
        return await deletePost(input.id);
    });
