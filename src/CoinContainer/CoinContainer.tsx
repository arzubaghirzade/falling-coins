import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Coin from "../Coin/Coin";

interface Coin {
  id: number;
  top: number;
  left: number;
  isFalling: boolean;
}

const CoinContainer: React.FC = () => {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [isFilling, setIsFilling] = useState(false);
  const [isFull, setIsFull] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const coinHeight = 50;
  const coinWidth = 50;
  const maxRows = 10;
  const maxColumns = 8;
  const maxCoins = maxRows * maxColumns;

  const getNextPosition = () => {
    const left = Math.floor(Math.random() * maxColumns) * coinWidth;
    const top =
      (maxRows - Math.floor(coins.length / maxColumns) - 1) * coinHeight;
    return { top, left };
  };

  const addCoin = () => {
    if (coins.length < maxCoins && !isFull) {
      const { top, left } = getNextPosition();

      setCoins((prevCoins) => [
        ...prevCoins,
        { id: Date.now() + prevCoins.length, top, left, isFalling: false },
      ]);

      if (coins.length + 1 === maxCoins) {
        setIsFull(true);
      }
    }
  };

  const startGame = () => {
    setCoins([]);
    setIsFilling(true);
    setIsFull(false);
    setGameStarted(true);
  };

  useEffect(() => {
    let addInterval: NodeJS.Timeout;

    if (isFilling && coins.length < maxCoins && !isFull) {
      addInterval = setInterval(() => {
        addCoin();
      }, 100);
    }

    return () => clearInterval(addInterval);
  }, [isFilling, coins.length, isFull]);

  const makeCoinsFallChaotically = () => {
    coins.forEach((coin) => {
      const randomDelay = Math.random() * 1000;

      setTimeout(() => {
        setCoins((prevCoins) =>
          prevCoins.map((prevCoin) =>
            prevCoin.id === coin.id
              ? { ...prevCoin, isFalling: true }
              : prevCoin
          )
        );
      }, randomDelay);
    });
  };

  useEffect(() => {
    if (isFull) {
      setTimeout(() => {
        makeCoinsFallChaotically();

        setTimeout(() => {
          setGameStarted(false);
          setIsFilling(false);
        }, 6000);
      }, 4000);
    }
  }, [isFull]);

  useEffect(() => {
    if (coins.some((coin) => coin.isFalling)) {
      const timeout = setTimeout(() => {
        setCoins((prevCoins) => prevCoins.slice(1));
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [coins]);

  return (
    <Box
      onClick={!gameStarted ? startGame : undefined}
      sx={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        backgroundColor: "#f1acf2",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 2,
          fontFamily: "'Press Start 2P', cursive",
          color: "#ff6fae",
        }}
      >
        Coins Fall
      </Typography>

      <Box
        sx={{
          position: "relative",
          width: `${maxColumns * coinWidth}px`,
          height: `${maxRows * coinHeight}px`,
          backgroundColor: "#4d57f0",
          border: "7px solid #fff200",
          borderRadius: "15px",
          overflow: "hidden",
        }}
      >
        {coins.map((coin) => (
          <Coin
            key={coin.id}
            top={coin.top}
            left={coin.left}
            isFalling={coin.isFalling}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CoinContainer;
