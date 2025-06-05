import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash',
  generationConfig: {
    responseMimeType: 'application/json',
    temperature: 0,
    maxOutputTokens: 6000,
  },
});

export const chatSession = await model.startChat({
  history: [
    {
      role: 'user',
      parts: [
        {
          text: `Okay, here's a budget-friendly 1-day Las Vegas travel plan for a couple, focusing on free and low-cost experiences, in JSON format.

**Important Notes for a Cheap Budget:**

*   **Travel Dates:** Weekdays (Sunday-Thursday) are significantly cheaper for hotels than weekends. Avoid major holidays or conventions.
*   **Transportation:** Rely on walking, the RTC Deuce bus (good for the Strip), and Downtown Loop (free shuttle in Downtown). Limit rideshares/taxis.
*   **Food:** Look for happy hour deals, food courts, affordable buffets (though these are less common/pricier post-COVID), or even grab items from CVS/Walgreens for some meals.
*   **Resort Fees:** Factor these in! They are almost unavoidable and add $30-$50+ per night to the hotel bill. The prices below are *base rates* and don't include resort fees or taxes.
*   **Flexibility:** Prices fluctuate wildly. The hotel prices are estimates; book well in advance for better rates.
*   **Image URLs:** These are placeholder URLs from common image search results. In a real application, you'd use an image hosting service or API.

\`\`\`json
{
  "travelPlan": {
    "location": "Las Vegas, Nevada, USA",
    "duration": "1 days",
    "targetAudience": "Couple",
    "budget": "Cheap",
    "generalTips": [
      "Book hotels and any paid attractions well in advance, especially if traveling on a weekend (though weekdays are cheaper).",
      "Utilize the RTC Deuce bus for travel along the Strip and the free Downtown Loop shuttle.",
      "Stay hydrated! Carry a water bottle and refill it.",
      "Wear comfortable shoes – you'll be doing a lot of walking.",
      "Look for happy hour deals for food and drinks.",
      "Factor in resort fees for hotels, which are not included in the base price."
    ],
    "hotelOptions": [
      {
        "hotelName": "The STRAT Hotel, Casino & SkyPod",
        "hotelAddress": "2000 S Las Vegas Blvd, Las Vegas, NV 89104, USA",
        "price": "$40 - $120 per night (varies greatly by date)",
        "hotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/0/06/The_Strat_Hotel_Casino_Skypod_Las_Vegas_NV.jpg/1200px-The_Strat_Hotel_Casino_Skypod_Las_Vegas_NV.jpg",
        "geoCoordinates": {
          "latitude": 36.1475,
          "longitude": -115.1566
        },
        "rating": "3.5/5",
        "description": "Iconic hotel at the north end of the Strip with the tallest observation tower in the U.S. Rooms are often budget-friendly. Good value if you don't mind being slightly further from the central Strip action."
      },
      {
        "hotelName": "Excalibur Hotel & Casino",
        "hotelAddress": "3850 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "$50 - $150 per night (varies greatly by date)",
        "hotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Excalibur_Hotel_Casino_Las_Vegas.jpg/1200px-Excalibur_Hotel_Casino_Las_Vegas.jpg",
        "geoCoordinates": {
          "latitude": 36.0987,
          "longitude": -115.1754
        },
        "rating": "3/5",
        "description": "A castle-themed hotel on the South Strip, offering some of the most affordable rates directly on Las Vegas Boulevard. Connected by tram to Luxor and Mandalay Bay."
      },
      {
        "hotelName": "LINQ Hotel + Experience",
        "hotelAddress": "3535 S Las Vegas Blvd, Las Vegas, NV 89109, USA",
        "price": "$60 - $180 per night (varies greatly by date)",
        "hotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/The_LINQ_Hotel_%26_Casino.jpg/1024px-The_LINQ_Hotel_%26_Casino.jpg",
        "geoCoordinates": {
          "latitude": 36.1178,
          "longitude": -115.1708
        },
        "rating": "4/5",
        "description": "Centrally located on the Strip with modern rooms and easy access to the High Roller and LINQ Promenade. Can have good deals, especially mid-week."
      },
      {
        "hotelName": "El Cortez Hotel & Casino",
        "hotelAddress": "600 E Fremont St, Las Vegas, NV 89101, USA",
        "price": "$35 - $100 per night (varies greatly by date)",
        "hotelImageUrl": "https://upload.wikimedia.org/wikipedia/commons/0/01/El_Cortez_Hotel_and_Casino%2C_Las_Vegas.jpg",
        "geoCoordinates": {
          "latitude": 36.1705,
          "longitude": -115.1386
        },
        "rating": "3.5/5",
        "description": "A historic, adults-only (21+) hotel in Downtown Las Vegas, known for its vintage Vegas charm and very affordable rates. No resort fees is a huge plus."
      }
    ],
    "dailyItinerary": [
      {
        "day": 1,
        "theme": "South & Mid-Strip Exploration",
        "dayDescription": "Arrival and exploring the iconic sights of the southern and central Las Vegas Strip.",
        "activities": [
          {
            "placeName": "Hotel Check-in & Settle",
            "placeDetails": "Arrive in Las Vegas, check into your chosen hotel. Leave luggage and freshen up.",
            "placeImageUrl": "https://example.com/hotel_lobby.jpg",
            "geoCoordinates": {
              "latitude": 36.114647, "longitude": -115.172821
            },
            "ticketPricing": "N/A",
            "rating": "N/A",
            "bestTimeToVisit": "Afternoon (based on check-in time)",
            "travelTimeFromPrevious": "N/A"
          },
          {
            "placeName": "Walk the South Strip: New York-New York, Excalibur, Luxor",
            "placeDetails": "Explore the exteriors and public areas of these themed resorts. Take photos with the Sphinx at Luxor, the castle at Excalibur, and the mini NYC skyline.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/New_York_New_York_Hotel_Casino_Las_Vegas_2.jpg/1024px-New_York_New_York_Hotel_Casino_Las_Vegas_2.jpg",
            "geoCoordinates": {
              "latitude": 36.0990, "longitude": -115.1758
            },
            "ticketPricing": "Free (exterior and public areas)",
            "rating": "4/5",
            "bestTimeToVisit": "Late Afternoon",
            "travelTimeFromPrevious": "Varies (allow 15-30 mins from hotel depending on location)"
          },
          {
            "placeName": "Bellagio Conservatory & Botanical Gardens",
            "placeDetails": "A stunning indoor garden with elaborate seasonal displays. Free to enter and walk through.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Bellagio_Conservatory_Spring_Display_2019.jpg/1024px-Bellagio_Conservatory_Spring_Display_2019.jpg",
            "geoCoordinates": {
              "latitude": 36.1130, "longitude": -115.1766
            },
            "ticketPricing": "Free",
            "rating": "4.8/5",
            "bestTimeToVisit": "Early Evening",
            "travelTimeFromPrevious": "15-20 mins walk or short bus ride"
          },
          {
            "placeName": "Bellagio Fountains Show",
            "placeDetails": "Iconic water show synchronized to music and lights. Multiple shows daily, more frequent in the evening.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Bellagio_Fountains_at_Night.jpg/1024px-Bellagio_Fountains_at_Night.jpg",
            "geoCoordinates": {
              "latitude": 36.1127, "longitude": -115.1738
            },
            "ticketPricing": "Free",
            "rating": "5/5",
            "bestTimeToVisit": "Evening (shows every 15-30 mins)",
            "travelTimeFromPrevious": "2 mins walk (it's at the Bellagio)"
          },
          {
            "placeName": "Mirage Volcano Show",
            "placeDetails": "A dramatic show of fire, water, and music in front of The Mirage hotel. Check showtimes as they can vary.",
            "placeImageUrl": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Mirage_Volcano_HDR_2010.jpg/1024px-Mirage_Volcano_HDR_2010.jpg",
            "geoCoordinates": {
              "latitude": 36.1214, "longitude": -115.1742
            },
            "ticketPricing": "Free",
            "rating": "4.5/5",
            "bestTimeToVisit": "Evening (usually on the hour at 8 PM, 9 PM, 10 PM - verify schedule)",
            "travelTimeFromPrevious": "15-20 mins walk or short bus ride"
          },
          {
            "placeName": "Budget Dinner",
            "placeDetails": "Explore food courts (e.g., at Harrah's, Venetian, Fashion Show Mall) or look for happy hour specials.",
            "placeImageUrl": "https://example.com/food_court.jpg",
            "geoCoordinates": {
              "latitude": 36.1200, "longitude": -115.1710
            },
            "ticketPricing": "$10-$20 per person",
            "rating": "N/A",
            "bestTimeToVisit": "Evening",
            "travelTimeFromPrevious": "5-10 mins walk"
          }
        ]
      }
\`\`\``,
        },
      ],
    },
    {
      role: 'user',
      parts: [
        {
          text: `INSERT_INPUT_HERE`,
        },
      ],
    },
  ]});