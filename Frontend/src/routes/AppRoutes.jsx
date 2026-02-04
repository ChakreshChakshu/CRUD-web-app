import { Routes, Route } from "react-router-dom";
import UserList from "../pages/UserList";
import AddUser from "../pages/AddUser";
import EditUser from "../pages/EditUser";
import ViewUser from "../pages/ViewUser";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<UserList />} />
      <Route path="/add" element={<AddUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
      <Route path="/view/:id" element={<ViewUser />} />
    </Routes>
  );
};

export default AppRoutes;
