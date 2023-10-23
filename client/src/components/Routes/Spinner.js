import PropagateLoader from "react-spinners/PropagateLoader";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Spinner = ({path="login"}) => {
    const [count, setCount] = useState(3);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue);
        }, 1000);
        count === 0 && navigate(`/${path}`, {
            state: location.pathname
        })
        return () => {
            clearInterval(interval);
        }
    }, [count, navigate, location,path]);

    return (
        <div className="loader" style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh"

        }}>
            <h1 className="Text-center">Redirecting to you in {count} second</h1>
            <PropagateLoader color="black"
                loading
                size={18}
                speedMultiplier={1}
            />
        </div>

    );
}

export default Spinner;   