import React, { createContext, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import AllRouter from "./components/AllRouter";
import { getData } from "./untils/api";
import { FaBullseye } from "react-icons/fa";
const MyContext = createContext();
export default function App() {
  const [isLogin, setIsLogin] = React.useState(false);
  const [userData, setUserData] = React.useState(null);
  const [catData, setCatData] = React.useState([]);
  const [roleData, setRoleData] = React.useState([]);
  useEffect(() => {
    const fetch = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        setIsLogin(true);
        try {
          const resUser = await getData(`/api/userAdmin/user-detail`);
          if (resUser.success) {
            setUserData(resUser.data);
          }
          const resCat = await getData("/api/category/");
          if (resCat.success) {
            setCatData(resCat.data);
          }
          const resRole = await getData("/api/role/");
          if (resRole) {
            setRoleData(resRole.data);
          }
        } catch (error) {
          console.log("Lỗi khi fetch user: ", error);
          setIsLogin(false);
        }
      }
    };
    fetch();
  }, [isLogin]);
  const openAlertBox = (value, msg) => {
    if (value == "success") {
      toast.success(msg, { duration: 3000, dismissible: true });
    } else {
      toast.error(msg, { duration: 3000, dismissible: true });
    }
  };
  const value = {
    openAlertBox,
    isLogin,
    setIsLogin,
    userData,
    setUserData,
    catData,
    setCatData,
    roleData,
    setRoleData,
  };
  return (
    <>
      <MyContext.Provider value={value}>
        <AllRouter />
      </MyContext.Provider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            borderRadius: "8px",
            background: "#333",
            color: "#fff",
          },
        }}
      />
    </>
  );
}
export { MyContext };
