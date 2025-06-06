import { useState } from "react";
import "./HamburguerMenu.css"; // Arquivo CSS separado

const HamburguerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`hamburger-menu ${isOpen ? "open" : ""}`} onClick={handleClick}>
            <div className="line line1"></div>
            <div className="line line2"></div>
            <div className="line line3"></div>
        </div>
    );
};

export default HamburguerMenu;
