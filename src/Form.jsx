import React, { useState } from "react";
import { db, collection, addDoc } from "./firebase";

const Form = () => {
  const [formData, setFormData] = useState({
    Fullname: "",
    PhoneNumber: "",
    email: "",
    city: "",
    language:"",
    gender: "",
    program:[],
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
    if(formData){
    storedata(formData).then(data=>window.alert("successfully submitted")).catch(err=>window.alert("Resubmit the form"))}
    
  };
  return (
    <div className="min-h-screen">
      <div className="">
        <h1 className="text-4xl text-center my-10 font-extrabold">Register for Gitasaar</h1>
        <div className="w-full flex flex-col items-center">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-8 mx-auto m-5">
            <div className="md:w-[40vw] w-80 mx-auto  flex flex-col gap-3">
              <label className="text-xl font-bold" htmlFor="name">Enter your full name <i className="text-bold text-red-500">*</i></label>              
              <input onChange={handleChange} name="Fullname" type="text" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required/>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <label className="text-xl font-bold" htmlFor="phone number">Enter your Phone number <i className="text-bold text-red-500">*</i></label>              
              <input onChange={handleChange} name="PhoneNumber" type="number" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required maxLength={10}/>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <label className="text-xl font-bold" htmlFor="email">Enter your email <i className="text-bold text-red-500">*</i></label>              
              <input onChange={handleChange} name="email" type="email" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required/>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <label className="text-xl font-bold" htmlFor="language">Your preferred language <i className="text-bold text-red-500">*</i></label>              
              <select name="language" type="text" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required onChange={handleChange}>
                <option value="">Your preferred language</option>
                <option value="english">English</option>
                <option value="hindi">Hindi</option>
                <option value="marathi">Marathi</option>
              </select>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <label className="text-xl font-bold" htmlFor="Gender">Please choose Gender <i className="text-bold text-red-500">*</i></label>              
              <select name="gender" type="text" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required onChange={handleChange}>
                <option value="">Enter your gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <label className="text-xl font-bold" htmlFor="City">Location (enter the name of your city) <i className="text-bold text-red-500">*</i></label>              
              <input onChange={handleChange} name="city" type="text" className="border shadow-sm hover:shadow-md drop-shadow-sm px-5 py-2 rounded-xl focus:outline-yellow-600" required/>
            </div>
            <div className="md:w-[40vw]  w-80 mx-auto flex flex-col gap-3 ">
              <div className="text-xl font-bold" htmlFor="program_name">Which program you want to enrol in</div>
              <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Gitasaar For Boys Program"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Gitasaar For Boys Program"}
                    />
                    Gitasaar For Boys Program
                  </label>
                </div>
                <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Gitasaar For Girls Program"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Gitasaar For Girls Program"}
                      // checked={formData.program==="Gitasaar For Girls Program"}
                    />
                    Gitasaar For Girls Program
                  </label>
              </div>
              <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Gitasaar For Family Program"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Gitasaar For Family Program"}
                    />
                    Gitasaar For Family Program
                  </label>
              </div>
              <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Children's value education program"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Children's value education program"}
                    />
                    Children&apos;s value education program
                  </label>
              </div>
              <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Gitasaar at Society Program"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Gitasaar at Society Program"}
                    />
                    Gitasaar at Society Program
                  </label>
              </div>
              <div className="flex flex-col gap-3 text-xl font-bold">
                  <label>
                    <input
                      type="checkbox"
                      required
                      name="program"
                      value="Daily Morening reading/meditation"
                      onChange={handleProgramCheckboxChange}
                      className="w-5"
                      disabled={formData.program.length>0&&formData.program[0]!=="Daily Morening reading/meditation"}
                    />
                    Daily Morning reading/meditation
                  </label>
              </div>
            </div>
            <button type="submit" className="text-xl font-bold bg-gray-700 text-white px-3 py-1 rounded-xl hover:bg-gray-900 w-max">Confirm Registeration For Gita Saar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form;
