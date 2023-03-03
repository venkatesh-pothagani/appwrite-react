import { MouseEvent, useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Models } from "appwrite";

import { account, databases } from "../../appwrite/appwrite.config";

const TodoList = () => {
    const navigate = useNavigate();

    const [todos, setTodos] = useState<Models.Document[]>([]);

    const [reload, setReload] = useState<boolean>(true);

    useEffect(() => {
        databases
            .listDocuments(
                import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
                import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID || ""
            )
            .then((result: Models.DocumentList<Models.Document>) => {
                setTodos(result.documents);
            })
            .catch((error) => {
                alert(error.message);
            });
    }, [reload]);

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

    const handleDelete = (id: string) => {
        return async (event: MouseEvent<HTMLDivElement>) => {
            event.preventDefault();

            const status = confirm(`Are you sure you want to delete`);
            if (status === true)
                databases
                    .deleteDocument(
                        import.meta.env.VITE_APPWRITE_DATABASE_ID || "",
                        import.meta.env.VITE_APPWRITE_TODO_COLLECTION_ID || "",
                        id
                    )
                    .then((_response) => {
                        setReload(!reload);
                    })
                    .catch((error) => {
                        alert(error.message);
                    });
        };
    };

    return (
        <>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    TODO LIST PAGE
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
                    to="/add-todo"
                    className="mt-2 block w-full text-gray-900 bg-gradient-to-r from-lime-200 via-lime-400 to-lime-500 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-lime-300 dark:focus:ring-lime-800 shadow-lg shadow-lime-500/50 dark:shadow-lg dark:shadow-lime-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                >
                    Add Todo
                </Link>
            </div>

            {todos.map((todo) => {
                return (
                    <div className="col-span-6 my-3" key={todo.$id} onClick={handleDelete(todo.$id)}>
                        <Link
                            to="#"
                            className="block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
                        >
                            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {todo.title}
                            </h5>
                            <p className="font-normal text-gray-700 dark:text-gray-400">{todo.description}</p>
                        </Link>
                    </div>
                );
            })}
        </>
    );
};

export default TodoList;
