
import React, { useEffect, useState } from "react";
import { WebinarDetail } from "../components/WebinarDetail";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { getWebinarsByUserID } from "../services/webinarService";
import { getTopicById } from "../services/topicService";
import { getHostByWebinarID } from "../services/userService";
import { getSubtopicById } from "../services/subtopicService";
import { useAuth } from "../contexts/authContext";

import { Container } from "react-bootstrap";

export default function MyTeaching() {
  const [webinars, setWebinars] = useState([]);
  const [clickWebinar, setClickWebinar] = useState("");
  const [webinar, setWebinar] = useState("");
  const [show, setShow] = useState(false);
  const [date, setDate] = useState("");
  const { currentUserID, currentUserName, isLoggedIn } = useAuth();

  const convertHour = (hour) => {
    let ampm = "am";
    if (hour >= 12) {
      ampm = "pm";
      hour -= hour === 12 ? 0 : 12;
    } else if (hour === 0) {
      hour = 12;
    }

    return {
      hour: hour,
      ampm: ampm,
    };
  };

  // TODO: refactor userID

  const getWebinarsQuery = async () => {
    const sendData = { id: 4, role: "guest" };
    let data = await getWebinarsByUserID(sendData);
    data = data.data;
    for (let i = 0; i < data.length; i++) {
      let topic = await getTopicById({ id: data[i].topicID });
      let subtopic = await getSubtopicById({ id: data[i].subTopicID });
      let host = await getHostByWebinarID({ id: data[i].id });
      data[i].topic = topic;
      data[i].host = host;
      data[i].subtopic = subtopic;
      const year = data[i].date.substring(0, 4);
      const month = data[i].date.substring(5, 7);
      const day = data[i].date.substring(8, 10);
      data[i].date = `${month}/${day}/${year}`;

      const startTime = parseInt(data[i].startTime.substring(0, 2));
      const startHour = convertHour(startTime);
      data[i].startTime =
        startHour.hour + data[i].startTime.substring(2, 5) + startHour.ampm;

      const endTime = parseInt(data[i].endTime.substring(0, 2));
      const endHour = convertHour(endTime);
      data[i].endTime =
        endHour.hour + data[i].endTime.substring(2, 5) + endHour.ampm;
    }

    // console.log(data);
    setWebinars(data);
  };

  const checkTime = (webinarDate, endTime) => {
    let today = new Date();

    const year = parseInt(webinarDate.substring(0, 2));
    const month = parseInt(webinarDate.substring(4, 6));
    const day = parseInt(webinarDate.substring(7, 11));
    endTime = endTime.padStart(7, "0");
    let hour = parseInt(endTime.substring(0, 2));

    if (endTime.substring(5, 7) === "pm") {
      hour += hour === 12 ? 0 : 12;
    } else if (hour === 12) {
      hour = 0;
    }

    const minutes = parseInt(endTime.substring(3, 5));
    webinarDate = new Date(year, month, day, hour, minutes);

    if (webinarDate < today) {
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    getWebinarsQuery();
  }, []);

  return (
    <Container>
      <h1 className="mt-5 text-justify">Upcoming Webinars</h1>

      <Container className="d-flex flex-wrap mt-3 p-0">
        {webinars.map((value, i) => {
          if (!checkTime(webinars[i].date, webinars[i].endTime)) {
            return (
              <WebinarInfoCard
                name={webinars[i].id}
                key={i}
                topic={webinars[i].topic.name}
                subtopic={webinars[i].subtopic}
                title={webinars[i].title}
                host={webinars[i].host.name}
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
          }
        })}
      </Container>

      <h1 className="mt-5 text-justify">Past Webinars</h1>
      <Container className="d-flex flex-wrap mt-3 p-0">
        {webinars.map((value, i) => {
          if (checkTime(webinars[i].date, webinars[i].endTime)) {
            return (
              <WebinarInfoCard
                name={webinars[i].id}
                key={i}
                topic={webinars[i].topic.name}
                subtopic={webinars[i].subtopic}
                title={webinars[i].title}
                host={webinars[i].host.name}
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
          }
        })}
      </Container>

      <WebinarDetail
        show={show}
        handleClose={(e) => {
          setShow(false);
        }}
        title={clickWebinar.title}
        description={clickWebinar.description}
        host={clickWebinar.host}
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
