import React, { useState, useEffect } from "react";
import axios from "axios";

{
  /*const Product_cart = () => {
  const [productList, setProductList] = useState([]);

  const token = localStorage.getItem("token");
  const headers = {
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    axios
      .get("http://localhost:2023/api/annonces/getAll", { headers })
      .then((res) => {
        if (res && res.data) {
          console.log("res////////////////", res);
          setProductList(res.data);
        }
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, []);
  console.log("list********", productList);
  return <div>{productList}</div>;
};

export default Product_cart;*/
}
const Product_cart = [
  {
    id_annonce: 9,
    name: "Lego Set",
    picture: "www.facebook.com/picture/1568947",
    price: "25 dt",
    state: "New",
    ageChild: "4ans",
    ageToy: " 1mois",
    category: "Building Blocks",
    description: "Contains 100 pieces",
    estArchive: false,
    favorites: [],
  },
];
export default Product_cart;
