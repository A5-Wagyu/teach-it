import React from 'react'
import { WebinarInfoCard } from '../components/WebinarInfoCard';
import Axios from 'axios'
import { Container } from 'react-bootstrap';
import { useAuth } from '../contexts/authContext';

const testData = {
  topic: "Computer Science",
  title: "How to Design a Relational Database",
  host: "Arthur Hiew",
  date: "Sat 12/12/20",
  startTime: "3:00pm",
  endTime: "4:00pm",
};

export default function MyTeaching(props) {

  return (
    <Container>
      <h1 className="mt-4 text-justify">My Learning</h1>
      <h2 className="mt-5 text-justify">Upcoming Webinars</h2>
      <Container className="d-flex flex-wrap mt-3 p-0">
        <WebinarInfoCard
          topic={testData.topic}
          title={testData.title}
          host={testData.host}
          date={testData.date}
          startTime={testData.startTime}
          endTime={testData.endTime}
        />
      </Container>

      <h2 className="mt-4 text-justify">Past Webinars</h2>
      <Container className="d-flex flex-wrap mt-3 p-0">
        <WebinarInfoCard
          topic={testData.topic}
          title={testData.title}
          host={testData.host}
          date={testData.date}
          startTime={testData.startTime}
          endTime={testData.endTime}
        />
      </Container>
    </Container>
  )
}