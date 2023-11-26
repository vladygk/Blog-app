import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavbarLink.module.scss";

interface NavbarLinkProps {
  text: string;
  url: string;
  children: React.ReactNode;
}

const NavbarLink: React.FC<NavbarLinkProps> = ({ text, url, children }) => {
  return (
    <>
      <Link className={styles.link} to={url}>
        {text}
        {children}
      </Link>
    </>
  );
};

export default NavbarLink;
