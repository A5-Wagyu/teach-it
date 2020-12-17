import React, { useState } from 'react';
import { Form, Container, Button } from 'react-bootstrap';

export default function CreateWebinar() {
  // Need to fetch categories data
  const dummyCategories = ["Computer Science", "Business", "Personal Finance", "Science", "Music"]

  const [values, setValues] = useState({
    title: '',
    description: '',
    categories: '',
    attendantLearn: '',
    attendantKnow: '',
    attendantTool: '',
    zoomLink: '',
    zoomPassword: ''
  })

  const onChange = (event) => {
    setValues({...values, [event.target.name] : event.target.value});
  }

  // What to do for onSubmit?
  const onSubmit = (event) => {
    console.log(values);
    event.preventDefault();
  }

  return (
    <div>
      <Container className="mt-5">
        <h1>Create A New Webinar</h1>

        <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Control className="mt-4" name="title" value={values.title} type="text" placeholder="Title" onChange={onChange} />

          <Form.Control className="mt-4" name="description" value={values.description} as="textarea" rows={3}  placeholder="Description" onChange={onChange}/>

          <Form.Control className="mt-4" name="categories" value={values.categories} as="select" defaultValue="" onChange={onChange}>
            <option hidden value="">Categories</option>
            {dummyCategories.map(category => (
              <option>{category}</option>
            ))}
          </Form.Control>

          <Form.Control className="mt-4" name="attendantLearn" value={values.attendantLearn} as="textarea" rows={3}  placeholder="What attendants will learn" onChange={onChange}/>
          <Form.Control className="mt-4" name="attendantKnow" value={values.attendantKnow} as="textarea" rows={3}  placeholder="What attendants will need to know beforehand" onChange={onChange}/>
          <Form.Control className="mt-4" name="attendantTool" value={values.attendantTool} as="textarea" rows={3}  placeholder="Tool attendants will need" onChange={onChange}/>

          <Form.Control className="mt-4" name="zoomLink" value={values.zoomLink} type="text" placeholder="Zoom Link" onChange={onChange}/>
          <Form.Control className="mt-4" name="zoomPassword" value={values.zoomPassword} type="password" placeholder="Zoom Passcode" onChange={onChange}/>
          </Form.Group>

          <Button className="mb-4" as="input" type="submit" value="Submit"></Button>
        </Form>
      </Container>
    </div>
  )
}
