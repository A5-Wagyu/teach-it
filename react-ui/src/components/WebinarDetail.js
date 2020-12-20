import React, { useState, useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import "../App.css";
import { useAuth } from "../contexts/authContext";
import { addUserGuest, getUserGuest } from "../services/userService";
	
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

  const { currentUserID, currentUserName, isLoggedIn } = useAuth();
  const [ isGoing, setIsGoing ] = useState(false);

  const addUserGuestQuery = async () => {
    let res = await addUserGuest({userID: currentUserID, webinarID: id});
    if(res.status == 200) {
      setIsGoing(true);
    }
  }

  useEffect(() => {
    getUserGuest({userID: currentUserID, webinarID: id }).then(function(res) {
      if(res.length > 0) {
        setIsGoing(true);
      }
    });
  }, []);

  return (
    <Modal show={show} onHide={handleClose} keyboard={false}>
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
          <Button onClick={addUserGuestQuery} className="mr-3" variant="info">
            I'm Going
          </Button> 
          <Button className="mr-3" variant="outline-primary">
            Share
          </Button>
          <Button target="_blank" href={`//` + zoomLink} className="mr-3" variant="outline-primary">
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
  );
};
