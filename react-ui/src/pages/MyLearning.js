import React from "react";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { WebinarDetail } from "../components/WebinarDetail";

import { Container } from "react-bootstrap";

// Fetch data specific to a user

export default function MyTeaching() {
  const [webinars, setWebinars] = useState([]);
  const [clickWebinar, setClickWebinar] = useState("");

  const checkTime = (webinar) => {
    let today = new Date();
    today = today.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

    let dd = parseInt(today.substring(3, 5)) + 1;
    let mm = today.substring(0, 2); //January is 0!
    let yyyy = today.substring(6, 10);

    today = yyyy + "-" + mm + "-" + dd;
  };

  return (
    <Container>
      <h1 className="mt-5 text-justify">Upcoming Webinars</h1>

      <Container className="d-flex flex-wrap mt-3 p-0">
        {webinars.map((value, i) => {
          return (
            <WebinarInfoCard
              name={webinars[i].id}
              key={i}
              topic={webinars[i].topic.name}
              subtopic={webinars[i].subtopic}
              title={webinars[i].title}
              // host={webinars[i].host.name}
              host="admin"
              date={webinars[i].date}
              startTime={webinars[i].startTime}
              endTime={webinars[i].endTime}
              onClick={(e) => {
                setShow(true);
                webinars.map((value, j) => {
                  if (value.id === webinars[i].id) {
                    setClickWebinar(value);
                  }
                });
              }}
            />
          );
        })}
      </Container>

      <h1 className="mt-5 text-justify">Past Webinars</h1>
      <Container className="d-flex flex-wrap mt-3 p-0">
        {webinars.map((value, i) => {
          return (
            <WebinarInfoCard
              name={webinars[i].id}
              key={i}
              topic={webinars[i].topic.name}
              subtopic={webinars[i].subtopic}
              title={webinars[i].title}
              // host={webinars[i].host.name}
              host="admin"
              date={webinars[i].date}
              startTime={webinars[i].startTime}
              endTime={webinars[i].endTime}
              onClick={(e) => {
                setShow(true);
                webinars.map((value, j) => {
                  if (value.id === webinars[i].id) {
                    setWebinar(value);
                  }
                });
              }}
            />
          );
        })}
      </Container>

      <WebinarDetail
        show={show}
        handleClose={(e) => {
          setShow(false);
        }}
        title={clickWebinar.title}
        description={clickWebinar.description}
        // host={clickWebinar.host}
        host="admin"
        startTime={clickWebinar.startTime}
        endTime={clickWebinar.endTime}
        learn={clickWebinar.learn}
        know={clickWebinar.know}
        need={clickWebinar.need}
        date={clickWebinar.date}
        zoomLink={clickWebinar.zoomLink}
        zoomPasscode={clickWebinar.zoomPasscode}
      />
    </Container>
  );
}
