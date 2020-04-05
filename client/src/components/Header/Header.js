import React from "react";
import styles from "./Header.module.css";

function Header({ handleLogoClick }) {
  return (
    <>
      <div className={styles.header}>
        <div className={styles.header__logo}>
          <img
            onClick={handleLogoClick}
            src="./images/logo.png"
            alt="logo"
          ></img>
        </div>
        <div className={styles.keyImage}>
          <img src="./images/key-image.png" alt="breakfast" />
        </div>
      </div>
    </>
  );
}

export default Header;
