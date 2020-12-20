import React, { useState, useEffect } from "react";
import { Button, Modal, style } from "react-bootstrap";
import "../App.css";
import { addUserGuest, getUserGuest } from "../services/userService";
import { verifyLocalToken } from "../services/authService";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";


export const WebinarDetail = ({
  id,
  show,
  handleClose,
  title,
  description,
  host,
  date,
  startTime,
  endTime,
  zoomLink,
  zoomPasscode,
  learn,
  know,
  need,
}) => {
  const [isGoing, setIsGoing] = useState(false);
  const [imGoing, setImGoing] = useState(`I'm Going`);
  const userID = verifyLocalToken().userID;
  const addUserGuestQuery = async () => {
    let res = await addUserGuest({ userID: userID, webinarID: id });
    if (res.status == 200) {
      setIsGoing(true);
      setImGoing(<FontAwesomeIcon icon={faCheck} />)
    }
  };

  useEffect(() => {
    getUserGuest({ userID: userID, webinarID: id }).then(function (res) {
      if (res.length > 0) {
        setIsGoing(true);
      }
    });
  }, []);

  return (
    <>
      <style type="text/css">
        {`
          #btn-going{
            width: 100px;
          }
          `}
      </style>
      <Modal show={show} onHide={handleClose} keyboard={false}>
        <FontAwesomeIcon icon={faCheck} />
        <div className="pl-5 pr-5 pb-4">
          <h1 className="mt-5">{title}</h1>
          <p className="mt-4">{description}</p>
          <p>
            Hosted by <strong>{host ? host.name : null}</strong>
          </p>

          <span className="mr-3">{date}</span>
          <span>
            {startTime}-{endTime}
          </span>

          <br />
          <div className="mt-3">
            <Button
              onClick={addUserGuestQuery}
              className="mr-3"
              variant="info"
              id="btn-going"
            >
              {imGoing}
            </Button>
            <Button className="mr-3" variant="outline-primary">
              Share
						</Button>
            <Button
              target="_blank"
              href={`//` + zoomLink}
              className="mr-3"
              variant="outline-primary"
            >
              Zoom Link
						</Button>
            <span>Passcode: {zoomPasscode}</span>
          </div>

          <h2 className="mt-4">What you will learn</h2>
          <p>{learn}</p>

          <h2 className="mt-4">What you will need to know</h2>
          <p>{know}</p>

          <h2 className="mt-4">Tools you will need</h2>
          <p>{need}</p>
        </div>
      </Modal>
    </>
  );
};
