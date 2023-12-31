import React, { useEffect, useState } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { useStateValue } from "../../contexts/StateContextProvider";
import "./FooterIcon.css";

const Like = ({ likes, likeAction, unlikeAction }) => {
  const [{ user }] = useStateValue();
  const [isLiked, setisLiked] = useState(false);

  useEffect(() => {
    if (user._id && likes) {
      if (likes.includes(user._id)) {
        setisLiked(true);
      } else {
        setisLiked(false);
      }
    }
  }, [likes]);

  return (
    <div className='footerIcon_wrapper'>
      {isLiked ? (
        <span className='liked' onClick={unlikeAction}>
          <FavoriteIcon />
        </span>
      ) : (
        <FavoriteBorderIcon onClick={likeAction} />
      )}
      <div className='footerIcon__counter'>{likes && likes.length > 0 && likes.length}</div>
    </div>
  );
};

export default Like;
