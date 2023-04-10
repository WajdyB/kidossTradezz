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
import logo from "../Asserts/Logos/kiddostardez.png";
import { useState, useEffect } from "react";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
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

function NavBareElement(props) {
  const [navItems, setnavItems] = useState(Elements);
  const [navItems2, setnavItems2] = useState(Elements2);

  const [activeIndex, setActiveIndex] = useState(0);

  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleListItemClick = (index) => {
    setActiveIndex(index);
  };

  /*button de la liste*/
  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <List>
        {navItems.map((element, i) => (
          <ListItem key={i} disablePadding>
            <ListItemButton
              sx={{
                textAlign: "center",
                fontfamily: "Ink Free",
                backgroundColor: i === activeIndex ? "#BA55D3" : "inherit",
              }}
              onClick={() => handleListItemClick(i)}
            >
              <ListItemText primary={element.Txt} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        component="nav"
        sx={{
          backgroundColor: "rgba(255, 255, 255, 0)",
          boxShadow: "none",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Proxima Nova , Verdana , Avenir Next",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "90px", margin: "10px", flexGrow: 1 }}
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
                        fontSize: "13px",
                        fontFamily: "Proxima Nova, Verdana, Avenir Next",
                        //  textShadow:
                        //  "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
                      }}
                    >
                      <div>
                        <NavLink
                          to={element.href}
                          style={{
                            color: "inherit",
                            textDecoration: "none",
                            fontFamily: "Proxima Nova, Verdana, Avenir Next",
                            padding: "10px",
                          }}
                        >
                          {element.Txt}
                        </NavLink>
                      </div>
                    </Button>
                  ))}
            </Box>

            <Box
              sx={{
                display: { sm: "none" },
                "& .MuiIconButton-root": {
                  color: "#9A0680",
                  fontFamily: "Proxima Nova , Verdana , Avenir Next",
                },
                // textShadow:
                // "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
              }}
            >
              <IconButton
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>

      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              backgroundColor: "white",
              color: "#F3ECB0",
              //  textShadow:
              //  "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

NavBareElement.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

export default NavBareElement;
