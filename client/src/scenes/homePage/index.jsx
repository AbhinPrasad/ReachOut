import { Box, useMediaQuery } from "@mui/material";
import React, { Component } from "react";
import { useSelector } from "react-redux";
import Navbar from "../navbar";
import AdvertWidget from "../widgets/AdvertWidget";
import FriendListWidget from "../widgets/FriendListWidget";
import MyPostWidget from "../widgets/MyPostWidget";
import PostsWidget from "../widgets/PostsWidget";
import UserWidget from "../widgets/UserWidget";

const HomePage = () => {
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const { _id, picturePath } = useSelector((state) => state.user);
  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="0.5rem"
        justifyContent="space-between"
      >
        <Box
          sx={{ position: "sticky", top: "5" }}
          flexBasis={isNonMobileScreens ? "26%" : undefined}
        >
          <UserWidget userId={_id} picturePath={picturePath} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          <MyPostWidget picturePath={picturePath} />
          <PostsWidget userId={_id} />
        </Box>
        {isNonMobileScreens && (
          <Box flexBasis="26%" m="2rem 0" sx={{ position: "sticky", top: "5" }}>
         
           
            <FriendListWidget userId={_id} />
               {/* <AdvertWidget /> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
