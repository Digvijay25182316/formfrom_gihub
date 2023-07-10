import React, { useState } from "react";
import pay from "./assets/Pay.jpeg";
import "./Form.css";
import { db, collection, addDoc } from "./firebase";
const prabhus = [
  "Vikram Prabhu",
  "Shweta Mataji",
  "HG Hari Kirtan Prabhu",
  "HG Ramachandra Prabhu",
  "HG Vishnu Prabhu",
  "HG Nitya Seva Prabhu",
  "HG Mohini Bhakti Mataji",
  "HG Vrindavan Krishna Prabhu",
  "HG Jagannath Suta Prabhu",
  "HG Sudhir Priya Prabhu",
  "HG Neelkanth Prabhu",
  "HG Rasamrit Gaur Prabhu",
  "HG Anupam Gopi Mataji",
  "HG Parth Pran Prabhu",
  "HG Achintya Lila Mataji",
  "HG Srivatsa Chandra Prabhu",
  "HG Jayanand Krishna Prabhu",
  "Prateek Kumar Prabhu",
  "Sujay Nimai Prabhu",
];

const Form = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isClicked, setIsClicked] = useState(false);
  const [noOfkids, setNoOfkids] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    mentorName: "",
    numberOfMembers: "",
    travelNeeded: "",
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
    formData.noOfkids = noOfkids;
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
    if (noOfkids.trim() === "") {
      validationErrors.noOfkids = "Kids Coming field is required";
    }
    setErrors(validationErrors);

    // If there are no validation errors, submit the form
    if (Object.keys(validationErrors).length === 0) {
      setIsOpen();
    }
  };
  const doneHandler = () => {
    console.log(formData.noOfkids);
    if (formData) {
      storedata(formData)
        .then((data) => {
          setIsClicked(!isClicked);
          window.alert(
            "Form data saved successfully!\n JOIN OUR WHATSAPP GROUP FOR FURTHER INFORMATION"
          );
          // Reset the form
          setFormData({
            fullName: "",
            phoneNumber: "",
            mentorName: "",
            numberOfMembers: "",
            travelNeeded: "",
            questions: "",
          });
          setNoOfkids("");
        })
        .catch((error) => {
          window.alert("Error saving form data: ", error);
        });
    } else {
      window.alert("noform data found");
    }
  };
  return (
    <div style={{ maxWidth: "100vw" }} className="container">
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
            <a href="tel:9175763244">9175763244</a>
            (Kishore Dhanwate)
          </p>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "28px" }}
            >
              <div>
                <label htmlFor="fullName">
                  Full Name<i style={{ color: "red" }}>*</i>
                </label>
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
                <label htmlFor="phoneNumber">
                  Phone Number<i style={{ color: "red" }}>*</i>
                </label>
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
                <select
                  id="mentorName"
                  name="mentorName"
                  value={formData.mentorName}
                  onChange={handleChange}
                >
                  <option value={""}>Select an option</option>
                  {prabhus &&
                    prabhus.map((prabhu) => (
                      <option value={prabhu}>{prabhu}</option>
                    ))}
                </select>
              </div>
              <div>
                <label htmlFor="numberOfMembers">
                  Number Of Adults(Including yourself)
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
                <label htmlFor="kidsComing">No. Of Kids Coming with You</label>
                <input
                  type="number"
                  id="number of kids comming"
                  name="number of kids comming"
                  value={noOfkids}
                  onChange={(e) => setNoOfkids(e.target.value)}
                  required
                />
                {errors.kidsComing && <span>{errors.kidsComing}</span>}
              </div>
              <div>
                <label htmlFor="Do you have your own travel arrangement">
                  Do you have your own travel arrangement
                </label>
                <select
                  id="travelNeeded"
                  name="travelNeeded"
                  value={formData.travelNeeded}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select an option</option>
                  <option value="Two Wheeler">Two Wheeler</option>
                  <option value="Four Wheeler">Four Wheeler</option>
                  <option value="PMT Bus"> We are coming PMT Bus</option>
                </select>
                {errors.travelNeeded && <span>{errors.travelNeeded}</span>}
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
              <a href="tel:9175763244">Kishore Dhanwate</a>
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
            {/* <b>UPI ID : renurk58@okicici </b> <b> GPAY Number : 7666858806 </b> */}
          </div>
          <div>
            <p>
              IMPORTANT: AFTER PAYMENT PLEASE SENT SCREENSHOT TO Kishore
              Dhanwate on WHATSAPP{" "}
              <a href="https://wa.me/9175763244">9175763244</a>
            </p>
          </div>
          <div>
            <img src={pay} alt="GPAY CODE" height={"500px"} />
          </div>
          <p
            style={{
              fontWeight: "bold",
              color: "red",
              fontSize: "20px",
              maxWidth: "100%",
            }}
            className="after_done"
          >
            after clicking{" "}
            <span
              style={{
                background: "gray",
                border: "1px solid lightgray",
                padding: "0 5px",
                borderRadius: "5px",
              }}
            >
              done
            </span>{" "}
            wait until you get the confirmation...
          </p>
          {!isClicked ? (
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
              id="done"
            >
              <b>done</b>
            </button>
          ) : (
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
                fontSize: "20px",
              }}
              id="done"
            >
              <a href="https://chat.whatsapp.com/LdRNIb4NA0gG2AIMhheSUc">
                Join To Our Whatsapp Group
              </a>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Form;
