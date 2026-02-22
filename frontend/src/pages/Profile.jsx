import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClientData } from "../redux/slices/userSlice.js";

const Profile = () => {
    const dispatch = useDispatch();

    const { user, loading, error } = useSelector((state) => state.user);

    console.log(user)

    useEffect(() => {
        console.log("dispatch çalıştı");
        dispatch(fetchClientData());
    }, [dispatch]);

    return (
        <div>
            <h1>Profile Page</h1>

            {loading && <p>Loading...</p>}

            {error && <p>Error: {error}</p>}

            {user && <h2>Welcome, {user.name}</h2>}
        </div>
    );
};

export default Profile;