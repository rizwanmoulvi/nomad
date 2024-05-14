// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract nomad {
    struct Listing {
        uint id;
        address host;
        string city;
        uint pricePerNight;
        bool isAvailable;
    }

    struct Booking {
        uint id;
        uint listingId;
        address guest;
        uint startDate;
        uint endDate;
        bool isReviewed;
    }

    struct Review {
        uint id;
        uint bookingId;
        address reviewer;
        uint8 rating; 
        string comment;
    }

    uint public listingCount = 0;
    uint public bookingCount = 0;
    uint public reviewCount = 0;

    mapping(uint => Listing) public listings;
    mapping(uint => Booking) public bookings;
    mapping(uint => Review) public reviews;

    event ListingCreated(
        uint id,
        address host,
        string city,
        uint pricePerNight,
        bool isAvailable
    );
    event BookingCreated(
        uint id,
        uint listingId,
        address guest,
        uint startDate,
        uint endDate
    );
    event ReviewCreated(
        uint id,
        uint bookingId,
        address reviewer,
        uint8 rating,
        string comment
    );

    function createListing(
        string memory _city,
        uint _pricePerNight
    ) public {
        listingCount++;
        listings[listingCount] = Listing(
            listingCount,
            msg.sender,
            _city,
            _pricePerNight,
            true
        );
        emit ListingCreated(
            listingCount,
            msg.sender,
            _city,
            _pricePerNight,
            true
        );
    }

    function createBooking(
        uint _listingId,
        uint _startDate,
        uint _endDate
    ) public payable {
        Listing memory listing = listings[_listingId];
        require(listing.isAvailable, "Listing is not available");
        require(
            msg.value >= listing.pricePerNight * (_endDate - _startDate),
            "Not enough Ether sent"
        );

        bookingCount++;
        bookings[bookingCount] = Booking(
            bookingCount,
            _listingId,
            msg.sender,
            _startDate,
            _endDate,
            false
        );
        listing.isAvailable = false;
        listings[_listingId] = listing;

        payable(listing.host).transfer(msg.value);
        emit BookingCreated(bookingCount, _listingId, msg.sender, _startDate, _endDate);
    }

    function addReview(
        uint _bookingId,
        uint8 _rating,
        string memory _comment
    ) public {
        Booking storage booking = bookings[_bookingId];
        require(booking.guest == msg.sender, "Only the guest can leave a review");
        require(!booking.isReviewed, "Booking already reviewed");
        require(_rating > 0 && _rating <= 5, "Rating should be between 1 and 5");

        reviewCount++;
        reviews[reviewCount] = Review(
            reviewCount,
            _bookingId,
            msg.sender,
            _rating,
            _comment
        );
        booking.isReviewed = true;

        emit ReviewCreated(reviewCount, _bookingId, msg.sender, _rating, _comment);
    }
}
