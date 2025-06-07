import { format } from "date-fns";
import { enUS } from "date-fns/locale";
import { collection, getDocs, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserTripCardItem from "../components/UserTripCardItem";
import { db } from "../service/firebaseconfig";

function MyTrips() {
  const navigate = useNavigate();
  const [groupedTrips, setGroupedTrips] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserTrips();
  }, []);

  const getUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigate("/");
      return;
    }

    setLoading(true);
    try {
      const q = query(collection(db, "AITrips"), where("userEmail", "==", user.email));
      const querySnapshot = await getDocs(q);

      const trips = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const createdAt = data.createdAt?.toDate();
        trips.push({ ...data, createdAt, id: doc.id });
      });

      // Group by year and day
      const grouped = trips.reduce((acc, trip) => {
        const createdAt = trip.createdAt || new Date();
        const year = format(createdAt, "yyyy", { locale: enUS });
        const date = format(createdAt, "EEEE do MMMM", { locale: enUS });

        if (!acc[year]) acc[year] = {};
        if (!acc[year][date]) acc[year][date] = [];

        acc[year][date].push(trip);
        return acc;
      }, {});

      setGroupedTrips(grouped);
    } catch (err) {
      console.error("Error fetching trips:", err);
    } finally {
      setLoading(false);
    }
  };

return (
  <motion.div
    className="mx-auto mt-10 max-w-6xl px-5 sm:px-10 md:px-32 lg:px-56 xl:px-10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    <motion.h2
      className="font-bold text-3xl bouncy-underline"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      My Trips
    </motion.h2>

    {loading ? (
      <motion.div
        className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <motion.div
            key={index}
            className="h-[250px] w-full bg-slate-200 rounded-xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
          />
        ))}
      </motion.div>
    ) : Object.keys(groupedTrips).length > 0 ? (
      Object.keys(groupedTrips)
        .sort((a, b) => b - a)
        .map((year, yearIndex) => (
          <motion.div
            key={year}
            className="mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + yearIndex * 0.2, duration: 0.6 }}
          >
            <h2 className="text-3xl font-bold text-red-700 mb-6">{year}</h2>

            {Object.entries(groupedTrips[year])
              .sort((a, b) => {
                const dateA = new Date(a[1][0].createdAt);
                const dateB = new Date(b[1][0].createdAt);
                return dateB - dateA;
              })
              .map(([date, trips], dateIndex) => (
                <motion.div
                  key={date}
                  className="mb-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.2 + dateIndex * 0.2,
                    duration: 0.6,
                  }}
                >
                  <h3 className="text-xl font-semibold mb-3 text-gray-700">
                    {date}
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
                    {[...trips]
                      .sort((a, b) => b.createdAt - a.createdAt)
                      .map((trip, index) => (
                        <motion.div
                          key={trip.id || index}
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: 0.3 + index * 0.1,
                            duration: 0.5,
                          }}
                        >
                          <UserTripCardItem trip={trip} />
                        </motion.div>
                      ))}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        ))
    ) : (
      <motion.div
        className="text-center mt-16 text-gray-500 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p>No trips found. Start planning your first adventure!</p>
      </motion.div>
    )}
  </motion.div>
);
}

export default MyTrips;
