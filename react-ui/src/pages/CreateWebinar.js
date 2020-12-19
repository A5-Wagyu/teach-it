import React, { useState, useEffect } from "react";
import { Form, Container, Button, Row, Col } from "react-bootstrap";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import { getTopicIdByName } from "../services/topicService";

function CreateWebinar() {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [hasSubtopics, sethasSubtopics] = useState([]);
	const [curTopic, setCurTopic] = useState([]);
	const [sendData, setSendData] = useState([]);

	const [values, setValues] = useState({
		title: "",
		description: "",
		topic: "",
		topicID: "",
		attendantLearn: "",
		attendantKnow: "",
		attendantTool: "",
		startTime: "",
		endTime: "",
		zoomLink: "",
		zoomPassword: "",
	});

	const sendFormCreate = () => {
		console.log(values);
	};
	const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };
  
  const onTopicChange = (event) => {
    let currentId = 0;
    topics.map(topic => {
      if (topic.name === event.target.value) {
        currentId = topic.id;
      }
    })
    setValues({ ...values, [event.target.name]: event.target.value, topicID: currentId});
	};

	// What to do for onSubmit?
	const onSubmit = (event) => {
		if (
			values.title ||
			values.description ||
			values.startTime ||
			values.endTime ||
			values.attendantKnow ||
			values.attendantTool ||
			values.zoomLink === ""
		) {
			alert("Please fill in all the required field");
		} else {
		}
		event.preventDefault();
	};

	const getTopicsQuery = async () => {
		let data = await getTopics();
		for (let i = 0; i < data.length; i++) {
			let id = await getTopicIdByName({ name: data[i].topic.name });
			data[i].topicID = id;
		}
		setTopics(data.data);
	};
	const getCurrentTopic = () => {
		if (values.topicID != null) {
			setCurTopic(values.topic);
		}
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

	// console.log(topics);
	// console.log(values);

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
            {
              (values.topicID in hasSubtopics)
            /* {subtopics.map((subtopic, j, arrayJ) => {
                  if(va=== su)
              }}  */
            }
						<Row>
							<Col>
								<Form.Label className="mt-4 h5">Start Time</Form.Label>
								<Form.Control
									name="startTime"
									value={values.startTime}
									type="time"
									onChange={(onChange)}
								/>
							</Col>
							<Col>
								<Form.Label className="mt-4 h5">End Time</Form.Label>
								<Form.Control
									name="endTime"
									value={values.endTime}
									type="time"
									onChange={onChange}
								/>
							</Col>
						</Row>
						<Form.Label className="mt-4 h5">
							What attendants will learn
						</Form.Label>
						<Form.Control
							name="attendantLearn"
							value={values.attendantLearn}
							as="textarea"
							rows={3}
							placeholder="What attendants will learn"
							onChange={onChange}
						/>

						<Form.Label className="mt-4 h5">
							What attendants will need to know
						</Form.Label>
						<Form.Control
							name="attendantKnow"
							value={values.attendantKnow}
							as="textarea"
							rows={3}
							placeholder="What attendants will need to know"
							onChange={onChange}
						/>

						<Form.Label className="mt-4 h5">
							Tool attendants will need
						</Form.Label>
						<Form.Control
							name="attendantTool"
							value={values.attendantTool}
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
						<Form.Label className="mt-4 h5">Zoom Password</Form.Label>
						<Form.Control
							name="zoomPassword"
							value={values.zoomPassword}
							type="password"
							placeholder="Zoom Passcode"
							onChange={onChange}
						/>
					</Form.Group>

					<Button
						className="mt-2 mb-5"
						as="input"
						type="submit"
						value="Submit"
						onSubmit={sendFormCreate}
					></Button>
				</Form>
			</Container>
		</div>
	);
}
export default CreateWebinar;
