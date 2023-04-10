import React from "react";
import backgroundImage from "../../Asserts/Logos/glassy.png";

import toys from "../../Asserts/Logos/toys.png";
import Title from "../../Components/title/Tiitle";
import Product_cart from "../../Components/data/Product_cart";
import Descriptionabus from "../../Components/Descriptionabus/Descriptionabus";
import { Box } from "@mui/material";
import { motion } from "framer-motion";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Content from "../../Components/Content/Content";
import Footer from "../../Components/Footer/Footer";
import { useState } from "react";
const Aboutus = () => {
  const [list, setList] = useState(Product_cart);

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
            justifycontent: "center",
          }}
        >
          <div
            className="photobox"
            style={{
              height: "700px",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "50px",
            }}
          >
            <Title />
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
              <Descriptionabus />
            </Box>
          </motion.div>
        </Box>

        <Footer />
      </Box>

      {/** <Descriptionabus />*/}
    </div>
  );
};

export default Aboutus;
