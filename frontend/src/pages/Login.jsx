import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import { loginUser, registerUser } from "../redux/slices/authSlice";


const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    const [role, setRole] = useState("client");
    const [isRegister, setIsRegister] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            if (role === "vendor") {
                // Vendor paneli ayrı bir projedeyse, tam URL’ye yönlendir
                window.location.href = "http://localhost:5174/add";
            } else {
                navigate("/"); // Normal kullanıcı
            }
        }
    }, [isAuthenticated, role, navigate]);


    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegister) {
            dispatch(registerUser({ name, email, password, role }));
        } else {
            dispatch(loginUser({ email, password, role }));
        }
    };

    return (
        <div className="flex justify-center items-center flex-1 bg-gray-100">
            <div className="w-[380px] bg-white rounded-2xl shadow-lg overflow-hidden">

                {/* Tabs */}
                <div className="flex border-b">
                    <button
                        onClick={() => setRole("client")}
                        className={`flex-1 py-3 font-semibold transition
              ${role === "client"
                                ? "text-blue-600 border-b-4 border-blue-600"
                                : "text-gray-400 hover:text-blue-600"
                            }`}
                    >
                        Müşteri
                    </button>

                    <button
                        onClick={() => setRole("vendor")}
                        className={`flex-1 py-3 font-semibold transition
              ${role === "vendor"
                                ? "text-blue-600 border-b-4 border-blue-600"
                                : "text-gray-400 hover:text-blue-600"
                            }`}
                    >
                        Satıcı
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-8 flex flex-col gap-4">
                    <h2 className="text-xl font-bold text-center text-gray-800">
                        {isRegister ? "Kayıt Ol" : "Giriş Yap"}
                    </h2>

                    {/* Register only */}
                    {isRegister && (
                        <input
                            type="text"
                            placeholder="Ad Soyad"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                            required
                        />
                    )}

                    <input
                        type="email"
                        placeholder="E-posta"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <input
                        type="password"
                        placeholder="Şifre"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 outline-none"
                        required
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
                    >
                        {loading
                            ? isRegister
                                ? "Kayıt Olunuyor..."
                                : "Giriş Yapılıyor..."
                            : isRegister
                                ? "Kayıt Ol"
                                : "Giriş Yap"}
                    </button>

                    {/* Footer Links */}
                    <div className="flex justify-between text-sm mt-3">
                        <span
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-gray-600 cursor-pointer hover:text-blue-600"
                        >
                            {isRegister
                                ? "Zaten hesabın var mı? Giriş Yap"
                                : "Hesabın mı yok? Kayıt Ol"}
                        </span>

                        {!isRegister && (
                            <span className="text-gray-600 cursor-pointer hover:text-blue-600">
                                Şifremi mi unuttum?
                            </span>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
