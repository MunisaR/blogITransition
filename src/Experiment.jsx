import React from "react";

const Experiment = () => {
  const likesArray = [
    {
      owner: "63e9320acaa3faff6417dc5e",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "abdulboriy",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "yusuf",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "63e9320acaa3faff6417dc5e",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "63e9320acaa3faff6417dc5e",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "abdulboriy",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "yusuf",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
    {
      owner: "63e9320acaa3faff6417dc5e",
      isLiked: true,
      _id: {
        $oid: "63e9d8d0a5d73cb5bd3ce103",
      },
      __v: 0,
    },
  ];

  const unique = likesArray.filter(
    (value, index, self) =>
      index === self.findIndex((t) => t.owner === value.owner)
  );

  return <div></div>;
};

export default Experiment;
