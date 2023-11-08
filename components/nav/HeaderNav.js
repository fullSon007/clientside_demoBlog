import Link  from "next/link";

export default function HeaderNav() {
    return (
        <nav className="nav d-flex justify-content-between p-2 shadow mb-2">
            <Link className="nav-link" href="/">
                Home
            </Link>
            <Link className="nav-link" href="/login">
                Login
            </Link>
            <Link className="nav-link" href="/register">
                Register
            </Link>
        </nav>
    )
}