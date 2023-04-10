import * as React from "react";
import Singleproduct from "../Singleproduct/Singleproduct";
import "./Content.css";
import { motion } from "framer-motion";
const Content = ({ list }) => {
  console.log(list);
  return (
    <motion.div layout className="productContainer">
      {list?.map((item) => {
        return <Singleproduct item={item} key={item.id} />;
      })}
    </motion.div>
  );
};

export default Content;
