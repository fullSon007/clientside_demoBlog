"use client"
import Link from "next/link";
import { useAuth } from "@/context/auth";
import { useRouter } from "next/navigation";

export default function HeaderNav() {
    const { auth, setAuth } = useAuth();
    const router = useRouter();

    const logout = () => {
        setAuth(null);
        localStorage.removeItem("auth");
        router.push("/login");
    };

    return (
        <nav className="nav d-flex justify-content-between p-2 shadow mb-2">
            <Link className="nav-link" href="/">
                Home
            </Link>
            {auth?.token ? (
                <>
                    <Link className="nav-link" href={`${auth?.user?.role === "Admin" ? "/admin" : "/user"}`}>
                        Dashboard
                    </Link>
                    <Link className="nav-link" href={"/maps"}>
                        Map
                    </Link>

                    <a onClick={logout} className="nav-link" style={{cursor: "pointer"}} href="/login">Logout</a>
                </>
            ) : (
                <>
                    <Link className="nav-link" href="/login">
                        Login
                    </Link>
                    <Link className="nav-link" href="/register">
                        Register
                    </Link>
                </>
            )}
        </nav>
    )
}