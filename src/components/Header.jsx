import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="header">
      <div className="logo">MovieFinder</div>

      <Link className="nav-link" to="/">
        Home
      </Link>
    </header>
  );
}

export default Header;