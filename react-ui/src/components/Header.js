import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../services/topicService";
import { getSubtopics } from "../services/subtopicService";
import { Navbar, Nav, NavDropdown, Button } from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";
import { useAuth } from "../contexts/authContext";

function Header() {
  const [topics, setTopics] = useState([]);
  const [subtopics, setSubtopics] = useState([]);
  const [values, setValues] = useState({});
  const { currentUserID, currentUserName, isLoggedIn } = useAuth();

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
                    <Link to={{ pathname: "/search", state: { topic: topic } }}>
                      {topic.name}
                    </Link>
                  </NavDropdown.Item>
                );
              }
            })}
          </NavDropdownMenu>
        </Nav>
      </Navbar.Collapse>
      {isLoggedIn && (
        <div className="loggedIn d-flex align-items-center">
          <p className="mb-0"> Welcome back, {currentUserName}</p>
          <Nav.Item>
            <Nav.Link href="/mylearning">My Learning</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/myteaching">My Teaching</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link>
              <div
								as="Link"
                to={{
                  pathname: "/search",
                  state: {},
                }}
              >
                Search
              </div>
            </Nav.Link>
          </Nav.Item>
          <Link to="/createwebinar">
            <Button variant="outline-info" className="mr-3">
              Create Webinar
            </Button>
          </Link>
          <Link to="/logout">
            <Button variant="info" className="mr-3">
              Log Out
            </Button>
          </Link>
        </div>
      )}
      {!isLoggedIn && (
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
  );
}

export default Header;
