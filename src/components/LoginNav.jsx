import { NavLink } from "react-router-dom";
import createStore from "../store/state";
import { useState, useRef } from "react";

export default function LoginNav({ setNavActive }) {
  const { user } = createStore((state) => state);

  const screenWidth = window.innerWidth;

  const navClickWhenMobile = () => {
    if (screenWidth < 1024) setNavActive(true);
  };

  return (
    <aside className="siderNavbar">
      <ul className="menu-s">
        <li>
          <NavLink
            className="menuLink"
            to="/dashboard/home"
            onClick={navClickWhenMobile}
          >
            Dashboard
          </NavLink>
        </li>
        {user?.usertype === "admin" && (
          <>
            <li>
              <NavLink
                to="/dashboard/blog-list"
                className="menuLink"
                onClick={navClickWhenMobile}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/member-list"
                className="menuLink"
                onClick={navClickWhenMobile}
              >
                Members
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/vacancy-list"
                className="menuLink"
                onClick={navClickWhenMobile}
              >
                Vacancy
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/gallery-list"
                className="menuLink"
                onClick={navClickWhenMobile}
              >
                Photo Gallery
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/dashboard/popup-list"
                className="menuLink"
                onClick={navClickWhenMobile}
              >
                Popup
              </NavLink>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
