import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginVendor, registerVendor } from "../redux/slices/authSlice";


const Login = () => {

    const [isLogin, setIsLogin] = useState(true);
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLogin) {
            dispatch(loginVendor({ email, password }));
        } else {
            dispatch(registerVendor({ name, email, password }));
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/add");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="w-full max-w-sm bg-white p-8 rounded-lg shadow-md">

                <h2 className="text-2xl font-semibold text-center mb-6">
                    {isLogin ? "Vendor Giriş" : "Vendor Kayıt"}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">

                    {/* Name sadece register'da */}
                    {!isLogin && (
                        <div>
                            <label className="block text-sm mb-1">Ad</label>
                            <input
                                type="text"
                                placeholder="Adınız"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-sm mb-1">Email</label>
                        <input
                            type="email"
                            placeholder="ornek@mail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm mb-1">Şifre</label>
                        <input
                            type="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className={`w-full py-2 rounded-md transition text-white
                            ${loading
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-black hover:bg-gray-800"
                            }`}
                    >
                        {loading
                            ? isLogin
                                ? "Giriş Yapılıyor..."
                                : "Hesap Oluşturuluyor..."
                            : isLogin
                                ? "Giriş Yap"
                                : "Hesap Oluştur"}
                    </button>

                </form>

                <div className="mt-4 text-center text-sm">
                    {isLogin ? (
                        <>
                            Hesabın yok mu?{" "}
                            <button
                                onClick={() => setIsLogin(false)}
                                className="text-black font-medium hover:underline"
                            >
                                Hesap oluştur
                            </button>
                        </>
                    ) : (
                        <>
                            Zaten hesabın var mı?{" "}
                            <button
                                onClick={() => setIsLogin(true)}
                                className="text-black font-medium hover:underline"
                            >
                                Giriş yap
                            </button>
                        </>
                    )}
                </div>

            </div>
        </div>
    );
};

export default Login;