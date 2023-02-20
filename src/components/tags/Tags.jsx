import axios from "axios";
import React, { useState } from "react";
import { baseURL } from "../../extras/baseURL";

const Tags = () => {
  const [tag, setTag] = useState("");
  const dummyTag = [
    {
      _id: {
        $oid: "63ef50a0e29b46dbfda74d0d",
      },
      title: "fulujocyma@mailinator.com",
      categoryName: " ",
      description: "Illo explicabo Prov",
      tags: ["gahahonyso@mailinator.com", "hello", "olma", "anor", "banana"],
      comments: [],
      ckData: "",
      likes: [],
      __v: 0,
    },
    {
      _id: {
        $oid: "63ef50a3e29b46dbfda74d10",
      },
      title: "fulujocyma@mailinator.com",
      categoryName: " ",
      description: "Illo explicabo Prov",
      tags: [
        "gahahonyso@mailinator.com",
        "uzum",
        "kivi",
        "apelsin",
        "tarvuz",
        "anjir",
      ],
      comments: [
        {
          owner: "armeum",
          comment_body: "hellooo",
          _id: {
            $oid: "63ef50b2e29b46dbfda74d17",
          },
          __v: 0,
        },
        {
          owner: "armeum",
          comment_body: "hello",
          _id: {
            $oid: "63ef50bde29b46dbfda74d1a",
          },
          __v: 0,
        },
        {
          owner: "armeum",
          comment_body: "hello",
          _id: {
            $oid: "63ef50d5e29b46dbfda74d1d",
          },
          __v: 0,
        },
      ],
      ckData: "",
      likes: [],
      __v: 0,
    },
  ];

  const filtered = dummyTag.filter((item) => item.tags.includes(tag));

  return (
    <div className="container p-5">
      <input onChange={(e) => setTag(e.target.value)} type="text" />
      <button
        onClick={() => {
          axios.post(baseURL + "/find-tag", { tag }).then((response) => {
            console.log(response.data);
          });
        }}
      >
        Find
      </button>
    </div>
  );
};

export default Tags;
