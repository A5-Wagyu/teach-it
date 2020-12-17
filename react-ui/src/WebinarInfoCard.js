import React from 'react'
import { Card } from 'react-bootstrap';

export default function WebinarInfoCard(props) {
  const { topic, title, host, date, startTime, endTime } = props.info;

  return (
    // Use <Card.Link href="#"> to link to another page
    <Card className="rounded mr-3 mb-3" style={{width: "20rem"}}>
      <Card.Header>{topic}</Card.Header>
      <Card.Body>
        <Card.Title className="mb-4">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{host}</Card.Subtitle>
        <hr/>
        <span>{date}</span> <span className="float-right">{startTime}-{endTime}</span>
      </Card.Body>
    </Card>
  )
}
