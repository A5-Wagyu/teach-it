import React from "react";
import { Link } from "react-router-dom";
import {
	Navbar,
	Nav,
	NavDropdown,
	Form,
	FormControl,
	Button,
} from "react-bootstrap";
import { DropdownSubmenu, NavDropdownMenu } from "react-bootstrap-submenu";

export default function Header() {
	return (
		<Navbar bg="light" expand="lg">
			<Link to="/">
				<Navbar.Brand>Teach It</Navbar.Brand>
			</Link>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr">
					<NavDropdownMenu
						title="Browse Topics"
						id="collasible-nav-dropdown"
						className="mr-3"
					>
						<DropdownSubmenu href="#action/3.7" title="Computer Science">
							<NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
						</DropdownSubmenu>
					</NavDropdownMenu>
				</Nav>

				<Form className="w-75" inline>
					<FormControl className="w-50 mr-2" type="text" placeholder="Search" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
			<Link to="/login">
				<Button variant="outline-primary" className="mr-3">
					Log In
				</Button>
			</Link>
			<Link to="/signup">
				<Button variant="primary" className="mr-3">
					Sign Up
				</Button>
			</Link>
		</Navbar>
	);
}
