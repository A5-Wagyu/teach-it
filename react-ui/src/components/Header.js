import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
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
import { useAuth } from "../contexts/authContext";

function Header(props) {
	const [topics, setTopics] = useState([]);
	const [subtopics, setSubtopics] = useState([]);
	const [values, setValues] = useState({});
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const { verifyLocalToken, logout } = useAuth();

	const res = verifyLocalToken();

	const getTopicsQuery = () => {
		getTopics().then(function (t) {
			setTopics(t.data);
		});
	};

	const handleLogout = async () => {
		await logout();
		setIsAuthenticated(false);
		console.log(props);
		// props.history.push("/");
		return (
			<Redirect to="/" />
		);
	}

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
													<NavDropdown.Item as="div" key={subtopic.name + i + j}>
														<Link to={{
															pathname: "/search", state: {
																topicID: topic.id,
																subtopicID: subtopic.id,
																topicName: topic.name,
																subtopicName: subtopic.name
															}
														}}>{subtopic.name}</Link>
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
										<Link to={{ pathname: "/search", state: { topicID: topic.id, subtopicID: null } }}>{topic.name}</Link>
									</NavDropdown.Item>
								);
							}
						})}
					</NavDropdownMenu>
				</Nav>

				<Form className="w-75" inline>
					<FormControl className="w-50 mr-2" type="text" placeholder="Search" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>

			{res.isAuthenticated ?
				<div className="d-flex align-items-center">
					<Nav.Item>
						<Nav.Link href="/mylearning">My Learning</Nav.Link>
					</Nav.Item>
					<Nav.Item>
						<Nav.Link href="/myteaching">My Teaching</Nav.Link>
					</Nav.Item>
					<Link to="/createwebinar">
						<Button variant="outline-info" className="mr-3">
							Create Webinar
        </Button>
					</Link>
					<Button variant="info" className="mr-3" onClick={handleLogout}>
						Log Out
        </Button>
				</div>
				:
				<div>
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

			}

		</Navbar>
	);
}

export default Header;
