import React from "react";
import { Card, Container } from "react-bootstrap";

export const WebinarInfoCard = ({
  name,
  topic,
  title,
  host,
  date,
  startTime,
  endTime,
  onClick,
}) => {
  return (
    <Card
      className="rounded mr-3 mb-3 text-justify"
      style={{ width: "20rem" }}
      onClick={onClick}
    >
      <Card.Header>{topic}</Card.Header>
      <Card.Body>
        <Card.Title name={name} className="mb-4" style={{ height: "35%" }}>
          {title}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{host}</Card.Subtitle>
        <hr />
        <div className="mb-1">
          <span>{date}</span>
          <span className="float-right">
            {startTime} - {endTime} PT
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};
