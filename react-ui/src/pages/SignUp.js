import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Button, Container } from "react-bootstrap";

export default function Login() {
	const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

	function validateForm() {
		return name.length > 0 && email.length > 0 && password.length > 0;
	}

	function handleSubmit(event) {
		event.preventDefault();
	}

	return (
		<Container className="Login w-50">
			<Form onSubmit={handleSubmit}>
        <Form.Group className="mt-5" size="lg" controlId="name">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            autoFocus
            type="email"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
				</Form.Group>
				<Form.Group size="lg" controlId="email">
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
				<Button block size="lg" type="submit" disabled={!validateForm()}>
					Sign Up
				</Button>
			</Form>
		</Container>
	);
}