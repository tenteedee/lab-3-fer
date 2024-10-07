import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';

const EditSevice = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:9999/services/${id}`).then((response) => {
      const fetchedService = response.data;
      setService(fetchedService);
      setType(fetchedService.type);
      setCost(fetchedService.cost);
      setStatus(fetchedService.status);
    });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedService = { type, cost, status };
    
    axios.put(`http://localhost:9999/services/${id}`, updatedService).then(() => {
      navigate('/');
    });
  };

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <Container className="my-4">
      <h2>Edit Service</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formServiceType" className="mb-3">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formServiceCost" className="mb-3">
          <Form.Label>Service Cost</Form.Label>
          <Form.Control
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formServiceStatus" className="mb-3">
          <Form.Label>Service Status</Form.Label>
          <Form.Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="completed">Completed</option>
            <option value="uncompleted">Uncompleted</option>
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Service
        </Button>
      </Form>
    </Container>
  );
};

export default EditSevice;
