import * as React from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { CartState } from "../../context/Context";
import CheckedboxProton from "../CheckedboxProton/CheckedboxProton";
import { Box } from "@mui/material";
import CheckedboxProtonp from "../CheckedboxProtonp/CheckedboxProtonp";

const Navigator = ({ ages, changeChecked, prices, changePrice }) => {
  const [open, setOpen] = React.useState(true);
  const [openn, setOpenn] = React.useState(true);
  const [opennn, setOpennn] = React.useState(true);
  const {
    state: { toys },
  } = CartState();

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClickk = () => {
    setOpenn(!openn);
  };
  const handleClickkk = () => {
    setOpennn(!opennn);
  };

  return (
    <Box sx={{ width: "250px", backgroundColor: "white", height: "75vh" }}>
      <List component="div" sx={{ backgroundColor: "white", width: "250px" }}>
        <div>
          <ListItemButton onClick={handleClickk} sx={{ px: 3, py: 1 }}>
            <ListItemText primary="Age" sx={{ color: "#4B0082" }} />
            {openn ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>

          <Collapse in={openn} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {ages.map((age) => (
                <CheckedboxProton
                  key={age.id}
                  age={age}
                  changeChecked={changeChecked}
                />
              ))}
            </List>
          </Collapse>
        </div>
        <div>
          <ListItemButton onClick={handleClickkk} sx={{ px: 3, py: 1 }}>
            <ListItemText primary="Price" sx={{ color: "#4B0082" }} />
            {opennn ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={opennn} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {prices.map((price) => (
                <CheckedboxProtonp
                  key={price.id}
                  price={price}
                  changePrice={changePrice}
                />
              ))}
            </List>
          </Collapse>
        </div>
      </List>
    </Box>
  );
};
export default Navigator;
