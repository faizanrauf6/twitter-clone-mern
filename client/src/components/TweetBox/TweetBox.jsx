import React, { useState, useEffect } from "react";
import { Avatar, Button } from "@mui/material";
import { useStateValue } from "../../contexts/StateContextProvider";
import "./TweetBox.css";

import StatusInput from "../StatusInput/StatusInput";
import { getInfo } from "../../helpers/getImageDimension";

import Spinner from "../../elements/Spinner/Spinner";

import CancelIcon from "@mui/icons-material/Cancel";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import EqualizerOutlinedIcon from "@mui/icons-material/EqualizerOutlined";
import EventNoteSharpIcon from "@mui/icons-material/EventNoteSharp";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import request from "../../utils/request";
import { api } from "../../constants";
import { toast } from "react-toastify";

const TweetBox = ({ cb }) => {
  const [{ user }] = useStateValue();
  const [tweetMessage, setTweetMessage] = useState("");
  const [src, setSrc] = useState(null);
  const [imageToSend, setImageToSend] = useState(null);
  const [initialImageSize, setinitialImageSize] = useState({
    width: 0,
    height: 0,
  });
  const [initialAspectRatio, setinitialAspectRatio] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const sendTweet = async (e) => {
    e.preventDefault();
    setIsloading(true);
    try {
      const response = await request.post(api.tweet.create, {
        content: tweetMessage,
        image: imageToSend,
      });

      console.log(response);

      setTweetMessage("");
      setSrc("");
      setImageToSend(null);
      setinitialImageSize({
        width: 0,
        height: 0,
      });
      toast.success("Tweet created successfully");
      cb();
    } catch (error) {
    } finally {
      setIsloading(false);
    }
  };

  const onSelectFile = (e) => {
    const fileReader = new FileReader();
    fileReader.onloadend = () => {
      setSrc(fileReader.result);
      setImageToSend(fileReader.result);
    };
    fileReader.readAsDataURL(e.target.files[0]);

    getInfo(e).then((res) => {
      setinitialImageSize({ width: res.width, height: res.height });
    });
  };

  useEffect(() => {
    setinitialAspectRatio(initialImageSize.width / initialImageSize.height);
  }, [initialImageSize]);

  const open = Boolean(anchorEl);
  const id = open ? "post-popover" : undefined;

  useEffect(() => {
    var textarea = document.querySelector("textarea");
    textarea.addEventListener("keydown", autosize);

    function autosize() {
      var el = this;
      setTimeout(function () {
        el.style.cssText = "height:auto padding:0";

        el.style.cssText = "height:" + el.scrollHeight + "px";
      }, 0);
    }
  }, []);

  return (
    <>
      <div className="tweetBox">
        <form onSubmit={sendTweet}>
          <div className="tweetBox__wrapperInput">
            <div className="tweetBox__ava">
              <Avatar src={"/src/assets/backdrop4.jpg"} />
            </div>

            <div className="tweetBox__input">
              <textarea
                rows="1"
                placeholder="What's happening"
                type="text"
                value={tweetMessage}
                onChange={(e) => setTweetMessage(e.target.value)}
              ></textarea>

              {src && (
                <div className="tweetBox__input-image">
                  <CancelIcon
                    className="cancelIcon"
                    onClick={() => setSrc(null)}
                  />
                  <img src={src} alt="new test" />
                </div>
              )}

              <div className="tweetBox__input-actions">
                <div className="tweetBox__input-icons">
                  <StatusInput
                    Icon={ImageOutlinedIcon}
                    type="file"
                    accept="image/*"
                    name="image-upload"
                    id="input-image"
                    onChange={onSelectFile}
                  />
                  <StatusInput Icon={GifOutlinedIcon} />
                  <StatusInput Icon={EqualizerOutlinedIcon} />
                  <StatusInput
                    Icon={SentimentSatisfiedOutlinedIcon}
                    aria-describedby={id}
                    type="button"
                  />

                  <StatusInput Icon={EventNoteSharpIcon} />
                </div>

                {isLoading ? (
                  <Button className="tweetBox__tweetButton">
                    <Spinner />
                  </Button>
                ) : (
                  <Button type="submit" className="tweetBox__tweetButton">
                    Tweet
                  </Button>
                )}
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TweetBox;
