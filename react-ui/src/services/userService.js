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

export const addUserGuest = async ({ userID, webinarID }) => {
	const url = "/addUserGuest";
	try {
		let results = await Axios.post(url, { userID: userID, webinarID: webinarID });
		return results;
	} catch (e) {
		throw e;
	}
}

export const getUserGuest = async ({ userID, webinarID }) => {
	const url = "/getUserGuest";
	try {
		let results = await Axios.post(url, { userID: userID, webinarID: webinarID });
		return results.data;
	} catch (e) {
		throw e;
	}
}
