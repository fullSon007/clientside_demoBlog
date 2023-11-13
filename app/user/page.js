"use client"
import { useAuth } from "@/context/auth"

export default function UserPage() {

    const {auth} = useAuth()


    return (
        <>
        {auth?.token && auth?.user ? (
            <div className="container">
            <h2>User Page</h2>
            <pre>{JSON.stringify(auth, null, 4)}</pre>
        </div>
        ) : (
            <p className="d-flex justify-content-center align-items-center vh-100 text-danger">
                Access denied
            </p>
        )}
        </>

    )
}