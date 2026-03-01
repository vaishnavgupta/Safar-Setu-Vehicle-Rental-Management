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