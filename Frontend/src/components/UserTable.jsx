import { Link } from "react-router-dom";

const UserTable = ({ users, loading, onDelete }) => {
  if (loading) {
    return (
      <div className="py-10 text-center text-brand-grey font-medium text-lg animate-pulse">
        Loading team members...
      </div>
    );
  }

  if (!users.length) {
    return (
      <div className="py-10 text-center text-brand-grey flex flex-col items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 opacity-50 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <span className="font-medium">No members found</span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-brand-surface border-b border-brand-light">
          <tr className="text-left text-xs font-bold text-brand-charcoal uppercase tracking-wider">
            <th className="px-8 py-4">Name</th>
            <th className="px-8 py-4">Email</th>
            <th className="px-8 py-4">Phone</th>
            <th className="px-8 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-brand-light">
          {users.map((u) => (
            <tr
              key={u._id}
              className="hover:bg-brand-light/20 transition-colors duration-200 group"
            >
              <td className="px-8 py-1">
                <div className="font-semibold text-brand-dark text-base">{u.name}</div>
              </td>

              <td className="px-8 py-1 text-brand-charcoal font-medium">
                {u.email}
              </td>

              <td className="px-8 py-1 text-brand-charcoal">
                {u.phone}
              </td>

              <td className="px-8 py-1 text-right">
                <div className="inline-flex items-center gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                  <Link
                    to={`/view/${u._id}`}
                    className="p-2 rounded-lg text-brand-charcoal hover:bg-brand-light/50 hover:text-brand-dark transition-all"
                    title="View Details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </Link>

                  <Link
                    to={`/edit/${u._id}`}
                    className="p-1 rounded-lg text-brand-charcoal hover:bg-brand-light/50 hover:text-brand-dark transition-all"
                    title="Edit User"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </Link>

                  <button
                    onClick={() => onDelete(u._id)}
                    className="p-1 rounded-lg text-brand-grey hover:bg-red-50 hover:text-red-600 transition-all"
                    title="Delete User"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
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
