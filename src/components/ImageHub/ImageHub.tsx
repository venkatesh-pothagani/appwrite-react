import { useState, MouseEvent, useEffect } from "react";
import { Link } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Models } from "appwrite";

import { storage } from "../../appwrite/appwrite.config";

const ImageHub = () => {
    const [file, setFile] = useState<File>();
    const [fileList, setFileList] = useState<Models.File[]>([]);
    const [reload, setReload] = useState<boolean>(false);

    const handleImageUpload = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        if (file)
            storage.createFile(import.meta.env.VITE_APPWRITE_STORAGE_ID || "", uuid(), file).then((result) => {
                console.log(result);
                alert("Image Uploaded");
                setReload(!reload);
            });
        else alert("Failed to Upload Image");
    };

    useEffect(() => {
        storage
            .listFiles(import.meta.env.VITE_APPWRITE_STORAGE_ID || "")
            .then((result) => {
                setFileList(result.files);
            })
            .catch((error) => {
                alert("Failed to List Files \n" + error.message);
            });
    });

    return (
        <div>
            <div className="flex py-4 justify-around">
                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                    IMAGE HUB PAGE
                </span>
            </div>

            <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="col-span-6">
                    <Link
                        to="/profile"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                    >
                        Profile
                    </Link>
                </div>

                <div className="mt-2 flex justify-center rounded-md border-2 border-dashed dark:text-white border-gray-300 px-6 pt-5 pb-6">
                    <div className="space-y-1 text-center">
                        <svg
                            className="mx-auto h-12 w-12 text-gray-400"
                            stroke="currentColor"
                            fill="none"
                            viewBox="0 0 48 48"
                            aria-hidden="true"
                        >
                            <path
                                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                            <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer rounded-md bg-white font-medium text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                            >
                                <span className="dark:text-white">Upload a file</span>
                                <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                    onChange={(event) => {
                                        if (event.target.files) setFile(event.target.files[0]);
                                    }}
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                </div>

                <div className="col-span-6">
                    <button
                        type="button"
                        className="mt-2 block w-full text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                        onClick={handleImageUpload}
                    >
                        Upload Image
                    </button>
                </div>
            </div>

            <div className="p-6 my-5 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                {(() => {
                    if (fileList.length > 0) {
                        return fileList.map((file) => {
                            return (
                                <img
                                    key={file.$id}
                                    className="h-50 mb-6 transition-all duration-300 rounded-lg blur-sm hover:blur-none"
                                    src={storage
                                        .getFilePreview(import.meta.env.VITE_APPWRITE_STORAGE_ID || "", file.$id)
                                        .toString()}
                                    alt={file.name}
                                />
                            );
                        });
                    } else {
                        return (
                            <div className="flex justify-center">
                                <p className="text-xs text-gray-500">No images uploaded</p>
                            </div>
                        );
                    }
                })()}
            </div>
        </div>
    );
};

export default ImageHub;
