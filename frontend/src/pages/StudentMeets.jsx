import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { SlCalender } from "react-icons/sl";
import { TbLogout } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import emp1 from "../assets/emp3.jpg";
import toast from "react-hot-toast";
import axios from "axios";
import { v4 } from "uuid";

const StudentMeets = () => {
  const [meets, setMeets] = useState([]);
  const [loading, setLoading] = useState(false);
  const ccToken = Cookies.get("ccStudentToken");
  const navigate = useNavigate();

  const fetchMeets = async () => {
    try {
      setLoading(true);
      const url =
        import.meta.env.VITE_BACKEND_URL + "/api/bookings" + "/student";
      const res = await axios.get(url, {
        headers: {
          Authorization: ccToken,
        },
      });

      if (res.status === 200) {
        setMeets(res.data?.meets);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
    }
  };

  useEffect(() => {
    fetchMeets();
  }, []);

  const pendingMeets = meets?.filter((m) => m.status === "pending");
  const confirmedMeets = meets?.filter((m) => m.status === "success");

  return (
    <div className="flex flex-col  py-5 min-h-dvh  items-center">
      <div className="flex items-center justify-between w-[80%] bg-slate-900 text-white px-5 py-3  rounded-lg">
        <h1
          onClick={() => navigate("/")}
          className="md:text-2xl text-lg font-semibold cursor-pointer"
        >
          CareerCarve
        </h1>
        <div className="flex items-center gap-4">
          <div
            className="cursor-pointer flex items-center gap-2"
            onClick={() => navigate("/meets")}
          >
            <p className="hidden md:flex">Meets</p>
            <SlCalender fontSize={24} />
          </div>

          <TbLogout
            onClick={() => {
              Cookies.remove("ccStudentToken");
              navigate("/login");
            }}
            className="cursor-pointer"
            fontSize={30}
          />
        </div>
      </div>

      {loading === true ? (
        <Loader />
      ) : (
        <>
          {meets?.length === 0 ? (
            <div className="my-auto flex flex-col items-center">
              <img src={emp1} alt="empty" className="h-[400px]" />
              <h1 className="text-xl font-semibold text-slate-500">
                Currently there are no meets
              </h1>
            </div>
          ) : (
            <div className="flex flex-col items-start w-[80%]">
              {pendingMeets?.length > 0 && (
                <p className="text-2xl font-semibold  text-slate-600 my-5">
                  Pending Meets
                </p>
              )}
              <ul className="flex gap-6 items-center flex-wrap">
                {pendingMeets?.map((m) => {
                  const { status, price, duration, username } = m;

                  if (status === "pending") {
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
                          <p className="text-slate-600 font-medium">Status:</p>
                          <p className="font-medium">{status}</p>
                        </div>
                      </li>
                    );
                  }
                })}
              </ul>

              {confirmedMeets?.length > 0 && (
                <p className="text-2xl font-semibold text-slate-600 my-5">
                  Confirmed Meets
                </p>
              )}
              <ul className="flex gap-6 items-center flex-wrap">
                {confirmedMeets?.map((m) => {
                  const { status, price, duration, username, dateTime } = m;
                  if (status === "success") {
                    const formattedDateTime = JSON.parse(dateTime);

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
                          <p className="text-slate-600 font-medium">Status:</p>
                          <p className="font-medium">{status}</p>
                        </div>

                        {dateTime !== null && (
                          <>
                            <div className="flex items-center gap-2">
                              <p className="text-slate-600 font-medium">
                                Date:
                              </p>
                              <p>{formattedDateTime?.date}</p>
                            </div>

                            <div className="flex  gap-3">
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-600 font-medium">
                                  Start Time:
                                </p>

                                <p>{formattedDateTime?.startTime}</p>
                              </div>
                              <p>-</p>
                              <div className="flex flex-col items-center gap-2">
                                <p className="text-slate-600 font-medium">
                                  End Time:
                                </p>
                                <p>{formattedDateTime?.endTime}</p>
                              </div>
                            </div>

                            <button className="hover:bg-slate-950 shadow-md bg-white text-black transition-colors hover:text-white rounded-xl p-3 mt-3">
                              Join Meet
                            </button>
                          </>
                        )}
                      </li>
                    );
                  }
                })}
              </ul>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StudentMeets;
