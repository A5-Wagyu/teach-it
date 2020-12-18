import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { WebinarInfoCard } from "../components/WebinarInfoCard";
import { getWebinarsByTopic, getWebinarsBySubtopic } from "../services/webinarService";
import { getTopicById } from "../services/topicService";
import { getHostbyWebinarID } from "../services/userService";
import { getSubtopicById } from "../services/subtopicService";

const Search = (props) => {
  const [topicID, setTopicID] = useState(props.history.location.state.topicID);
  const [subtopicID, setSubtopicID] = useState(props.history.location.state.subtopicID);
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

	const getWebinarsByTopicQuery = async () => {
    let data;
    if(subtopicID == null) {
      data = await getWebinarsByTopic({ topicID });
    }
    else {
      data = await getWebinarsBySubtopic({ subtopicID });
    }
		
		data = data.data;
		for (let i = 0; i < data.length; i++) {
      let topic;
      if(subtopicID == null) {
        topic = await getTopicById({ id: topicID });
      }
      else {
        topic = await getSubtopicById({ id: subtopicID });
      }
       
			let host = await getHostbyWebinarID({ id: data[i].id });
			data[i].topic = topic;
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
		getWebinarsByTopicQuery();
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

export default Search;
