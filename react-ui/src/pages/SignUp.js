import React, { useState } from "react";
// import { Redirect } from "react-router";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from 'axios';

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [emailError, setEmailError] = useState("");
	const [passwordError, setPasswordError] = useState("");

	// console.log(localStorage.getItem("token"));

	function validateForm() {
		return name.length > 0 && email.length > 0 && password.length > 0;
	}
	console.log(window);
	async function handleSubmit(event) {
		event.preventDefault();

		// clear error messages
		setEmailError("");
		setPasswordError("");
		// TODO: Verify password before post

		const res = await Axios.post('http://localhost:5000/signup', {
			email: email,
			password: password,
			name: name
		});
		// if there's an error
		if (res.data.error) {
			setEmailError(res.data.error);
		} else {
			props.history.push("/login");
		}
	}

	return (
		<Container className="Login w-50">
			{/* <h1>{window.reactApp.user}</h1> */}
			<Form onSubmit={handleSubmit}>
				<Form.Group className="mt-5" size="lg" controlId="name">
					<Form.Label>Full Name</Form.Label>
					<Form.Control
						autoFocus
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</Form.Group>
				<Form.Group size="lg" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					{emailError != "" && <h4>{emailError}</h4>}
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button block size="lg" type="submit" variant="danger" disabled={!validateForm()}>
					Sign Up
				</Button>
			</Form>
			<p className="mt-4">By signing up, you agree to our Terms of Use and Privacy Policy</p>
			<hr />
			<p className="mt-4">Already have an account?  <Link to="/login">Log In</Link></p>
		</Container>
	);
}