import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginClient, registerClient } from "../redux/slices/authSlice";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, isAuthenticated } = useSelector((state) => state.auth);

    const [isRegister, setIsRegister] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/profile");
        }
    }, [isAuthenticated, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isRegister) {
            dispatch(registerClient({ name, email, password }));
        } else {
            dispatch(loginClient({ email, password }));
        }
    };

    return (
        <div className="flex bg-gray-100 h-[500px]">

            {/* SOL %60 - VENDOR CTA */}
            <div className="w-[60%] flex items-center justify-center ">
                <div className="text-center max-w-md px-6">
                    <h2 className="text-2xl font-semibold mb-4">
                        Mağaza mı oluşturmak istiyorsunuz?
                    </h2>

                    <p className="text-gray-600 mb-6">
                        Kendi mağazanızı açarak müşterilere ulaşabilir,
                        hizmetlerinizi kolayca yönetebilirsiniz.
                    </p>

                    <button
                        className="bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition"
                        onClick={() => window.open("http://localhost:5174", "_blank")}

                    >
                        Hemen Başla
                    </button>
                </div>
            </div>

            {/* SAĞ %40 - CLIENT LOGIN */}
            <div className="w-[40%] flex items-center justify-center">
                <div className="w-[380px] bg-white rounded-2xl shadow-lg p-8">

                    <h2 className="text-xl font-bold text-center text-gray-800 mb-6">
                        {isRegister ? "Müşteri Kayıt" : "Müşteri Giriş"}
                    </h2>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

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
                            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition disabled:opacity-60"
                        >
                            {loading
                                ? isRegister
                                    ? "Kayıt Olunuyor..."
                                    : "Giriş Yapılıyor..."
                                : isRegister
                                    ? "Kayıt Ol"
                                    : "Giriş Yap"}
                        </button>

                        <span
                            onClick={() => setIsRegister(!isRegister)}
                            className="text-sm text-gray-600 cursor-pointer hover:text-blue-600 text-center"
                        >
                            {isRegister
                                ? "Zaten hesabın var mı? Giriş Yap"
                                : "Hesabın mı yok? Kayıt Ol"}
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;