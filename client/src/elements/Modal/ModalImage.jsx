import React from "react";
import Modal from "@mui/material/Modal";
import { makeStyles } from "@mui/styles";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    outline: "none",
  },
}));

const ModalImage = ({ open, onClose, imgSrc }) => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <div className="modalImage__imageWrapper">
          <img src={imgSrc} alt="popupimge" />
        </div>
      </Fade>
    </Modal>
  );
};

export default ModalImage;
