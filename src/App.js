import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import { Container, Button, Modal, Form } from 'react-bootstrap';
import detectEthereumProvider from '@metamask/detect-provider';
import Header from './components/Header';
import Listings from './components/Listings';
import ListingForm from './components/ListingForm';
import { abi } from './contracts/abi';

const address = '0xBD7388875afcFd8ED303855E1888e60D13860750'

const App = () => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredCity, setFilteredCity] = useState('');

  const [showBookingModal, setShowBookingModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [currentListing, setCurrentListing] = useState(null);
  const [currentBooking, setCurrentBooking] = useState(null);

  useEffect(() => {
    const loadBlockchainData = async () => {
      const provider = await detectEthereumProvider();
      if (provider) {
        await provider.request({ method: 'eth_requestAccounts' });
        const web3 = new Web3(provider);
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const deployedNetwork = new Web3('https://rpc.sepolia-api.lisk.com');
        if (deployedNetwork) {
          const contract = new web3.eth.Contract(abi, address);
          setContract(contract);

          const listingCount = await contract.methods.listingCount().call();
          let listings = [];
          for (let i = 1; i <= listingCount; i++) {
            const listing = await contract.methods.listings(i).call();
            listings.push(listing);
          }
          setListings(listings);
        } else {
          alert('Smart contract not deployed to detected network.');
        }
      }
    };

    loadBlockchainData();
  }, []);

  const createListing = async (city, pricePerNight) => {
    await contract.methods.createListing(city, pricePerNight).send({ from: account });
    window.location.reload();
  };

  const createBooking = async (listingId, startDate, endDate) => {
    const listing = listings.find(listing => listing.id === listingId);
    const price = listing.pricePerNight * BigInt(endDate - startDate);
    await contract.methods.createBooking(listingId, startDate, endDate).send({ from: account, value: price });
    window.location.reload();
  };

  const addReview = async (bookingId, rating, comment) => {
    await contract.methods.addReview(bookingId, rating, comment).send({ from: account });
    window.location.reload();
  };

  return (
    <Container>
      <Header account={account} setFilteredCity={setFilteredCity} />
      <ListingForm createListing={createListing} />
      <Listings
        listings={listings}
        filteredCity={filteredCity}
        setShowBookingModal={setShowBookingModal}
        setShowReviewModal={setShowReviewModal}
        setCurrentListing={setCurrentListing}
        setCurrentBooking={setCurrentBooking}
      />
      <BookingModal
        show={showBookingModal}
        handleClose={() => setShowBookingModal(false)}
        createBooking={createBooking}
        currentListing={currentListing}
      />
      <ReviewModal
        show={showReviewModal}
        handleClose={() => setShowReviewModal(false)}
        addReview={addReview}
        currentBooking={currentBooking}
      />
    </Container>
  );
};

const BookingModal = ({ show, handleClose, createBooking, currentListing }) => {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    createBooking(currentListing.id, startDate, endDate);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Book Listing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Start Date</Form.Label>
            <Form.Control type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>End Date</Form.Label>
            <Form.Control type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Book
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

const ReviewModal = ({ show, handleClose, addReview, currentBooking }) => {
  const [rating, setRating] = useState('');
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addReview(currentBooking.id, rating, comment);
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Review Booking</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Rating</Form.Label>
            <Form.Control type="number" value={rating} onChange={(e) => setRating(e.target.value)} required />
          </Form.Group>
          <Form.Group>
            <Form.Label>Comment</Form.Label>
            <Form.Control type="text" value={comment} onChange={(e) => setComment(e.target.value)} required />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Review
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default App;
