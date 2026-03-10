export interface Post {
    id: number;
    title: string;
    content: string;
    memberId: number;
    createdAt: string;
    username: string;
    upvotes: number;
    downvotes: number;
    comments: number;
}
