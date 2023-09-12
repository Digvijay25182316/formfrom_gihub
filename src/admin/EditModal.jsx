import React, { useRef, useState } from "react";
import { useAppContext } from "../context/store";
import { RxCross1 } from "react-icons/rx";
import { db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

function EditModal({ data }) {
  const { dark } = useAppContext();
  const [isOpen, setIsOpen] = useState(false);

  const FormRef = useRef({
    Fullname: data.Fullname,
    PhoneNumber: data.PhoneNumber,
    mentor: data.mentor,
    roundschanting: data.mentor,
    city: data.city,
    language: data.language,
    gender: data.gender,
    age: data.age,
    program: data.program,
  });

  const updatedFormData = useRef({});

  console.log(FormRef);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await setDoc(doc(db, "users", data.id), {
      formdata: {
        Fullname: updatedFormData.current?.Fullname?.value,
        PhoneNumber: updatedFormData.current?.PhoneNumber?.value,
        mentor: updatedFormData.current?.mentor?.value,
        roundschanting: updatedFormData.current?.roundschanting?.value,
        city: updatedFormData.current?.city?.value,
        language: updatedFormData.current?.language?.value,
        gender: updatedFormData.current?.gender?.value,
        age: updatedFormData.current?.age?.value,
        program: [updatedFormData.current?.program?.value],
      },
    })
      .then((data) => {
        toast.success("updated successfully");
        setIsOpen(!isOpen);
      })
      .catch((err) => toast.error(err.message));
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={
          dark
            ? "px-4 py-1 bg-gray-700 rounded-lg mx-2"
            : "px-4 py-1 bg-gray-200 rounded-lg mx-2"
        }
      >
        Edit
      </button>
      <div
        className={
          isOpen
            ? "fixed top-0 bottom-0 left-0 right-0 w-screen h-screen flex items-center justify-center z-[1000]"
            : "hidden"
        }
      >
        <div
          className={`fixed min-h-screen min-w-full ${
            dark ? "bg-gray-700" : "bg-white"
          }`}
        >
          <div>
            <div className="flex justify-end">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`text-red-400 ${
                  dark
                    ? "bg-gray-600 p-4 m-2 rounded-lg"
                    : "bg-gray-200 p-4 m-2 rounded-lg"
                }`}
              >
                <RxCross1 />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              ref={updatedFormData}
              className="w-[95vw] m-auto"
            >
              <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 overflow-scroll">
                <label>
                  <p>name</p>
                  <input
                    type="text"
                    name="Fullname"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.Fullname}
                  />
                </label>
                <label>
                  <p>Phone</p>
                  <input
                    type="number"
                    name="PhoneNumber"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.PhoneNumber}
                  />
                </label>
                <label>
                  <p>Mentor</p>
                  <input
                    type="text"
                    placeholder="Please enter mentor"
                    name="mentor"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.mentor}
                  />
                </label>
                <label>
                  <p>RoundsChanting</p>
                  <input
                    type="number"
                    placeholder="number:rounds chanting"
                    name="roundschanting"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.roundschanting}
                  />
                </label>
                <label>
                  <p>city</p>
                  <input
                    type="text"
                    name="city"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.city}
                  />
                </label>
                <label>
                  <p>language</p>
                  <input
                    type="text"
                    name="language"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.language}
                  />
                </label>
                <label>
                  <p>gender</p>
                  <input
                    type="text"
                    name="gender"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.gender}
                  />
                </label>
                <label>
                  <p>age</p>
                  <input
                    type="text"
                    name="age"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.age}
                  />
                </label>
                <label>
                  <p>Program</p>
                  <input
                    type="text"
                    name="program"
                    className={`px-4 py-1 rounded-lg w-full focus:outline-gray-400 ${
                      dark ? "border border-gray-600" : "border border-gray-200"
                    }`}
                    defaultValue={FormRef.current?.program}
                  />
                </label>
              </div>
              <div className=" m-auto">
                <button
                  type="submit"
                  className={`mt-10 px-4 py-1 rounded-lg ${
                    dark ? "bg-gray-600" : "bg-gray-200"
                  }`}
                >
                  submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
