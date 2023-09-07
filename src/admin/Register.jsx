import React, { useRef, useState } from "react";
import { useAppContext } from "../context/store";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import LoadingHandleButton from "../Components/LoadingHandleButton";
import { toast } from "react-hot-toast";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

function Register() {
  const { dark } = useAppContext();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = formRef.current?.email?.value;
    const password = formRef.current?.password?.value;
    const name = formRef.current?.name.value;
    setLoading(true);
    await createUserWithEmailAndPassword(auth, email, password)
      .then(async (data) => {
        toast.success("registered successfully");
        setLoading(false);
        await addDoc(collection(db, "actUser"), { name, email, password });
      })
      .catch((err) => {
        toast.error(err.message);
        setLoading(false);
      });
  };
  return (
    <div className="min-h-screen pt-20 flex justify-center items-center">
      <div className="md:w-[40vw] w-[95vw] ">
        <h1 className="text-center font-semibold text-xl mb-10">Register</h1>
        <div>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 font-semibold"
            ref={formRef}
          >
            <label className="flex flex-col gap-3">
              <p className="ml-2 font-semibold">name</p>
              <input
                type="text"
                name="name"
                placeholder="Jon Doe"
                className="w-full px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              <p className="ml-2 font-semibold">email</p>
              <input
                type="email"
                name="email"
                placeholder="jondoe@email.com"
                className="w-full px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400"
                required
              />
            </label>
            <label className="flex flex-col gap-3">
              <p className="ml-2 font-semibold">password</p>
              <input
                type="password"
                name="password"
                placeholder="password"
                className="w-full px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400"
                required
              />
            </label>
            <Link to={"/admin/Register"}>
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

export default Register;
