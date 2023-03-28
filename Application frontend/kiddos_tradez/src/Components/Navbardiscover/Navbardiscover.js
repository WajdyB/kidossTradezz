import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import logo from "../../Asserts/Logos/kiddostardez.png";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import Header from "../Header/Header";
import { useState } from "react";

const drawerWidth = 240;
const Elements = [
  { Txt: " Home", href: "/" },
  { Txt: " About Us ", href: "/aboutus" },
  { Txt: "Discover", href: "/discover" },
  { Txt: "My account", href: "/myaccount" },
];
const Elements2 = [
  { Txt: " Home", href: "/" },
  { Txt: " About Us ", href: "/aboutus" },
  { Txt: "Discover", href: "/discover" },
  { Txt: "My Profile", href: "/myprofile" },
];

function Navbardiscover(props) {
  const [navItems, setnavItems] = useState(Elements);
  const [activeIndex, setActiveIndex] = useState(0);
  const [navItems2, setnavItems2] = useState(Elements2);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <div style={{ backgroundColor: "#2D033B", width: "100%" }}>
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Proxima Nova , Verdana , Avenir Next",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "100px", margin: "10px", flexGrow: 1 }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              fontFamily: "Proxima Nova , Verdana , Avenir Next",
            }}
          >
            <Box
              sx={{
                display: { xs: "none", sm: "block" },
                fontFamily: "Proxima Nova, Verdana, Avenir Next",
              }}
            >
              {localStorage.getItem("username") &&
              localStorage.getItem("password")
                ? navItems2.map((element, i) => (
                    <Button
                      key={element.Txt}
                      sx={{
                        color: "#fdfdfe",
                        fontSize: "15px",
                        fontFamily: "Proxima Nova, Verdana, Avenir Next",
                        textShadow:
                          "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
                      }}
                    >
                      <div>
                        <NavLink
                          to={element.href}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            fontFamily: "Proxima Nova, Verdana, Avenir Next",
                          }}
                        >
                          {element.Txt}
                        </NavLink>
                      </div>
                    </Button>
                  ))
                : navItems.map((element, i) => (
                    <Button
                      key={element.Txt}
                      sx={{
                        color: "#fdfdfe",
                        fontSize: "15px",
                        fontFamily: "Proxima Nova, Verdana, Avenir Next",
                        textShadow:
                          "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
                      }}
                    >
                      <div>
                        <NavLink
                          to={element.href}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            fontFamily: "Proxima Nova, Verdana, Avenir Next",
                          }}
                        >
                          {element.Txt}
                        </NavLink>
                      </div>
                    </Button>
                  ))}
            </Box>
          </Box>
        </Toolbar>
        <Header onDrawerToggle={handleDrawerToggle} />
      </div>
    </Box>
  );
}

Navbardiscover.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default Navbardiscover;
