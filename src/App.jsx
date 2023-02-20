import "./App.css";
import Admin from "./pages/Admin/Admin";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login/Login";
import Registration from "./pages/Register/Register";
import Test from "./pages/collection/CreateCollectionPage";
import { Profile } from "./components/Profile/Profile";
import { CollectionItem } from "./components/CollectionItem/CollectionItem";
import { Collections } from "./pages/collections page/Collections";

import CollectionItemPage from "./pages/collection view page/CollectionItemPage";
import ImageUpload from "./pages/image upload page/ImageUpload";
import Category from "./pages/Category/Category";
import AddToCategory from "./pages/Add to category/AddToCategory";
import CategoryItem from "./pages/Category/CategoryItem";
import Favouirite from "./pages/favourite/Favourite";
import Experiment from "./Experiment";
import GuestPage from "./pages/guest/GuestPage";
import { GuestCollectionsPage } from "./pages/guestCollectionsPage/GuestCollectionsPage";
import GuestCollectionItemPage from "./pages/guest collection item page/GuestCollectionItemPage";
import { AdminCollections } from "./pages/admin collections page/AdminCollections";

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Registration />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/profile",
    element: (
      <>
        <Profile />
      </>
    ),
  },
  {
    path: "/collections/Profile",
    element: (
      <>
        <Profile />
      </>
    ),
  },
  {
    path: "/admin",
    element: <Admin />,
  },
  {
    path: "/admin/:id",
    element: <AdminCollections />,
  },
  {
    path: "/collections/add",
    element: <Test />,
  },
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/collection/:id",
    element: (
      <>
        <CollectionItemPage />
      </>
    ),
  },
  {
    path: "/collection_item",
    element: (
      <>
        <CollectionItem />
      </>
    ),
  },
  {
    path: "/collections",
    element: (
      <>
        <Collections />
      </>
    ),
  },
  {
    path: "/collections/favourite",
    element: (
      <>
        <Favouirite />
      </>
    ),
  },
  {
    path: "/add_category",
    element: (
      <>
        <Category />
      </>
    ),
  },
  {
    path: "/add-to-category",
    element: (
      <>
        <AddToCategory />
      </>
    ),
  },
  {
    path: "/add_category/:id",
    element: (
      <>
        <CategoryItem />
      </>
    ),
  },
  {
    path: "/collections/add/image_upload/:id",
    element: (
      <>
        <ImageUpload />
      </>
    ),
  },
  {
    path: "/ex",
    element: (
      <>
        <Experiment />
      </>
    ),
  },
  {
    path: "/guest",
    element: (
      <>
        <GuestPage />
      </>
    ),
  },
  {
    path: "/guest/collections",
    element: (
      <>
        <GuestCollectionsPage />
      </>
    ),
  },

  {
    path: "/guest/collections/:id",
    element: <GuestCollectionItemPage />,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
