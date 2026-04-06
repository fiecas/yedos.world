import {
    createPostRouter,
    deletePostRouter,
    editPostRouter,
    getPostRouter,
    listPostRouter,
} from "./routers/postRouter";

export const router = {
    post: {
        get: getPostRouter,
        list: listPostRouter,
        create: createPostRouter,
        edit: editPostRouter,
        delete: deletePostRouter,
    },
};
