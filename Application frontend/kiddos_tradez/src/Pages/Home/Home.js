import React, { useEffect } from "react";
import backgroundImage from "../../Asserts/Logos/glassy.png";

import "./Home.css";
import toys from "../../Asserts/Logos/toys.png";

import Product_cart from "../../Components/data/Product_cart";

import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Content from "../../Components/Content/Content";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
import axios from "axios";
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
const Home = () => {
  console.log("Hello world ", Product_cart);
  const [list, setList] = useState(Product_cart);
  console.log("******** list here ", list);

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
  }, []);
  return (
    <div>
      <Box>
        <Box
          style={{
            backgroundImage: `url(${backgroundImage})`,
            //backdropFilter: "blur(8.5px)",
            backgroundSize: "cover",
            height: "100%",
            width: "100%",
            display: "flex",
            justifycontent: "column",
          }}
        >
          <Box
            sx={{
              height: "700px",
              width: "100%",
              //backgroundColor: "green",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "80px",
            }}
          >
            <Grid2 className="descriptiongrid" xs>
              <motion.div
                animate={{ y: "-5vh " }}
                transition={{ duration: 1.5 }}
              >
                <h2
                  style={{
                    fontFamily: "Arial Black",
                    color: "white",
                    padding: "0px",
                    textAlign: "left",
                    marginLeft: "0px",
                  }}
                >
                  Looking for a hassle-free way to buy, sell, or exchange toys?
                </h2>
                <h3 style={{ color: "#413171" }}>
                  Look no further than Kiddos Tradez!
                </h3>
                <p
                  style={{
                    fontFamily: "Arial ",
                    lineHeight: 1.5,
                    fontSize: "15px",
                    color: "white",
                  }}
                >
                  With Kiddos Tradez, you can easily browse through a vast
                  selection <br />
                  of pre-loved toys, sell or trade your own gently-used items,
                  <br /> and connect with a community of like-minded families
                  who
                  <br />
                  share your passion for play
                  <br />
                  <p
                    style={{
                      fontFamily: "Arial ",
                      lineHeight: 1.5,
                      fontSize: "15px",
                      color: "white",
                    }}
                  >
                    <div style={{ color: "#EFD656" }}>So why wait?</div>
                    Sign up for Kiddos Tradez today <br />
                    and discovera whole new world of toy buying, selling, <br />{" "}
                    and swapping possibilities!
                  </p>
                </p>
              </motion.div>
            </Grid2>
          </Box>
          <div
            className="photobox"
            style={{
              height: "700px",

              alignContent: "center",
              padding: "90px",
              //backgroundColor: "blue",
            }}
          >
            <Grid2
              item
              xs={11}
              sx={{
                // backgroundColor: "green",
                display: "flex",
                justifyContent: "center",
                padding: "20px",
                height: "450px",
              }}
            >
              <motion.div
                animate={{ y: "-5vh " }}
                transition={{ duration: 1.5 }}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <img
                  className="img"
                  src={toys}
                  style={{
                    position: "relative",
                  }}
                />
              </motion.div>
            </Grid2>
          </div>
        </Box>

        <Box
          style={{
            position: "relative",
          }}
        >
          <motion.div animate={{ y: "-5vh " }} transition={{ duration: 1.5 }}>
            <Box
              style={{
                position: "relative",
                top: "-20px",
                left: "50%",
                transform: "translateX(-50%)",
                borderRadius: "50px",
                backgroundColor: "white",
                width: "70%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                FfexDirection: "row",
                zIndex: "2",
              }}
            >
              {<Content list={list} />}
            </Box>
          </motion.div>
        </Box>
        <Footer />
      </Box>
    </div>
  );
};

export default Home;
