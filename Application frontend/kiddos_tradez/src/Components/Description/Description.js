import useWindowDimensions from "../../hooks/useWindowDimension";
import Typewriter from "typewriter-effect";
import "./Description.css";
import React from "react";
import Box from "@mui/material/Box";

function Description() {
  const { height } = useWindowDimensions();
  let navHeight = height / 4;

  return (
    <Box
      style={{
        marginTop: "0",

        backgroundColor: "#46065c",
        display: "flex",
        justifyContent: "center" /* align items horizontally */,
        alignItems: "center",
      }}
    >
      <Box>
        <Box
          style={{
            disply: "flex",
            alignItems: "center",

            width: "40vh",
            height: "45vh",
          }}
        >
          <h5>Looking for a hassle-free way to buy, sell, or exchange toys?</h5>

          <h5>Look no further than Kiddos Tradez!</h5>
        </Box>
      </Box>
      <Box sx={{ backgroundColor: "pink", width: "100px" }}></Box>
      <Box
        style={{
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Box
          style={{
            disply: "flex",
            alignItems: "center",

            width: "60vh",
            height: "45vh",
          }}
        >
          <h5>Look no further than Kiddos Tradez!</h5>

          <p>
            <p>
              With Kiddos Tradez, you can easily browse through a vast selection
              of pre-loved toys, sell or trade your own gently-used items, and
              connect with a community of like-minded families who share your
              passion for play
              <br />
              <b className="bold">
                So why wait? Sign up for Kiddos Tradez today and discover a
                whole new world of toy buying, selling, and swapping
                possibilities!
              </b>
            </p>
          </p>
        </Box>
      </Box>
    </Box>
  );
}

export default Description;
