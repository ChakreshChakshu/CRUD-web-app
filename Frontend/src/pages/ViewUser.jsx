import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../services/user.api";

const ViewUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUserById(id)
      .then((res) => setUser(res.data.data || res.data))
      .catch((err) => console.error(err));
  }, [id]);

  if (!user) {
    return (
      <div className="min-h-screen bg-brand-surface flex items-center justify-center">
        <div className="text-brand-grey font-medium text-lg animate-pulse flex flex-col items-center">
          <svg className="animate-spin h-8 w-8 text-brand-lilac mb-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-brand-surface font-sans overflow-hidden">
      <div className="w-full max-w-lg h-full flex flex-col p-6 space-y-6">
        <div className="flex-none pt-6">
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

        <div className="flex-1 overflow-auto custom-scrollbar pb-6 flex flex-col items-center justify-center">
          <div className="glass-panel rounded-[2.5rem] p-10 shadow-xl overflow-hidden relative fade-in animate-in duration-500 w-full">
            {/* Decorative background circle */}
            <div className="absolute -top-20 -right-20 w-64 h-64 bg-brand-lilac/20 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center text-3xl font-bold text-brand-charcoal mb-6 border-4 border-white shadow-lg">
                {user.name.charAt(0).toUpperCase()}
              </div>

              <h2 className="text-3xl font-bold text-brand-dark mb-1">
                {user.name}
              </h2>
              <p className="text-brand-charcoal font-medium opacity-80 mb-8">
                {user.email}
              </p>

              <div className="w-full space-y-4">
                <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-light/50">
                  <span className="text-brand-grey font-medium text-sm flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    Phone
                  </span>
                  <span className="text-brand-dark font-semibold">{user.phone}</span>
                </div>

                {user.age && (
                  <div className="flex items-center justify-between p-4 bg-white/50 rounded-2xl border border-brand-light/50">
                    <span className="text-brand-grey font-medium text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Age
                    </span>
                    <span className="text-brand-dark font-semibold">{user.age}</span>
                  </div>
                )}

                {user.address && (
                  <div className="flex flex-col gap-2 p-4 bg-white/50 rounded-2xl border border-brand-light/50 text-left">
                    <span className="text-brand-grey font-medium text-sm flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Address
                    </span>
                    <span className="text-brand-dark font-semibold leading-relaxed pl-6">{user.address}</span>
                  </div>
                )}
              </div>

              <div className="w-full flex gap-3 mt-8">
                <Link
                  to={`/edit/${user._id}`}
                  className="btn-primary flex-1 flex items-center justify-center gap-2 py-3"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
