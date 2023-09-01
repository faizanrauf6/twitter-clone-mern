import React, { useState, forwardRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

import FooterIcon from "./FooterIcon";
import Like from "./Like";
import Popover from "@mui/material/Popover";
import util from "../../helpers/timeDifference";
import { convertTimestampToLocaleString } from "../../helpers/convertTimestampToLocaleString";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import RepeatIcon from "@mui/icons-material/Repeat";
import PublishIcon from "@mui/icons-material/Publish";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import PostAddIcon from "@mui/icons-material/PostAdd";

import "./Post.css";
import { useStateValue } from "../../contexts/StateContextProvider";
import request from "../../utils/request";
import { api } from "../../constants";

const Post = forwardRef(
  (
    { altText, text, image, timestamp, senderId, postId, likes, userData, cb },
    ref
  ) => {
    const history = useNavigate();
    const date = convertTimestampToLocaleString(timestamp);
    const [anchorEl, setAnchorEl] = useState(null);
    const onClickExpand = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);
    const open = Boolean(anchorEl);
    const id = open ? "post-popover" : undefined;

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

    const like = async (postId, userId) => {
      try {
        const response = await request.post(api.tweet.like(postId));
        cb();
      } catch (error) {
      } finally {
      }
    };

    const unlike = async (postId, userId) => {
      try {
        const response = await request.post(api.tweet.disLike(postId));
        cb();
      } catch (error) {
      } finally {
      }
    };

    const deletePost = async (postId) => {
      try {
        const response = await request.delete(api.tweet.delete(postId));
        cb();
      } catch (error) {
      } finally {
      }
    };
    const [{ user }] = useStateValue();
    const [isFollowing, setIsFollowing] = useState(false);

    const redirectToStatus = (postId) => history.push(`/status/${postId}`);
    useEffect(() => {
      console.log("user: ", userData);
      if (userData) {
        setIsFollowing(userData?.followers?.includes(user._id));
      }
    }, [userData]);
    return (
      <>
        <div className="post" ref={ref}>
          <div className="post__avatar">
            <Avatar src={""} />
          </div>
          <div className="post__body">
            <div className="post__header">
              <div className="post__headerText">
                <h3>
                  {userData.fullName}{" "}
                  <span className="post__headerSpecial">
                    {userData.verified && (
                      <VerifiedUserIcon className="post__badge" />
                    )}
                    @
                    {`${userData?.username} . ${
                      timestamp && util.timeDiff(date)
                    }`}
                  </span>
                </h3>
                <div
                  className="post__headerExpandIcon"
                  aria-describedby={id}
                  variant="contained"
                  onClick={onClickExpand}
                >
                  <ExpandMoreIcon />
                </div>

                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                >
                  <ul className="post__expandList">
                    {senderId === user._id ? (
                      <>
                        <li onClick={() => deletePost(postId)}>
                          <div className="delete">
                            <DeleteOutlineIcon />
                          </div>
                          <h3 className="delete">Delete Tweet</h3>
                        </li>
                      </>
                    ) : (
                      <>
                        {/* {isFollowing ? (
                          <li onClick={() => unfollow(senderId)}>
                            <div>
                              <PersonAddDisabledIcon />
                            </div>
                            <h3>Unfollow {`@${userData.username}`}</h3>
                          </li>
                        ) : (
                          <li onClick={() => follow(senderId)}>
                            <div>
                              <PersonAddIcon />
                            </div>
                            <h3>Follow {`@${userData.username}`}</h3>
                          </li>
                        )} */}
                        <li
                          onClick={() => history(`/profile/${userData?.slug}`)}
                        >
                          <div>
                            <PostAddIcon />
                          </div>
                          <h3>View Profile</h3>
                        </li>
                      </>
                    )}
                  </ul>
                </Popover>
              </div>

              <div
                className="post__headerDescription"
                onClick={() => redirectToStatus(postId)}
              >
                <p> {text} </p>
              </div>
            </div>

            {image.length > 0 && (
              <img
                src={image}
                alt={altText}
                onClick={() => redirectToStatus(postId)}
              />
            )}

            <div className="post__footer">
              <FooterIcon Icon={RepeatIcon} value={0} />
              <Like
                likes={likes}
                unlikeAction={() => unlike(postId, user._id)}
                likeAction={() => like(postId, user._id)}
              />
              <FooterIcon Icon={PublishIcon} value={0} />
            </div>
          </div>
        </div>
      </>
    );
  }
);

export default Post;
