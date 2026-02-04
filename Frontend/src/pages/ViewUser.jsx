import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../services/user.api";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id).then((res) =>
      setUser(res.data.data || res.data)
    );
  }, [id]);

  if (!user) return <p className="text-center">Loading...</p>;

  return (
  <div className="min-h-screen bg-slate-100 py-10 px-4">
    <div className="max-w-xl mx-auto">

      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-6">

        {/* Header */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            User Profile
          </h2>
          <p className="text-sm text-slate-500">
            View user information
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-200" />

        {/* Details */}
        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-slate-500">Name</span>
            <span className="text-slate-800 font-medium">
              {user.name}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Email</span>
            <span className="text-slate-800 font-medium">
              {user.email}
            </span>
          </div>

          <div className="flex justify-between">
            <span className="text-slate-500">Phone</span>
            <span className="text-slate-800 font-medium">
              {user.phone}
            </span>
          </div>

          {user.age && (
            <div className="flex justify-between">
              <span className="text-slate-500">Age</span>
              <span className="text-slate-800 font-medium">
                {user.age}
              </span>
            </div>
          )}

          {user.address && (
            <div className="flex justify-between">
              <span className="text-slate-500">Address</span>
              <span className="text-slate-800 font-medium text-right max-w-[60%]">
                {user.address}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="pt-6 flex justify-end">
          <Link
            to="/"
            className="
              px-6 py-2.5
              rounded-full
              bg-slate-800
              text-white text-sm font-medium
              hover:bg-slate-700
              transition
            "
          >
            ← Back to Users
          </Link>
        </div>

      </div>
    </div>
  </div>
);

};

export default ViewUser;
