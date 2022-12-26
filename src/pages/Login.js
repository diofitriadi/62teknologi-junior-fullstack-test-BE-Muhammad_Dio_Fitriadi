import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AuthLogin } from "../redux/action/Auth";
import Swal from "sweetalert2";

const Login = () => {
  const { loading, data, error, isLogin } = useSelector((state) => state.auth);

  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formLogin, setFormLogin] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(AuthLogin(formLogin));
  };
  // conditional loading, data & error
  useEffect(() => {
    if (loading === true) {
      setDisable(true);
    }
    if (isLogin === true) {
      Swal.fire({
        icon: "success",
        text: "Login Success!",
      });
      setDisable(false);
      navigate("/home", { replace: true });
    } else {
      navigate("/", { replace: true });
      setDisable(false);
    }
  }, [data, loading, error, isLogin, navigate]);
  return (
    <>
      <div>
        <div className="flex flex-row">
          <img
            className="hidden md:block w-4/5 h-[100vh]"
            src="/bg-kota-bandung.jpg"
            alt="login"
          />
          <div className="p-5 w-full">
            <form onSubmit={(e) => handleLogin(e)}>
              <div className="flex flex-col justify-center md:mx-20 lg:mx-32 mt-12">
                <h1 className="text-center text-3xl font-bold mb-8 text-[#112B3C]">
                  Login
                </h1>
                <div className="flex ">
                  <div className="w-full px-3 mt-10 mb-5">
                    <label htmlFor="" className="text-md font-semibold px-1">
                      Username :{" "}
                    </label>
                    <div className="flex mt-2">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="text"
                        className="text-md w-full -ml-10 pl-5 pr-3 py-4 rounded-lg border-2 border-gray-400 outline-none focus:border-[#112B3C]"
                        placeholder="Enter your Username"
                        required
                        onChange={(e) => {
                          setFormLogin((prevData) => ({
                            ...prevData,
                            username: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className="flex ">
                  <div className="w-full px-3 mb-5">
                    <label htmlFor="" className="text-md font-semibold px-1">
                      Password : {""}
                    </label>
                    <div className="flex mt-2">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className=" text-gray-400 text-lg"></i>
                      </div>
                      <input
                        type="password"
                        className="w-full -ml-10 pl-5 pr-3 py-4 rounded-lg border-2 border-gray-400 outline-none focus:border-[#112B3C]"
                        placeholder="Enter Your Password"
                        onChange={(e) => {
                          setFormLogin((prevData) => ({
                            ...prevData,
                            password: e.target.value,
                          }));
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  {error && (
                    <div className="text-sm text-red-900 px-5 -mt-2">
                      Username or Password is Wrong
                    </div>
                  )}
                </div>
                <div className="flex">
                  <div className="w-full px-3 mb-5 mt-5">
                    {disable ? (
                      <button
                        className="hover:bg-[#112B3C] bg-[#205375] border-[#112B3C] border-2 text-white hover:yellow-500 font-bold py-4 rounded-xl transition ease-out w-full opacity-50"
                        onSubmit={(e) => handleLogin(e)}
                      >
                        Sign In now
                      </button>
                    ) : (
                      <button
                        className="hover:bg-[#112B3C] bg-[#205375] border-[#112B3C] border-2 text-white hover:yellow-500 font-bold py-4 rounded-xl transition ease-out w-full"
                        onSubmit={(e) => handleLogin(e)}
                      >
                        Sign In now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;