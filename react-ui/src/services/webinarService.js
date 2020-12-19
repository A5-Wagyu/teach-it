import Axios from "axios";

export const getWebinars = async () => {
	const url = "/webinars";
	let results = await Axios.get(url);
	return results;
};

export const createWebinar = async ({
	title,
	description,
	topic,
	topicID,
	attendantLearn,
	attendantTool,
	startTime,
	endTime,
	zoomLink,
	zoomPassword,
}) => {
	const url = "/createWebinar";
	let results = await Axios.post(url, {
		title: title,
		description: description,
		topic: topic,
		topicID: topicID,
		attendantLearn: attendantLearn,
		attendantTool: attendantTool,
		startTime: startTime,
		endTime: endTime,
		zoomLink: zoomLink,
		zoomPassword: zoomPassword,
	});
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
