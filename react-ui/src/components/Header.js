import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

function Header() {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [values, setValues] = useState({});

	const getTopicsQuery = () => {
		getTopics().then(function (t) {
			setTopics(t.data);
		});
	};

	const countTopic = (data) => {
		const temp = {};
		data.map((subtopic) => {
			temp[subtopic.topicID] = true;
		});
		setValues(temp);
	}

	const getSubtopicsQuery = () => {
		getSubtopics().then(function (st) {
			setSubtopics(st.data);
			countTopic(st.data);
		});
	};

	useEffect(() => {
		getTopicsQuery();
	}, []);

	useEffect(() => {
		getSubtopicsQuery();
	}, []);

	return (
		<Navbar bg="light" expand="lg">
			<Navbar.Brand as={Link} to="/">Teach It</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr">
					<NavDropdownMenu
						title="Browse Topics"
						id="collasible-nav-dropdown"
						className="mr-3"
					>

						{topics.map((topic, i, array) => {
							if (topic.id in values) {
								return (
									<DropdownSubmenu key={topic.name + i} title={topic.name}>
										{subtopics.map((subtopic, j, arrayJ) => {
											if (topic.id === subtopic.topicID) {
												return (
													<NavDropdown.Item key={subtopic.name + i + j}>
														{subtopic.name}
													</NavDropdown.Item>
												);
											} else {
												return null;
											}
										})}
									</DropdownSubmenu>
								);
							} else {
								return (<NavDropdown.Item title={topic.name}>{topic.name}</NavDropdown.Item>);
							}
						})}
					</NavDropdownMenu>
				</Nav>

				<Form className="w-75" inline>
					<FormControl className="w-50 mr-2" type="text" placeholder="Search" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
			<Link to="/login">
				<Button variant="outline-info" className="mr-3">
					Log In
				</Button>
			</Link>
			<Link to="/signup">
				<Button variant="info" className="mr-3">
					Sign Up
				</Button>
			</Link>
		</Navbar>
	);
}

export default Header;
