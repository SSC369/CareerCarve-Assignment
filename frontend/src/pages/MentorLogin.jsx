import { IoMdMail } from "react-icons/io";
import { RiLock2Line } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import { TailSpin } from "react-loader-spinner";

const MentorLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleValidation = () => {
    const { password, email } = formData;
    if (password === "") {
      toast.error("Please enter password!", { duration: 1000 });
      return false;
    } else if (email === "") {
      toast.error("Please enter email !", { duration: 1000 });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;
    try {
      setLoading(true);
      if (handleValidation()) {
        console.log();
        const url = import.meta.env.VITE_BACKEND_URL + "/api/auth/mentor/login";

        const response = await axios.post(url, {
          password,
          email,
        });

        const { data } = response;

        if (response.status === 200) {
          Cookies.set("ccMentorToken", data.jwtToken);
          setFormData({
            password: "",
            email: "",
          });
          toast.success(data.message, {
            duration: 1000,
          });
          setLoading(false);
          setTimeout(() => {
            navigate("/mentor");
          }, 1000);
        } else {
          toast.error(data.message, { duration: 1000 });
        }
      }
    } catch (error) {
      const { response } = error;
      toast.error(response.data.message, { duration: 1000 });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="shadow-2xl flex flex-col gap-3 bg-white p-8 w-4/5 max-w-md min-w-[300px] rounded-2xl text-sm"
    >
      <h1 className="text-black font-bold text-4xl mb-3">Mentor Login</h1>
      <label className="text-black font-semibold">Email</label>

      <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
        <IoMdMail className="mr-2" size={20} />
        <input
          onChange={handleChange}
          name="email"
          value={formData.email}
          type="email"
          className="ml-2 border-none h-full focus:outline-none w-[80%]"
          placeholder="Enter your Email"
        />
      </div>

      <label className="text-black font-semibold">Password</label>

      <div className="flex items-center border-2 border-gray-300 rounded-lg h-12 pl-2 transition focus-within:border-blue-500">
        <RiLock2Line className="mr-2" size={20} />
        <input
          onChange={handleChange}
          name="password"
          value={formData.password}
          type={showPassword ? "text" : "password"}
          className="ml-2 border-none w-full h-full focus:outline-none"
          placeholder="Enter your Password"
        />
        {showPassword ? (
          <AiOutlineEyeInvisible
            onClick={() => setShowPassword(!showPassword)}
            className="mr-2 cursor-pointer"
            size={20}
          />
        ) : (
          <AiOutlineEye
            onClick={() => setShowPassword(!showPassword)}
            className="mr-2 cursor-pointer"
            size={20}
          />
        )}
      </div>

      <button
        type="submit"
        className="flex justify-center items-center mt-5 mb-2 bg-black text-white font-medium text-sm rounded-lg h-12 w-full transition hover:bg-gray-900"
      >
        {loading ? (
          <TailSpin
            visible={true}
            height="30"
            width="30"
            color="white"
            ariaLabel="tail-spin-loading"
            radius="1"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          "Submit"
        )}
      </button>
      <p className="text-center text-black text-sm">
        Don't have an account?
        <span
          className="text-blue-500 cursor-pointer mx-2"
          onClick={() => navigate("/register")}
        >
          Register
        </span>
      </p>
    </form>
  );
};

export default MentorLogin;
