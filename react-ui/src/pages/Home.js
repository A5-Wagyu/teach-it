import React from "react";
import { Container } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
const testData = {
	topic: "Computer Science",
	title: "How to Design a Relational Database",
	host: "Arthur Hiew",
	date: "Sat 12/12/20",
	startTime: "3:00pm",
	endTime: "4:00pm",
};

function Home() {
	return (
		<Container>
			<h1 className="mt-5 text-justify">Upcoming Webinars</h1>

			<Container className="d-flex flex-wrap mt-3 p-0">
				<WebinarInfoCard
					topic={testData.topic}
					title={testData.title}
					host={testData.host}
					date={testData.date}
					startTime={testData.startTime}
					endTime={testData.endTime}
				/>
				<WebinarInfoCard
					topic={testData.topic}
					title={testData.title}
					host={testData.host}
					date={testData.date}
					startTime={testData.startTime}
					endTime={testData.endTime}
				/>
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
	);
}

export default Home;