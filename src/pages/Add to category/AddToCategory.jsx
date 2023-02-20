import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import NavBar from "../../components/navbar/NavBar";
import { FcRemoveImage } from "react-icons/fc";
import { baseURL } from "../../extras/constants";

const AddToCategory = () => {
  const all = useLocation().state;
  const [collections, setCollections] = useState("");
  const [cat, setCat] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [collectionId, setCollectionId] = useState("");
  const selectedCollections = [];
  const fetchCollections = async () => {
    await axios
      .post(baseURL + "/get_user", {
        id: all.user.id._id,
      })
      .then((res) => {
        setCollections(res.data.col);
        console.log(all);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <div>
      <NavBar />
      <br />
      <div className="container">
        <div className="btn-group dropend">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Choose Category
          </button>
          <ul className="dropdown-menu">
            {all.categories.length > 0 &&
              all.categories.map((e, i) => (
                <li
                  onClick={() => {
                    setCollectionId(e._id);
                    setCat(e.name);
                    setCategoryName(e.name);
                  }}
                  className="p-2 dropdown-item"
                >
                  {e.name}
                </li>
              ))}
          </ul>
        </div>
        <br />
        <br />
        <h5>Choosen Category: {cat.length > 0 ? cat : "not selected"} </h5>
        <br />
        <button
          onClick={async () => {
            axios
              .patch(baseURL + "/add-category-to-collection", {
                collectionId,
                categoryName,
              })
              .then((res) => {
                if (res.status === 200) {
                  window.location.reload();
                }
              });

            axios
              .patch(baseURL + "/add-collection-to-category", {
                collectionId,
                selectedCollections,
              })
              .then((res) => {
                if (res.status === 200) {
                  window.location.reload();
                }
              });
          }}
          className="btn btn-success"
        >
          Add
        </button>
      </div>
      <br />
      {collections.length &&
        collections.map((el, i) => (
          <div className="d-flex p-4 m-2 bg-light">
            <div className="form-check d-flex justify-content-center align-items-center">
              <input
                className="form-check-input"
                type="checkbox"
                value={el._id}
                onChange={(e) => {
                  selectedCollections.push(e.target.value);
                  let a = [...new Set(selectedCollections)];
                }}
                id="flexCheckChecked"
              />
            </div>
            <div className="collectionImg mx-2">
              {el.image ? (
                <img src={el.image} width={100} alt="" />
              ) : (
                <FcRemoveImage size={100} />
              )}
            </div>
            <div className="collectionTitle">
              <h4>{el.title}</h4>
              <h6>{el.description}</h6>
            </div>
          </div>
        ))}
    </div>
  );
};

export default AddToCategory;
