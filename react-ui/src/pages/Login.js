import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";
import Axios from 'axios';

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loginName, setLoginName] = useState("");
	const [loginStatus, setLoginStatus] = useState(false);

	Axios.defaults.withCredentials = true;
	useEffect(() => {
		const getLoginRes = async () => {

			const res = await Axios.get("http://localhost:5000/login");
			if (res.data.loggedIn) {
				setLoginName(res.data.user.name);
				// console.log("result: ", res.data.user.name);
			}
		}
		getLoginRes();
	}, [])

	function validateForm() {
		return email.length > 0 && password.length > 0;
	}

	async function handleSubmit(event) {
		event.preventDefault();
		const res = await Axios.post('http://localhost:5000/login', {
			email: email,
			password: password,
		});
		if (!res.data.auth) {
			setLoginStatus(false);
		} else {
			setLoginStatus(true);
			localStorage.setItem("token", res.data.token);
		}
		console.log(res);
	}

	return (
		<Container className="Login w-50">
			<h3>Weclome back, {loginName}</h3>
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
				<Button block size="lg" type="submit" variant="danger" disabled={!validateForm()}>
					Login
				</Button>
			</Form>
		</Container>
	);
}
