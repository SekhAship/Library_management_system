import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaMoneyBill, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiSearch } from "react-icons/bi";
import { BiCog } from "react-icons/bi";
import { AiFillHeart, AiTwotoneFileExclamation } from "react-icons/ai";
import { BsCartCheck } from "react-icons/bs";
import { useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import myContext from "../../context/myContext";



// const { user } = useContext(myContext);
const user = JSON.parse(localStorage.getItem('user')) || { role: "" };

const routes = [
  {
    path: "/dashboard",
    name: "Book List",
    icon: <FaHome />,
  },

  ...(user.role === "admin"
    ? [
      {
        path: "/addTeacher",
        name: "Add Teacher",
        icon: <MdMessage />,
      },
    ]
    : []),


  ...(user.role === "librarian"
    ? [
      {
        path: "/addBook",
        name: "Add Book",
        icon: <MdMessage />,
      },
    ]
    : []),

  {
    path: "/studentList",
    name: "Student List",
    icon: <FaUser />,

  },
  /////
  ...(user.role === "admin"
    ? [
      {
        path: "/teacherList",
        name: "Teacher List",
        icon: <FaUser />,
      },
    ]
    : []),



  ...(user.role === "librarian"
    ? [
      {
        path: "/issueBook",
        name: "Issue Book",
        icon: <BiAnalyse />,
      },
    ]
    : []),
  ...(user.role === "librarian"
    ? [
      {
        path: "/returnBook",
        name: "Return Book",
        icon: <BiAnalyse />,
      },
    ]
    : []),


  ...(user.role === "librarian"
    ? [
      {
        path: "/analytics",
        name: "Student Analytics",
        icon: <BsCartCheck />,
      },
    ]
    : []),
  ...(user.role === "user"
    ? [
      {
        path: "/studentActivity",
        name: "Student Activity",
        icon: <BsCartCheck />,
      },
    ]
    : []),
  //studentActivity
  {
    path: "/settings",
    name: "Settings",
    icon: <BiCog />,
    exact: true,
    subRoutes: [
      {
        path: "/settings/profile",
        name: "Profile ",
        icon: <FaUser />,
      },
      {
        path: "/settings/logout",
        name: "Logout",
        icon: <FaLock />,
      },
    ],
  },
  ...(user.role != "user"
    ? [
      {
        path: "/analytics",
        name: "Saved",
        icon: <AiFillHeart />,
      },
    ]
    : []),
  
];

const SideBar = ({ children }) => {
  console.log()
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const inputAnimation = {
    hidden: {
      width: 0,
      padding: 0,
      transition: {
        duration: 0.2,
      },
    },
    show: {
      width: "140px",
      padding: "5px 15px",
      transition: {
        duration: 0.2,
      },
    },
  };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "45px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar `}
        >
          <div className="top_section">
            <AnimatePresence>
              {isOpen && (
                <motion.h1
                  variants={showAnimation}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  className="logo"
                >
                  Dashboard
                </motion.h1>
              )}
            </AnimatePresence>

            <div className="bars">
              <FaBars onClick={toggle} />
            </div>
          </div>

          <section className="routes">
            {routes.map((route, index) => {
              if (route.subRoutes) {
                return (
                  <SidebarMenu
                    key={index}
                    setIsOpen={setIsOpen}
                    route={route}
                    showAnimation={showAnimation}
                    isOpen={isOpen}
                  />
                );
              }

              return (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive }) => (isActive ? "link active" : "link")} // ✅ Fixed
                >
                  <div className="icon">{route.icon}</div>
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        variants={showAnimation}
                        initial="hidden"
                        animate="show"
                        exit="hidden"
                        className="link_text"
                      >
                        {route.name}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </NavLink>
              );
            })}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;