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
import { useState, useEffect } from "react";
import Avatar from "@mui/material/Avatar";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { BrowserRouter, NavLink, Route, Routes } from "react-router-dom";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
const drawerWidth = 240;

const Elements = [
  { Txt: <HomeOutlinedIcon />, href: "/" },
  { Txt: <ErrorOutlineOutlinedIcon />, href: "/aboutus" },
  { Txt: <SearchOutlinedIcon />, href: "/discover" },
];
{
  /*  { Txt: "My profil", href: "/myprofile" },
   */
}
function Navbarprofile(props) {
  const [navItems, setnavItems] = useState(Elements);
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
                backgroundColor: i === activeIndex ? "#2D033B" : "inherit",
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
      <Box
        component="nav"
        sx={{
          background: "#2D033B",
          width: "100%",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "Proxima Nova , Verdana , Avenir Next",
            //  backgroundColor: "red",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              // backgroundColor: "green",
            }}
          ></Box>

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
                fontFamily: "Proxima Nova , Verdana , Avenir Next",
              }}
            >
              {navItems.map((element, i) => (
                <Button
                  key={element.Txt}
                  sx={{
                    minWidth: "30px",
                    // backgroundColor: "red",
                    color: "#fdfdfe",
                    height: "30px",
                    // width: 4,
                    padding: "15px",
                    "&:hover": {
                      outline: "none",
                    },
                  }}
                >
                  <div>
                    <NavLink
                      to={element.href}
                      style={{
                        Width: "5px",
                        color: "inherit",
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
                textShadow:
                  "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
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
      </Box>

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
              backgroundColor: "#2D033B",
              color: "#F3ECB0",
              textShadow:
                "0px 0px 5px #b393d3, 0px 0px 10px #b393d3, 0px 0px 10px #b393d3, 0px 0px 20px #b393d3",
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

Navbarprofile.propTypes = {
  window: PropTypes.func,
};

export default Navbarprofile;
