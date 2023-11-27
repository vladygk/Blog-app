import React, { useContext, useState } from "react";
import styles from "./Navbar.module.scss";
import NavbarLink from "./NavbarLink";
import HomeTitle from "./HomeTitle";
import { IoHomeSharp } from "react-icons/io5";
import { FiLogIn } from "react-icons/fi";
import { TbLogin2 } from "react-icons/tb";
import { FaPaperPlane } from "react-icons/fa";
import { HiLogout } from "react-icons/hi";
import LocalStorageHadler from "../../utils/LocalStorage";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { IoPerson } from "react-icons/io5";

const Navbar: React.FC = () => {
 
  const {token,setToken} = useContext(AuthContext);

  const navigator = useNavigate();
  const onLogout = ()=>{
    LocalStorageHadler.removeFormStorage();
    setToken(LocalStorageHadler.getFromStorage());
    navigator('/');
  }


  return (
    <header>
      <nav className={styles.container}>
        <HomeTitle />
        <NavbarLink text="Home" url="/">
          <IoHomeSharp size={25} />
        </NavbarLink>
        <NavbarLink text="Posts" url="/posts">
          <FaPaperPlane size={25} />
        </NavbarLink>
        <NavbarLink text="Users" url="/users">
          <IoPerson size={25} />
        </NavbarLink>
        {!token &&
        <NavbarLink text="Login" url="/login">
          <FiLogIn size={25} />
        </NavbarLink>}
        {!token &&
        <NavbarLink text="Register" url="/register">
          <TbLogin2 size={25} />
        </NavbarLink>}
        {token &&
        <NavbarLink onClick={onLogout} url='/' text="Logout" >
          <HiLogout size={25} />
        </NavbarLink>}
      </nav>
    </header>
  );
};

export default Navbar;
