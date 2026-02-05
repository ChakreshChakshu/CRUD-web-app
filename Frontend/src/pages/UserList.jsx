import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  getUsers,
  deleteUser,
  exportCSV,
  searchUsers
} from "../services/user.api";
import UserTable from "../components/UserTable";
import { Link } from "react-router-dom";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    const res = await getUsers(page);
    setUsers(res.data.data);
    setTotalPages(res.data.pagination.totalPages);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, [page]);

  const handleSearch = async (value) => {
    setSearch(value);

    if (!value.trim()) {
      setPage(1);
      fetchUsers();
      return;
    }

    try {
      setLoading(true);
      const res = await searchUsers(value);
      setUsers(res.data.data);
      setTotalPages(1); 
      setPage(1);
    } catch {
      alert("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
   if (!confirm("Delete user?")) return;

try {
  await deleteUser(id);
  toast.success("User deleted successfully");
  fetchUsers();
} catch {
  toast.error("Failed to delete user");
}
    fetchUsers();
  };

  const handleExport = async () => {
   try {
  const res = await exportCSV();
  const url = window.URL.createObjectURL(new Blob([res.data]));
  const a = document.createElement("a");
  a.href = url;
  a.download = "users.csv";
  a.click();

  toast.success("CSV exported successfully");
} catch {
  toast.error("CSV export failed");
}
  };

  return (
    <div className="min-h-screen bg-[#DEDFE0] p-4 md:p-8 font-sans text-[#333F3B]">
      <div className="max-w-6xl mx-auto">
        
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-[2rem] shadow-sm mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 border border-white">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight">Users</h1>
            <p className="text-[#5E6061] text-sm italic">Manage your community directory</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 flex-1 lg:justify-end">
            <div className="relative flex-1 max-w-md">
              <span className="absolute inset-y-0 left-4 flex items-center text-[#8B8D91]">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/80 border border-[#8B8D91]/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#C4BCCF] transition-all placeholder-[#8B8D91]"
              />
            </div>

            <div className="flex gap-2">
              <Link
                to="/add"
                className="bg-[#C4BCCF] text-[#333F3B] font-semibold px-6 py-3 rounded-2xl hover:bg-[#8B8D91] hover:text-white transition-all duration-300 shadow-sm flex items-center justify-center gap-2 whitespace-nowrap"
              >
                + Add User
              </Link>

              <button
                onClick={handleExport}
                className="bg-[#333F3B] text-[#DEDFE0] font-medium px-6 py-3 rounded-2xl hover:opacity-90 transition-all duration-300 shadow-sm whitespace-nowrap"
              >
                Export
              </button>
            </div>
          </div>
        </div>


        <div className="bg-white rounded-[2.5rem] p-4 shadow-xl shadow-gray-200/50 overflow-hidden border border-white">
          <UserTable
            users={users}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>

        {!search && (
          <div className="flex justify-center items-center gap-4 mt-8 pb-10">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-12 h-12 flex items-center justify-center bg-white border border-[#8B8D91]/20 rounded-full text-[#333F3B] disabled:opacity-30 hover:bg-[#C4BCCF] transition-colors shadow-sm"
            >
              ←
            </button>

            <div className="bg-white px-6 py-2 rounded-full border border-[#8B8D91]/20 shadow-sm">
              <span className="text-sm font-bold uppercase tracking-widest text-[#5E6061]">
                Page <span className="text-[#333F3B]">{page}</span>
              </span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="w-12 h-12 flex items-center justify-center bg-white border border-[#8B8D91]/20 rounded-full text-[#333F3B] disabled:opacity-30 hover:bg-[#C4BCCF] transition-colors shadow-sm"
            >
              →
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserList;