import { useState } from "react";
import api from "../apiservice/axiosapi";

function RegisterEvent() {
  const [event, setEvent] = useState({
    eventName: "",
    organiser: "",
    location: "",
    dateTime: "",
    Description: "",
    availaleSeats: "",
    categoryTags: "",
  });

  const handleChange = (e) => {
    setEvent({ ...event, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/event/register", event);
      alert("Event registered successfully");
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

  return (
    <div>
      <h2>Register Event</h2>

      <form onSubmit={handleSubmit}>
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
        <input name="location" placeholder="Location" onChange={handleChange} />
        <input type="datetime-local" name="dateTime" onChange={handleChange} />
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
    </div>
  );
}

export default RegisterEvent;
