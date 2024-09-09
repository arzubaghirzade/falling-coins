import React from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

interface CoinProps {
  top: number;
  left: number;
  isFalling: boolean;
}

const Coin: React.FC<CoinProps> = ({ top, left, isFalling }) => {
  return (
    <motion.div
      initial={{ y: isFalling ? top : -50 }}
      animate={{ y: isFalling ? top + 500 : top }}
      transition={{
        duration: 1,
      }}
      style={{ position: "absolute", left: `${left}px` }}
    >
      <Box
        sx={{
          fontSize: {
            xs: "1rem",
            sm: "1.5rem",
            md: "2rem",
          },
          pointerEvents: "none",
          width: {
            xs: "25px",
            sm: "35px",
            md: "50px",
          },
          height: {
            xs: "25px",
            sm: "35px",
            md: "50px",
          },
          borderRadius: "50%",
          background: "radial-gradient(circle, #ffeb3b 40%, #fbc02d 60%)",
          border: "2px solid #fbc02d",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffeb3b",
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)",
        }}
      >
        $
      </Box>
    </motion.div>
  );
};

export default Coin;
