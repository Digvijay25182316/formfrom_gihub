import React, { useCallback, useState } from "react";
import { db } from "../firebase";
import { useAppContext } from "../context/store";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { toast } from "react-hot-toast";
import Cookies from "js-cookies";
import { useParams } from "react-router-dom";

const generateRandomId = (length = 10) => {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomId = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomId += characters.charAt(randomIndex);
  }

  return randomId;
};

function Events() {
  const [events, setEvenets] = useState(null);
  const { dark } = useAppContext();
  const { id } = useParams();
  const collect = collection(db, "events");
  const quer = query(collect, where("eventForid", "==", id));

  useCallback(async () => {
    const querySnapshot = await getDocs(quer);
    const data = [];
    querySnapshot.forEach((doc) => {
      data.push({ id: doc.id, ...doc.data() });
    });
    setEvenets(data);
  }, [quer])();

  const handleAdd = async (data) => {
    const id = generateRandomId(20);
    await setDoc(doc(db, "events", id), data)
      .then((data) => toast.success("event created successfully"))
      .catch((err) => toast.error(err.message));
  };

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "events", id))
      .then((data) => toast.success("deleted successfully"))
      .catch((err) => toast.error(err.message));
  };
  return (
    <div className="min-h-screen">
      <div className="pt-20">
        <h1 className="ml-20 text-2xl font-semibold">
          Events For {Cookies.getItem("eventFor")}
        </h1>
        <AddEvent dark={dark} id={id} handleAdd={handleAdd} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {events?.map((item, index) => (
            <div
              key={index}
              className={`w-full flex flex-col items-center gap-5 px-4 py-2 rounded-lg ${
                dark ? "bg-gray-700" : "bg-gray-100"
              }`}
            >
              <div className="flex justify-between w-full">
                <p className="font-semibold">{item.createdBy}</p>
                <i className="text-gray-800  bg-gray-200 rounded-xl px-5 ">
                  {item.date?.toString().split("T")[0]}
                </i>
              </div>
              <p className="text-center font-semibold text-xl">
                {item.message}
              </p>
              <button
                className="bg-red-400 px-2 py-0.5 rounded-lg text-lg"
                onClick={() => handleDelete(item.id)}
              >
                delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Events;

function AddEvent({ dark, id, handleAdd }) {
  const [isOpen, setIsOpen] = useState(false);
  const [createdBy, setCreatedBy] = useState("");
  const [message, setMessage] = useState("");
  const tosend = {
    eventForid: id,
    createdBy,
    message,
    date: new Date().toISOString(),
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    handleAdd(tosend);
    setCreatedBy("");
    setMessage("");
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`py-1 px-4 rounded-lg mb-4 ml-4 mt-10 bg-gray-400`}
      >
        Add Event
      </button>
      <div
        className={
          isOpen
            ? `fixed backdrop-brightness-50 top-0 left-0 right-0 bottom-0 flex items-center justify-center`
            : "hidden"
        }
      >
        <div
          className={`${
            dark ? "bg-gray-700" : "bg-gray-100"
          } p-5 rounded-lg md:w-[30vw]`}
        >
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-5">
              <label className="flex flex-col gap-3">
                <p className="font-semibold ml-3">your name</p>
                <input
                  name="name"
                  type="text"
                  className="px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400"
                  onChange={(e) => setCreatedBy(e.target.value)}
                />
              </label>
              <label className="flex flex-col gap-3">
                <p className="font-semibold ml-3">message</p>
                <input
                  name="message"
                  type="text"
                  className="px-3 py-1 rounded-lg drop-shadow-lg focus:outline-gray-400"
                  onChange={(e) => setMessage(e.target.value)}
                />
              </label>
            </div>
            <div className="mt-5 flex justify-between">
              <button
                onClick={() => setIsOpen(false)}
                type="submit"
                className="px-3 py-1 bg-gray-300 rounded-lg text-gray-900"
              >
                submit
              </button>
              <button
                className="px-3 py-1 bg-red-400 rounded-lg"
                onClick={() => setIsOpen(false)}
                type="button"
              >
                close
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
