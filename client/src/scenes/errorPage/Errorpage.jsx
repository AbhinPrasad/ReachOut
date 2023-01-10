import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { purple } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";
import WidgetWrapper from "../../components/WidgetWrapper";

const primary = purple[900]; // #f44336

const Errorpage = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: primary,
      }}
    >
      <WidgetWrapper
        sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            minHeight: "20vh",
          
          }}
      >
        <Typography  variant="h1" style={{ color: "white" }}>
          404
        </Typography>
        <Button
          onClick={() => {
            navigate("/home");
          }}
        >
          HOME
        </Button>
      </WidgetWrapper>
    </Box>
  );
};

export default Errorpage;
