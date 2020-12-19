import Axios from "axios";
export const getSubtopics = async () => {
	const url = "/subtopics";
	let results = await Axios.get(url);
	return results;
};

export const getSubtopicById = async ({ id }) => {
	const url = "/getSubtopicById";
	let results = await Axios.post(url, {id: id});
	return results.data[0];
};
