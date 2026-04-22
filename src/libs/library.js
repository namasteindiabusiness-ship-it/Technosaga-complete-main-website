export const wishing = () => {
    const date = new Date();
    const time = date.getHours();
    if (time >= 12) {
        return "Good Evening";
    } else if (time >= 19 && time <= 5) {
        return "Good Night";
    } else {
        return "Good Morning";
    }
};

export const tokenExpired = (text) => {
    if (text === "jwt expired" || text === "invalid signature" || text === "Invalid or expired session" || text == "No token provided!") {
        localStorage.removeItem("user");
        window.location.reload();
    }
}

export const conSecIntoHrMin = (sec) => {
    const minutes = Math.floor(sec / 60);

    if (minutes === 60) {
        const hours = Math.floor(minutes / 60);
        return `${hours}hr`;
    } else if (minutes > 60) {
        const mins = minutes % 60;
        const hours = Math.floor(minutes / 60);
        return `${hours}hr ${mins}min`;
    } else {
        return `${minutes}min`;
    }
};

export const conHrMin = (time) => {
    const min = time % 60;
    const hr = Math.floor(time / 60);

    if (min > 0) {
        return `${hr}hr ${min}min`;
    } else {
        return `${hr}hr`;
    }
};

export const convertIntoSecond = (array) => {
    const duration = array;
    const arrSplit = duration.split(":");
    const min = arrSplit[0] * 60;
    const sec = arrSplit[1];
    return +min + +sec
}

export const checkActiveCourse = (course, title) => {
    const isActive = course.titleUrl === title;
    return isActive;
};

export const textTrim = (text, limit) => {
    const shortText = text?.length > limit ? text?.substring(0, limit) + "..." : text;
    return shortText
}

export const dateStringConvert = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

export function generateRandomString(length = 200) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?/~`-=";
    let result = "";
    const charsLength = chars.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsLength);
        result += chars[randomIndex];
    }

    return result;
}

export const scrollTop = () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
};

export const getExcerpt = (html, maxLength = 120) => {
    const text = html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
    return text.length > maxLength ? text.slice(0, maxLength).trimEnd() + "..." : text;
};

export const countryList = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina",
    "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
    "Bangladesh", "Belgium", "Bhutan", "Brazil", "Bulgaria", "Cambodia",
    "Canada", "Chile", "China", "Colombia", "Croatia", "Cuba", "Cyprus",
    "Czech Republic", "Denmark", "Dominican Republic", "Ecuador", "Egypt",
    "Finland", "France", "Germany", "Greece", "Hong Kong", "Iceland", "India",
    "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
    "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Latvia", "Lebanon",
    "Lithuania", "Luxembourg", "Malaysia", "Maldives", "Mexico", "Monaco",
    "Morocco", "Nepal", "Netherlands", "New Zealand", "Nigeria", "Norway",
    "Oman", "Pakistan", "Peru", "Philippines", "Poland", "Portugal", "Qatar",
    "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore", "Slovakia",
    "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka",
    "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine",
    "United Arab Emirates", "United Kingdom", "United States", "Vietnam"
];

export const newsList = [
    {
        id: 1,
        title: "AI Revolution in Healthcare",
        description:
            "Artificial Intelligence is transforming diagnostics, patient monitoring, and drug discovery faster than ever.",
        date: "Nov 6, 2025",
        category: "Technology",
    },
    {
        id: 2,
        title: "Global Markets Rally After Inflation Data",
        description:
            "Stocks surged globally after positive inflation data signaled potential interest rate cuts next quarter.",
        date: "Nov 4, 2025",
        category: "Finance",
    },
    {
        id: 3,
        title: "Travel Trends 2025: Sustainable Tourism on the Rise",
        description:
            "Eco-friendly destinations and responsible tourism continue to gain traction worldwide.",
        date: "Nov 2, 2025",
        category: "Travel",
    },
    {
        id: 4,
        title: "SpaceX Launches New Starship Prototype",
        description:
            "The next-generation spacecraft successfully completed its suborbital flight test from Boca Chica.",
        date: "Nov 1, 2025",
        category: "Science",
    },
];

export const pharmaCategories = [
    { id: 1, name: "Web Design & Development" },
    { id: 2, name: "Digital Marketing" },
    { id: 3, name: "BPO & Call Center Services" },
    { id: 4, name: "App Development" },
    { id: 5, name: "Graphic Designing" },
    { id: 6, name: "Photo & Video Production" },
    { id: 7, name: "Job Consultancy" },
];
