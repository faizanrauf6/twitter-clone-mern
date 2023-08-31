import React, { useState, forwardRef, useEffect } from "react";
import { Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FooterIcon from "./FooterIcon";
import Like from "./Like";
import Popover from "@mui/material/Popover";
import Modal from "../../elements/Modal/Modal";
import util from "../../helpers/timeDifference";
import { convertTimestampToLocaleString } from "../../helpers/convertTimestampToLocaleString";

import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import RepeatIcon from "@mui/icons-material/Repeat";
import PublishIcon from "@mui/icons-material/Publish";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import CodeIcon from "@mui/icons-material/Code";
import PlaceIcon from "@mui/icons-material/Place";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import BlockIcon from "@mui/icons-material/Block";
import PostAddIcon from "@mui/icons-material/PostAdd";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import CloseIcon from "@mui/icons-material/Close";

import "./Post.css";
import { useStateValue } from "../../contexts/StateContextProvider";

const Post = forwardRef(({ altText, text, image, timestamp, senderId, postId, likes }, ref) => {
  const history = useNavigate();
  const date = convertTimestampToLocaleString(timestamp);

  const [anchorEl, setAnchorEl] = useState(null);
  const onClickExpand = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [{ user }] = useStateValue();
  const [profile, setProfile] = useState({
    id: "",
    displayName: "",
    photoURL: "",
    verified: false,
    username: "",
    followers: [],
    following: [],
  });
  const { displayName, username, photoURL, verified } = profile;

  const [comments, setComments] = useState([]);

  const [isFollowing, setIsFollowing] = useState(false);

  const redirectToStatus = (postId) => history.push(`/status/${postId}`);

  useEffect(() => {
    if (profile) {
      setIsFollowing(profile.followers.includes(user.id));
    }
  }, [profile]);

  const callbackForModal = () => {};
  const setIsOpenParentModal = (state) => setIsOpenModal(state);

  return (
    <>
      <div className='post' ref={ref}>
        <div className='post__avatar'>
          <Avatar src={photoURL} />
        </div>
        <div className='post__body'>
          <div className='post__header'>
            <div className='post__headerText'>
              <h3>
                {displayName}{" "}
                <span className='post__headerSpecial'>
                  {verified && <VerifiedUserIcon className='post__badge' />}@{`${username} . ${timestamp && util.timeDiff(date)}`}
                </span>
              </h3>
              <div className='post__headerExpandIcon' aria-describedby={id} variant='contained' onClick={onClickExpand}>
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
                <ul className='post__expandList'>
                  {senderId === user.id ? (
                    <>
                      <li onClick={() => deletePost(postId)}>
                        <div className='delete'>
                          <DeleteOutlineIcon />
                        </div>
                        <h3 className='delete'>Delete</h3>
                      </li>
                      <li>
                        <div>
                          <PlaceIcon />
                        </div>
                        <h3>Pin to your profile</h3>
                      </li>
                      <li>
                        <div>
                          <CodeIcon />
                        </div>
                        <h3>Embed Tweet</h3>
                      </li>
                      <li>
                        <div>
                          <BarChartIcon />
                        </div>
                        <h3>View Tweet activity</h3>
                      </li>
                    </>
                  ) : (
                    <>
                      <li>
                        <div>
                          <SentimentVeryDissatisfiedIcon />
                        </div>
                        <h3>Not interested in this tweet</h3>
                      </li>
                      {isFollowing ? (
                        <li onClick={() => unfollow(user.id, senderId)}>
                          <div>
                            <PersonAddDisabledIcon />
                          </div>
                          <h3>Unfollow {`@${username}`}</h3>
                        </li>
                      ) : (
                        <li onClick={() => follow(user.id, senderId)}>
                          <div>
                            <PersonAddIcon />
                          </div>
                          <h3>Follow {`@${username}`}</h3>
                        </li>
                      )}
                      <li>
                        <div>
                          <PostAddIcon />
                        </div>
                        <h3>Add/remove from Lists</h3>
                      </li>
                      <li>
                        <div>
                          <BlockIcon />
                        </div>
                        <h3>Block {`@${username}`}</h3>
                      </li>
                      <li>
                        <div>
                          <CodeIcon />
                        </div>
                        <h3>Embed Tweet</h3>
                      </li>
                    </>
                  )}
                </ul>
              </Popover>
            </div>

            <div className='post__headerDescription' onClick={() => redirectToStatus(postId)}>
              <p> {text} </p>
            </div>
          </div>

          {image.length > 0 && <img src={image} alt={altText} onClick={() => redirectToStatus(postId)} />}

          <div className='post__footer'>
            <FooterIcon Icon={ChatBubbleOutlineIcon} value={comments.length} onClick={() => setIsOpenModal(true)} />
            <FooterIcon Icon={RepeatIcon} value={0} />
            {/* <Like likes={likes} unlikeAction={() => unlike(postId, user.id)} likeAction={() => like(postId, user.id)} /> */}
            <FooterIcon Icon={PublishIcon} value={0} />
          </div>
        </div>
      </div>
    </>
  );
});

export default Post;
