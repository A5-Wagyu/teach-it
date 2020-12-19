import React from "react";
import { Card, Container } from "react-bootstrap";

export const WebinarInfoCard = ({
  topic,
  title,
  host,
  date,
  startTime,
  endTime,
}) => {
  return (
    <Card className="rounded mr-3 mb-3 text-justify" style={{ width: "20rem" }}>
      <Card.Header>{topic}</Card.Header>
      <Card.Body>
        <Card.Title className="mb-4 h-25">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{host}</Card.Subtitle>
        <hr />
        <span>{date}</span>
        <span className="float-right">
          {startTime} - {endTime} PT
        </span>
      </Card.Body>
    </Card>
  );
};
