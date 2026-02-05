import { createUser } from "../services/user.api";
import UserForm from "../components/UserForm";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="h-screen flex flex-col items-center justify-center bg-brand-surface font-sans overflow-hidden">
      <div className="w-full max-w-2xl h-full flex flex-col p-2">
        <div className="flex-none mb-2 pt-2">
          <Link
            to="/"
            className="inline-flex items-center text-brand-charcoal hover:text-brand-dark transition-colors font-medium"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Dashboard
          </Link>
        </div>

        <div className="flex-1 overflow-auto custom-scrollbar pb-3">
          <UserForm onSubmit={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default AddUser;
