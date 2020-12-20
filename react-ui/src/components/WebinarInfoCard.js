import React from "react";
import { Card } from "react-bootstrap";
import "../App.css";

export const WebinarInfoCard = ({
  name,
  topic,
  subtopic,
  title,
  host,
  date,
  startTime,
  endTime,
  onClick,
}) => {

	const header = subtopic ? `${topic} > ${subtopic.name}` : `${topic}`;
	return (
		<>
			<style type={"text/css"}>
				{`
          .webinar-card:hover{
            cursor:pointer;
          }
        `}
			</style>
			<Card
				className="rounded mr-3 mb-3 text-left shadow webinar-card"
				style={{ width: "22rem", height: "16rem" }}
				onClick={onClick}
			>
				<Card.Header
					className="text-light"
					style={{ backgroundColor: "#414a50" }}
				>
					{header}
				</Card.Header>


        <Card.Body>
          <Card.Title name={name} className="mb-4" style={{ height: "40%" }}>
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
    </>
  );
};
