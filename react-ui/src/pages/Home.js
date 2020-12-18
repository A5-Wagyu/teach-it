import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { getWebinars } from "../services/webinarService";
import { getTopicById } from "../services/topicService";
import { getHostbyWebinarID } from "../services/userService";

function Home() {
	const [webinars, setWebinars] = useState([]);

	const getWebinarsQuery = async () => {
		let data = await getWebinars();
		data = data.data;
		for (let i = 0; i < data.length; i++) {
			let topic = await getTopicById({ id: data[i].topicID });
			let host = await getHostbyWebinarID({ id: data[i].id });
			data[i].topic = topic;
			data[i].host = host;
		}
		setWebinars(data);
	};

	useEffect(() => {
		getWebinarsQuery();
	}, []);

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
							host={webinars[i].host.name}
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
