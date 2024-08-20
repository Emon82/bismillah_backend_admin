import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import LocalLibraryOutlinedIcon from "@material-ui/icons/LocalLibraryOutlined";
import TrendingUpOutlinedIcon from "@material-ui/icons/TrendingUpOutlined";
import DescriptionOutlinedIcon from "@material-ui/icons/DescriptionOutlined";
import React from "react";

export const menu = [
  {
    icon: <HomeOutlinedIcon />,
    title: "Home",
  },
  {
    icon: <LocalLibraryOutlinedIcon />,
    title: "Education",
    items: [
      {
        title: "Technical Analysis",
        to:"/technicle"
      },
      {
        title: "Fundamental Analysis",
        to:"/fundamental"
      },
      {
        title: "Elliot Wave Analysis",
        to:"/wave"
      }
    ]
  },
  {
    icon: <TrendingUpOutlinedIcon />,
    title: "Options"
  },
  {
    icon: <DescriptionOutlinedIcon />,
    title: "Blog"
  }
];