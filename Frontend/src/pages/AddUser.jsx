import { createUser } from "../services/user.api";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddUser = () => {
  const navigate = useNavigate();

  const handleCreate = async (data) => {
    try {
  await createUser(data);
  toast.success("User added successfully");
  navigate("/");
} catch {
  toast.error("Failed to add user");
}
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <UserForm onSubmit={handleCreate} />
    </div>
  );
};

export default AddUser;
