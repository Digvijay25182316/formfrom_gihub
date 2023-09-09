import React, { useRef, useState } from "react";
import { useAppContext } from "../context/store";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import Cookies from "js-cookies";
import { toast } from "react-hot-toast";
import LoadingHandleButton from "../Components/LoadingHandleButton";

function Login() {
  const { dark, login } = useAppContext();
  const formRef = useRef(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formRef.current?.email?.value;
    const password = formRef.current?.password?.value;
    setLoading(true);
    await signInWithEmailAndPassword(auth, email, password)
      .then((data) => {
        Cookies.setItem("token", data.user.accessToken);
        login();
        toast.success("logged in successfully");
        setLoading(false);
        navigate("/admin/dashboard");
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen pt-20 flex justify-center items-center">
      <div className="md:w-[40vw] w-[95vw] ">
        <h1 className="text-center font-semibold text-xl mb-10">Login</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 font-semibold"
            ref={formRef}
          >
            <label className="flex flex-col gap-3">
              <p className="ml-2 font-semibold">email</p>
              <input
                type="email"
                name="email"
                placeholder="jondoe@email.com"
                className="w-full px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400 text-gray-800"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              <p className="ml-2 font-semibold">password</p>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400 text-gray-800"
                required
              />
            </label>
            <Link to={"/admin/login"}>
              <button className="underline w-max" type="button">
                forget password
              </button>
            </Link>
            <LoadingHandleButton dark={dark} loading={loading} />
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
