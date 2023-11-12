"use client";
import { useState, useEffect} from "react";
import axios from "axios";
import toast from "react-hot-toast";
// require('dotenv').config()

import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth";

export default function RegisterPage() {
    // context
    const {setAuth} = useAuth();

    // state
    const [name, setName] = useState("SOnn");
    const [email, setEmail] = useState("adjasd@gmail.com");
    const [password, setPassword] = useState("dddddd");
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const { data } = await axios.post(
                `${process.env.NEXT_PUBLIC_API}`,
                {
                    name,
                    email,
                    password,
                }
            );
            // console.log("register => ", data);
            localStorage.setItem("auth", JSON.stringify(data));
            setAuth(data);
            setLoading(false);
            toast.success('Register success. Please login.')
            router.push('/')
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
                    <h2 className="mb-3">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                            className="form-control mb-3"
                        />

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
                            disabled={loading || !name || !email || !password} >
                            {loading ? "Loading..." : "Submit"}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}