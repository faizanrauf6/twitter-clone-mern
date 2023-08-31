import React, { useEffect, useState } from "react";
import UserItemFollow from "../UserItem/UserItemFollow";
import "./WidgetsFollow.css";

import { useStateValue } from "../../contexts/StateContextProvider";

const WidgetFollow = () => {
  const [{ user }] = useStateValue();
  const [users, setUsers] = useState([]);

  return (
    <div className="widgets__widgetContainer">
      <h2>Who to follow</h2>

      <ul className="widgets__trendsContainer">
        {users &&
          users
            .filter((u) => u.id !== user.id)
            .map((user) => {
              return (
                <li key={user.id}>
                  <UserItemFollow display={user} />
                </li>
              );
            })}
      </ul>
    </div>
  );
};

export default WidgetFollow;
