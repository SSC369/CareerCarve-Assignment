import React, { useState } from "react";
import StudentRegister from "./StudentRegister";
import MentorRegister from "./MentorRegister";

const Register = () => {
  const [register, setRegister] = useState("student");

  return (
    <div className="flex flex-col md:flex-row md:justify-between max-w-[800px] items-center  justify-center m-auto bg-white min-w-[300px] min-h-dvh p-3">
      <div className="bg-slate-100 flex items-center gap-3 p-2 rounded-lg mb-4 md:w-[200px]">
        <div
          onClick={() => setRegister("student")}
          className={`${
            register === "student" ? "bg-white rounded-lg shadow-md" : ""
          } p-3 cursor-pointer`}
        >
          Student
        </div>
        <div
          onClick={() => setRegister("mentor")}
          className={`${
            register === "mentor" ? "bg-white rounded-lg shadow-md" : ""
          } p-3 cursor-pointer`}
        >
          Mentor
        </div>
      </div>

      {register === "student" ? <StudentRegister /> : <MentorRegister />}
    </div>
  );
};

export default Register;
