"use client";
import { useState} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function LoginPage() {
    // context
    const {setAuth} = useAuth();

    // state
    const [email, setEmail] = useState("adjasd@gmail.com");
    const [password, setPassword] = useState("dddddd");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}/login`,
                {
                    email,
                    password,
                }
            );
            // console.log("register => ", data);
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth(data);
            setLoading(false);
            toast.success('Login success.')
            router.push(data?.user?.role === "Admin" ? "/admin" : "/user")
        }
        catch (err){
            console.log(err)
            setLoading(false)
            toast.error(err.response.data.error);
        }
    }
    return (
        <div className="container">
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="row">
                    <h2 className="mb-3">Login</h2>
                    <form onSubmit={handleSubmit}>

                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="form-control mb-3"
                        />

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="form-control mb-3"
                        />

                        <button className="btn btn-primary"
                            disabled={loading || !email || !password} >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}