import { Link } from "react-router-dom";

const UserTable = ({ users, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="py-12 text-center text-slate-500">
        Loading users...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="py-12 text-center text-slate-500">
        No users found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-sm text-slate-500 border-b">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">Email</th>
            <th className="px-4 py-3 font-medium">Phone</th>
            <th className="px-4 py-3 font-medium text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((u) => (
            <tr
              key={u._id}
              className="border-b last:border-none hover:bg-slate-50 transition"
            >
              <td className="px-4 py-3 text-slate-800 font-medium">
                {u.name}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {u.email}
              </td>

              <td className="px-4 py-3 text-slate-600">
                {u.phone}
              </td>

              <td className="px-4 py-3 text-right">
                <div className="inline-flex gap-4 text-sm">
                  <Link
                    to={`/view/${u._id}`}
                    className="text-purple-700 hover:underline"
                  >
                    View
                  </Link>

                  <Link
                    to={`/edit/${u._id}`}
                    className="text-slate-700 hover:underline"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => onDelete(u._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
