import Axios from "axios";

export const getWebinars = async () => {
	const url = "/webinars";
	let results = await Axios.get(url);
	return results;
};
