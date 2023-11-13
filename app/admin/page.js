"use client"
import { useAuth } from "@/context/auth"

export default function AdminPage() {

    const {auth} = useAuth()

    return (
        <>
        {auth?.token && auth?.user?.role === "Admin" ? (
            <div className="container">
            <h2>Admin Page</h2>
        </div>
        ) : (
            <p className="d-flex justify-content-center align-items-center vh-100 text-danger">
                Access denied
            </p>
        )}
        </>

    )
}