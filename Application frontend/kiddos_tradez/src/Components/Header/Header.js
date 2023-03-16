import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import "./Header.css";
import Navbar from "../Navbar/Navbar";
import Content from "../Content/Content";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import { Box } from "@mui/system";

function Header(props) {
  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    backgroundColor: "white",
    borderRadius: "50px",
    width: "70vh",
    height: "40px",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(3)})`,
      transition: theme.transitions.create("width"),
    },
  }));

  const { onDrawerToggle } = props;
  const buildindlist = [
    "Blocks",
    "Magnetic tiles",
    "Marble runs",
    "Construction sets",
  ];

  return (
    <AppBar
      sx={{
        backgroundColor: "#2D033B",
      }}
      position="relative"
      elevation={0}
    >
      <div
        style={{
          display: "flex",
          justifyContent: " center",
          height: "40px",
        }}
      >
        <Search>
          <SearchIcon sx={{ color: "gray" }} />

          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </div>
      <Toolbar>
        <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
          <IconButton
            color="purple"
            aria-label="open drawer"
            onClick={onDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </IconButton>
        </Grid>

        <Grid container sx={{ display: "flex", flexDirection: "column" }}>
          <Grid
            item
            sx={{
              marginLeft: "8vh",
              marginRight: "4vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Navbar />
          </Grid>
        </Grid>

        <Grid></Grid>
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  onDrawerToggle: PropTypes.func.isRequired,
};

export default Header;
