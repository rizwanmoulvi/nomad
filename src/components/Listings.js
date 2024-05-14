import React from 'react';
import { Card, Button } from 'react-bootstrap';
import Web3 from 'web3';

const Listings = ({
  listings,
  filteredCity,
  setShowBookingModal,
  setShowReviewModal,
  setCurrentListing,
  setCurrentBooking
}) => {
  const filteredListings = listings.filter(listing => listing.city.toLowerCase().includes(filteredCity.toLowerCase()));

  return (
    <div>
      {filteredListings.map((listing, index) => (
        <Card key={index} className="mb-4">
          <Card.Body>
            <Card.Title>Listing #{listing.id}</Card.Title>
            <Card.Text>City: {listing.city}</Card.Text>
            <Card.Text>Price Per Night: {Web3.utils.fromWei(listing.pricePerNight, 'ether')} ETH</Card.Text>
            <Button
              variant="success"
              onClick={() => {
                setCurrentListing(listing);
                setShowBookingModal(true);
              }}
            >
              Book
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setCurrentBooking(listing);
                setShowReviewModal(true);
              }}
            >
              Review
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default Listings;
