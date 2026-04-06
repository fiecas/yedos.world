import { db } from "../db";

type Post = {
    slug: string;
    title: string;
    body: string;
};

export const getPost = async (id: string) => {
    return await db.post.findFirst({ where: { id } });
};

export const listPosts = async () => {
    return await db.post.findMany();
};

export const createPost = async (data: Post) => {
    return await db.post.create({ data });
};

export const editPost = async (id: string, data: Partial<Post>) => {
    return await db.post.update({
        where: {
            id,
        },
        data,
    });
};

export const deletePost = async (id: string) => {
    return await db.post.delete({ where: { id } });
};
