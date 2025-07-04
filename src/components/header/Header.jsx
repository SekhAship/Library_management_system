import React, { useContext } from "react";
import myContext from "../../context/myContext";

// const context=useContext(myContext);
// const name=context;
// console.log(name)

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Library Management System{name}</h1>
    </header>
  );
};

const styles = {
  header: {
    background: "rgb(0, 7, 61)",
    color: "#fff",
    padding: "15px 20px",
    textAlign: "center",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
  },
  title: {
    margin: 0,
    fontSize: "24px",
    fontWeight: "bold",
  },
};

export default Header;
