import {PrismaClient} from "@prisma/client";
import {PrismaPg} from "@prisma/adapter-pg";

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL,
});
const prisma = new PrismaClient({adapter});

const initialUsers = [
    {
        email: "bobvance@gmail.com",
        firstName: "Bob",
        lastName: "Vance",
        username: "bobvance",
        password: '123'
    },
    {
        email: "tonysoprano@gmail.com",
        firstName: "Tony",
        lastName: "Soprano",
        username: "tonysoprano",
        password: '123'
    },
    {
        email: "billburr@gmail.com",
        firstName: "Bill",
        lastName: "Burr",
        username: "billburr",
        password: '123'
    },
];

let createdUsers: any[] = [];
let createdMembers: any[] = [];

const initialPosts = [
    {
        title: 'First post!',
        content: "This is bob vances first post",
        postType: "Text",
        dateCreated: new Date(),
    },
    {
        title: 'Second post!',
        content: "This is bobs second post",
        postType: "Text",
        dateCreated: new Date(),
    },
    {
        title: 'another post',
        content: "This is tonys first post",
        postType: "Text",
        dateCreated: new Date(),
    },
    {
        title: 'Links',
        content: "This is a link post",
        postType: "<https://khalilstemmler.com>",
        dateCreated: new Date(),
    },
];

async function seed() {
    console.log('Starting database seeding...');

    for (let i = 0; i < initialUsers.length; i++) {
        const user = initialUsers[i];
        console.log(`Creating user: ${user.username}`);

        const newUser = await prisma.user.create({
            data: user
        });
        createdUsers.push(newUser);

        console.log(`Creating member for user: ${user.username}`);
        const newMember = await prisma.member.create({
            data: {
                user: {
                    connect: {id: newUser.id},
                },
            },
        });
        createdMembers.push(newMember);
    }

    const postsWithMembers = [
        { ...initialPosts[0], memberId: createdMembers[0].id }, // Bob's first post
        { ...initialPosts[1], memberId: createdMembers[0].id }, // Bob's second post
        { ...initialPosts[2], memberId: createdMembers[1].id }, // Tony's first post
        { ...initialPosts[3], memberId: createdMembers[1].id }, // Tony's link post
    ];

    const createdPosts = [];
    for (const post of postsWithMembers) {
        console.log(`Creating post: ${post.title}`);
        const newPost = await prisma.post.create({
            data: post,
        });
        createdPosts.push(newPost);
    }

    const initialPostVotes = [
        {postId: createdPosts[0].id, voteType: 'Upvote', memberId: createdMembers[0].id}, // Bob upvotes his first post
        {postId: createdPosts[1].id, voteType: 'Upvote', memberId: createdMembers[0].id}, // Bob upvotes his second post
        {postId: createdPosts[2].id, voteType: 'Upvote', memberId: createdMembers[1].id}, // Tony upvotes his first post
        {postId: createdPosts[3].id, voteType: 'Upvote', memberId: createdMembers[1].id}, // Tony upvotes his link post

        {postId: createdPosts[2].id, voteType: 'Upvote', memberId: createdMembers[0].id}, // Bob upvotes Tony's post

        {postId: createdPosts[1].id, voteType: 'Downvote', memberId: createdMembers[2].id}, // Bill downvotes Bob's second post
    ];

    for (const vote of initialPostVotes) {
        console.log(`Creating vote: ${vote.voteType} on post ${vote.postId} by member ${vote.memberId}`);
        await prisma.vote.create({
            data: vote,
        });
    }

    const initialPostComments = [
        {text: 'I posted this!', memberId: createdMembers[0].id, postId: createdPosts[0].id, parentCommentId: null},
        {text: 'Nice', memberId: createdMembers[1].id, postId: createdPosts[1].id, parentCommentId: null}
    ];

    for (const comment of initialPostComments) {
        console.log(`Creating comment: ${comment.text}`);
        await prisma.comment.create({
            data: comment,
        });
    }

    console.log('Database seeding completed successfully!');
}

seed().catch((error) => {
    console.error('Error during seeding:', error);
    process.exit(1);
});
