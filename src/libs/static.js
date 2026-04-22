export const SERVICE_OPTS = [
    "Web Design & Development",
    "Digital Marketing",
    "BPO & Call Center Services",
    "App Development",
    "Graphic Designing",
    "Photo & Video Production",
    "Job Consultancy",
];

export const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Technosaga Infotech",
    url: "https://technosagainfotech.in",
    logo: "https://technosagainfotech.in/logo.png",
    description:
        "Technosaga Infotech is a leading IT company in Patna, Bihar offering web design, app development, digital marketing, BPO services, graphic design, event management, live streaming and job consultancy.",
    address: {
        "@type": "PostalAddress",
        addressLocality: "Patna",
        addressRegion: "Bihar",
        addressCountry: "IN",
    },
    areaServed: "Patna, Bihar, India",
    sameAs: ["https://technosagainfotech.in"],
    hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "IT Services",
        itemListElement: [
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Web Design & Development",
                },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "App Development" },
            },
            {
                "@type": "Offer",
                itemOffered: {
                    "@type": "Service",
                    name: "Digital Marketing",
                },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "BPO Services" },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Graphic Design" },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Event Management" },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Live Streaming" },
            },
            {
                "@type": "Offer",
                itemOffered: { "@type": "Service", name: "Job Consultancy" },
            },
        ],
    },
};