import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaSun } from "react-icons/fa";
import { BsMoonFill } from "react-icons/bs";
import { RxCross1 } from "react-icons/rx";
import { useAppContext } from "../context/store";
import Cookies from "js-cookies";

function Header() {
  const { dark, Authenticated, isAdmin, togglemode } = useAppContext();
  const location = useLocation();
  const handleLogout = () => {
    Cookies.removeItem("token");
  };
  return (
    <header
      className={
        location.pathname.startsWith("/admin")
          ? "block fixed backdrop-blur-lg left-0 right-0 top-0"
          : "hidden"
      }
    >
      <div className="w-full flex justify-between items-center px-5 py-2 shadow-lg">
        <MenuBar dark={dark} />
        {isAdmin && (
          <p className="text-blue-700 text-xl font-semibold">Admin</p>
        )}
        <div className="flex items-center gap-3">
          <div>
            {!dark ? (
              <button onClick={togglemode} className="rounded-lg p-2">
                <BsMoonFill className="text-xl" />
              </button>
            ) : (
              <button onClick={togglemode} className="rounded-lg p-2">
                <FaSun className="text-yellow-400 text-xl" />
              </button>
            )}
          </div>
          {!Authenticated ? (
            <Link to={"/admin/login"}>
              <button
                className={`${
                  dark ? "bg-gray-600" : "bg-gray-200"
                } px-4 py-1 rounded-lg`}
              >
                <p className="text-lg font-semibold">Login</p>
              </button>
            </Link>
          ) : (
            <button
              className={`${
                dark ? "bg-gray-600" : "bg-gray-200"
              } px-4 py-1 rounded-lg`}
              onClick={handleLogout}
            >
              <p className="text-lg font-semibold">Logout</p>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;

function MenuBar({ dark }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${dark ? "bg-gray-600" : "bg-gray-200"} p-2 rounded-full`}
      >
        <BiMenuAltLeft className="text-2xl" />
      </button>
      <div
        className={`fixed top-0 left-0 md:right-[50%] right-0 rounded-b-lg transition-transform h-full flex justify-between items-center ${
          isOpen ? "transform translate-x-0" : "transform -translate-x-full"
        }`}
      >
        <div
          className={`${
            dark ? "bg-gray-700" : "bg-white"
          } w-full flex justify-evenly gap-5 items-center drop-shadow-2xl rounded-lg`}
        >
          <Link to={"/admin/dashboard"}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={
                dark
                  ? "bg-gray-700 px-3 py-1 rounded-lg"
                  : "bg-gray-200 px-3 py-1 rounded-lg"
              }
            >
              Dashboard
            </button>
          </Link>
          <Link to={"/admin/users"}>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={
                dark
                  ? "bg-gray-700 px-3 py-1 rounded-lg"
                  : "bg-gray-200 px-3 py-1 rounded-lg"
              }
            >
              Users
            </button>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="bg-red-400 rounded-lg p-3"
          >
            <RxCross1 />
          </button>
        </div>
      </div>
    </>
  );
}
