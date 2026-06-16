import { useNavigate } from "react-router-dom";

export default function Login() {
    const navigate = useNavigate();

    const login = (role) => {
        localStorage.setItem("role", role);
        localStorage.setItem("userId", '123e4567-e89b-12d3-a456-426614174000'); // Example userId
        navigate(`/${role}`);
    }

    return (
        <div className="flex gap-4 p-8">
            <button onClick={() => login("customer")}
                className="bg-blue-500 text-white px-4 py-2 rounded">
                Login as Customer
            </button>
            <button onClick={() => login("restaurant")}
                className="bg-yellow-500 text-white px-4 py-2 rounded">
                Login as Restaurant
            </button>
            <button onClick={() => login("rider")}
                className="bg-green-500 text-white px-4 py-2 rounded">
                Login as Rider
            </button>
        </div>
    )
}