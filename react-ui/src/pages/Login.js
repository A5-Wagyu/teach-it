import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container, Alert } from "react-bootstrap";
import { login } from "../services/authService";

import Axios from "axios";

export default function Login({ setIsAuthenticated, history }) {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	Axios.defaults.withCredentials = true;

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const res = await login({ email, password });

		// if there's an error
		if (res.error) {
			setError(res.error);
		} else {
			setIsAuthenticated(true);
			history.push("/");
		}
	}

	return (
		<>
			<style type="text/css">
				{`
					.btn-danger:hover{
						background-color:#C82333;
						cursor:pointer;
					}
				`}
			</style>
			<Container className="Login w-50">
				<h1 className="mt-5">Log in</h1>

				<Form onSubmit={handleSubmit}>
					<Form.Group className="mt-5" size="lg" controlId="email">
						<Form.Label>Email</Form.Label>
						<Form.Control
							autoFocus
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
					<Button
						block
						size="lg"
						type="submit"
						variant="danger"
						disabled={!validateForm()}
						id="btn-primary"
					>
						Login
					</Button>
				</Form>
				{error && (
					<Alert variant="danger" className="mt-3">
						{error}
					</Alert>
				)}
			</Container>
		</>
	);
}
