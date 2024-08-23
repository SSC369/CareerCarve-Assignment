import React, { useEffect, useState } from "react";
import emp1 from "../assets/emp1.jpg";
import useSWR from "swr";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import axios from "axios";
import { v4 } from "uuid";
import Meet from "./Meet";
import { IoCheckmarkCircle } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const MentorHome = () => {
  const ccToken = Cookies.get("ccMentorToken");
  const navigate = useNavigate();

  useEffect(() => {
    if (!ccToken) navigate("/login");
  }, []);
  const fetchMeets = async (url) => {
    try {
      const res = await axios.get(url, {
        headers: {
          Authorization: ccToken,
        },
      });

      if (res.status === 200) {
        return res.data?.meets;
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  const {
    data: meets,
    isLoading,
    error,
    mutate,
  } = useSWR(
    import.meta.env.VITE_BACKEND_URL + "/api/bookings" + "/mentor",
    fetchMeets
  );

  const pendingMeets = meets?.filter((m) => m.status === "pending");

  return (
    <div className="min-h-dvh flex flex-col pt-5 pb-8 items-center">
      <div className="flex items-center justify-between w-[80%] bg-slate-900 text-white px-5 py-3  rounded-lg">
        <h1 className="md:text-2xl text-xl font-semibold">CareerCarve meets</h1>
        <TbLogout
          onClick={() => {
            Cookies.remove("ccMentorToken");
            navigate("/login");
          }}
          className="cursor-pointer"
          fontSize={30}
        />
      </div>

      <p className="mt-4 text-xl font-semibold">Hi Mentor 👋</p>

      {isLoading ? (
        <Loader />
      ) : (
        <>
          {meets?.length === 0 || !meets ? (
            <div className="my-auto flex flex-col items-center">
              <img src={emp1} alt="empty" className="h-[400px]" />
              <h1 className="text-xl font-semibold text-slate-500">
                Currently there are no meets
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-start gap-8 w-[80%]">
              <div className="">
                {pendingMeets.length !== 0 && (
                  <p className="text-2xl font-semibold my-5 text-slate-600">
                    Pending Meets
                  </p>
                )}
                <ul className="flex gap-6 items-start flex-wrap">
                  {meets?.map((m) => {
                    const { status } = m;
                    if (status === "pending") {
                      return <Meet mutate={mutate} key={v4()} meetData={m} />;
                    }
                  })}
                </ul>
              </div>
              <div className="">
                <p className="text-2xl font-semibold my-5 text-slate-600">
                  Confirmed Meets
                </p>

                <ul className="flex gap-6 items-center flex-wrap">
                  {meets?.map((m) => {
                    const { status, price, duration, username, dateTime } = m;

                    if (status === "success") {
                      const formattedDateTime = JSON.parse(dateTime);

                      const { date, startTime, endTime } = formattedDateTime;
                      return (
                        <li
                          className="min-w-[260px] rounded-lg bg-slate-50 p-3 flex flex-col gap-3 shadow-md text-sm"
                          key={v4()}
                        >
                          <div className="flex items-center gap-2">
                            <p className="text-slate-600 font-medium">
                              Student Name:
                            </p>
                            <p className="font-medium">{username}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-slate-600 font-medium ">
                              Duration (min):
                            </p>
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
                            <p className="text-slate-600 font-medium">
                              Status:
                            </p>
                            <p className="font-medium">{status}</p>
                          </div>

                          <div className="flex items-center gap-2">
                            <p className="text-slate-600 font-medium">Date:</p>
                            <p>{date}</p>
                          </div>

                          <div className="flex  gap-3">
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-slate-600 font-medium">
                                Start Time:
                              </p>

                              <p>{startTime}</p>
                            </div>
                            <p>-</p>
                            <div className="flex flex-col items-center gap-2">
                              <p className="text-slate-600 font-medium">
                                End Time:
                              </p>
                              <p>{endTime}</p>
                            </div>
                          </div>
                          <button className="shadow-md bg-white text-black transition-colors  rounded-xl p-3 mt-3 flex justify-center">
                            <IoCheckmarkCircle
                              fontSize={20}
                              color="lightgreen"
                            />
                          </button>
                        </li>
                      );
                    }
                  })}
                </ul>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MentorHome;
