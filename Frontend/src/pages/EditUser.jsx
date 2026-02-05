import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getUserById, updateUser } from "../services/user.api";
import UserForm from "../components/UserForm";
import { toast } from "react-toastify";

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data.data || res.data))
      .catch(() => toast.error("Could not load user data"));
  }, [id]);

  const handleUpdate = async (data) => {
    try {
      await updateUser(id, data);
      toast.success("User updated successfully");
      navigate("/");
    } catch {
      toast.error("Failed to update user");
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center">
        <div className="text-brand-grey font-medium text-lg animate-pulse flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-brand-lilac mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading user details...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-brand-surface font-sans overflow-hidden">
      <div className="w-full max-w-2xl h-full flex flex-col p-6">
        <div className="flex-none mb-6 pt-6">
          <Link
            to="/"
            className="inline-flex items-center text-brand-charcoal hover:text-brand-dark transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar pb-6">
          <UserForm initialData={user} onSubmit={handleUpdate} />
        </div>
      </div>
    </div>
  );
};

export default EditUser;
