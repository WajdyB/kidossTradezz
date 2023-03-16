import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Header from "../../Components/Header/Header";
import imge from "../../Asserts/Images/signin.png";
import Navbar from "../../Components/Navbar/Navbar.js";
import { height } from "@mui/system";
import React, { useEffect, useState } from "react";
import { CartState } from "../../context/Context";
import Navigator from "../../Components/Navigator/Navigator";
import Content from "../../Components/Content/Content";
import product_cart from "../../Components/data/product_data";
import Emptyview from "../../Components/EmptyView/Emptyview";
import Crousell from "../../Components/Crousell/Crousell";
import "./Discover.css";
import NavBareElement from "../../Sup Components/NavBareElement";
import Navbardiscover from "../../Components/Navbardiscover/Navbardiscover";

let theme = createTheme({
  mixins: {
    toolbar: {
      minHeight: 80,
    },
  },
});

const drawerWidth = 256;
/*--------------------------------------------------------*/
export default function Discover() {
  const [ages, setages] = useState([
    { id: 1, checked: false, label: "0-2" },
    { id: 2, checked: false, label: "2-4" },
    { id: 3, checked: false, label: "4-6" },
    { id: 4, checked: false, label: "+6" },
  ]);

  const [prices, setprices] = useState([
    { id: 1, checked: false, label: "0-5" },
    { id: 2, checked: false, label: "5-10" },
    { id: 3, checked: false, label: "10-15" },
    { id: 4, checked: false, label: "+15" },
  ]);

  /****************************************************/
  const [list, setList] = useState(product_cart);
  const [resultsFound, setResultsFound] = useState(true);
  /****************************************************/
  const handleChangeChecked = (id) => {
    const agesStateList = ages;
    const changeCheckedages = agesStateList.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setages(changeCheckedages);
  };
  const handleChangePrice = (id) => {
    const pricesStateList = prices;
    const changeCheckedprices = pricesStateList.map((itemm) =>
      itemm.id === id ? { ...itemm, checked: !itemm.checked } : itemm
    );
    setprices(changeCheckedprices);
  };

  /****************************************************/

  const agesChecked = ages
    .filter((item) => item.checked)
    .map((item) => {
      if (item.label !== "+6") {
        const [minAge, maxAge] = item.label.split("-");
        return {
          id: item.id,
          minAge: parseInt(minAge.trim()),
          maxAge: parseInt(maxAge.trim()),
        };
      } else if (item.label == "+6") {
        const minAge = parseInt(item.label.replace("+", "").trim());
        const maxAge = 999;
        return {
          minAge: minAge,
          maxAge: maxAge,
        };
      }
    });

  const pricesChecked = prices
    .filter((itemm) => itemm.checked)
    .map((itemm) => {
      if (itemm.label !== "+15") {
        const [minPrice, maxPrice] = itemm.label.split("-");
        return {
          id: itemm.id,
          minPrice: parseInt(minPrice.trim()),
          maxPrice: parseInt(maxPrice.trim()),
        };
      } else if (itemm.label == "+15") {
        const minPrice = parseInt(itemm.label.replace("+", "").trim());
        const maxPrice = 999;
        return {
          minPrice: minPrice,
          maxPrice: maxPrice,
        };
      }
    });

  /****************************************************/
  const applyFilters = () => {
    let updatedList = product_cart;

    if (agesChecked.length) {
      updatedList = updatedList.filter((item) => {
        const itemAge = item.age;
        const ageInRange = agesChecked.some(
          (age) => itemAge >= age.minAge && itemAge <= age.maxAge
        );
        return ageInRange;
      });
    } else if (pricesChecked.length) {
      updatedList = updatedList.filter((itemm) => {
        const itemmPrice = itemm.price;
        const priceInRange = pricesChecked.some(
          (price) =>
            itemmPrice >= price.minPrice && itemmPrice <= price.maxPrice
        );
        return priceInRange;
      });
    }

    setList(updatedList);
    !updatedList.length ? setResultsFound(false) : setResultsFound(true);
  };

  /****************************************************/

  useEffect(() => {
    applyFilters();
  }, [ages, prices]);

  /*--------------------------------------------------------*/
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    console.log(mobileOpen);
    setMobileOpen(!mobileOpen);
    console.log(mobileOpen);
  };
  return (
    <Box>
      <Box>
        <Navbardiscover />

        {/*<Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        >
          {(isSmUp || !mobileOpen) && (
            <Navigator
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ages={ages}
              changeChecked={handleChangeChecked}
              prices={prices}
              changePrice={handleChangePrice}
            />
          )}
          </Box>*/}
        <Box sx={{ display: "flex", justifyContent: "column" }}>
          <Navigator
            variant="temporary"
            ages={ages}
            changeChecked={handleChangeChecked}
            prices={prices}
            changePrice={handleChangePrice}
          />
          <Box
            className="red"
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
              backgroundColor: "white",
            }}
          >
            <div
              style={{
                overflow: "auto",
                display: "flex",
                marginTop: "20px",
                height: "270px",
                backgroundColor: "white",

                width: "164vh",
                alignItems: "center",
              }}
            >
              <Crousell />
            </div>

            <div
              style={{
                marginTop: "40px",
                overflow: "auto",
                display: "flex",
                minHeight: "80vh",
                backgroundColor: "white",
                borderRadius: "0px",
                width: "1300px",
              }}
            >
              {<Content list={list} />}
            </div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
