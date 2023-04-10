import React from "react";
import "./Navprofile.css";
import { useState } from "react";
import logo from "../../Asserts/Logos/kiddostardez.png";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { Button, SvgIcon } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import LogoutIcon from "@mui/icons-material/Logout";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Addproduct from "../Addproduct/Addproduct";

const NavProfile = () => {
  const [isExpanded, setExpendState] = useState(false);
  const handlelogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("lastname");
    localStorage.removeItem("password");
    localStorage.removeItem("avgResponseTime");
    localStorage.removeItem("firstname");
    localStorage.removeItem("description");
    localStorage.removeItem("homeAddress");
    localStorage.removeItem("email");
    localStorage.removeItem("phone");
    localStorage.removeItem("token");
    localStorage.removeItem("id");
    window.location.reload();
    window.location.href = "/";
  };
  const [open, setOpen] = React.useState(false);

  const handleaddproduct = () => {
    console.log("im here ");
    setOpen(true);
  };
  const handlefavoris = () => {};
  function handleStateChange(newState) {
    setOpen(false);
    console.log("newState-----------", newState);
    console.log("newStateopen-----------", open);
  }
  return (
    <div
      className={
        isExpanded
          ? "side-nav-container"
          : "side-nav-container side-nav-container-NX"
      }
    >
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img
                src={logo}
                alt="Logo"
                style={{
                  height: "70px",
                  width: "120px",
                  margin: "30px",
                }}
              />
            </div>
          )}
          <button
            className={
              isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
            }
            onClick={() => {
              setExpendState(!isExpanded);
            }}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          <Button
            className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            onClick={handleaddproduct}
            sx={{
              color: "white",
              display: "grid",
              backgroundColor: "#ffffff00",
              textDecorationLine: "none",
              color: "var(--light)",
              height: "45px",
              display: "flex",
              textTransform: "uppercase",
              borderRadius: "10px",
              margin: "20px",
              padding: "10px",
              justifyContent: "flex-start",
              // boxShadow: "0 1px 1px rgba(31,28,135,0.37)",
            }}
          >
            <Box
              sx={{
                display: "flex",

                marginLeft: "10px",
              }}
            >
              <SvgIcon
                component={LibraryAddIcon}
                sx={{ marginRight: "15px", marginTop: "10px" }}
                inheritViewBox
              />

              {isExpanded && <p style={{ marginTop: "10px" }}>Add Product</p>}
            </Box>
          </Button>

          <Button
            sx={{
              color: "white",
              display: "grid",
              backgroundColor: "#ffffff00",
              textDecorationLine: "none",
              color: "var(--light)",
              height: "45px",
              display: "flex",
              textTransform: "uppercase",
              borderRadius: "10px",
              margin: "20px",
              padding: "10px",
              justifyContent: "flex-start",
              // boxShadow: "0 1px 1px rgba(31,28,135,0.37)",
            }}
            className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            onClick={handlefavoris}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "column",

                marginLeft: "10px",
              }}
            >
              <SvgIcon
                component={FavoriteBorderIcon}
                inheritViewBox
                sx={{ marginRight: "15px", marginTop: "10px" }}
              />

              {isExpanded && <p style={{ marginTop: "10px" }}>Favoris</p>}
            </Box>
          </Button>

          <Button
            className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
            onClick={handlelogout}
            sx={{
              color: "white",
              display: "grid",
              backgroundColor: "#ffffff00",
              // boxShadow: "0 1px 1px rgba(31,28,135,0.37)",

              textDecorationLine: "none",
              color: "var(--light)",
              height: "45px",
              display: "flex",
              textTransform: "uppercase",
              borderRadius: "10px",
              margin: "20px",
              padding: "10px",
              justifyContent: "center",
              justifyContent: "flex-start",
            }}
          >
            <Box
              sx={{
                display: "flex",
                marginLeft: "10px",
              }}
            >
              <SvgIcon
                component={LogoutIcon}
                inheritViewBox
                sx={{
                  marginRight: "15px",
                  marginTop: "10px",
                }}
              />
              {isExpanded && <p style={{ marginTop: "10px" }}>Log Out</p>}
            </Box>
          </Button>
        </div>
      </div>
      <div className="nav-footer">
        {isExpanded && (
          <div className="nav-details">
            <img
              className="nav-footer-avatar"
              src="icons/admin-avatar.svg"
              alt=""
              srcset=""
            />
          </div>
        )}
        <img
          className="logout-icon"
          src="icons/logout.svg"
          alt=""
          srcset=""
          style={{ zIndex: 2 }}
        />
      </div>
      <Addproduct openn={open} onStateChange={handleStateChange} />
    </div>
  );
};

export default NavProfile;
