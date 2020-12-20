import React from "react";
import { Container, Button, Modal } from "react-bootstrap";
import "../App.css";

export const WebinarDetail = ({
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
  const onClick = () => {
    window.open(zoomLink);
  };

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
          <Button className="mr-3" variant="info">
            I'm Going
          </Button>
          <Button className="mr-3" variant="outline-primary">
            Share
          </Button>
          <Button className="mr-3" variant="outline-primary" onClick={onClick}>
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
