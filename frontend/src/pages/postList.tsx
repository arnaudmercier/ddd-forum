import {useState} from 'react';
import type {Post} from './post';
import moment from 'moment';

export const PostList = ({posts}: { posts: Post[] }) => {
    const [postVotes, setPostVotes] = useState<Record<number, { upvotes: number; downvotes: number }>>(
        () => {
            return posts.reduce((acc, post) => ({
                ...acc,
                [post.id]: {upvotes: post.upvotes || 0, downvotes: post.downvotes || 0}
            }), {});
        }
    );

    function upvote(postId: number) {
        setPostVotes(prev => {
            return {
                ...prev,
                [postId]: {
                    ...prev[postId],
                    upvotes: (prev[postId]?.upvotes || 0) + 1
                }
            };
        });
    }

    function downvote(postId: number) {
        const currentNetVotes = (postVotes[postId]?.upvotes || 0) - (postVotes[postId]?.downvotes || 0);

        if (currentNetVotes <= 0) {
            return;
        }

        setPostVotes(prev => {
            return {
                ...prev,
                [postId]: {
                    ...prev[postId],
                    downvotes: (prev[postId]?.downvotes || 0) + 1
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
                            upvote(post.id)
                        }}>
                            <img src="/assets/arrow.svg" alt="Upvote"/>
                        </div>
                        <div>{(postVotes[post.id]?.upvotes || 0) - (postVotes[post.id]?.downvotes || 0)}</div>
                        <div className="post-item-downvote">
                            <img src="/assets/arrow.svg" alt="Downvote" onClick={() => {
                                downvote(post.id)
                            }}/>
                        </div>
                    </div>
                    <div className="post-item-content">
                        <div className="post-item-title">{post.title}</div>
                        <div className="post-item-details">
                            <div>{moment().to(post.createdAt)}</div>
                            <a href="/member/username"> by username </a>
                            <div>comments</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
