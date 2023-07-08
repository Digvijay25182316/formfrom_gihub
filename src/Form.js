import React, { useState } from "react";
import "./Form.css";
import { db, collection, addDoc } from "./firebase";
const Form = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    mentorName: "",
    numberOfMembers: "",
    travelNeeded: "",
    kidsComing: "",
    questions: "",
  });

  const [errors, setErrors] = useState({});

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
    setIsOpen(!isOpen);
    // Validate form data
    const validationErrors = {};
    if (formData.fullName.trim() === "") {
      validationErrors.fullName = "Full Name is required";
    }
    if (formData.phoneNumber.trim() === "") {
      validationErrors.phoneNumber = "Phone Number is required";
    }
    if (formData.numberOfMembers.trim() === "") {
      validationErrors.numberOfMembers = "Number of Members is required";
    }
    if (formData.travelNeeded.trim() === "") {
      validationErrors.travelNeeded = "Travel Needed field is required";
    }
    if (formData.kidsComing.trim() === "") {
      validationErrors.kidsComing = "Kids Coming field is required";
    }
    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsOpen();
    }
  };
  const doneHandler = () => {
    if (formData) {
      storedata(formData)
        .then((data) => {
          console.log(data.id);
          window.alert("Form data saved successfully!");
          // Reset the form
          setFormData({
            fullName: "",
            phoneNumber: "",
            mentorName: "",
            numberOfMembers: "",
            travelNeeded: "",
            kidsComing: "",
            questions: "",
          });
        })
        .catch((error) => {
          window.alert("Error saving form data: ", error);
        });
    } else {
      window.alert("noform data found");
    }
  };
  return (
    <div style={{ maxWidth: "100vw" }}>
      {isOpen ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
          }}
          className="container"
        >
          <h2>Picnic Registration Form</h2>
          <p style={{ background: "lightgray", fontSize: "20px" }}>
            If there is any difficulty or questions, call/message at{" "}
            <a href="tel:99223269444">99223269444</a>
            (Aarush Prabhu)
          </p>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              <div>
                <label htmlFor="fullName">What's Your Full Name?</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
                {errors.fullName && <span>{errors.fullName}</span>}
              </div>
              <div>
                <label htmlFor="phoneNumber">What's Your Phone Number?</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
                {errors.phoneNumber && <span>{errors.phoneNumber}</span>}
              </div>
              <div>
                <label htmlFor="mentorName">Mentor Name (Optional)</label>
                <input
                  type="text"
                  id="mentorName"
                  name="mentorName"
                  value={formData.mentorName}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label htmlFor="numberOfMembers">
                  Number of Members Coming (Including yourself)
                </label>
                <input
                  type="number"
                  id="numberOfMembers"
                  name="numberOfMembers"
                  value={formData.numberOfMembers}
                  onChange={handleChange}
                  required
                />
                {errors.numberOfMembers && (
                  <span>{errors.numberOfMembers}</span>
                )}
              </div>
              <div>
                <label htmlFor="travelNeeded">Travel Needed or Not</label>
                <select
                  id="travelNeeded"
                  name="travelNeeded"
                  value={formData.travelNeeded}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No, I will come by myself.">
                    No, I will come by myself.
                  </option>
                </select>
                {errors.travelNeeded && <span>{errors.travelNeeded}</span>}
              </div>
              <div>
                <label htmlFor="kidsComing">Kids Coming with You</label>
                <select
                  id="kidsComing"
                  name="kidsComing"
                  value={formData.kidsComing}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
                {errors.kidsComing && <span>{errors.kidsComing}</span>}
              </div>
              <div>
                <label htmlFor="questions">
                  Any Questions Related to Picnic?
                </label>
                <textarea
                  id="questions"
                  name="questions"
                  value={formData.questions}
                  onChange={handleChange}
                />
              </div>
              <button type="submit" style={{ width: "max-content" }}>
                next<span>&rarr;</span>
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            margin: "50px",
            alignItems: "center",
          }}
        >
          <button
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              maxWidth: "max-content",
              background: "#cac6c6",
              border: "0.5px solid gray",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <span style={{ fontSize: "20px" }}>&larr;</span>
            <b>Back</b>
          </button>
          <div>
            <b>Please Scan the Following QR Code to Pay </b>

            <p>
              If Any Difficulty in Payments, Call/Message to{" "}
              <a href="tel:99223269444">Aarush Khatri</a>
            </p>
          </div>
          <div>
            <p>
              All the Devotees are requested to Make Payments on the Following
              Google Pay Number/UPI.{" "}
            </p>
            <p>You Can Scan the QR Code also. </p>
          </div>
          <div style={{ display: "flex", gap: "40px" }}>
            <b>UPI ID : renurk58@okicici </b> <b> GPAY Number : 7666858806 </b>
          </div>
          <div>
            <p>
              IMPORTANT: AFTER PAYMENT PLEASE SENT SCREENSHOT TO AARUSH KHATRI
              on WHATSAPP <a href="https://wa.me/9922326944">9922326944</a>
            </p>
          </div>
          <div>
            <img
              src="https://storage.tally.so/5fa157fc-2d38-4f51-80af-0f8163a6b066/WhatsApp-Image-2022-11-15-at-2.46.06-PM.jpeg"
              alt="GPAY CODE"
            />
          </div>
          <p style={{ fontWeight: "bold", color: "red", fontSize: "20px" }}>
            wait until you get confermation...
          </p>
          <button
            onClick={doneHandler}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: "10px",
              alignItems: "center",
              maxWidth: "max-content",
              background: "#cac6c6",
              border: "0.5px solid gray",
              borderRadius: "5px",
              padding: "5px",
              cursor: "pointer",
              fontSize: "20px",
            }}
          >
            <b>done</b>
          </button>
        </div>
      )}
    </div>
  );
};

export default Form;
