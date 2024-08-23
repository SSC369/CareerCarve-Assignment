import React, { useState } from "react";
import StudentLogin from "./studentLogin";
import MentorLogin from "./mentorLogin";

const Login = () => {
  const [login, setLogin] = useState("student");

  return (
    <div className="flex flex-col items-center justify-center bg-white min-w-[300px] min-h-dvh">
      <div className="bg-slate-100 flex items-center gap-3 p-2 rounded-lg mb-4">
        <div
          onClick={() => setLogin("student")}
          className={`${
            login === "student" ? "bg-white rounded-lg shadow-md" : ""
          } p-3 cursor-pointer`}
        >
          Student
        </div>
        <div
          onClick={() => setLogin("mentor")}
          className={`${
            login === "mentor" ? "bg-white rounded-lg shadow-md" : ""
          } p-3 cursor-pointer`}
        >
          Mentor
        </div>
      </div>

      {login === "student" ? <StudentLogin /> : <MentorLogin />}
    </div>
  );
};

export default Login;
