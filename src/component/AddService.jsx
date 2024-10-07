import React, { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AddService = () => {
  const [vehicles, setVehicles] = useState([]);
  const [type, setType] = useState('');
  const [cost, setCost] = useState('');
  const [status, setStatus] = useState('completed');
  const [selectedVehicleId, setSelectedVehicleId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:9999/vehicles').then((response) => {
      setVehicles(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newService = { type, cost, status, vehicleId: Number(selectedVehicleId) };
    
    axios.post('http://localhost:9999/services', newService).then(() => {
      navigate('/');
    });
  };

  return (
    <Container className="my-4">
      <h2>Add New Service</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formServiceType" className="mb-3">
          <Form.Label>Service Type</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter service type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formServiceCost" className="mb-3">
          <Form.Label>Service Cost</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter service cost"
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

        <Form.Group controlId="formVehicleModel" className="mb-3">
          <Form.Label>Select Vehicle Model</Form.Label>
          <Form.Select
            value={selectedVehicleId}
            onChange={(e) => setSelectedVehicleId(e.target.value)}
            required
          >
            <option value="">Choose a vehicle model</option>
            {vehicles.map((vehicle) => (
              <option key={vehicle.id} value={vehicle.id}>
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Service
        </Button>
      </Form>
    </Container>
  );
};

export default AddService;
