export const sampleSubscriptionPlans = [
    {
        id: 1,
        planCode: "BASIC_RIDER",
        planName: "Basic Rider Plan",
        description: "Perfect for occasional riders and short city trips",
        price: 999.00,
        validityInDays: 2,
        maxVehiclesAllowed: 1,
        badgeFeatures: "Best Value",
        displayOrder: 1,
        autoRenew: false,
        active: true,
        isFeatured: false,
        adminNotes: "Entry-level plan for new users",
        createdAt: "2026-02-01T10:00:00",
        updatedAt: "2026-02-01T10:00:00"
    },

    {
        id: 2,
        planCode: "SMART_COMMUTER",
        planName: "Smart Commuter Plan",
        description: "Ideal for daily commuters who ride frequently",
        price: 2499.00,
        validityInDays: 5,
        maxVehiclesAllowed: 2,
        badgeFeatures: "Most Popular",
        displayOrder: 2,
        autoRenew: true,
        active: true,
        isFeatured: true,
        adminNotes: "Most popular plan among working professionals",
        createdAt: "2026-02-01T10:05:00",
        updatedAt: "2026-02-01T10:05:00"
    },

    {
        id: 3,
        planCode: "PREMIUM_FLEET",
        planName: "Premium Fleet Plan",
        description: "Best for power users, families, and business needs",
        price: 5999.00,
        validityInDays: 8,
        maxVehiclesAllowed: 3,
        badgeFeatures: "Family Pack",
        displayOrder: 3,
        autoRenew: true,
        active: true,
        isFeatured: true,
        adminNotes: "High-value plan with maximum benefits",
        createdAt: "2026-02-01T10:10:00",
        updatedAt: "2026-02-01T10:10:00"
    }
];