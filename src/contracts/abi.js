export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_bookingId",
				"type": "uint256"
			},
			{
				"internalType": "uint8",
				"name": "_rating",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "_comment",
				"type": "string"
			}
		],
		"name": "addReview",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "guest",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "startDate",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "endDate",
				"type": "uint256"
			}
		],
		"name": "BookingCreated",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_listingId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_endDate",
				"type": "uint256"
			}
		],
		"name": "createBooking",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_city",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_pricePerNight",
				"type": "uint256"
			}
		],
		"name": "createListing",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "host",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "pricePerNight",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"name": "ListingCreated",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "bookingId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "comment",
				"type": "string"
			}
		],
		"name": "ReviewCreated",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "bookingCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "bookings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "listingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "guest",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "startDate",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "endDate",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isReviewed",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "listingCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "listings",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "host",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "city",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "pricePerNight",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "isAvailable",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "reviewCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "reviews",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "bookingId",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "reviewer",
				"type": "address"
			},
			{
				"internalType": "uint8",
				"name": "rating",
				"type": "uint8"
			},
			{
				"internalType": "string",
				"name": "comment",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]