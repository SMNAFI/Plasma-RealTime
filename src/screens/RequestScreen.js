import React, { useState } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import FormContainer from '../components/FormContainer'
import Message from './../components/Message'
import { Button, Form } from 'react-bootstrap'
import { db } from './../firebase'
import Loader from './../components/Loader'

const RequestPage = () => {
  const [problem, setProblem] = useState('')
  const [bloodGroup, setBloodGroup] = useState('A+')
  const [time, setTime] = useState('')
  const [date, setDate] = useState('')
  const [numBag, setNumBag] = useState(1)
  const [contact, setContact] = useState('')
  const [location, setLocation] = useState('')
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const submitHandler = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await addDoc(collection(db, 'requests'), {
        problem,
        bloodGroup,
        location,
        numBag,
        contact,
        time,
        date,
        numManaged: 0,
        response: 0,
        timestamp: serverTimestamp(),
      })
      setProblem('')
      setBloodGroup('A+')
      setLocation('')
      setNumBag(1)
      setContact('')
      setLocation('')
      setTime('')
      setDate('')
      setLoading(false)
      setSuccess(true)
      console.log(res)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  return (
    <>
      <h1 className='text-center my-5'>Request for blood</h1>
      <FormContainer>
        {success && <Message>Request posted successfully</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <Loader />}

        <Form onSubmit={submitHandler} className='mb-5'>
          <Form.Group controlId='problem'>
            <Form.Label>Problem</Form.Label>
            <Form.Control
              as='textarea'
              placeholder='Enter your reason'
              value={problem}
              onChange={(e) => setProblem(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='bloodGroup'>
            <Form.Label>Required Blood Group</Form.Label>
            <Form.Select
              value={bloodGroup}
              size='sm'
              onChange={(e) => setBloodGroup(e.target.value)}
              required={true}
            >
              <option>A+</option>
              <option>A-</option>
              <option>B+</option>
              <option>B-</option>
              <option>AB+</option>
              <option>AB-</option>
              <option>O+</option>
              <option>O-</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId='numBag'>
            <Form.Label>Required number of bages</Form.Label>
            <Form.Control
              type='number'
              placeholder='Num of bages'
              value={numBag}
              onChange={(e) => setNumBag(e.target.value)}
              required={true}
              min='1'
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='location'>
            <Form.Label>Location</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter location'
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='time'>
            <Form.Label>Time</Form.Label>
            <Form.Control
              type='time'
              placeholder='Time'
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='date'>
            <Form.Label>Date</Form.Label>
            <Form.Control
              type='date'
              placeholder='Date'
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required={true}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='contact'>
            <Form.Label>Contact Number</Form.Label>
            <Form.Control
              type='text'
              placeholder='Contact Number'
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required={true}
              pattern='[0-9]{11}'
              title='11 digits phone number'
            ></Form.Control>
          </Form.Group>

          <Button type='submit' varient='primary' className='mt-3'>
            Submit your request
          </Button>
        </Form>
      </FormContainer>
    </>
  )
}

export default RequestPage