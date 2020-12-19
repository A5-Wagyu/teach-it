import Axios from "axios";

export const getHostByWebinarID = async ({ id }) => {
	const url = "/getHostByWebinarID";
	try {
		let results = await Axios.post(url, { id: id });
		return results.data[0];
	} catch (e) {
		throw e;
	}
};
