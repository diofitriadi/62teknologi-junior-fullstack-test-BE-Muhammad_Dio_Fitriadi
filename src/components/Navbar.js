import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { AuthLogout } from "../redux/action/Auth";
import { FaBars, FaTimes } from "react-icons/fa";
import Swal from "sweetalert2";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [toggle, setToggle] = useState(false);

  return (
    <>
      <nav className="w-full shadow-xl sticky top-0 z-50 bg-[#1F1D2B]">
        <div className="justify-between px-4 md:mx-16 lg:max-w-7xl md:items-center md:flex md:px-8">
          <div className="flex items-center justify-between py-3 md:py-5 md:block">
            <div className="h-8 flex items-center">
              <p className="items-center font-bold text-white text-xl">
                62 RESTO
              </p>
            </div>
            <div className="md:hidden">
              <button
                className="p-2 text-gray-700 rounded-md outline-none"
                onClick={() => setToggle(!toggle)}
              >
                {toggle ?
                  (<FaTimes size={25} color={'#0B132A'} />) : (<FaBars size={25} color={'#0B132A'} />)
                }
              </button>
            </div>
          </div>
          <div className="w-8/12">
            <div
              className={`flex-1 justify-self-center pb-3 md:block md:pb-0 md:mt-0 ${toggle ? "block" : "hidden"
                }`}
            >
              <div className="items-center md:justify-end space-y-8 md:flex md:space-x-6 md:space-y-0">
                <ul className="items-center justify-center space-y-8 md:flex md:space-x-6 md:space-y-0 ">
                  <li className="hover:text-white text-slate-300  py-2 text-md font-semibold transition ease-out">
                    <Link href="/">Manajemen Resto</Link>
                  </li>
                  <li>
                    <button
                      className="bg-yellow-800 text-[#EFEFEF] hover:bg-[#FFCA40]  transition  px-8 py-3 rounded-xl font-bold"
                      onClick={() => {
                        dispatch(AuthLogout());
                        Swal.fire({
                          icon: "success",
                          text: "Logout Success!",
                        })
                        navigate("/", { replace: true });
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;