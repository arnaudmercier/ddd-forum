import {Comment, Member, Post, User, Vote} from "@prisma/client";

export interface PostDto {
    id: number;
    title: string;
    content: string;
    postType: string;
    dateCreated: string;
    username: string;
    votes: number;
    comments: number;
}

export type PostWithIncludes = Post & {
    memberPostedBy: Member & {
        user: User;
    };
    votes: Vote[];
    comments: Comment[];
};
