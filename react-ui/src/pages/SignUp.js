import React, { useState } from "react";
// import { Redirect } from "react-router";
import Form from "react-bootstrap/Form";
import { Button, Container, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import Axios from 'axios';
import { useAuth } from "../contexts/authContext";

export default function Login(props) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [name, setName] = useState("");
	const [error, setError] = useState("");
	const [passwordError, setPasswordError] = useState("");
	const [loading, setLoading] = useState(false);
	const { signup } = useAuth();

	// console.log(localStorage.getItem("token"));

	function validateForm() {
		return name.length > 0 && email.length > 0 && password.length > 0;
	}
	console.log(window);
	async function handleSubmit(event) {
		event.preventDefault();

		// clear error messages
		setError("");
		setPasswordError("");
		// TODO: Verify password before post
		setLoading(true);
		const res = await signup({
			email: email,
			password: password,
			name: name
		})
		setLoading(false);

		// if there's an error
		if (res.error) {
			setError(res.error);
		} else {
			props.history.push("/login");
		}
	}

	return (
		<Container className="Login w-50">
			<h1 className="mt-5">Sign up</h1>
			{ error && <Alert variant="danger" className="mt-3">{error}</Alert>}

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
				</Form.Group>
				<Form.Group size="lg" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</Form.Group>
				<Button disabled={loading} block size="lg" type="submit" variant="danger" disabled={!validateForm()}>
					Sign Up
				</Button>
			</Form>

			<p className="mt-4">By signing up, you agree to our Terms of Use and Privacy Policy</p>
			<hr />
			<p className="mt-4">Already have an account?  <Link to="/login">Log In</Link></p>
		</Container>
	);
}