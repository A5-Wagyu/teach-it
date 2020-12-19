import Axios from "axios";

export const getWebinars = async () => {
	const url = "/webinars";
	let results = await Axios.get(url);
	return results;
};

export const getWebinarsByTopic = async ({ topicID }) => {
	const url = "/getWebinarsByTopicId";
	let results = await Axios.post(url, { topicID: topicID });
	return results;
};

export const getWebinarsBySubtopic = async ({ subtopicID }) => {
	const url = "/getWebinarsBySubtopicId";
	let results = await Axios.post(url, { subTopicID: subtopicID });
	return results;
};

export const createWebinar = async ({
	title,
	date,
	startTime,
	endTime,
	description,
	learn,
	know,
	need,
	zoomLink,
	zoomPasscode,
	isComplete,
	topicID,
	subTopicID,
}) => {
	const url = "/createWebinar";
	let results = await Axios.post(url, {
		title: title,
		date: date,
		startTime: startTime,
		endTime: endTime,
		description: description,
		learn: learn,
		know: know,
		need: need,
		zoomLink: zoomLink,
		zoomPasscode,
		isComplete: isComplete,
		topicID: topicID,
		subTopicID: subTopicID,
	});
	return results;
};
