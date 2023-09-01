import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router';

import CloseIcon from '@mui/icons-material/Close';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import InsertLinkIcon from '@mui/icons-material/InsertLink';
import PlaceIcon from '@mui/icons-material/Place';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MailOutlineIcon from '@mui/icons-material/MailOutline';

import Spinner from '../../elements/Spinner/Spinner';
import { useStateValue } from '../../contexts/StateContextProvider';

import './ProfileTheme.css';
import { convertTimestampToDate } from '../../helpers/convertTimestamptoDate';
import request from '../../utils/request';
import { api } from '../../constants';

const ProfileTheme = ({ profile, cb }) => {
  const [{ user }] = useStateValue();
  const { username } = useParams();
  let isMe = (profile && profile._id) === user._id ? true : false;
  const [isUpdating, setIsUpdating] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const [openImage, setOpenImage] = useState(false);
  const [imgsrc, setImgsrc] = useState('');
  const onClickImage = (img) => {
    setImgsrc(img);
    setOpenImage(true);
  };

  const follow = async (userId) => {
    try {
      const response = await request.post(api.auth.follow(userId));
      cb();
    } catch (error) {
    } finally {
    }
  };

  const unfollow = async (userId) => {
    try {
      const response = await request.post(api.auth.unFollow(userId));
      cb();
    } catch (error) {
    } finally {
    }
  };

  useEffect(() => {
    if (profile) {
      if (!isMe) {
        setIsFollowing(profile.followers.includes(user._id));
      }
    }
  }, [profile]);

  return (
    <>
      <div className='userProfile'>
        <div
          className='userProfile__theme'
          style={{
            backgroundImage: `url('/src/assets/backdrop4.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: '0px',
          }}
        >
          <div className='photoWrapper'>
            <img
              src={'/src/assets/backdrop4.jpg'}
              alt={'Profile image'}
              onClick={() => onClickImage(profile.photoURL)}
            />
          </div>
        </div>

        <div className='infoWrapper'>
          <div className='userProfile__actions'>
            <div className='moreWrapper'>
              <MoreHorizIcon />
            </div>
            {!isMe && (
              <div className='mailWrapper'>
                <MailOutlineIcon />
              </div>
            )}
            {isMe ? (
              <div className='followWrapper'>Edit Profile</div>
            ) : isFollowing ? (
              <div
                className='followWrapper'
                onClick={() => unfollow(profile._id)}
              >
                Followed
              </div>
            ) : (
              <div
                className='followWrapper'
                onClick={() => follow(profile._id)}
              >
                Follow
              </div>
            )}
          </div>

          <h2>{profile && profile.displayName}</h2>
          {username && <span>{`@${username}`}</span>}
          {profile && <p>{profile.bio}</p>}

          <div className='bioInfo'>
            {profile && profile.location && (
              <div>
                {' '}
                <PlaceIcon /> <span>{profile.location}</span>
              </div>
            )}
            {profile && profile.website && (
              <div className='blued'>
                {' '}
                <InsertLinkIcon /> <span>{profile.website}</span>
              </div>
            )}
            <div>
              {}
              <DateRangeIcon />{' '}
              <span>{convertTimestampToDate(profile.createdAt)}</span>
            </div>
          </div>

          <div className='countInfo'>
            <span>
              {profile !== undefined && profile.following.length}{' '}
              <p>Following</p>
            </span>
            <span>
              {profile !== undefined && profile.followers.length}{' '}
              <p>Followers</p>
            </span>

            {isMe && isUpdating && (
              <div className='themeSpinner'>
                {' '}
                <Spinner />{' '}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileTheme;
