import React, { useState, useEffect, useRef } from "react";
import TweetBox from "../TweetBox/TweetBox";
import Posts from "../Posts/Posts";
import { Avatar } from "@mui/material";
import Loader from "../../elements/Loader/Loader";
import "./Feed.css";

import { useStateValue } from "../../contexts/StateContextProvider";
import request from "../../utils/request";
import { api } from "../../constants";

const Feed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false); // Add a fetching state
  const [totalPages, setTotalPages] = useState(null); // Add a state for tracking data availability
  const containerRef = useRef(null);

  const getAllTweets = async () => {
    setLoading(true);
    try {
      const response = await request.get(api.tweet.getAll(page));
      const newTweets = response.data.data.tweets;
      setPosts(newTweets);
      setTotalPages(response.data.data.totalPages);
    } catch (error) {
      // Handle error
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
      setIsFetching(false); // Reset fetching state after request is complete
    }
  };

  useEffect(() => {
    getAllTweets();
  }, [page]);

  const handleScroll = () => {
    const feedContainer = containerRef.current;
    if (
      feedContainer.scrollHeight - feedContainer.scrollTop ===
      feedContainer.clientHeight
    ) {
      if (!isFetching) {
        setIsFetching(true);
      }
    }
  };

  useEffect(() => {
    const feedContainer = containerRef.current;
    feedContainer.addEventListener("scroll", handleScroll);
    return () => {
      feedContainer.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Trigger fetching new data when isFetching changes
  useEffect(() => {
    if (isFetching && page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [isFetching, totalPages]);

  return (
    <div className="feed" ref={containerRef}>
      <div className="feed__header">
        <div className="feed__header-ava">
          <Avatar />
        </div>
        <h2>Home</h2>
      </div>

      <TweetBox cb={getAllTweets} />

      {loading && (
        <div className="feed__loader">
          <Loader />
        </div>
      )}

      <Posts loading={loading} posts={posts} cb={getAllTweets} />
    </div>
  );
};

export default Feed;
