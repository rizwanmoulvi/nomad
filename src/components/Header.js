import React from 'react';
import { Navbar, Form, Button, FormControl } from 'react-bootstrap';

const Header = ({ account, setFilteredCity }) => {
  return (
    <Navbar bg="light" expand="lg" className="mb-4">
      <Navbar.Brand href="#home">Nomad DApp</Navbar.Brand>
      <Form inline className="ml-auto">
        <FormControl
          type="text"
          placeholder="Search by city"
          className="mr-sm-2"
          onChange={(e) => setFilteredCity(e.target.value)}
        />
        <Button variant="outline-primary" onClick={() => window.ethereum.request({ method: 'eth_requestAccounts' })}>
          {account ? `${account.slice(0, 6)}...${account.slice(-4)}` : 'Connect Wallet'}
        </Button>
      </Form>
    </Navbar>
  );
};

export default Header;
