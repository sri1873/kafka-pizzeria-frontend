import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const roles = [
    { role: "customer", path: "home", icon: "ti-user", label: "Customer", desc: "Browse menu & place orders", bg: "bg-orange-200" },
    { role: "restaurant", path: "restaurant", icon: "ti-building-store", label: "Restaurant", desc: "Manage orders & menu", bg: "bg-pink-200" },
    { role: "rider", path: "rider", icon: "ti-motorbike", label: "Rider", desc: "View & deliver orders", bg: "bg-purple-200" },
];

export default function Login() {
    const navigate = useNavigate();
    useEffect(() => {
        localStorage.removeItem("role");
        localStorage.removeItem("userId");
    }, []);

    const login = (role, path) => {
        localStorage.setItem("role", role);
        if (role === "customer") {
            localStorage.setItem("userId", "123e4567-e89b-12d3-a456-426614174000");
        } else if (role === "restaurant") {
            localStorage.setItem("userId", "f3e1c2d4-5b6a-7c8d-9e0f-1a2b3c4d5e6f");
        }
        navigate(`/${path}`);
    };

    return (
        <div className="min-h-screen flex items-center justify-center  p-4 bg-[#ffe6a7ce]">
            <div className="bg-white border border-gray-100 rounded-2xl p-10 w-full max-w-sm text-center shadow-sm">

                <div className="w-16 h-16 rounded-full bg-orange-50 border border-orange-100
                        flex items-center justify-center text-3xl mx-auto mb-4">
                    <img src="favicon.ico" alt="Favicon" className="h-8 w-8" />
                </div>
                <h1 className="text-lg font-medium text-gray-900 mb-1">Pizza Kafka</h1>
                <p className="text-sm text-gray-400 mb-6">Choose how you're joining today</p>

                <div className="flex flex-col gap-3">
                    {roles.map(({ role, path, icon, label, desc, bg }) => (
                        <button
                            key={role}
                            onClick={() => login(role, path)}
                            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100
                         hover:bg-gray-50 hover:border-gray-200 transition-colors text-left cursor-pointer"
                        >
                            <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                                <i className={`ti ${icon} text-gray-600 text-lg`} aria-hidden="true" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800">{label}</p>
                                <p className="text-xs text-gray-400">{desc}</p>
                            </div>
                            <i className="ti ti-chevron-right text-gray-300 text-sm" aria-hidden="true" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}