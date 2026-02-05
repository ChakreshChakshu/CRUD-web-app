import { useState } from "react";
import { validateUser } from "../utils/validation";

const UserForm = ({ initialData, onSubmit, loading }) => {
  const [values, setValues] = useState(
    initialData || {
      name: "",
      email: "",
      phone: "",
      age: "",
      address: ""
    }
  );

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // Clear error when user types
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: null });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateUser(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      onSubmit(values);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel p-8 md:p-10 rounded-[2rem] space-y-8 animate-in fade-in zoom-in duration-300"
    >
      <div>
        <h2 className="text-3xl font-bold text-brand-dark mb-2">
          {initialData ? "Edit Member" : "New Member"}
        </h2>
        <p className="text-brand-charcoal">
          {initialData ? "Update the details below." : "Enter the details to add a new team member."}
        </p>
      </div>

      <div className="space-y-6">
        {/* Name Field */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2 pl-1">
            Full Name
          </label>
          <input
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="e.g. Jane Doe"
            className={`input-field ${errors.name ? 'border-red-400 focus:ring-red-200' : ''}`}
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-500 pl-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2 pl-1">
            Email Address
          </label>
          <input
            name="email"
            value={values.email}
            onChange={handleChange}
            placeholder="e.g. jane@company.com"
            className={`input-field ${errors.email ? 'border-red-400 focus:ring-red-200' : ''}`}
          />
          {errors.email && (
            <p className="mt-2 text-sm text-red-500 pl-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2 pl-1">
            Mobile Number
          </label>
          <input
            name="phone"
            value={values.phone}
            onChange={handleChange}
            placeholder="10-digit number"
            className={`input-field ${errors.phone ? 'border-red-400 focus:ring-red-200' : ''}`}
          />
          {errors.phone && (
            <p className="mt-2 text-sm text-red-500 pl-1 font-medium flex items-center gap-1">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-red-500"></span>
              {errors.phone}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Age Field */}
          <div>
            <label className="block text-sm font-semibold text-brand-dark mb-2 pl-1">
              Age <span className="text-brand-grey font-normal">(Optional)</span>
            </label>
            <input
              type="number"
              name="age"
              value={values.age}
              onChange={handleChange}
              placeholder="e.g. 28"
              className="input-field"
            />
            {errors.age && (
              <p className="mt-2 text-sm text-red-500 pl-1 font-medium">
                {errors.age}
              </p>
            )}
          </div>
        </div>

        {/* Address Field */}
        <div>
          <label className="block text-sm font-semibold text-brand-dark mb-2 pl-1">
            Address <span className="text-brand-grey font-normal">(Optional)</span>
          </label>
          <textarea
            name="address"
            value={values.address}
            onChange={handleChange}
            placeholder="Enter full address"
            rows={3}
            className="input-field resize-none"
          />
        </div>
      </div>

      <div className="pt-6 border-t border-brand-light">
        <button
          type="submit"
          disabled={loading}
          className="btn-primary w-full md:w-auto md:px-12 py-3.5 text-lg shadow-xl shadow-brand-dark/20"
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Saving...
            </span>
          ) : (
            "Save Details"
          )}
        </button>
      </div>
    </form>
  );
};

export default UserForm;
