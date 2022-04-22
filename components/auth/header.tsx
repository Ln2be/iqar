import Link from "next/link";
import { useUser } from "../../lib/auth/hooks";

const Header = () => {
  const user = useUser();

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>Home</a>
            </Link>
          </li>
          {user ? (
            <>
              {user.role == "user" && (
                <>
                  <li>
                    <Link href="/auth/profile">
                      <a>User Profile</a>
                    </Link>
                  </li>{" "}
                </>
              )}

              {user.role == "admin" && (
                <li>
                  <Link href="/auth/profile">
                    <a>Admin Profile</a>
                  </Link>
                </li>
              )}

              <li>
                <a href="/api/auth/logout">Logout</a>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/auth/login?space=user">
                  <a>User</a>
                </Link>
              </li>
              <li>
                <Link href="/auth/login?space=admin">
                  <a>Admin</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
      <style jsx>{`
        nav {
          max-width: 42rem;
          margin: 0 auto;
          padding: 0.2rem 1.25rem;
        }
        ul {
          display: flex;
          list-style: none;
          margin-left: 0;
          padding-left: 0;
        }
        li {
          margin-right: 1rem;
        }
        li:first-child {
          margin-left: auto;
        }
        a {
          color: #fff;
          text-decoration: none;
        }
        header {
          color: #fff;
          background-color: #333;
        }
      `}</style>
    </header>
  );
};

export default Header;
