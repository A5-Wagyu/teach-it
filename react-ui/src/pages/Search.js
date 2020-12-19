import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import {
	getWebinarsByTopic,
	getWebinarsBySubtopic,
	getWebinarsByTitleContains
} from "../services/webinarService";
import { getHostByWebinarID } from "../services/userService";
import { getTopicById } from "../services/topicService";
import { getSubtopicById } from "../services/subtopicService";

const Search = (props) => {
	const [webinars, setWebinars] = useState([]);

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

	const getWebinarsByTextQuery = async () => {
		let data; 
		const searchText = props.searchText;

		data = await getWebinarsByTitleContains({ title: searchText });
		
		data = data.data;
		for (let i = 0; i < data.length; i++) {
			let host = await getHostByWebinarID({ id: data[i].id });
			data[i].host = host;
			console.log("HOST", host);

			data[i].topic = data[i].topicID ? await getTopicById({ id: data[i].topicID }) : await getSubtopicById({ id: data[i].subTopicID });

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
	}

	const getWebinarsByTopicQuery = async () => {
		let data;
		const topic = props.topic;
		const subtopic = props.subtopic;

		if (!subtopic) {
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
		if(props.topic || props.subtopic) {
			getWebinarsByTopicQuery();
		}
		if(props.searchText) {
			getWebinarsByTextQuery();
		}
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
							host={webinars[i].host ? webinars[i].host.name : null}
							date={webinars[i].date}
							startTime={webinars[i].startTime}
							endTime={webinars[i].endTime}
						/>
					);
				})}
			</Container>
		</Container>
	);
};

export default Search;
