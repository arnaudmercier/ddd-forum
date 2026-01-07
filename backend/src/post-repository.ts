import {PrismaPg} from "@prisma/adapter-pg";
import {Config} from "./config";
import {PrismaClient, Vote} from "@prisma/client";
import {PostDto, PostWithIncludes} from "./post";

export class PostRepository {
    private prisma: PrismaClient;

    constructor(config: Config) {
        const adapter = new PrismaPg({
            connectionString: config.databaseUrl,
        });
        this.prisma = new PrismaClient({adapter});
    }

    async findPosts(): Promise<PostDto[]> {
        try {
            const posts = await this.prisma.post.findMany(
                {
                    include: {
                        memberPostedBy: {
                            include: {
                                user: true
                            }
                        },
                        votes: true,
                        comments: true
                    },
                    orderBy: {dateCreated: 'desc'}
                }
            );
            return posts.map(post => this.transformToPostDto(post));
        } catch (error) {
            console.error('Error finding posts', error);
            throw error;
        }
    }

    private transformToPostDto(post: PostWithIncludes): PostDto {
        const upvotes = post.votes.filter((vote: Vote) => vote.voteType === 'Upvote').length;
        const downvotes = post.votes.filter((vote: Vote) => vote.voteType === 'Downvote').length;

        return {
            id: post.id,
            title: post.title,
            content: post.content,
            postType: post.postType,
            dateCreated: post.dateCreated.toISOString(),
            username: post.memberPostedBy.user.username,
            votes: upvotes - downvotes,
            comments: post.comments.length
        };
    }

}


