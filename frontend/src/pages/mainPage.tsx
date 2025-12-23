import {Layout} from "./layout.tsx";
import {PostList} from "./postList.tsx";
import type {Post} from "./post.ts";

export const MainPage = () => {
    const post1: Post = {
        id: 1,
        title: "First Post",
        content: "This is the content of the first post.",
        memberId: 1,
        createdAt: "2025-12-01T12:00:00Z"
    };
    const post2: Post = {
        id: 2,
        title: "Second Post",
        content: "This is the content of the second post.",
        memberId: 1,
        createdAt: "2025-07-01T12:00:00Z"
    };
    const posts: Post[] = [post1, post2];

    return (
        <Layout>
            <PostList posts={posts}/>
        </Layout>
    )
}
