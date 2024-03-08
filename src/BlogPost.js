import React, { useState } from 'react';
import './BlogPost.css'; // Import your CSS file

function BlogPost({ post }) {
    const [showContent, setShowContent] = useState(false);

    const handleReadMore = () => {
        setShowContent(!showContent);
    };

    return (
        <div className="blog-post p-4 border rounded mt-4 shadow-lg">
            <h2 className="text-2xl font-bold mb-4">{post.title} by Dr. {post.author.username}</h2>
            <img src={post.image} alt={post.title} className="blog-image w-full h-64 object-cover rounded-md mb-4 cursor-pointer" onClick={handleReadMore} />
            <p className="text-gray-700 mb-4">{post.summary}</p>
            {showContent && <div className="text-gray-800" dangerouslySetInnerHTML={{ __html: post.content }}></div>}
            <button className="text-blue-500 hover:underline" onClick={handleReadMore}>
                {showContent ? 'Read less' : 'Read more'}
            </button>
        </div>
    );
}

export default BlogPost;
