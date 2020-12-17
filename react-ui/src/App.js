import React from "react";
import { Container } from "react-bootstrap";
import WebinarInfoCard from "./WebinarInfoCard";

const dummyInfo = {
	topic: 'Computer Science > Database',
	title: 'How to Design a Relational Database',
	host: 'Arthur Hiew',
	date: 'Sat 12/12/2020',
	startTime: '2:00pm',
	endTime: '3:00m'
}

function App() {
	return (
		<div className="App">
			<Container className="d-flex justify-content-between flex-wrap w-75 mt-5">
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
				<WebinarInfoCard info={dummyInfo}/>
			</Container>
		</div>
	);
}

export default App;
