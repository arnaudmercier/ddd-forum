
import type { Post } from './post';
import moment from 'moment';

export const PostList = ({ posts }: { posts: Post[] }) => {
    function upvote() {
        console.log('upvote');
    }

    function downvote() {
        console.log('downvote');
    }

    return (
        <div className="posts-list">
            {posts.map((post) => (
                <div key={post.id} className="post-item">
                    <div className="post-item-votes">
                        <div className="post-item-upvote" onClick={() => {upvote()}}>
                            <img src="/assets/arrow.svg" alt="Upvote"/>
                        </div>
                        <div>5</div>
                        <div className="post-item-downvote">
                            <img src="/assets/arrow.svg" alt="Downvote" onClick={() => {downvote()}}/>
                        </div>
                    </div>
                    <div className="post-item-content">
                        <div className="post-item-title">{post.title}</div>
                        <div className="post-item-details">
                            <div>{ moment().to(post.createdAt) }</div>
                            <a href="/member/username"> by username </a>
                            <div>comments</div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
