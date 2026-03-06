import { useEffect, useState } from "react";
import api from "../apiservice/axiosapi";

export function Dashboard() {
  const [activeTab, setActiveTab] = useState("dashboard");

  const [data, setData] = useState({
    registeredevents: [],
    upcomingEvents: [],
    pastEvents: [],
  });

  const [transactions, setTransactions] = useState([]);

  const [form, setForm] = useState({
    eventName: "",
    organiser: "",
    location: "",
    dateTime: "",
    Description: "",
    availaleSeats: "",
    categoryTags: "",
  });

  // fetch dashboard data
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/event/dashboard");
    setData(res.data?.data);
  };

  const fetchTransactions = async () => {
    const res = await api.get("/event/explore");
    setTransactions(res.data?.data);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    await api.post("/event/register", form);

    alert("Event Registered");

    fetchDashboard();

    setActiveTab("dashboard");
  };

  return (
    <div>
      <h1>User Dashboard</h1>

      {/* NAVBAR */}
      <div style={{ marginBottom: "20px" }}>
        <button onClick={() => setActiveTab("register")}>Register Event</button>

        <button
          onClick={() => {
            setActiveTab("explore");
            fetchTransactions();
          }}
        >
          Explore Transactions
        </button>

        <button onClick={() => setActiveTab("dashboard")}>My Dashboard</button>
      </div>

      {/* REGISTER EVENT */}
      {activeTab === "register" && (
        <form onSubmit={handleRegister}>
          <input
            name="eventName"
            placeholder="Event Name"
            onChange={handleChange}
          />

          <input
            name="organiser"
            placeholder="Organiser"
            onChange={handleChange}
          />

          <input
            name="location"
            placeholder="Location"
            onChange={handleChange}
          />

          <input
            type="datetime-local"
            name="dateTime"
            onChange={handleChange}
          />

          <input
            name="Description"
            placeholder="Description"
            onChange={handleChange}
          />

          <input
            type="number"
            name="availaleSeats"
            placeholder="Seats"
            onChange={handleChange}
          />

          <input
            name="categoryTags"
            placeholder="Category"
            onChange={handleChange}
          />

          <button type="submit">Register Event</button>
        </form>
      )}

      {/* EXPLORE TRANSACTIONS */}
      {activeTab === "explore" && (
        <div>
          <h2>Explore Transactions</h2>

          {Array.isArray(transactions) &&
            transactions.map((event) => (
              <div key={event._id}>
                <p>{event.eventName}</p>
                <p>{event.location}</p>
                <p>{new Date(event.dateTime).toLocaleString()}</p>
              </div>
            ))}
        </div>
      )}

      {/* DASHBOARD EVENTS */}
      {activeTab === "dashboard" && (
        <div>
          <h2>Registered Events</h2>
          {data.registeredevents?.map((event) => (
            <div key={event._id}>
              <p>{event.eventName}</p>
            </div>
          ))}

          <h2>Upcoming Events</h2>
          {data.upcomingEvents?.map((event) => (
            <div key={event._id}>
              <p>{event.eventName}</p>
            </div>
          ))}

          <h2>Past Events</h2>
          {data.pastEvents?.map((event) => (
            <div key={event._id}>
              <p>{event.eventName}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
