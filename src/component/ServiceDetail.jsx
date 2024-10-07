import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Card, Button } from 'react-bootstrap';
import axios from 'axios';

const ServiceDetail = () => {
  const { id } = useParams();
  const [service, setService] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:9999/services/${id}`).then((response) => {
      setService(response.data);
    });
  }, [id]);

  if (!service) {
    return <p>Loading service details...</p>;
  }

  return (
    <Container className="my-4">
      <Card>
        <Card.Header>Service Detail</Card.Header>
        <Card.Body>
          <Card.Title>{service.type}</Card.Title>
          <Card.Text>
            <strong>Cost:</strong> {service.cost} <br />
            <strong>Status:</strong> {service.status} <br />
            <strong>Vehicle ID:</strong> {service.vehicleId}
          </Card.Text>
          <Button href="/">Back to Home</Button>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default ServiceDetail;
