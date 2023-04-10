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
import Product_cart from "../../Components/data/Product_cart";
import Emptyview from "../../Components/EmptyView/Emptyview";
import Crousell from "../../Components/Crousell/Crousell";
import "./Discover.css";
import NavBareElement from "../../Sup Components/NavBareElement";
import Navbardiscover from "../../Components/Navbardiscover/Navbardiscover";
import axios from "axios";

import { motion } from "framer-motion";
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
  const [list, setList] = useState([]);
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
    let updatedList = Product_cart;

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
    axios
      .get("http://localhost:2023/api/annonces/getAll", { headers })
      .then((res) => {
        if (res && res.data) {
          console.log("res////////////////", res);
          setList(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
    applyFilters();
  }, [ages, prices]);
  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  console.log("Hello world ", Product_cart);
  console.log("******** list here ", list);

  /*--------------------------------------------------------*/
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  const handleDrawerToggle = () => {
    console.log(mobileOpen);
    setMobileOpen(!mobileOpen);
    console.log(mobileOpen);
  };
  return (
    <div
      sx={{
        display: "flex",
        justifyContent: "row",
        backgroundColor: "red",
      }}
    >
      <Navbardiscover />
      <div
        style={{
          //backgroundColor: "#E8E8E8",
          display: "flex",
          justifyItems: "column",
          width: "100%",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            display: "inline-block",
            position: "sticky",
            top: 0,
            height: "100%",
          }}
        >
          <Navigator
            variant="temporary"
            ages={ages}
            changeChecked={handleChangeChecked}
            prices={prices}
            changePrice={handleChangePrice}
          />
        </div>

        <div
          style={{
            // backgroundColor: "green",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            //alignItems: "center",
            // height: "500px",
          }}
        >
          <div
            style={{
              //  backgroundColor: "orange",
              display: "inline-block",
            }}
          >
            <motion.div
              style={{
                marginTop: "40px",
                overflow: "auto",
                display: "flex",
                minHeight: "80vh",
                backgroundColor: "white",
                borderRadius: "0px",
              }}
            >
              {<Content list={list} />}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
