import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TabbarMenu from "../../elements/TabbarMenu/TabbarMenu";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import UserItemFollow from "../UserItem/UserItemFollow";

const ProfileFollow = () => {
  const history = useNavigate();
  const { username } = useParams();
  const [following, setFollowing] = useState([]);
  const [followers, setFollowers] = useState([]);

  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);

  const items = [
    {
      id: 0,
      title: "Followers",
      item: (
        <ul>
          {followers &&
            followers.map((user) => {
              return (
                <li key={user.id}>
                  {" "}
                  <UserItemFollow display={user} />
                </li>
              );
            })}
        </ul>
      ),
    },
    {
      id: 1,
      title: "Following",
      item: (
        <ul>
          {following &&
            following.map((user) => {
              return (
                <li key={user.id}>
                  {" "}
                  <UserItemFollow display={user} />
                </li>
              );
            })}
        </ul>
      ),
    },
  ];

  return (
    <div className='feed'>
      <div className='profile__header forFollow'>
        <div className='profile__backArrow' onClick={() => history.goBack()}>
          <ArrowBackOutlinedIcon />
        </div>
        <div className='profile__title'>
          <div className='profile__title_title'>
            <h2>{profile.displayName}</h2>
            <CheckCircleIcon />
          </div>
          <span>{posts.length > 0 ? `${posts.length} tweets` : ""}</span>
        </div>
      </div>

      <TabbarMenu items={items} />
    </div>
  );
};

export default ProfileFollow;
