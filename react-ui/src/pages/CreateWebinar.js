import React, { useState, useEffect } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import { getTopicIdByName } from "../services/topicService";
import { createWebinar } from "../services/webinarService";
import TimePicker from "react-bootstrap-time-picker";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "../App.css";
import { useAuth } from "../contexts/authContext";

function CreateWebinar(props) {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [hasSubtopics, setHasSubtopics] = useState([]);
	const { currentUserID, currentUserName, isLoggedIn } = useAuth();

	const [startDate, setStartDate] = useState(new Date());
	const [zoomTime, setZoomTime] = useState({
		startTime: "",
		endTime: "",
	});

	const [values, setValues] = useState({
		title: "",
		date: "",
		startTime: "00:00:00",
		endTime: "00:00:00",
		description: "",
		learn: "",
		know: "",
		need: "",
		zoomLink: "",
		zoomPasscode: "",
		isComplete: "false",
		topicID: "",
		subTopicID: "",
		userID: "",
		// webinarID: "",
	});

	const getDate = () => {
		let today = new Date();
		today = today.toLocaleString("en-US", { timeZone: "America/Los_Angeles" });

		let dd = parseInt(today.substring(3, 5)) + 1;
		dd = dd.toString().padStart(2, "0");
		let mm = today.substring(0, 2).padStart(2, "0"); //January is 0!
		let yyyy = today.substring(6, 10);

		today = yyyy + "-" + mm + "-" + dd;
		setValues({ ...values, date: today });
	};

	const onChange = (event) => {
		setValues({ ...values, [event.target.name]: event.target.value });
	};

	const onTopicChange = (event) => {
		let currentId = 0;
		topics.map((topic) => {
			if (topic.name === event.target.value) {
				currentId = topic.id;
			}
		});
		setValues({
			...values,
			topicID: `${currentId}`,
		});
	};

	const onSubtopicChange = (event) => {
		let currentId = 0;
		subtopics.map((subtopic) => {
			if (subtopic.name === event.target.value) {
				currentId = subtopic.id;
			}
		});
		setValues({
			...values,
			subTopicID: `${currentId}`,
		});
	};

	const onDateChange = (userDate) => {
		let month = userDate.toString().substring(4, 7);
		const day = userDate.toString().substring(8, 10);
		const year = userDate.toString().substring(11, 15);

		switch (month) {
			case "Jan":
				month = 1;
				break;

			case "Feb":
				month = 2;
				break;

			case "Mar":
				month = 3;
				break;

			case "Apr":
				month = 4;
				break;

			case "May":
				month = 5;
				break;

			case "Jun":
				month = 6;
				break;

			case "Jul":
				month = 7;
				break;

			case "Aug":
				month = 8;
				break;

			case "Sep":
				month = 9;
				break;

			case "Oct":
				month = 10;
				break;

			case "Nov":
				month = 11;
				break;

			case "Dec":
				month = 12;
				break;
		}
		setStartDate(userDate);
		userDate = `${year}-${month}-${day}`;
		setValues({ ...values, date: `${year}-${month}-${day}` });
	};

	// What to do for onSubmit?
	const onSubmit = (event) => {
		console.log(currentUserID);
		console.log(values);
		if (
			!(values.topicID in hasSubtopics) &&
			(values.title === "" ||
				values.date === "" ||
				values.startTime === "" ||
				values.endTime === "" ||
				values.description === "" ||
				values.learn === "" ||
				values.know === "" ||
				values.need === "" ||
				values.topicID === "" ||
				values.zoomLink === "")
		) {
			alert("Please fill in all the required field");
		} else if (
			values.title === "" ||
			values.date === "" ||
			values.startTime === "" ||
			values.endTime === "" ||
			values.description === "" ||
			values.learn === "" ||
			values.know === "" ||
			values.need === "" ||
			values.topicID === "" ||
			values.subTopicID === "" ||
			values.zoomLink === ""
		) {
			alert("Please fill in all the required field");
		} else {
			let sendData = {
				title: values.title,
				date: values.date,
				startTime: values.startTime,
				endTime: values.endTime,
				description: values.description,
				learn: values.learn,
				know: values.know,
				need: values.need,
				zoomLink: values.zoomLink,
				zoomPasscode: values.zoomPasscode,
				isComplete: values.isComplete,
				topicID: values.topicID,
				subTopicID: values.subTopicID,
				userID: values.userID,
			};

			createWebinar(sendData);
			props.history.push("/");
		}
		event.preventDefault();
	};

	const getTopicsQuery = async () => {
		getDate();

		let data = await getTopics();
		for (let i = 0; i < data.length; i++) {
			let id = await getTopicIdByName({ name: data[i].topic.name });
			data[i].topicID = id;
		}
		setTopics(data.data);
		setValues({
			...values,
			userID: `${currentUserID}`,
		});
	};

	const countTopic = (data) => {
		const temp = {};
		data.map((subtopic) => {
			return (temp[subtopic.topicID] = true);
		});
		setHasSubtopics(temp);
	};

	const getSubtopicsQuery = () => {
		getSubtopics().then(function (st) {
			setSubtopics(st.data);
			countTopic(st.data);
		});
	};

	useEffect(() => {
		getTopicsQuery();
		getSubtopicsQuery();
	}, []);

	return (
		<div>
			<Container className="mt-5 w-50">
				<h1>Create A New Webinar</h1>

				<Form className="text-justify" onSubmit={onSubmit}>
					<Form.Group>
						<Form.Label className="mt-4 h5">Title</Form.Label>
						<Form.Control
							name="title"
							value={values.title}
							type="text"
							placeholder="Title"
							onChange={onChange}
						/>
						<Form.Label className="mt-4 h5">Description</Form.Label>
						<Form.Control
							name="description"
							as="textarea"
							rows={3}
							placeholder="Description"
							value={values.description}
							onChange={onChange}
						/>
						{/* Topic */}
						<Form.Label className="mt-4 h5">Topic</Form.Label>
						<Form.Control
							name="topic"
							as="select"
							defaultValue=""
							onChange={onTopicChange}
						>
							<option value="">Select a Topic</option>
							{topics.map((topic) => {
								return (
									<option key={topic.id} value={topic.name}>
										{topic.name}
									</option>
								);
							})}
						</Form.Control>
						{values.topicID in hasSubtopics ? (
							<div>
								<Form.Label className="mt-4 h5">Subtopic</Form.Label>
								<Form.Control
									name="subtopic"
									as="select"
									defaultValue=""
									onChange={onSubtopicChange}
								>
									<option value="">Select a Subtopic</option>
									{subtopics.map((subtopic) => {
										if (subtopic.topicID === parseInt(values.topicID)) {
											return (
												<option key={subtopic.id} value={subtopic.name}>
													{subtopic.name}
												</option>
											);
										}
									})}
								</Form.Control>
							</div>
						) : null}

						<Form.Label className="mt-4 h5">Start Date</Form.Label>
						<br />
						<DatePicker
							className="rounded border w-50 p-2"
							selected={startDate}
							onChange={onDateChange}
						/>

						<Row>
							<Col>
								<Form.Label className="mt-4 h5">Start Time</Form.Label>
								<TimePicker
									start="00:00"
									step={30}
									value={zoomTime.startTime}
									onChange={(value) => {
										setZoomTime({ ...zoomTime, startTime: value });
										let hour = Math.floor(value / 3600);
										if (hour < 10) hour = `0${hour}`;
										const minutes = Number.isInteger(value / 3600)
											? "00"
											: "30";
										const time = `${hour}:${minutes}:00`;
										setValues({ ...values, startTime: time });
									}}
								/>
							</Col>
							<Col>
								<Form.Label className="mt-4 h5">End Time</Form.Label>
								<TimePicker
									start="00:00"
									step={30}
									value={zoomTime.endTime}
									onChange={(value) => {
										setZoomTime({ ...zoomTime, endTime: value });
										let hour = Math.floor(value / 3600);
										if (hour < 10) hour = `0${hour}`;
										const minutes = Number.isInteger(value / 3600)
											? "00"
											: "30";
										const time = `${hour}:${minutes}:00`;
										setValues({ ...values, endTime: time });
									}}
								/>
							</Col>
						</Row>
						<Form.Label className="mt-4 h5">
							What attendants will learn
						</Form.Label>
						<Form.Control
							name="learn"
							value={values.learn}
							as="textarea"
							rows={3}
							placeholder="What attendants will learn"
							onChange={onChange}
						/>
						<Form.Label className="mt-4 h5">
							What attendants will need to know
						</Form.Label>
						<Form.Control
							name="know"
							value={values.know}
							as="textarea"
							rows={3}
							placeholder="What attendants will need to know"
							onChange={onChange}
						/>
						<Form.Label className="mt-4 h5">
							Tool attendants will need
						</Form.Label>
						<Form.Control
							name="need"
							value={values.need}
							as="textarea"
							rows={3}
							placeholder="Tool attendants will need"
							onChange={onChange}
						/>
						<Form.Label className="mt-4 h5">Zoom Link</Form.Label>
						<Form.Control
							name="zoomLink"
							value={values.zoomLink}
							type="text"
							placeholder="Zoom Link"
							onChange={onChange}
						/>
						<Form.Label className="mt-4 h5">Zoom Passcode</Form.Label>
						<Form.Control
							name="zoomPasscode"
							value={values.zoomPasscode}
							type="text"
							placeholder="Zoom Passcode"
							onChange={onChange}
						/>
					</Form.Group>

					<Button
						className="mt-2 mb-5"
						type="submit"
						value="Submit"
						onSubmit={onSubmit}
					>
						Submit
					</Button>
				</Form>
			</Container>
		</div>
	);
}
export default CreateWebinar;
