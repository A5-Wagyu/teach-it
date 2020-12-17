import React from "react";
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
			<Navbar.Brand href="#home">Teach It</Navbar.Brand>
			<Navbar.Toggle aria-controls="basic-navbar-nav" />
			<Navbar.Collapse id="basic-navbar-nav">
				<Nav className="mr-auto">
					{/* 
					<NavDropdown title="Browse Topics" id="basic-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">
							Computer Science
						</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.2">Business</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.3">Science</NavDropdown.Item>

						<NavDropdown.Item href="#action/3.4">Music</NavDropdown.Item>
						<NavDropdown.Item href="#action/3.5">
							Personal Develoopment
						</NavDropdown.Item>
					</NavDropdown> */}

					<Nav.Link href="#features">Features</Nav.Link>
					<NavDropdownMenu title="Dropdown 1" id="collasible-nav-dropdown">
						<NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
						<DropdownSubmenu href="#action/3.7" title="Text to show">
							<NavDropdown.Item href="#action/8.1">Sub 1</NavDropdown.Item>
							<DropdownSubmenu href="#action/3.7" title="Text to show">
								<NavDropdown.Item href="#action/9.1">Sub 2</NavDropdown.Item>
							</DropdownSubmenu>
						</DropdownSubmenu>
					</NavDropdownMenu>
				</Nav>
				<Form inline>
					<FormControl type="text" placeholder="Search" className="mr-sm-2" />
					<Button variant="outline-success">Search</Button>
				</Form>
			</Navbar.Collapse>
			<Button variant="outline-primary"> Log In</Button>
			<Button variant="primary">Sign Up </Button>
		</Navbar>
	);
}
