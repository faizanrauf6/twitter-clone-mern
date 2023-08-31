import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "../Posts/Posts";
import TabbarMenu from "../../elements/TabbarMenu/TabbarMenu";
import ProfileTheme from "../ProfileTheme/ProfileTheme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import Loader from "../../elements/Loader/Loader";

import "../Feed/Feed.css";

const Feed = () => {
  const { username } = useParams();
  const history = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const initProfile = {
    bio: "",
    displayName: "",
    followers: [],
    following: [],
    id: "",
    location: "",
    photoURL: "",
    username: "",
    wallpaper: "",
    website: "",
  };
  const [profile, setProfile] = useState(initProfile);

  const items = [
    {
      id: 0,
      title: "Tweets",
      item: (
        <>
          {loading && (
            <div className='feed__loader'>
              <Loader />
            </div>
          )}
          <Posts posts={posts} />
        </>
      ),
    },
    {
      id: 1,
      title: "Likes",
      item: <></>,
    },
  ];

  return (
    <div className='feed'>
      <div className='profile__header'>
        <div className='profile__backArrow' onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon />
        </div>
        <div className='profile__title'>
          <div className='profile__title_title'>
            <h2>{profile && profile.displayName}</h2>
            <CheckCircleIcon />
          </div>
          <span>{posts && posts.length} tweets</span>
        </div>
      </div>

      <ProfileTheme profile={profile} />

      <TabbarMenu items={items} />
    </div>
  );
};

export default Feed;
