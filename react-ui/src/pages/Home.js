import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { getWebinars } from "../services/webinarService";
import { getTopicById } from "../services/topicService";
const testData = {
	topic: "Computer Science",
	title: "How to Design a Relational Database",
	host: "Arthur Hiew",
	date: "Sat 12/12/20",
	startTime: "3:00pm",
	endTime: "4:00pm",
};

function Home() {
	const [webinars, setWebinars] = useState([]);

	const getWebinarsQuery = () => {
		getWebinars().then(async (data) => {
			data = data.data;
			for (let i = 0; i < data.length; i++) {
				let topic = await getTopicById(data[i].topicID);
				data[i].topic = topic.data;
			}
			setWebinars(data);
		});
	};

	// const getTopicByIdQuery = () => {
	// 	getTopicById(topicID).then(function (data) {
	// 		setTopic(data.)
	// 		console.log("topic:", data);
	// 	});
	// };

	useEffect(() => {
		getWebinarsQuery();
	}, []);

	console.log(webinars);
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
