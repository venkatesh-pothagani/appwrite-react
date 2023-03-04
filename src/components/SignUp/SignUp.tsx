import { useState, MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { account } from "../../appwrite/appwrite.config";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        account
            .create(uuid(), email, password, fullName)
            .then((_response) => {
                navigate("/profile");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    const handleGitHubSignupClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        account.createOAuth2Session("github", "http://localhost:5173/sign-in", "http://localhost:5173/sign-up");
    };

    return (
        <>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    SIGN UP PAGE
                </span>
            </div>
            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="col-span-6">
                    <input
                        type="text"
                        name="full-name"
                        id="full-name"
                        autoComplete="name"
                        placeholder="Full Name"
                        onChange={(event) => {
                            setFullName(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

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
                    <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        autoComplete="new-password"
                        placeholder="Confirm Password"
                        onChange={(event) => {
                            setConfirmPassword(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-6">
                    <button
                        type="button"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleSubmit}
                    >
                        Sign Up
                    </button>
                </div>

                <div className="col-span-6 ">
                    <button
                        type="button"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleGitHubSignupClick}
                    >
                        Sign up with Github
                    </button>
                </div>

                <div className="col-span-6">
                    <Link
                        to="/sign-in"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Sign In
                    </Link>
                </div>
            </div>
        </>
    );
};

export default SignUp;
