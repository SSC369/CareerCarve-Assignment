import React, { useEffect, useState, useCallback } from "react";
import { CgSearch } from "react-icons/cg";
import toast from "react-hot-toast";
import axios from "axios";
import Mentor from "./Mentor";
import { v4 } from "uuid";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { TbLogout } from "react-icons/tb";
import { SlCalender } from "react-icons/sl";
import Loader from "../components/Loader";
import emp1 from "../assets/emp1.jpg";
import debounce from "lodash/debounce";

const Home = () => {
  const [roleInput, setRoleInput] = useState("");
  const [mentors, setMentors] = useState([]);
  const ccToken = Cookies.get("ccStudentToken");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!ccToken) {
      navigate("/login");
    }
  }, []);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      if (roleInput === "") {
        setLoading(false);
        return;
      }
      const url =
        import.meta.env.VITE_BACKEND_URL +
        "/api/auth/mentor/roles" +
        `?query=${roleInput}`;
      const res = await axios.get(url);
      if (res.status === 200) {
        setMentors(res.data.mentors);
      }
      setLoading(false);
    } catch (error) {
      toast.error(error.message, { duration: 1000 });
      setLoading(false);
    }
  };

  const debouncedFetchRoles = useCallback(debounce(fetchRoles, 500), [
    roleInput,
  ]);

  useEffect(() => {
    if (roleInput) {
      debouncedFetchRoles();
    }
    return () => {
      debouncedFetchRoles.cancel();
    };
  }, [roleInput]);

  return (
    <>
      <div className="flex flex-col py-5 min-h-dvh  items-center min-w-[300px]">
        <div className="flex items-center justify-between w-[80%] bg-slate-900 text-white px-5 py-3  rounded-lg">
          <h1 className="md:text-2xl text-lg font-semibold">CareerCarve</h1>
          <div className="flex items-center gap-4">
            <div
              className="cursor-pointer flex items-center gap-2"
              onClick={() => navigate("/meets")}
            >
              <p className="hidden md:flex">Meets</p>
              <SlCalender fontSize={20} />
            </div>

            <TbLogout
              onClick={() => {
                Cookies.remove("ccStudentToken");
                navigate("/login");
              }}
              className="cursor-pointer"
              fontSize={26}
            />
          </div>
        </div>

        <div className="flex justify-center items-center mt-5 w-[80%] max-w-[600px]">
          <input
            value={roleInput}
            onChange={(e) => setRoleInput(e.target.value)}
            placeholder="Search for a role"
            type="text"
            className="bg-slate-100 h-[40px] rounded-l-lg pl-3 outline-none cursor-pointer md:w-[400px]"
          />
          <button
            onClick={fetchRoles}
            style={
              roleInput === "" ? { opacity: "0.5", pointerEvents: "none" } : {}
            }
            className="bg-black h-[40px] text-white px-3 rounded-r-lg flex items-center justify-center"
          >
            <CgSearch fontSize={24} />
          </button>
        </div>

        <p className="text-sm text-gray-400 mt-2">
          Ex: Equity Research or Digital Marketing
        </p>

        <div className="mt-8 w-[80%]">
          {loading ? (
            <Loader />
          ) : (
            <>
              {mentors.length === 0 ? (
                <div className="my-auto flex flex-col items-center">
                  <img src={emp1} alt="empty" className="h-[400px]" />
                  <h1 className="text-xl font-semibold text-slate-500">
                    Oop's It's Empty!
                  </h1>
                </div>
              ) : (
                <>
                  <p className="font-semibold text-slate-700">Search Results</p>
                  <ul className=" flex flex-col md:flex-row gap-5 mt-4 text-sm ">
                    {mentors?.map((mentor) => {
                      return <Mentor key={v4()} mentorData={mentor} />;
                    })}
                  </ul>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
