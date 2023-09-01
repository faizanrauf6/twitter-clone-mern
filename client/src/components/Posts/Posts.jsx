import React from "react";
import FlipMove from "react-flip-move";
import Post from "../Post/Post";

const Posts = ({ loading, posts, cb }) => {
  return (
    <>
      <FlipMove>
        {!loading && posts.length === 0 ? (
          <h1
            style={{
              justifyContent: "center",
              height: "10vh",
              display: "flex",
              alignItems: "center",
            }}
          >
            No tweets found
          </h1>
        ) : (
          posts.map((post) => (
            <Post
              key={post._id}
              postId={post._id}
              altText={post.content}
              senderId={post.user._id}
              userData={post?.user}
              text={post.content}
              avatar={post.avatar}
              image={post?.image || ""}
              timestamp={post.createdAt}
              likes={post.likes}
              cb={cb}
            />
          ))
        )}
      </FlipMove>
    </>
  );
};

export default Posts;
