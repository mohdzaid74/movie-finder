import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <Link className="logo" to="/">
        MovieFinder
      </Link>

      <nav className="nav-menu">
        <Link className="nav-link" to="/">
          Home
        </Link>

        <Link className="nav-link" to="/favorites">
          ❤️ Favorites
        </Link>
      </nav>
    </header>
  );
}

export default Header;