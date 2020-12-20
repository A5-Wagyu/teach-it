import React, { useState, useEffect } from "react";
import { Container, Form, FormControl, Button } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import {
	getWebinarsByTopic,
	getWebinarsBySubtopic,
	getWebinarsByTitleContains,
} from "../services/webinarService";
import { getHostByWebinarID } from "../services/userService";
import { getSubtopicById } from "../services/subtopicService";
import { getTopicById } from "../services/topicService";

const Search = (props) => {
	const [webinars, setWebinars] = useState([]);
	const [searchText, setSearchText] = useState("");

	const onSubmit = (e) => {
		e.preventDefault();

		search({target: { value: searchText }});
	}

	const search = (e) => {
		setSearchText(e.target.value);
		getWebinarsByTitleQuery(e.target.value);
	}

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

		data = await getWebinarsByTitleContains({title: text});

		data = data.data;
		for (let i = 0; i < data.length; i++) {
			let host = await getHostByWebinarID({ id: data[i].id });
			data[i].topic = data[i].subTopicID ? getSubtopicById(data[i].subTopicID) : getTopicById(data[i].topicID);
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
		if(props.history.location.state.topic || props.history.location.state.subtopic) {
			getWebinarsByTopicQuery();
		} else {
			setSearchText("");
			getWebinarsByTitleQuery("");
		}
	
	}, [props.history.location.key]);

	return (
		<Container>
			<Form onSubmit={onSubmit} className="w-75" inline>
				<FormControl onChange={search} className="w-50 mr-2" type="text" placeholder="Search" />
				<FormControl type="submit" onClick={onSubmit} type="submit" placeholder="Search" /> 
			</Form>

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
};

export default Search;
