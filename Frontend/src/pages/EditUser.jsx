import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserById, updateUser } from "../services/user.api";
import UserForm from "../components/UserForm";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then((res) =>
      setUser(res.data.data || res.data)
    );
  }, [id]);

  const handleUpdate = async (data) => {
    await updateUser(id, data);
    navigate("/");
  };

  if (!user) return <p className="text-center">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <UserForm initialData={user} onSubmit={handleUpdate} />
    </div>
  );
};

export default EditUser;
