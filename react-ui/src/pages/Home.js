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

	const getWebinarsQuery = async () => {
		let data = await getWebinars();
		data = data.data;
		for (let i = 0; i < data.length; i++) {
			// console.log(data
			let topic = await getTopicById({ id: data[i].topicID });
			data[i].topic = topic;
		}
		setWebinars(data);
	};

	useEffect(() => {
		getWebinarsQuery();
	}, []);
	console.log(webinars);

	return (
		<Container>
			<h1 className="mt-5 text-justify">Upcoming Webinars</h1>

			<Container className="d-flex flex-wrap mt-3 p-0">
				{webinars.map((value, i) => {
					return (
						<WebinarInfoCard
							key={i}
							topic={webinars[i].topic.name}
							title={webinars[i].title}
							host={testData.host}
							date={webinars[i].date}
							startTime={webinars[i].startTime}
							endTime={webinars[i].endTime}
						/>
					);
				})}
			</Container>
		</Container>
	);
}

export default Home;
