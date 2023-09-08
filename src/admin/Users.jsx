import React, { useCallback, useState } from "react";
import { useAppContext } from "../context/store";
import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { getAuth } from "firebase/auth";
import toast from "react-hot-toast";

function Users() {
  const [data, setDataRows] = useState([]);
  const user = getAuth().currentUser;
  console.log(user);
  const [searchTerm, setSearchTerm] = useState("");
  const { dark } = useAppContext();
  useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "actUser"));
    const dataset = [];
    querySnapshot.forEach((doc, i) => {
      dataset.push({ id: doc.id, ...doc.data() });
    });
    setDataRows(dataset);
  }, [])();

  function filteredData() {
    const filteredData = data.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
    setDataRows(filteredData);
  }

  function handleDelete(id) {
    deleteDoc(doc(db, "actUser", id)).then((data) =>
      toast.success("deleted successfully")
    );
  }
  return (
    <div className={`min-h-screen`}>
      <div>
        <h1 className="pt-20 text-xl ml-20">Users</h1>
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
        <div
          className={`overflow-scroll scrollbar-hide w-[95vw] mx-auto ${
            dark ? "text-yellow-200 py-5" : "text-gray-800 py-5"
          }`}
        >
          <table className="m-auto min-w-max">
            <thead>
              <tr>
                <th className="border border-gray-400">index</th>
                <th className="border border-gray-400">name</th>
                <th className="border border-gray-400">email</th>
                <th className="border border-gray-400">delete</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((item, index) => (
                <tr key={item.id}>
                  <td className="border border-gray-400">
                    {(index + 1).toString()}
                  </td>
                  <td className="border border-gray-400 min-w-max px-5">
                    {item.name}
                  </td>
                  <td className="border border-gray-400 min-w-max px-5">
                    {item.email}
                  </td>
                  <td className="border border-gray-400 min-w-max px-5">
                    <DeleteModal
                      dark={dark}
                      id={item.id}
                      handleDelete={handleDelete}
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

export default Users;

function DeleteModal({ dark, handleDelete, id }) {
  const [isopen, setIsOpen] = useState(false);
  const handleChange = () => {
    setIsOpen(!isopen);
    handleDelete(id);
  };

  return (
    <>
      <button
        className={`px-3 py-1 rounded-md m-2 text-md ${
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
            <button className="bg-red-600 text-white px-2 py-1 rounded-lg mr-3">
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
