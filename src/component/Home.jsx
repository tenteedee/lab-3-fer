import React, { useEffect, useState } from 'react';
import {
  Table,
  Container,
  Row,
  Col,
  ListGroup,
  Form,
  Button,
} from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [vehicles, setVehicles] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [completedChecked, setCompletedChecked] = useState(true);
  const [uncompletedChecked, setUncompletedChecked] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:9999/vehicles').then((response) => {
      setVehicles(response.data);
    });

    axios.get('http://localhost:9999/services').then((response) => {
      setServices(response.data);
    });
  }, []);

  const handleVehicleSelect = (id) => {
    setSelectedVehicleId(id);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCompletedChange = (e) => {
    setCompletedChecked(e.target.checked);
  };

  const handleUncompletedChange = (e) => {
    setUncompletedChecked(e.target.checked);
  };

  const filteredServices = services
    .filter((service) => {
      if (selectedVehicleId) {
        return service.vehicleId === selectedVehicleId;
      }
      return true;
    })
    .filter((service) => {
      if (searchTerm) {
        return service.type.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .filter((service) => {
      if (completedChecked && uncompletedChecked) {
        return true;
      }
      if (completedChecked) {
        return service.status === 'completed';
      }
      if (uncompletedChecked) {
        return service.status === 'uncompleted';
      }
      return false;
    });

  const navigateToDetail = (id) => {
    navigate(`/service/${id}`);
  };

  const navigateToAddService = () => {
    navigate(`/service/add`);
  };

  const navigateToEditService = (id) => {
    navigate(`/service/edit/${id}`);
  };

  const deleteService = (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      axios.delete(`http://localhost:9999/services/${id}`).then(() => {
        setServices(services.filter((service) => service.id != id));
      });
    }
  };

  return (
    <Container>
      <Row className="my-4">
        <Col md={4}>
          <h2>Vehicles</h2>
          <ListGroup>
            <ListGroup.Item
              action
              active={selectedVehicleId == null}
              onClick={() => handleVehicleSelect(null)}
            >
              All Vehicles
            </ListGroup.Item>
            {vehicles.map((vehicle) => (
              <ListGroup.Item
                key={vehicle.id}
                action
                active={selectedVehicleId == vehicle.id}
                onClick={() => handleVehicleSelect(vehicle.id)}
              >
                {vehicle.make} {vehicle.model} ({vehicle.year})
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>

        <Col md={8}>
          <h2>Services</h2>
          <Button onClick={navigateToAddService} className="mb-3">Add New Service</Button>

          <Form.Group controlId="searchService" className="mb-3">
            <Form.Control
              type="text"
              placeholder="Search service by name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Completed"
              checked={completedChecked}
              onChange={handleCompletedChange}
            />
            <Form.Check
              type="checkbox"
              label="Uncompleted"
              checked={uncompletedChecked}
              onChange={handleUncompletedChange}
            />
          </Form.Group>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Type</th>
                <th>Cost</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredServices.length > 0 ? (
                filteredServices.map((service) => (
                  <tr key={service.id}>
                    <td>{service.id}</td>
                    <td>{service.type}</td>
                    <td>{service.cost}</td>
                    <td>{service.status}</td>
                    <td>
                      <Button onClick={() => navigateToDetail(service.id)}>
                        Detail
                      </Button>
                      <Button onClick={() => navigateToEditService(service.id)}>Edit</Button>
                      <Button onClick={() => deleteService(service.id)}>Delete</Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    No services available for the selected filters
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
