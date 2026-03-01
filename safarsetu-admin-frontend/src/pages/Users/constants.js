export const sampleUsers = [
    {
        id: 1,
        email: "arjun.sharma@gmail.com",
        fullName: "Arjun Sharma",
        role: "ROLE_ADMIN",
        phone: "+91 98765 43210",
        googleId: "google_104729301847362819",
        githubId: null,
        profileImageUrl: "https://randomuser.me/api/portraits/men/1.jpg",
        password: null,
        lastLogin: "2025-02-20T09:30:00",
    },
    {
        id: 2,
        email: "priya.mehta@gmail.com",
        fullName: "Priya Mehta",
        role: "ROLE_USER",
        phone: "+91 91234 56789",
        googleId: "google_298374610293847561",
        githubId: null,
        profileImageUrl: null,
        password: null,
        lastLogin: "2025-02-22T14:15:00",
    },
    {
        id: 3,
        email: "dev.rathore@github.com",
        fullName: "Dev Rathore",
        role: "ROLE_USER",
        phone: null,
        googleId: null,
        githubId: "github_devrathore_48291",
        profileImageUrl: "https://randomuser.me/api/portraits/men/3.jpg",
        password: null,
        lastLogin: "2025-02-21T18:45:00",
    },
    {
        id: 4,
        email: "sneha.joshi@github.com",
        fullName: "Sneha Joshi",
        role: "ROLE_ADMIN",
        phone: "+91 99887 76655",
        googleId: null,
        githubId: "github_snehajoshi_19283",
        profileImageUrl: "https://randomuser.me/api/portraits/women/4.jpg",
        password: null,
        lastLogin: "2025-02-23T11:00:00",
    },
    {
        id: 5,
        email: "rahul.verma@example.com",
        fullName: "Rahul Verma",
        role: "ROLE_USER",
        phone: "+91 70011 22334",
        googleId: null,
        githubId: null,
        profileImageUrl: "https://randomuser.me/api/portraits/men/5.jpg",
        password: "Rahul@2024",
        lastLogin: "2025-02-19T08:00:00",
    },
];

export function formatDateTime(dateString) {
    if (!dateString) return "N/A";

    const date = new Date(dateString);

    return date.toLocaleString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });
}

export const daysBetween = (date1, date2) => {
    if (!date1 || !date2) return null;

    const d1 = new Date(date1);
    const d2 = new Date(date2);

    const diffMs = Math.abs(d2 - d1);
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    return diffDays;
};

