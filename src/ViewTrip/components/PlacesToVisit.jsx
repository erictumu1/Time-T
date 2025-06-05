import PlaceCarditem from "./PlaceCarditem";

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.dailyItinerary || [];

  return (
    <div>
      <h2 className="font-bold text-xl mt-5 bouncy-underline text-blue-950">Places to visit.</h2>
      <br />
      <br />
      <div>
        {itinerary.length === 0 ? (
          <p>No itinerary available.</p>
        ) : (
          itinerary.map((item, index) => {
            const activities = item.activities || [];

            return (
              <div className="mb-6" key={index}>
                <h2 className="font-bold text-xl mb-2 text-red-700">Day {item.day}</h2>
                {activities.length === 0 ? (
                  <p>No activities planned for this day.</p>
                ) : (
                  <div className="grid md:grid-cols-2 gap-5">
                    {activities.map((place, idx) => (
                      <div key={idx}>
                        <h2 className="font-medium text-sm text-blue-700">{place.bestTimeToVisit}</h2>
                        <div className="my-3">
                          <PlaceCarditem place={place} index={idx} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

export default PlacesToVisit;
