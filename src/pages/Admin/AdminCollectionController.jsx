import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { baseURL } from "../../extras/baseURL";

const AdminCollectionController = () => {
  const param = useParams();
  const [Collections, setCollections] = useState([]);
  const fetchCollections = async () => {
    await axios
      .get(baseURL + `/admin/collection/${param.id}`)
      .then((response) => {
        setCollections(response.data.users[0]);
      });
  };
  useEffect(() => {
    fetchCollections();
  }, []);

  return (
    Collections && (
      <>
        <h1>{Collections.fullName}</h1>
      </>
    )
  );
};

export default AdminCollectionController;
