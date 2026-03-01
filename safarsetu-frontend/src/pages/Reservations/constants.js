export const reservationArray = [
    {
        id: 1,

        userId: 201,
        userName: "Vaishnav Gupta",
        userEmail: "vaishnav@example.com",

        vehicleId: 101,
        vehicleModelName: "Honda Aviator",
        vehicleRegsNo: "UP76AB5467",
        vehicleBrand: "Honda",
        isVehicleAvailable: false,

        status: "PENDING",
        reservedAt: "2026-02-01T09:30:00",
        availableAt: null,
        availableUntil: null,
        fulfilledAt: null,
        cancelledAt: null,
        queuePosition: 3,
        notificationSent: false,
        notes: "Waiting for vehicle return",

        createdAt: "2026-02-01T09:30:00",
        updatedAt: "2026-02-01T09:30:00",

        isExpired: false,
        canBeCancelled: true,
        hoursUntilExpiry: null
    },

    {
        id: 2,

        userId: 201,
        userName: "Vaishnav Gupta",
        userEmail: "vaishnav@example.com",

        vehicleId: 102,
        vehicleModelName: "Hyundai Creta",
        vehicleRegsNo: "DL3CAF9988",
        vehicleBrand: "Hyundai",
        isVehicleAvailable: true,

        status: "AVAILABLE",
        reservedAt: "2026-01-31T14:00:00",
        availableAt: "2026-02-01T10:00:00",
        availableUntil: "2026-02-01T18:00:00",
        fulfilledAt: null,
        cancelledAt: null,
        queuePosition: 1,
        notificationSent: true,
        notes: "Vehicle ready for pickup",

        createdAt: "2026-01-31T14:00:00",
        updatedAt: "2026-02-01T10:00:00",

        isExpired: false,
        canBeCancelled: true,
        hoursUntilExpiry: 8
    },

    {
        id: 3,

        userId: 201,
        userName: "Vaishnav Gupta",
        userEmail: "vaishnav@example.com",

        vehicleId: 103,
        vehicleModelName: "Royal Enfield Classic 350",
        vehicleRegsNo: "MH12XY4455",
        vehicleBrand: "Royal Enfield",
        isVehicleAvailable: false,

        status: "FULFILLED",
        reservedAt: "2026-01-29T11:00:00",
        availableAt: "2026-01-30T09:00:00",
        availableUntil: "2026-01-30T15:00:00",
        fulfilledAt: "2026-01-30T13:45:00",
        cancelledAt: null,
        queuePosition: 1,
        notificationSent: true,
        notes: "Picked up successfully",

        createdAt: "2026-01-29T11:00:00",
        updatedAt: "2026-01-30T13:45:00",

        isExpired: false,
        canBeCancelled: false,
        hoursUntilExpiry: 0
    },

    {
        id: 4,

        userId: 201,
        userName: "Vaishnav Gupta",
        userEmail: "vaishnav@example.com",

        vehicleId: 104,
        vehicleModelName: "Suzuki Access 125",
        vehicleRegsNo: "KA05TT1122",
        vehicleBrand: "Suzuki",
        isVehicleAvailable: false,

        status: "EXPIRED",
        reservedAt: "2026-01-28T10:00:00",
        availableAt: "2026-01-29T09:00:00",
        availableUntil: "2026-01-29T13:00:00",
        fulfilledAt: null,
        cancelledAt: null,
        queuePosition: 2,
        notificationSent: true,
        notes: "Pickup window expired",

        createdAt: "2026-01-28T10:00:00",
        updatedAt: "2026-01-29T13:05:00",

        isExpired: true,
        canBeCancelled: false,
        hoursUntilExpiry: -2
    },

    {
        id: 5,

        userId: 201,
        userName: "Vaishnav Gupta",
        userEmail: "vaishnav@example.com",

        vehicleId: 105,
        vehicleModelName: "Tata Nexon EV",
        vehicleRegsNo: "GJ01EV7788",
        vehicleBrand: "Tata",
        isVehicleAvailable: false,

        status: "CANCELLED",
        reservedAt: "2026-01-27T16:30:00",
        availableAt: null,
        availableUntil: null,
        fulfilledAt: null,
        cancelledAt: "2026-01-27T18:00:00",
        queuePosition: 4,
        notificationSent: false,
        notes: "User cancelled reservation",

        createdAt: "2026-01-27T16:30:00",
        updatedAt: "2026-01-27T18:00:00",

        isExpired: false,
        canBeCancelled: false,
        hoursUntilExpiry: null
    }
];

export const getStatusColor = (status) => {
    const colors = {
        PENDING: {
            bg: "bg-yellow-50",
            text: "text-yellow-800",
            border: "border-yellow-200",
            gradient: "from-yellow-100 to-yellow-200",
        },

        AVAILABLE: {
            bg: "bg-green-50",
            text: "text-green-800",
            border: "border-green-200",
            gradient: "from-green-100 to-green-200",
        },
        FULFILLED: {
            bg: "bg-blue-50",
            text: "text-blue-800",
            border: "border-blue-200",
            gradient: "from-blue-100 to-blue-200",
        },
        CANCELLED: {
            bg: "bg-red-50",
            text: "text-red-800",
            border: "border-red-200",
            gradient: "from-red-100 to-red-200",
        },
        EXPIRED: {
            bg: "bg-gray-50",
            text: "text-gray-800",
            border: "border-gray-200",
            gradient: "from-gray-100 to-gray-200",
        },
    }
    return colors[status] || colors.EXPIRED;
}

export const getStatusFromIdx = [null, "AVAILABLE","FULFILLED" ]
