import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
} from "@mui/icons-material";
import { Button, IconButton, Typography, useTheme } from "@mui/material";
import React from "react";

import FlexBetween from "../FlexBetween";
import WidgetWrapper from "../WidgetWrapper";

const SinglePostView = ({ singlePost, setLoading }) => {
  const theme = useTheme();
  const primaryLight = theme.palette.primary.light;

  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;
  const likeCount = Object.keys(singlePost.likes).length;
  return (
    <WidgetWrapper m="2rem 0">
      <Typography color={main} sx={{ mt: "1rem" }}>
        {singlePost.description}
      </Typography>
      {singlePost.picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:5000/assets/${singlePost.picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton>
              <FavoriteBorderOutlined sx={{ color: primary }} />
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>

          <FlexBetween gap="0.3rem">
            <Typography
              onClick={() => setLoading(true)}
              sx={{
                "&:hover": {
                  color: primaryLight,
                  cursor: "pointer",
                },
              }}
            >
              Back
            </Typography>
          </FlexBetween>
        </FlexBetween>
      </FlexBetween>
    </WidgetWrapper>
  );
};

export default SinglePostView;
