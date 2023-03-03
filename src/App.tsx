import { Routes, Route } from "react-router-dom";

import "./App.css";

import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import Profile from "./components/Profile/Profile";
import TodoForm from "./components/TodoForm/TodoForm";
import TodoList from "./components/TodoList/TodoList";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<SignIn />} />

                <Route path="/sign-in" element={<SignIn />} />
                <Route path="/sign-up" element={<SignUp />} />

                <Route path="/profile" element={<Profile />} />

                <Route path="/add-todo" element={<TodoForm />} />
                <Route path="/list-todo" element={<TodoList />} />
            </Routes>
        </div>
    );
}

export default App;
