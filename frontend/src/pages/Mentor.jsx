import React, { useState } from "react";
import { v4 } from "uuid";
import { RiCalendarScheduleLine } from "react-icons/ri";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import axios from "axios";

const durations = [30, 45, 60];
const prices = {
  30: 2000,
  45: 3000,
  60: 4000,
  0: 0,
};

const Mentor = ({ mentorData }) => {
  const [duration, setDuration] = useState(0);
  const { id, mentor, roles } = mentorData;
  const formattedRoles = JSON.parse(roles);
  const ccToken = Cookies.get("ccStudentToken");

  const handleBooking = async () => {
    try {
      const url =
        import.meta.env.VITE_BACKEND_URL + "/api/bookings" + "/add-booking";

      const res = await axios.post(
        url,
        {
          duration,
          status: "pending",
          price: prices[duration],
          mentorId: id,
        },
        {
          headers: {
            Authorization: ccToken,
          },
        }
      );
      if (res.status === 201) {
        toast.success(res.data?.message, { duration: 1000 });
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  return (
    <li
      className="min-w-[200px] rounded-lg bg-slate-50 p-3 flex flex-col gap-3 shadow-md"
      key={id}
    >
      <div className="flex gap-2 items-center">
        <p className="text-slate-600 font-medium">Mentor Name:</p>
        <p>{mentor}</p>
      </div>

      <div className="flex gap-2 items-center">
        <p className="text-slate-600 font-medium">Expertise:</p>
        <ul className="flex gap-2 items-center">
          {formattedRoles.map((r) => {
            return (
              <li
                key={v4()}
                className="bg-slate-200 p-1 px-2 rounded-md shadow-sm  text-xs"
              >
                {r[0].toUpperCase() + r.slice(1)}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium ">Duration (min):</p>
        <ul className="flex items-center gap-3">
          {durations.map((d) => {
            return (
              <li
                key={v4()}
                onClick={() => {
                  if (duration === d) {
                    setDuration(0);
                    return;
                  }

                  setDuration(d);
                }}
                className={`p-2 cursor-pointer text-black  w-fit rounded-md ${
                  duration === d ? "bg-white shadow" : "bg-slate-200"
                }`}
              >
                {d}
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex items-center gap-2">
        <p className="text-slate-600 font-medium">Price:</p>
        <p className="font-medium">{prices[duration]}</p>
      </div>

      <button
        onClick={handleBooking}
        style={duration === 0 ? { opacity: "0.5", pointerEvents: "none" } : {}}
        className="hover:bg-slate-950 shadow-md bg-white text-black transition-colors hover:text-white rounded-xl p-3 mt-3"
      >
        Book a meet
      </button>
    </li>
  );
};

export default Mentor;
