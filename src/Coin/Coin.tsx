import React from "react";
import { motion } from "framer-motion";
import { Box } from "@mui/material";

interface CoinProps {
  top: number; // Vertical position of the coin
  left: number; // Horizontal position of the coin
  isFalling: boolean; // Flag indicating if the coin is falling
}

const Coin: React.FC<CoinProps> = ({ top, left, isFalling }) => {
  return (
    <motion.div
      initial={{ y: isFalling ? top : -50 }} // Start at the current top position or above
      animate={{ y: isFalling ? top + 500 : top }} // Animate the coin falling
      transition={{
        duration: 1, // Animation duration - 1 second
      }}
      style={{ position: "absolute", left: `${left}px` }} // Set coin position
    >
      <Box
        sx={{
          fontSize: "2rem", // Coin size
          pointerEvents: "none", // Disable mouse interaction
          width: "50px", // Coin width
          height: "50px", // Coin height
          borderRadius: "50%", // Round shape
          background: "radial-gradient(circle, #ffeb3b 40%, #fbc02d 60%)", // Golden gradient
          border: "2px solid #fbc02d", // Border for depth
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)", // 3D effect shadow
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#ffeb3b", // Golden color for the dollar sign
          fontWeight: "bold",
          textShadow: "1px 1px 2px rgba(0, 0, 0, 0.3)", // Text shadow for the dollar sign
        }}
      >
        $
      </Box>
    </motion.div>
  );
};

export default Coin;
