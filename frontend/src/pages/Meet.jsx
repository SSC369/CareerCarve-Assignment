import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { v4 } from "uuid";

const Meet = ({ meetData, mutate }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [date, setDate] = useState("");
  const { price, duration, status, username, id } = meetData;

  const addMinutesToTime = (time, minutesToAdd) => {
    const [hours, minutes] = time.split(":").map(Number);
    const totalMinutes = hours * 60 + minutes + minutesToAdd;

    const endHours = Math.floor(totalMinutes / 60);
    const endMinutes = totalMinutes % 60;

    // Ensure hours and minutes are always two digits
    return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
      2,
      "0"
    )}`;
  };

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;

    setStartTime(newStartTime);

    // Calculate end time by adding the duration to start time
    const calculatedEndTime = addMinutesToTime(newStartTime, duration);

    setEndTime(calculatedEndTime);
  };

  const handleConfirmBooking = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/api/bookings/update-booking";
      const dateTime = JSON.stringify({
        startTime,
        endTime,
        date,
      });
      const res = await axios.put(url, {
        dateTime,
        bookingId: id,
      });
      if (res.status == 200) {
        toast.success(res.data?.message);
        mutate();
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  return (
    <li
      className="min-w-[260px] rounded-lg bg-slate-50 p-3 flex flex-col gap-3 shadow-md text-sm"
      key={v4()}
    >
      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium">Student Name:</p>
        <p className="font-medium">{username}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium ">Duration (min):</p>
        <p
          className={`cursor-pointer text-black  w-fit rounded-md 
         "bg-white shadow" : 
      `}
        >
          {duration}
        </p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium">Price:</p>
        <p className="font-medium">{price}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium">Status:</p>
        <p className="font-medium">{status}</p>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium">Date:</p>
        <input
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className=" text-xs  bg-slate-200 p-2 rounded-lg shadow-md"
          type="date"
        />
      </div>

      <div className="flex  gap-3">
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-600 font-medium">Start Time:</p>
          <input
            className=" bg-slate-200 p-2 rounded-lg  text-xs shadow-md"
            value={startTime}
            onChange={handleStartTimeChange}
            type="time"
          />
        </div>
        <p>-</p>
        <div className="flex flex-col items-center gap-2">
          <p className="text-slate-600 font-medium">End Time:</p>
          <input
            className="text-xs pointer-events-none bg-slate-200 p-2 rounded-lg shadow-md"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
            }}
            type="time"
          />
        </div>
      </div>

      <button
        onClick={handleConfirmBooking}
        style={
          startTime === "" || date === ""
            ? { opacity: "0.5", pointerEvents: "none" }
            : {}
        }
        className="hover:bg-slate-950 shadow-md bg-white text-black transition-colors hover:text-white rounded-xl p-3 mt-3"
      >
        Confirm meet
      </button>
    </li>
  );
};

export default Meet;
