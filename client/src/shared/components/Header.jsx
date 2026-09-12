import { useState } from "react";
import FilterNavbar from "../../features/product/components/FilterNavbar";
import Navbar from "./Navbar";

function Header() {
  const [activeCategory, setActiveCategory] = useState("all");

  return (
    <header className="sticky top-0 left-0 z-50 overflow-visible">
      <div className="flex flex-col">
        <Navbar />
        <FilterNavbar
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </header>
  );
}

export default Header;
