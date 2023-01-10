import { useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import AdminNavbar from "../../components/Admin/AdminNavbar";
import AdminPostReportList from "../../components/Admin/AdminPostReportList";
import AdminSidebar from "../../components/AdminSidebar/AdminSidebar";

const AdminPostReport = () => {
  
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  return (
    <Box>
   
     
          <AdminNavbar />
          <Box
            width="100%"
            padding="2rem 6%"
            display={isNonMobileScreens ? "flex" : "block"}
            gap="0.5rem"
            justifyContent="space-between"
          >
            <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
              {/* <UserWidget userId={_id} picturePath={picturePath} /> */}
              <AdminSidebar />
            </Box>
            <Box
              flexBasis={isNonMobileScreens ? "42%" : undefined}
              mt={isNonMobileScreens ? undefined : "2rem"}
            >
              <AdminPostReportList/>
            </Box>
            {isNonMobileScreens && (
              <Box flexBasis="26%">
                {/* <AdvertWidget /> */}
                <Box m="2rem 0" />
                {/* <FriendListWidget userId={_id} /> */}
              </Box>
            )}
          </Box>
      
    </Box>
  );
};

export default AdminPostReport;
