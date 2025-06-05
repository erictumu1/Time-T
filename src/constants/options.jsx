export const SelectTravelesList=[
    {
        id:1,
        title:'Just Me',
        desc:'Embark on a solo adventure, discovering the world at your own pace.',
        icon:'✈️',
        people:'1'
    },
    {
        id:2,
        title:'A Couple',
        desc:'Create unforgettable memories together as you explore the world together',
        icon:'🥂',
        people:'2 people'
    },
    {
        id:3,
        title:'Family',
        desc:'Share laughter and create lifelong bonds on a fun filled family getaway.',
        icon:'🏠',
        people:'3 to 5 people'
    },
    {
        id:4,
        title:'Friends',
        desc:'Gather your crew for thrilling adventures and stories to tell forever.',
        icon:'👥',
        people:'5 to 10 people'
    },
]

export const SelectBudgetOptions=[
    {
        id:1,
        title:'Cheap',
        desc:'Explore budget-friendly options that maximize your experience without breaking the bank.',
        icon:'💵',
    },
    {
        id:2,
        title:'Moderate',
        desc:'Enjoy a comfortable travel experience with a good balance of quality and affordability.',
        icon:'💰',
    },
    {
        id:3,
        title:'Luxury',
        desc:'Indulge in premium travel with top-tier services and luxurious accommodations for a memorable trip.',
        icon:'💵💰',
    },
]

export const AI_PROMPT = `
Generate a detailed {totalDays}-day travel itinerary for {location} for {traveler} travelers on a {budget} budget.

Include:

- Hotel options with name, address, price, image URL, geo coordinates, rating, and description.
- For each day, provide multiple activities with:
    - placeName
    - placeDetails
    - placeImageUrl
    - geoCoordinates (latitude and longitude)
    - ticketPricing
    - travelTimeFromPrevious
    - bestTimeToVisit: specify exact time ranges (e.g. "9:00am-10:00am", "2:00pm-4:00pm")
- Output all data strictly in valid JSON format, with the top-level keys: "hotelOptions" and "dailyItinerary".
- The dailyItinerary should be an array with days, each containing multiple activities that span from morning to evening.

Example of bestTimeToVisit format: "9:00am-10:00am", "12:00pm-1:30pm", "5:00pm-6:00pm".
`;

