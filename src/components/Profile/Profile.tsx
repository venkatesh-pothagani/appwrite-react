import { MouseEvent } from "react";
import { useNavigate, Link } from "react-router-dom";

import { account } from "../../appwrite/appwrite.config";

const Profile = () => {
    const navigate = useNavigate();

    const handleLogout = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        account
            .deleteSession("current")
            .then((_response) => {
                navigate("/");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    PROFILE PAGE
                </span>
            </div>
            <div className="col-span-6">
                <button
                    type="button"
                    className="mt-2 block w-full text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    onClick={handleLogout}
                >
                    Log Out
                </button>
            </div>

            <div className="col-span-6">
                <Link
                    to="/list-todo"
                    className="mt-2 block w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    List Todos
                </Link>
            </div>

            <div className="col-span-6">
                <Link
                    to="/add-todo"
                    className="mt-2 block w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Add Todo
                </Link>
            </div>
        </>
    );
};

export default Profile;
