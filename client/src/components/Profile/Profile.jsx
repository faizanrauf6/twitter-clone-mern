import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Posts from '../Posts/Posts';
import TabbarMenu from '../../elements/TabbarMenu/TabbarMenu';
import ProfileTheme from '../ProfileTheme/ProfileTheme';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ArrowBackOutlinedIcon from '@mui/icons-material/ArrowBackOutlined';
import Loader from '../../elements/Loader/Loader';

import '../Feed/Feed.css';
import request from '../../utils/request';
import { api } from '../../constants';

const Feed = () => {
  const { username } = useParams();
  const history = useNavigate();
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({});

  const getAllTweetsOfUser = async () => {
    setLoading(true);
    try {
      const response = await request.get(api.tweet.getAllByUser(username));
      setPosts(response.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const getAllLikedTweetsOfUser = async () => {
    setLoading(true);
    try {
      const response = await request.get(
        api.tweet.getAllLikedTweetsByUser(username)
      );
      setLikedPosts(response.data.data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const postsCallback = () => {
    getAllTweetsOfUser();
    getAllLikedTweetsOfUser();
  };

  const items = [
    {
      id: 0,
      title: 'Tweets',
      item: (
        <>
          <Posts posts={posts} cb={postsCallback} />
        </>
      ),
    },
    {
      id: 1,
      title: 'Likes',
      item: (
        <>
          <Posts posts={likedPosts} cb={postsCallback} />
        </>
      ),
    },
  ];

  const getUserDetail = async () => {
    setLoading(true);
    try {
      const response = await request.get(api.auth.view(username));
      setProfile(response.data.data);
    } catch (error) {
      if (error.response) {
        history('/');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserDetail();
    postsCallback();
  }, [username]);

  return (
    <>
      {loading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            flex: '1',
            alignItems: 'center',
          }}
        >
          <Loader />{' '}
        </div>
      ) : (
        <div className='feed'>
          <div className='profile__header'>
            <div
              className='profile__backArrow'
              onClick={() => history.goBack()}
            >
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

          <ProfileTheme profile={profile} cb={getUserDetail} />

          <TabbarMenu items={items} />
        </div>
      )}
    </>
  );
};

export default Feed;
