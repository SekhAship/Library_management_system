import { NavLink } from "react-router-dom";
import { FaBars, FaHome, FaLock, FaUser } from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { BiAnalyse, BiCog } from "react-icons/bi";
import { BsCartCheck } from "react-icons/bs";
import { useState, useEffect, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import MyContext from "../../context/myContext";

// Shared settings route
const settingsRoute = {
  path: "/settings",
  name: "Settings",
  icon: <BiCog />,
  subRoutes: [
    {
      path: "/settings/profile",
      name: "Profile",
      icon: <FaUser />,
    },
    {
      path: "/settings/logout",
      name: "Logout",
      icon: <FaLock />,
    },
  ],
};

// Role-based route definitions
const roleBasedRoutes = {
  admin: [
    { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/addTeacher", name: "Add Teacher", icon: <MdMessage /> },
    { path: "/addBook", name: "Add Book", icon: <MdMessage /> },
    { path: "/studentList", name: "Student List", icon: <FaUser /> },
    { path: "/teacherList", name: "Teacher List", icon: <FaUser /> },
    { path: "/analytics", name: "Analytics", icon: <BsCartCheck /> },
    settingsRoute,
  ],
  librarian: [
    { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/addBook", name: "Add Book", icon: <MdMessage /> },
    { path: "/studentList", name: "Student List", icon: <FaUser /> },
    { path: "/issueBook", name: "Issue Book", icon: <BiAnalyse /> },
    { path: "/returnBook", name: "Return Book", icon: <BiAnalyse /> },
    { path: "/analytics", name: "Analytics", icon: <BsCartCheck /> },
    settingsRoute,
  ],
  user: [
    { path: "/dashboard", name: "Dashboard", icon: <FaHome /> },
    { path: "/studentActivity", name: "Student Activity", icon: <BsCartCheck /> },
    settingsRoute,
  ],
};

const SideBar = ({ children }) => {
  const { isAuthenticated } = useContext(MyContext);
  const [user, setUser] = useState({ role: "" });
  const [isOpen, setIsOpen] = useState(false);

  // Dynamically update user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, [isAuthenticated]);

  const routes = roleBasedRoutes[user.role] || [];

  const toggle = () => setIsOpen(!isOpen);

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: { duration: 0.5 },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: { duration: 0.5 },
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
          className="sidebar"
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
            {routes.map((route, index) =>
              route.subRoutes ? (
                <SidebarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              ) : (
                <NavLink
                  to={route.path}
                  key={index}
                  className={({ isActive }) => (isActive ? "link active" : "link")}
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
              )
            )}
          </section>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
