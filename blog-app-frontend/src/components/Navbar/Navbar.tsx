import React from "react";
import styles from "./Navbar.module.scss";
import NavbarLink from "./NavbarLink";
import HomeTitle from "./HomeTitle";
import { IoHomeSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { TbLogin2 } from "react-icons/tb";

const Navbar: React.FC = () => {
  return (
    <header>
      <nav className={styles.container}>
        <HomeTitle />
        <NavbarLink text="Home" url="/">
          <IoHomeSharp size={25} />
        </NavbarLink>
        <NavbarLink text="Login" url="/login">
          <FiLogIn size={25} />
        </NavbarLink>
        <NavbarLink text="Register" url="/register">
          <TbLogin2 size={25} />
        </NavbarLink>
      </nav>
    </header>
  );
};

export default Navbar;
