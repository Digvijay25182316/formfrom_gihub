import React, { useState } from "react";
import { db, collection, addDoc } from "./firebase";
import { useNavigate } from "react-router-dom";

const Form = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    Fullname: "",
    PhoneNumber: "",
    city: "",
    language: "",
    gender: "",
    age: "",
    program: [],
  });
  const handleProgramCheckboxChange = (e) => {
    const selectedProgram = e.target.value;
    const isChecked = e.target.checked;

    // If the current checkbox is checked, uncheck all other checkboxes
    if (isChecked) {
      const updatedProgram = [selectedProgram];
      setFormData({
        ...formData,
        program: updatedProgram,
        isCheckboxChecked: isChecked,
      });
    } else {
      // If the current checkbox is unchecked, reset the state
      setFormData({
        ...formData,
        program: [],
        isCheckboxChecked: isChecked,
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const storedata = async (formdata) => {
    const docRef = await addDoc(collection(db, "users"), { formdata });
    return docRef;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData) {
      storedata(formData)
        .then((data) => {
          window.alert("successfully submitted");
          setFormData({
            Fullname: "",
            PhoneNumber: "",
            city: "",
            language: "",
            gender: "",
            program: [],
          });
          navigate("/");
        })
        .catch((err) => window.alert("Resubmit the form"));
    }
  };
  return (
    <div className="min-h-screen">
      <div className="">
        <h1 className="text-4xl text-center my-10 font-extrabold">
          Register for Gitasaar
        </h1>
        <div className="w-full flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 mx-auto m-5">
              <div className="md:w-[40vw] w-80 mx-auto  flex flex-col gap-3">
                <label className="text-xl font-bold" htmlFor="name">
                  Enter your full name{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="Fullname"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="phone number">
                  Enter your Phone number{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="PhoneNumber"
                  type="number"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  maxLength={10}
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="language">
                  Your preferred language{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="language"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Your preferred language</option>
                  <option value="english">English</option>
                  <option value="hindi">Hindi</option>
                  <option value="marathi">Marathi</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="Gender">
                  Please choose Gender{" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="gender"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Enter your gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="Gender">
                  Choose Your age <i className="text-bold text-red-500">*</i>
                </label>
                <select
                  name="age"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                  onChange={handleChange}
                >
                  <option value="">Select your age</option>
                  <option value="15-20">15-20</option>
                  <option value="20-30">20-30</option>
                  <option value="30-40">30-40</option>
                  <option value="40-50">40-50</option>
                  <option value="50+">50+</option>
                </select>
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <label className="text-xl font-bold" htmlFor="City">
                  Location (enter the name of your city){" "}
                  <i className="text-bold text-red-500">*</i>
                </label>
                <input
                  onChange={handleChange}
                  name="city"
                  type="text"
                  className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600"
                  required
                />
              </div>
              <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
                <div className="text-xl font-bold" htmlFor="program_name">
                  Which program you want to enrol in
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Gitasar Temple program (Summary Study of Bhagvada Gita)"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={
                        formData.program.length > 0 &&
                        formData.program[0] !==
                          "Gitasar Temple program (Summary Study of Bhagvada Gita)"
                      }
                    />
                    Gitasar Temple program (Summary Study of Bhagvada Gita)
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="CHILDREN Value Education"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={
                        formData.program.length > 0 &&
                        formData.program[0] !== "CHILDREN Value Education"
                      }
                      // checked={formData.program==="Gitasaar For Girls Program"}
                    />
                    CHILDREN Value Education
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Host program at your Society "
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={
                        formData.program.length > 0 &&
                        formData.program[0] !== "Host program at your Society "
                      }
                    />
                    Host program at your Society
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value=" Daily Book Reading online (SPORT)"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={
                        formData.program.length > 0 &&
                        formData.program[0] !==
                          " Daily Book Reading online (SPORT)"
                      }
                    />
                    Daily Book Reading online (SPORT)
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="text-xl font-bold bg-gray-700 text-white px-3 py-1 rounded-xl hover:bg-gray-900 w-max"
              >
                Confirm Registeration For Gita Saar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
