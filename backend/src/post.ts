import {Comment, Member, Post, User, Vote} from "@prisma/client";

export interface PostDto {
    id: number;
    title: string;
    content: string;
    postType: string;
    createdAt: string;
    username: string;
    upvotes: number;
    downvotes: number;
    comments: number;
}

export type PostWithIncludes = Post & {
    memberPostedBy: Member & {
        user: User;
    };
    votes: Vote[];
    comments: Comment[];
};
