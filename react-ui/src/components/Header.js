import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
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
						background-color:#414A50;
					}
					.navbar-brand{
						color:white !important;
						font-size: 1.5rem;
					}
					.dropdown-toggle{
						color:white !important;
						font-weight:470;
					}
					.btn-info{
							background-color: #7fdad1;
							border-color:#7fdad1;
							color:#4e4a51;
							font-weight:500;
							width:85px;
					}
					.btn-info:hover{
							background-color: #8ef8ed;
							border-color:#89f3e8;
							font-weight:500;
							color:#4e4a51;
							width:85px;
							
							
					}
					.btn-outline-info{
						color:#7fdad1;
						border-color:#7fdad1;
						font-weight:500;
						width:85px;
					}
					.btn-outline-info:hover{
						color:#4e4a51;
						background-color: #8ef8ed;
						border-color:#89f3e8;
						font-weight:500;
						width:85px;
					

					}
					#btn-create-webinar{
						width: 140px;	
					}
					#btn-create-webinar:hover{
						width: 140px;
					}
					.navbar-link{
							text-decoration: none !important;
							color:white !important;
					}
					.navbar-link:hover{
						text-decoration: none !important;
						
					}
					.dropdown-item{
						color:black !important;
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
							<span>
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
																	className="text-reset dropdown-item"
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
							</span>
						</NavDropdownMenu>
					</Nav>
				</Navbar.Collapse>
				{isAuthenticated && (
					<div className="loggedIn d-flex align-items-center">
						<span id="navbar-links">
							<Link to="/mylearning" className="navbar-link">
								<span className="mr-3">My Learning</span>
							</Link>
							<Link to="/myteaching" className="navbar-link">
								<span className="mr-3">My Teaching</span>
							</Link>
						</span>
						<Link to="/createwebinar">
							<Button
								variant="outline-info"
								id="btn-create-webinar"
								className="mr-3"
							>
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
					</div>
				)}
			</Navbar>
		</>
	);
}

export default Header;
