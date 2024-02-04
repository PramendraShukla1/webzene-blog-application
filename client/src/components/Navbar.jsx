import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { HiMenu, HiUser, HiOutlineLogout } from "react-icons/hi";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useContext } from "react";
import { UserContext } from "../UserContext";

const Navbar = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const {setUserInfo,userInfo} = useContext(UserContext)
  useEffect(() => {
    fetch("http://localhost:4000/profile", {
      credentials: "include",
    }).then((res) => {
      res.json().then((userInfo) => {
        setUserInfo(userInfo)
      });
    });
  }, []);

  const username = userInfo?.username

  const toggleMobileNav = () => {
    setMobileNavOpen(!mobileNavOpen);
  };
  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  const handleLogout = () => {
    fetch("http://localhost:4000/logout", {
      credentials: "include",
      method: "POST",
    });
    setUserInfo(null)
  };
  return (
    <>
      {/* component */}
      <div className=" font-sans w-ful m-0">
        <div className="bg-white shadow">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div>
                <img src={logo} alt="" className="h-16 w-auto" />
              </div>
              <div className="hidden sm:flex sm:items-center gap-10">
                <a
                  href="/"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                >
                  Home
                </a>
                <a
                  href="/"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                >
                  About us
                </a>
                <a
                  href="/"
                  className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4"
                >
                  Contact us
                </a>
              </div>
              {username && (
                <div className="hidden sm:flex sm:items-center">
                  <Menu
                    as="div"
                    className="mr-2 relative inline-block text-left"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {username}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "flex items-center align-middle gap-2 px-4 py-2 text-md w-full"
                                )}
                              >
                                <HiUser size={20} />
                                Profile
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "flex items-center align-middle gap-2 px-4 py-2 text-md w-full"
                                )}
                              >
                                {" "}
                                <HiOutlineLogout size={20} />
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Link to={"/create-new-blog"}>
                    <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 hover:cursor-pointer">
                      New Blog
                    </span>
                  </Link>
                </div>
              )}

              {!username && (
                <>
                  <div className="hidden sm:flex sm:items-center">
                    <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
                      <Link to={"/login"}>Sign in</Link>
                    </span>
                    <Link to={"/register"}>
                      <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 hover:cursor-pointer">
                        Sign up
                      </span>
                    </Link>
                  </div>
                </>
              )}

              <div className="sm:hidden cursor-pointer">
                <HiMenu onClick={toggleMobileNav} size={26} />
              </div>
            </div>

            {mobileNavOpen && (
              <div className="block sm:hidden bg-white border-t-2 py-2">
                <div className="flex flex-col gap-1">
                
                  <a
                    href="/"
                    className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                  >
                    Home
                  </a>
                  <a
                    href="/"
                    className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                  >
                    About us
                  </a>
                  <a
                    href="/"
                    className="text-gray-800 text-sm font-semibold hover:text-purple-600 mb-1"
                  >
                    Contact us
                  </a>

                  {username && (
                <div className="flex justify-between mt-5">
                  <Menu
                    as="div"
                    className="mr-2 relative inline-block text-center"
                  >
                    <div>
                      <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        {username}
                        <ChevronDownIcon
                          className="-mr-1 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </Menu.Button>
                    </div>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute left-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                          <Menu.Item>
                            {({ active }) => (
                              <a
                                href="#"
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "flex items-center align-middle gap-2 px-4 py-2 text-md w-full"
                                )}
                              >
                                <HiUser size={20} />
                                Profile
                              </a>
                            )}
                          </Menu.Item>

                          <Menu.Item>
                            {({ active }) => (
                              <button
                                onClick={handleLogout}
                                className={classNames(
                                  active
                                    ? "bg-gray-100 text-gray-900"
                                    : "text-gray-700",
                                  "flex items-center align-middle gap-2 px-4 py-2 text-md w-full"
                                )}
                              >
                                {" "}
                                <HiOutlineLogout size={20} />
                                Sign out
                              </button>
                            )}
                          </Menu.Item>
                        </div>
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  <Link to={"/create-new-blog"}>
                    <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 hover:cursor-pointer">
                      New Blog
                    </span>
                  </Link>
                </div>
              )}


                  {!username && (
                <>
                  <div className="hidden sm:flex sm:items-center">
                    <span className="text-gray-800 text-sm font-semibold hover:text-purple-600 mr-4">
                      <Link to={"/login"}>Sign in</Link>
                    </span>
                    <Link to={"/register"}>
                      <span className="text-gray-800 text-sm font-semibold border px-4 py-2 rounded-lg hover:text-purple-600 hover:border-purple-600 hover:cursor-pointer">
                        Sign up
                      </span>
                    </Link>
                  </div>
                </>
              )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
