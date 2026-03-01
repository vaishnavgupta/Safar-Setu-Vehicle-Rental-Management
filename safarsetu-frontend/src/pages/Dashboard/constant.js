const rentalArray = [
    {
        id: 1,
        vehicleId: 101,
        vehicleModelName: "Honda Aviator",
        vehicleRegsNo: "UP76AB5467",
        vehicleBrand: "Honda",
        vehicleImageUrl: null,

        status: "ACTIVE",
        checkoutDate: "2026-01-01",
        dueDate: "2026-02-10",
        remainingDays: 5,
        returnDate: null,

        fineAmount: 0,
        finePaid: false,

        isOverdue: false,
        overdueDays: 0
    },

    {
        id: 2,
        vehicleId: 102,
        vehicleModelName: "Hyundai Creta",
        vehicleRegsNo: "DL3CAF9988",
        vehicleBrand: "Hyundai",
        vehicleImageUrl: "https://imgd.aeplcdn.com/642x336/n/cw/ec/106815/creta-exterior-right-front-three-quarter-6.png?isig=0&q=80",

        status: "OVERDUE",
        checkoutDate: "2026-01-01",
        dueDate: "2026-01-20",
        remainingDays: -3,
        returnDate: null,

        fineAmount: 750.00,
        finePaid: false,

        isOverdue: true,
        overdueDays: 3,
        notes: "Taken from Store No. 3 Khalid Market Road by Cash Payment"
    },

    {
        id: 3,
        vehicleId: 103,
        vehicleModelName: "Royal Enfield Classic 350",
        vehicleRegsNo: "MH12XY4455",
        vehicleBrand: "Royal Enfield",
        vehicleImageUrl: "https://www.royalenfield.com/content/dam/royal-enfield/motorcycles/new-classic-350/studio-shots/360/stealth-black/stealth-black-000.png",

        status: "RETURNED",
        checkoutDate: "2026-01-01",
        dueDate: "2026-01-15",
        remainingDays: 0,
        returnDate: "2026-01-14",

        fineAmount: 0,
        finePaid: true,

        isOverdue: false,
        overdueDays: 0
    },

    {
        id: 4,
        vehicleId: 104,
        vehicleModelName: "Suzuki Access 125",
        vehicleRegsNo: "KA05TT1122",
        vehicleBrand: "Suzuki",
        vehicleImageUrl: null,

        status: "CANCELLED",
        checkoutDate: "2026-01-01",
        dueDate: "2026-01-25",
        remainingDays: 0,
        returnDate: null,

        fineAmount: 0,
        finePaid: false,

        isOverdue: false,
        overdueDays: 0
    },

    {
        id: 5,
        vehicleId: 105,
        vehicleModelName: "Tata Nexon EV",
        vehicleRegsNo: "GJ01EV7788",
        vehicleBrand: "Tata",
        vehicleImageUrl: null,

        status: "LOST",
        checkoutDate: "2026-01-01",
        dueDate: "2026-01-10",
        remainingDays: -10,
        returnDate: null,

        fineAmount: 25000.00,
        finePaid: false,

        isOverdue: true,
        overdueDays: 10,
        notes: "Taken from Store No. 23 MG Road by Card Payment"
    },

    {
        id: 6,
        vehicleId: 106,
        vehicleModelName: "Yamaha R15",
        vehicleRegsNo: "TN09RR3344",
        vehicleBrand: "Yamaha",
        vehicleImageUrl: null,

        status: "DAMAGED",
        checkoutDate: "2026-01-01",
        dueDate: "2026-01-18",
        remainingDays: -2,
        returnDate: "2026-01-20",

        fineAmount: 3500.00,
        finePaid: false,

        isOverdue: true,
        overdueDays: 2
    }
];

export default rentalArray;
