import React from "react";
import Carousel from "react-elastic-carousel";
import { Paper, Button, Box } from "@mui/material";
import Product_cart from "../../Components/data/Product_cart";
import { useEffect, useState } from "react";
import Content from "../Content/Content";
import Singleproduct from "../Singleproduct/Singleproduct";
const Crousell = () => {
  const [list, setList] = useState(Product_cart);

  return (
    <Carousel sx={{ backgroundcolor: "#E5B8F4" }}>
      {list.map((item) => {
        return <Singleproduct item={item} key={item.id} />;
      })}
    </Carousel>
  );
};

export default Crousell;
