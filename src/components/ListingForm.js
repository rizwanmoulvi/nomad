import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const ListingForm = ({ createListing }) => {
  const [city, setCity] = useState('');
  const [pricePerNight, setPricePerNight] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createListing(city, pricePerNight);
  };

  return (
    <Form onSubmit={handleSubmit} className="mb-4">
      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control type="text" value={city} onChange={(e) => setCity(e.target.value)} required />
      </Form.Group>
      <Form.Group>
        <Form.Label>Price Per Night</Form.Label>
        <Form.Control type="number" value={pricePerNight} onChange={(e) => setPricePerNight(e.target.value)} required />
      </Form.Group>
      <Button variant="primary" type="submit">
        Create Listing
      </Button>
    </Form>
  );
};

export default ListingForm;
