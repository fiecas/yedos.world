import { rpc } from "../lib/rpc";

const blogContent = document.getElementById("blog-content");
if (blogContent)
    rpc.post.list().then((posts) => {
        const createEntry = (slug: string, title: string) => {
            const entryEl = document.createElement("div");

            const titleEl = document.createElement("a");
            titleEl.innerText = title;
            titleEl.href = `/blog/${slug}`;
            entryEl.appendChild(titleEl);

            return entryEl;
        };

        blogContent.innerHTML = "";
        if (posts.length == 0) blogContent.innerText = "No posts";
        else
            posts.forEach((post) => {
                blogContent.appendChild(createEntry(post.slug, post.title));
            });
    });
