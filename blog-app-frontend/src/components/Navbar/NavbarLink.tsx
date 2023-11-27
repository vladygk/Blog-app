import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarLink.module.scss";

interface NavbarLinkProps {
  text: string;
  url: string;
  children: React.ReactNode;
  onClick?:(e:any)=>void;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ text, url, children,onClick }) => {
  return (
    <>
      <Link onClick={onClick? onClick : ()=>{}} className={styles.link} to={url}>
        {text}
        {children}
      </Link>
    </>
  );
};

export default NavbarLink;
