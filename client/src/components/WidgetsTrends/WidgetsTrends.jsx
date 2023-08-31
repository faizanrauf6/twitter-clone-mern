import React, { useState } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./WidgetsTrends.css";

const WidgetTrends = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;

  return (
    <div className='widgets__widgetContainer'>
      <h2>What's happening</h2>

      <ul className='widgets__trendsContainer'>
        <li>
          <div className='popular'>
            <span>Popular in Pakistan</span>
            <ExpandMoreIcon
              aria-describedby={id}
              variant='contained'
              // onClick={onClickExpand}
            />
          </div>
          <div className='hashtag'>LiveLongIK</div>
          <div className='tweetNumber'>50k Tweets</div>
        </li>
        <li>
          <div className='popular'>
            <span>Popular in India</span>
            <ExpandMoreIcon />
          </div>
          <div className='hashtag'>SuperMoon</div>
          <div className='tweetNumber'>41K Tweets</div>
        </li>
        <li>
          <div className='popular'>
            <span>Popular in Australia</span>
            <ExpandMoreIcon />
          </div>
          <div className='hashtag'>Cricket</div>
          <div className='tweetNumber'>1.1K Tweets</div>
        </li>
        <li>
          <div className='popular'>
            <span>Popular in USA</span>
            <ExpandMoreIcon />
          </div>
          <div className='hashtag'>Golf</div>
          <div className='tweetNumber'>38K Tweets</div>
        </li>
      </ul>
    </div>
  );
};

export default WidgetTrends;
