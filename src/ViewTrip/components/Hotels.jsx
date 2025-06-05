import HotelCardItem from "./HotelCardItem";

function Hotels({ trip }) {
  return (
    <div>
      <h2 className="font-bold text-xl mt-5 bouncy-underline text-blue-950">Hotel Recommendations.</h2>
      <br />
      <br />
      <div>
        <div className="mb-6">
          <h2 className="font-medium text-lg mb-2">Recommended Hotels</h2>
          <div className="grid md:grid-cols-3 gap-5">
            {trip?.tripData?.hotelOptions?.map((hotel, index) => (
              <div key={index}>
                <div className="my-3">
                  <HotelCardItem hotel={hotel} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hotels;
