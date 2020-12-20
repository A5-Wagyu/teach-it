import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import { Navbar, Nav, NavDropdown, Button, style } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useHistory } from "react-router-dom";

function Header({ isAuthenticated, setIsAuthenticated, ...props }) {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [values, setValues] = useState({});

	const history = useHistory();

	const getTopicsQuery = () => {
		getTopics().then(function (t) {
			setTopics(t.data);
		});
	};

	const handleLogout = async () => {
		const url = "/logout";
		const res = await Axios.post(url);
		localStorage.removeItem("jwt");
		localStorage.removeItem("userName");
		localStorage.removeItem("userID");

		setIsAuthenticated(false);
		history.push("/");
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
		<>
			<style type="text/css">
				{`
					.navbar{
						background-color:#202020;
					}
					.navbar-brand{
						color:white !important;
					}
					.dropdown-toggle{
						color:white !important;
						font-weight:470;
					}
					.btn-info{
							background-color: #7fdad1;
							border-color:#7fdad1;
							color:#4e4a51;
							font-weight:500
							width:83px;
					}
					.btn-info:hover{
							background-color: #8ef8ed;
							border-color:#89f3e8;
							font-weight:500;
							color:#4e4a51;
							width:83px;
					}
					.btn-outline-info{
						color:#7fdad1;
						border-color:#7fdad1;
						font-weight:500;
						width:83px;
					}
					.btn-outline-info:hover{
						color:#4e4a51;
						background-color: #8ef8ed;
						border-color:#89f3e8;
						font-weight:500;
						width:83px;

					}

				`}
			</style>
			<Navbar expand="lg">
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
																className="text-reset"
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
												className="text-reset"
												to={{ pathname: "/search", state: { topic: topic } }}
											>
												{topic.name}
											</Link>
										</NavDropdown.Item>
									);
								}
							})}
						</NavDropdownMenu>
					</Nav>
				</Navbar.Collapse>
				{isAuthenticated && (
					<div className="loggedIn d-flex align-items-center">
						<Link to="/mylearning">
							<span className="mr-3">My Learning</span>
						</Link>
						<Link to="/myteaching">
							<span className="mr-3">My Teaching</span>
						</Link>
						<Link to="/createwebinar">
							<Button variant="outline-info" className="mr-3">
								Create Webinar
							</Button>
						</Link>
						<Button variant="info" className="mr-3" onClick={handleLogout}>
							Log Out
						</Button>
					</div>
				)}
				{!isAuthenticated && (
					<div className="notLoggedIn">
						<span className="btn-login">
							<Link to="/login">
								<Button variant="outline-info" className="mr-3">
									Log In
								</Button>
							</Link>
						</span>
						<Link to="/signup">
							<Button variant="info" className="mr-3">
								Sign Up
							</Button>
						</Link>
					</div>
				)}
			</Navbar>
		</>
	);
}

export default Header;
