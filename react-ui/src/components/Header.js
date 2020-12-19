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
import { router } from "../router";

function Header() {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [values, setValues] = useState({});

	const onSubmit = (e) => {
		e.preventDefault();
		search(e.target.value);
	}

	const search = (text) => {
		router.stateService.go("search", { searchText: text, topic: null });
	};

	const getTopicsQuery = () => {
		getTopics().then(function (t) {
			setTopics(t.data);
		});
	};

	const countTopic = (data) => {
		const temp = {};
		data.map((subtopic) => {
			return (temp[subtopic.topicID] = true);
		});
		setValues(temp);
	};

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
			<Navbar.Brand as={Link} to="/">
				Teach It
			</Navbar.Brand>
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
													<NavDropdown.Item
														as="div"
														key={subtopic.name + i + j}
													>
														<Link
															to={{
																pathname: "/search",
																state: {
																	subtopic: subtopic,
																},
															}}
														>
															{subtopic.name}
														</Link>
													</NavDropdown.Item>
												);
											} else {
												return null;
											}
										})}
									</DropdownSubmenu>
								);
							} else {
								return (
									<NavDropdown.Item as="div" key={i} title={topic.name}>
										<Link
											to={{
												pathname: "/search",
												state: { topic: topic },
											}}
										>
											{topic.name}
										</Link>
									</NavDropdown.Item>
								);
							}
						})}
					</NavDropdownMenu>
				</Nav>

				<Form onSubmit={onSubmit} className="w-75" inline>
					<FormControl onChange={onSubmit} className="w-50 mr-2" type="text" placeholder="Search" />
					<Button variant="outline-success" onClick={onSubmit}>
						Search
					</Button>
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
