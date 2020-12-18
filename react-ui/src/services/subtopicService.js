import Axios from "axios";
export const getSubtopics = async () => {
	const url = "/subtopics";
	let results = await Axios.get(url);
	return results;
};
