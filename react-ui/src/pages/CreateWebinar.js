import React, { useState } from 'react';
import { Form, Container, Button, Row, Col } from 'react-bootstrap';

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
    startTime: '',
    endTime: '',
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
      <Container className="mt-5 w-50">
        <h1>Create A New Webinar</h1>

        <Form className="text-justify" onSubmit={onSubmit}>
          <Form.Group>
            <Form.Label className="mt-4 h5">Title</Form.Label>
            <Form.Control name="title" value={values.title} type="text" placeholder="Title" onChange={onChange} />

            <Form.Label className="mt-4 h5">Description</Form.Label>
            <Form.Control name="description" value={values.description} as="textarea" rows={3}  placeholder="Description" onChange={onChange}/>

            <Row>
              <Col>
                <Form.Label className="mt-4 h5">Categories</Form.Label>
                <Form.Control name="categories" value={values.categories} as="select" defaultValue="" onChange={onChange}>
                  <option hidden value="">Categories</option>
                  {dummyCategories.map(category => (
                    <option>{category}</option>
                  ))}
                </Form.Control>
              </Col>

              <Col>
              <Form.Label className="mt-4 h5">Start Time</Form.Label>
              <Form.Control name="startTime" value={values.startTime} type="time" onChange={onChange}/>
              </Col>
              <Col>
              <Form.Label className="mt-4 h5">End Time</Form.Label>
              <Form.Control name="endTime" value={values.endTime} type="time" onChange={onChange}/>
              </Col>
            </Row>
            
            <Form.Label className="mt-4 h5">What attendants will learn</Form.Label>
            <Form.Control name="attendantLearn" value={values.attendantLearn} as="textarea" rows={3}  placeholder="What attendants will learn" onChange={onChange}/>
            
            <Form.Label className="mt-4 h5">What attendants will need to know</Form.Label>
            <Form.Control name="attendantKnow" value={values.attendantKnow} as="textarea" rows={3}  placeholder="What attendants will need to know" onChange={onChange}/>
            
            <Form.Label className="mt-4 h5">Tool attendants will need</Form.Label>
            <Form.Control name="attendantTool" value={values.attendantTool} as="textarea" rows={3}  placeholder="Tool attendants will need" onChange={onChange}/>

            <Form.Label className="mt-4 h5">Zoom Link</Form.Label>
            <Form.Control name="zoomLink" value={values.zoomLink} type="text" placeholder="Zoom Link" onChange={onChange}/>
            <Form.Label className="mt-4 h5">Zoom Password</Form.Label>
            <Form.Control name="zoomPassword" value={values.zoomPassword} type="password" placeholder="Zoom Passcode" onChange={onChange}/>
          </Form.Group>

          <Button className="mt-2 mb-5" as="input" type="submit" value="Submit"></Button>
        </Form>
      </Container>
    </div>
  )
}
