import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">
        MovieFinder
      </Link>

      <nav>
        <Link className="nav-link" to="/">
          Home
        </Link>
      </nav>
    </header>
  );
}

export default Header;