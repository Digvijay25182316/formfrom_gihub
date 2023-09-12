import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/store";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookies";
import ExportCsv from "../Components/ExportContext";
import EditModal from "./EditModal";

function Dashboard() {
  const [data, setDataRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { dark } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        const dataset = [];
        querySnapshot.forEach((doc, i) => {
          dataset.push({ id: doc.id, ...doc.data().formdata });
        });
        setDataRows(dataset);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    await deleteDoc(doc(db, "users", id))
      .then((data) => {
        toast.success("deleted successfully");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  function filteredData() {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setDataRows(filteredData);
  }
  return (
    <div className={`min-h-screen flex justify-center`}>
      <div className="w-[95vw] lg:w-full">
        <h1 className="pt-20 text-xl ml-20">Dashboard</h1>
        <div className="flex justify-between">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              filteredData();
            }}
            className="flex items-center gap-3 ml-5 mt-10"
          >
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              className={`px-3 py-1 rounded-lg text-gray-900 focus:outline-0 ${
                dark ? "bg-gray-600" : "bg-gray-100"
              }`}
              value={searchTerm}
            />
            <button
              type="submit"
              className={
                dark
                  ? `bg-gray-600 px-3 py-1 rounded-lg`
                  : "bg-gray-100 px-3 py-1 rounded-lg"
              }
            >
              search
            </button>
          </form>
          <ExportCsv data={data} />
        </div>
        <div
          className={`overflow-scroll scrollbar-hide w-[95vw] m-auto ${
            dark ? "text-yellow-200 py-5" : "text-gray-800 py-5"
          }`}
        >
          <table className="m-auto min-w-max">
            <thead>
              <tr>
                <th className="border border-gray-400">index</th>
                <th className="border border-gray-400">name</th>
                <th className="border border-gray-400">phone</th>
                <th className="border border-gray-400">mentor</th>
                <th className="border border-gray-400">roundschanting</th>
                <th className="border border-gray-400">gender</th>
                <th className="border border-gray-400">age</th>
                <th className="border border-gray-400">city</th>
                <th className="border border-gray-400">language</th>
                <th className="border border-gray-400">program</th>
                <th className="border border-gray-400">Edit Fields</th>
                <th className="border border-gray-400">Add Events</th>
                <th className="border border-gray-400">delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr
                  key={item.id}
                  onClick={() => {
                    Cookies.setItem("eventFor", item.Fullname);
                  }}
                  className="cursor-pointer w-full"
                >
                  <td className="border border-gray-400">
                    {(index + 1).toString()}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.Fullname}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.PhoneNumber}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item?.mentor ? item?.mentor : "no-value"}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item?.roundschanting ? item?.roundschanting : "no-value"}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.gender}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.age}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.city}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.language}
                  </td>
                  <td className="border border-gray-400 min-w-max px-3">
                    {item.program?.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </td>
                  <td className="border border-gray-400">
                    <EditModal data={item} />
                  </td>
                  <td className="border border-gray-400">
                    <button
                      className={
                        dark
                          ? `bg-gray-700 px-3 py-1 rounded-lg mx-2`
                          : "bg-gray-200 px-3 py-1 rounded-lg mx-2"
                      }
                      onClick={() => navigate(`/admin/event/${item.id}`)}
                    >
                      Go Events
                    </button>
                  </td>
                  <td className="border border-gray-400">
                    <DeleteModal
                      dark={dark}
                      handleDelete={handleDelete}
                      id={item.id}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

function DeleteModal({ dark, handleDelete, id }) {
  const [isopen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isopen);
  };
  return (
    <>
      <button
        className={`px-3 py-1 rounded-md m-2 ${
          dark ? "bg-gray-600" : "bg-gray-200"
        }`}
        onClick={handleChange}
      >
        delete
      </button>
      <div
        className={
          isopen
            ? `fixed top-0 bottom-0 left-0 right-0 backdrop-brightness-50 flex items-center justify-center`
            : "hidden"
        }
      >
        <div
          className={`${
            dark ? "bg-gray-800" : "bg-white"
          } rounded-lg flex flex-col items-center gap-5`}
        >
          <p className="text-xl font-semibold mx-5 mt-5">
            Are You sure you want to delete?
          </p>
          <div className="m-5">
            <button
              className="bg-red-600 text-white px-2 py-1 rounded-lg mr-3"
              onClick={() => {
                handleDelete(id);
                handleChange();
              }}
            >
              delete
            </button>
            <button
              onClick={handleChange}
              className={`px-3 py-1 rounded-md ml-3 ${
                dark ? "bg-gray-600" : "bg-gray-200"
              }`}
            >
              cancel
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
