import {useState} from 'react';
import type {Post} from './post';
import moment from 'moment';

export const PostList = ({posts}: { posts: Post[] }) => {
    const [postVotes, setPostVotes] = useState<Record<number, { upvotes: number; downvotes: number }>>(
        () => {
            return posts.reduce((acc, post) => ({
                ...acc,
                [post.id]: {upvotes: post.upvotes, downvotes: post.downvotes}
            }), {});
        }
    );

    function upvote(postId: number, defaultValue: number) {
        setPostVotes(prev => {
            return {
                ...prev,
                [postId]: {
                    ...prev[postId],
                    upvotes: (prev[postId]?.upvotes || defaultValue) + 1
                }
            };
        });
    }

    function downvote(postId: number, defaultUpvote: number, defaultDownvote: number) {
        const currentNetVotes = (postVotes[postId]?.upvotes ||defaultUpvote) - (postVotes[postId]?.downvotes || defaultDownvote);

        if (currentNetVotes <= 0) {
            return;
        }

        setPostVotes(prev => {
            return {
                ...prev,
                [postId]: {
                    ...prev[postId],
                    downvotes: (prev[postId]?.downvotes || defaultDownvote) + 1
                }
            };
        });
    }

    return (
        <div className="posts-list">
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <div className="post-item-votes">
                        <div className="post-item-upvote" onClick={() => {
                            upvote(post.id, post.upvotes)
                        }}>
                            <img src="/assets/arrow.svg" alt="Upvote"/>
                        </div>
                        <div>{(postVotes[post.id]?.upvotes || post.upvotes) - (postVotes[post.id]?.downvotes || post.downvotes)}</div>
                        <div className="post-item-downvote">
                            <img src="/assets/arrow.svg" alt="Downvote" onClick={() => {
                                downvote(post.id, post.upvotes, post.downvotes)
                            }}/>
                        </div>
                    </div>
                    <div className="post-item-content">
                        <div className="post-item-title">{post.title}</div>
                        <div className="post-item-details">
                            <div>{moment().to(post.createdAt)}</div>
                            <a href="/member/username"> by {post.username}</a>
                            <div>{post.comments} comments</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
