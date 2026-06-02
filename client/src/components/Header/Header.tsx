import React from "react";
import "./Header.scss";
import { NavLink } from "react-router-dom";

function Header(){
    return (
        <header className="header">
            <NavLink to="/" className="header-logo">Work</NavLink>

            <div className="links">
                <NavLink  className={({isActive}) => `links__link ${isActive ? "active" : ""}`} to="/listing">Справочник</NavLink>
                <NavLink  className={({isActive}) => `links__link ${isActive ? "active" : ""}`} to="/reference-form">Добавить запись в справочник</NavLink>
                <NavLink  className={({isActive}) => `links__link ${isActive ? "active" : ""}`} to="/work-type-form">Добавить тип работ</NavLink>
            </div>
        </header>
    )
}

export default Header;