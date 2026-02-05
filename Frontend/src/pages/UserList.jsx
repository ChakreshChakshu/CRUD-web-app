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
      toast.error("Search failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await deleteUser(id);
      toast.success("User deleted successfully");
      fetchUsers();
    } catch {
      toast.error("Failed to delete user");
    }
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
    <div className="h-screen flex flex-col p-6 md:p-2 font-sans bg-brand-surface text-brand-dark overflow-hidden">
      <div className="flex-none mb-2">
       
        <div className="glass-panel p-3 rounded-3xl flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-brand-dark">Users List</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-3 flex-1 lg:justify-end items-stretch">
            <div className="relative flex-1 max-w-md group">
              <span className="absolute inset-y-0 left-4 flex items-center text-brand-grey group-focus-within:text-brand-lilac transition-colors z-10 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="input-field !pl-12 !py-2.5 relative"
              />
            </div>

            <div className="flex gap-2">
              <Link
                to="/add"
                className="btn-primary flex items-center justify-center gap-2 !py-2.5 !px-4 text-sm whitespace-nowrap"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Add</span>
              </Link>

              <button
                onClick={handleExport}
                className="btn-secondary flex items-center justify-center gap-2 !py-2.5 !px-4 text-sm"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden max-w-7xl mx-auto w-full flex flex-col">
        <div className="bg-white rounded-[2rem] p-1 shadow-xl shadow-brand-grey/5 border border-white overflow-auto flex-1 custom-scrollbar">
          <UserTable
            users={users}
            loading={loading}
            onDelete={handleDelete}
          />
        </div>
      </div>

     
      {!search && (
        <div className="flex-none mt-6 max-w-7xl mx-auto w-full">
          <div className="flex justify-center items-center gap-4 pb-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(page - 1)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-brand-light rounded-full text-brand-dark disabled:opacity-30 hover:bg-brand-lilac/20 hover:border-brand-lilac hover:text-brand-dark transition-all duration-300 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <div className="bg-white px-6 py-2 rounded-full border border-brand-light shadow-sm">
              <span className="text-brand-charcoal font-medium tracking-wide text-sm">
                Page <span className="text-brand-dark font-bold text-base ml-1">{page}</span>
              </span>
            </div>

            <button
              disabled={page === totalPages}
              onClick={() => setPage(page + 1)}
              className="w-10 h-10 flex items-center justify-center bg-white border border-brand-light rounded-full text-brand-dark disabled:opacity-30 hover:bg-brand-lilac/20 hover:border-brand-lilac hover:text-brand-dark transition-all duration-300 shadow-sm"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserList;