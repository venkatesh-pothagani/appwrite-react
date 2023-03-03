import { MouseEvent, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { v4 as uuid } from "uuid";

import { account, databases } from "../../appwrite/appwrite.config";

const TodoForm = () => {
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

    const handleTodo = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        databases
            .createDocument(
                import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
                import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID || "",
                uuid(),
                {
                    title: title,
                    description: description,
                }
            )
            .then((_response) => {
                navigate("/list-todo");
            })
            .catch((error) => {
                alert(error.message);
            });
    };

    return (
        <>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    ADD TODO PAGE
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
                    to="/profile"
                    className="mt-2 block w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Profile
                </Link>
            </div>

            <div className="col-span-6">
                <Link
                    to="/list-todo"
                    className="mt-2 block w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    List Todos
                </Link>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="col-span-6 ">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        autoComplete="on"
                        placeholder="Title"
                        onChange={(event) => {
                            setTitle(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-6">
                    <input
                        type="text"
                        name="description"
                        id="description"
                        autoComplete="on"
                        placeholder="Description"
                        onChange={(event) => {
                            setDescription(event.target.value);
                        }}
                        className="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>

                <div className="col-span-6">
                    <button
                        type="button"
                        className="mt-2 block w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleTodo}
                    >
                        Add Todo
                    </button>
                </div>
            </div>
        </>
    );
};

export default TodoForm;
