import Axios from "axios";

export const getHostbyWebinarID = async ({ id }) => {
	const url = "/getHostbyWebinarID";
	let results = await Axios.post(url, { id: id });
	return results.data[0];
};
