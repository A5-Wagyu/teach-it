import React, { useState, useEffect } from "react";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { WebinarDetail } from "../components/WebinarDetail";
import {
  getWebinarsByTopic,
  getWebinarsBySubtopic,
  getWebinarsByTitleContains,
} from "../services/webinarService";
import { getHostByWebinarID } from "../services/userService";
import { getSubtopicById } from "../services/subtopicService";
import { getTopicById } from "../services/topicService";

const Search = (props) => {
  const [searchText, setSearchText] = useState("");
  const [webinars, setWebinars] = useState([]);
  const [show, setShow] = useState(false);
  const [webinar, setWebinar] = useState("");
  const onSubmit = (e) => {
    e.preventDefault();

    search({ target: { value: searchText } });
  };

  const search = (e) => {
    setSearchText(e.target.value);
    getWebinarsByTitleQuery(e.target.value);
  };

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

  const getWebinarsByTitleQuery = async (text) => {
    let data;

    data = await getWebinarsByTitleContains({ title: text });

    data = data.data;
    for (let i = 0; i < data.length; i++) {
      let host = await getHostByWebinarID({ id: data[i].id });
      data[i].topic = data[i].subTopicID
        ? await getSubtopicById({ id: data[i].subTopicID })
        : await getTopicById({ id: data[i].topicID });
      data[i].host = host;

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
    console.log(data);
    setWebinars(data);
  };

  const getWebinarsByTopicQuery = async () => {
    let data;
    const topic = props.history.location.state.topic;
    const subtopic = props.history.location.state.subtopic;

    if (subtopic == null) {
      data = await getWebinarsByTopic({ topicID: topic.id });
    } else {
      data = await getWebinarsBySubtopic({ subtopicID: subtopic.id });
    }

    data = data.data;
    for (let i = 0; i < data.length; i++) {
      let host = await getHostByWebinarID({ id: data[i].id });
      data[i].topic = topic ? topic : subtopic;
      data[i].host = host;


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
    console.log(data);
    setWebinars(data);
  };

  useEffect(() => {
    if (
      props.history.location.state &&
      (props.history.location.state.topic ||
        props.history.location.state.subtopic)
    ) {
      getWebinarsByTopicQuery();
    } else {
      setSearchText("");
      getWebinarsByTitleQuery("");
    }
  }, [props.history.location.key]);



  return (
    <Container>
      <Form
        onSubmit={onSubmit}
        inline
        style={{
          width: "1050px",
          position: "fixed",
          top: "0.6rem",
          left: "16rem",
        }}
      >
        <FormControl
          onChange={search}
          type="text"
          placeholder="Search"
          inline
          style={{
            width: "900px",
            marginRight: "1rem",
          }}

        />
        <FormControl
          type="submit"
          onClick={onSubmit}

          type="submit"
          placeholder="Search"
        />
      </Form>


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
        })}
      </Container>

      <WebinarDetail
        show={show}
        handleClose={(e) => {
          setShow(false);
        }}
        id={webinar.id}
        title={webinar.title}
        description={webinar.description}
        host={webinar.host}
        startTime={webinar.startTime}
        endTime={webinar.endTime}
        learn={webinar.learn}
        know={webinar.know}
        need={webinar.need}
        date={webinar.date}
        zoomLink={webinar.zoomLink}
        zoomPasscode={webinar.zoomPasscode}
      />
    </Container>
  );
};

export default Search;
