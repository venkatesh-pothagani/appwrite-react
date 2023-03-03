import { useState, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { account } from "../../appwrite/appwrite.config";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        account
            .createEmailSession(email, password)
            .then((_response) => {
                navigate("/profile");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    SIGN IN PAGE
                </span>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="col-span-6">
                    <input
                        type="text"
                        name="email-address"
                        id="email-address"
                        autoComplete="email"
                        placeholder="Email Address"
                        onChange={(event) => {
                            setEmail(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-6">
                    <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        autoComplete="new-password"
                        placeholder="Password"
                        onChange={(event) => {
                            setPassword(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-6">
                    <button
                        type="button"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleSubmit}
                    >
                        Sign In
                    </button>
                </div>
                <div className="col-span-6">
                    <Link
                        to="/sign-up"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignIn;
