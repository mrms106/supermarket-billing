import { useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

export default function EmpLogin() {
    const navigate = useNavigate();
    const [empId, setEmpId] = useState("");

    const onFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:8080/api/employee/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include", // For handling cookies or sessions
                body: JSON.stringify({
                    empId: empId,
                    password: empId, // Using empId as the password
                }),
            });

            if (response.ok) {
                alert("Hey Welcome Again, Have a Good Day!");
                navigate("/sell"); // Navigate to a dashboard or home page
            } else if (response.status === 401) {
                alert("Invalid credentials. Please check your ID.");
            } else {
                alert("Something went wrong. Please try again later.");
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert("An error occurred. Please try again.");
        }
    };

    return (
        <div className="loginform">
            <h2>Login As Employee</h2>
            <form onSubmit={onFormSubmit}>
                <input
                    placeholder="Enter Your Employee ID"
                    name="empId"
                    type="text"
                    required
                    onChange={(e) => setEmpId(e.target.value)}
                />
                <button>Start Sales</button>
            </form>
        </div>
    );
}
