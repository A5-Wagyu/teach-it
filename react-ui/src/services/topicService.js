import Axios from "axios";

export const getTopics = async () => {
	const url = "/topics";
	let results = await Axios.get(url);
	return results;
};

export const getTopicById = async ({ id }) => {
	const url = "/getTopicById";
	let results = await Axios.post(url, { id: id });

	return results.data[0];
};
