export const vehicleCategories = [
    {
        id: 1,
        code: "CAR",
        name: "Cars",
        description: "All four-wheeler cars",
        displayOrder: 1,
        active: true,
        parentCategoryId: null,
        parentCategoryName: null,
        subCategories: [
            {
                id: 6,
                code: "SEDAN",
                name: "Sedan",
                description: "Comfortable sedan cars",
                displayOrder: 1,
                active: true,
                parentCategoryId: 1,
                parentCategoryName: "Cars",
                subCategories: [],
                vehicleCount: 12,
                createdAt: "2026-01-20T10:15:30",
                updatedAt: "2026-01-22T12:00:00"
            },
            {
                id: 7,
                code: "SUV",
                name: "SUV",
                description: "Sports Utility Vehicles",
                displayOrder: 2,
                active: true,
                parentCategoryId: 1,
                parentCategoryName: "Cars",
                subCategories: [],
                vehicleCount: 8,
                createdAt: "2026-01-20T10:20:00",
                updatedAt: "2026-01-22T12:00:00"
            }
        ],
        vehicleCount: 20,
        createdAt: "2026-01-20T10:00:00",
        updatedAt: "2026-01-22T12:00:00"
    },

    {
        id: 2,
        code: "BIKE",
        name: "Bikes",
        description: "Two-wheeler motorbikes",
        displayOrder: 2,
        active: true,
        parentCategoryId: null,
        parentCategoryName: null,
        subCategories: [
            {
                id: 8,
                code: "SPORTS_BIKE",
                name: "Sports Bike",
                description: "High performance bikes",
                displayOrder: 1,
                active: true,
                parentCategoryId: 2,
                parentCategoryName: "Bikes",
                subCategories: [],
                vehicleCount: 5,
                createdAt: "2026-01-21T09:00:00",
                updatedAt: "2026-01-22T11:30:00"
            }
        ],
        vehicleCount: 15,
        createdAt: "2026-01-21T08:30:00",
        updatedAt: "2026-01-22T11:30:00"
    },

    {
        id: 3,
        code: "SCOOTER",
        name: "Scooters",
        description: "Lightweight scooters for city travel",
        displayOrder: 3,
        active: true,
        parentCategoryId: null,
        parentCategoryName: null,
        subCategories: [],
        vehicleCount: 10,
        createdAt: "2026-01-21T09:45:00",
        updatedAt: "2026-01-22T13:10:00"
    },

    {
        id: 4,
        code: "ELECTRIC",
        name: "Electric Vehicles",
        description: "Eco-friendly electric vehicles",
        displayOrder: 4,
        active: true,
        parentCategoryId: null,
        parentCategoryName: null,
        subCategories: [
            {
                id: 9,
                code: "ELECTRIC_CAR",
                name: "Electric Car",
                description: "Battery powered cars",
                displayOrder: 1,
                active: true,
                parentCategoryId: 4,
                parentCategoryName: "Electric Vehicles",
                subCategories: [],
                vehicleCount: 6,
                createdAt: "2026-01-21T10:30:00",
                updatedAt: "2026-01-22T14:00:00"
            }
        ],
        vehicleCount: 6,
        createdAt: "2026-01-21T10:00:00",
        updatedAt: "2026-01-22T14:00:00"
    },

    {
        id: 5,
        code: "TRUCK",
        name: "Trucks",
        description: "Heavy commercial vehicles",
        displayOrder: 5,
        active: false,
        parentCategoryId: null,
        parentCategoryName: null,
        subCategories: [],
        vehicleCount: 3,
        createdAt: "2026-01-19T15:20:00",
        updatedAt: "2026-01-22T09:00:00"
    }
];

export const vehicleArray = [
    {
        id: 101,
        registrationNumber: "UP76AB5467",
        modelName: "Honda Aviator",
        brand: "Honda",

        categoryId: 3,
        categoryName: "Scooters",
        categoryCode: "SCOOTER",

        variant: "Standard",
        manufacturingDate: "2016-03-21",
        fuelType: "Petrol",
        seatingCapacity: 2,

        description: "Comfortable city scooter with smooth ride quality",
        totalUnits: 5,
        availableUnits: 2,
        rentalPrice: 450.00,

        vehicleImageUrl: null,
        active: true,

        createdAt: "2026-01-20T10:15:30",
        updatedAt: "2026-01-22T12:00:00",

        alreadyHaveLoan: false,
        alreadyHaveVehicle: false
    },

    {
        id: 102,
        registrationNumber: "DL3CAF9988",
        modelName: "Hyundai Creta",
        brand: "Hyundai",

        categoryId: 1,
        categoryName: "Cars",
        categoryCode: "CAR",

        variant: "SX (O)",
        manufacturingDate: "2021-08-10",
        fuelType: "Diesel",
        seatingCapacity: 5,

        description: "Premium SUV with spacious interior and safety features",
        totalUnits: 4,
        availableUnits: 0,
        rentalPrice: 2800.00,

        vehicleImageUrl:
            "https://imgd.aeplcdn.com/642x336/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80",

        active: true,

        createdAt: "2026-01-18T09:30:00",
        updatedAt: "2026-01-22T11:45:00",

        alreadyHaveLoan: true,
        alreadyHaveVehicle: true
    },

    {
        id: 103,
        registrationNumber: "MH12XY4455",
        modelName: "Royal Enfield Classic 350",
        brand: "Royal Enfield",

        categoryId: 2,
        categoryName: "Bikes",
        categoryCode: "BIKE",

        variant: "Stealth Black",
        manufacturingDate: "2022-02-14",
        fuelType: "Petrol",
        seatingCapacity: 2,

        description: "Classic styled motorcycle with strong road presence",
        totalUnits: 6,
        availableUnits: 4,
        rentalPrice: 900.00,

        vehicleImageUrl:
            "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/studio-shots/360/stealth-black/stealth-black-000.png",

        active: true,

        createdAt: "2026-01-17T14:00:00",
        updatedAt: "2026-01-22T10:20:00",

        alreadyHaveLoan: false,
        alreadyHaveVehicle: false
    },

    {
        id: 104,
        registrationNumber: "KA05TT1122",
        modelName: "Suzuki Access 125",
        brand: "Suzuki",

        categoryId: 3,
        categoryName: "Scooters",
        categoryCode: "SCOOTER",

        variant: "Special Edition",
        manufacturingDate: "2019-06-05",
        fuelType: "Petrol",
        seatingCapacity: 2,

        description: "Fuel efficient scooter ideal for daily commute",
        totalUnits: 3,
        availableUnits: 1,
        rentalPrice: 400.00,

        vehicleImageUrl: null,
        active: false,

        createdAt: "2026-01-15T11:00:00",
        updatedAt: "2026-01-21T16:45:00",

        alreadyHaveLoan: false,
        alreadyHaveVehicle: true
    },

    {
        id: 105,
        registrationNumber: "GJ01EV7788",
        modelName: "Tata Nexon EV",
        brand: "Tata",

        categoryId: 4,
        categoryName: "Electric Vehicles",
        categoryCode: "ELECTRIC",

        variant: "Max",
        manufacturingDate: "2023-01-12",
        fuelType: "Electric",
        seatingCapacity: 5,

        description: "Electric SUV with long range and fast charging support",
        totalUnits: 2,
        availableUnits: 0,
        rentalPrice: 3500.00,

        vehicleImageUrl: null,
        active: true,

        createdAt: "2026-01-10T09:10:00",
        updatedAt: "2026-01-22T13:30:00",

        alreadyHaveLoan: true,
        alreadyHaveVehicle: false
    }
];


