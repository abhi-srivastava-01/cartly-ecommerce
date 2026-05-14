import FilterNavbar from "./FilterNavbar";
import Navbar from "./Navbar";

function Header() {
  return (
    <header className="sticky top-0 left-0 z-50 overflow-visible">
      <div className="flex flex-col">
        <Navbar />
        <FilterNavbar />
      </div>
    </header>
  );
}

export default Header;
