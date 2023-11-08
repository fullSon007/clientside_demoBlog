"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
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