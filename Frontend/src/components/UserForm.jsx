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
    className="bg-white rounded-2xl shadow-sm p-8 space-y-6"
  >
    {/* Header */}
    <div>
      <h2 className="text-2xl font-semibold text-slate-800">
        User Details
      </h2>
      <p className="text-sm text-slate-500">
        Fill in the information below
      </p>
    </div>

    {/* Name */}
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Name
      </label>
      <input
        name="name"
        value={values.name}
        onChange={handleChange}
        placeholder="Enter full name"
        className="
          mt-1 w-full
          rounded-xl
          border border-slate-300
          px-4 py-2.5
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      />
      {errors.name && (
        <p className="mt-1 text-sm text-red-500">
          {errors.name}
        </p>
      )}
    </div>

    {/* Email */}
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Email
      </label>
      <input
        name="email"
        value={values.email}
        onChange={handleChange}
        placeholder="Enter email address"
        className="
          mt-1 w-full
          rounded-xl
          border border-slate-300
          px-4 py-2.5
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      />
      {errors.email && (
        <p className="mt-1 text-sm text-red-500">
          {errors.email}
        </p>
      )}
    </div>

    {/* Phone */}
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Phone
      </label>
      <input
        name="phone"
        value={values.phone}
        onChange={handleChange}
        placeholder="10-digit phone number"
        className="
          mt-1 w-full
          rounded-xl
          border border-slate-300
          px-4 py-2.5
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      />
      {errors.phone && (
        <p className="mt-1 text-sm text-red-500">
          {errors.phone}
        </p>
      )}
    </div>

    {/* Age */}
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Age
      </label>
      <input
        type="number"
        name="age"
        value={values.age}
        onChange={handleChange}
        placeholder="Optional"
        className="
          mt-1 w-full
          rounded-xl
          border border-slate-300
          px-4 py-2.5
          text-sm
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      />
      {errors.age && (
        <p className="mt-1 text-sm text-red-500">
          {errors.age}
        </p>
      )}
    </div>

    {/* Address */}
    <div>
      <label className="block text-sm font-medium text-slate-700">
        Address
      </label>
      <textarea
        name="address"
        value={values.address}
        onChange={handleChange}
        placeholder="Optional address"
        rows={3}
        className="
          mt-1 w-full
          rounded-xl
          border border-slate-300
          px-4 py-2.5
          text-sm
          resize-none
          focus:outline-none
          focus:ring-2 focus:ring-slate-400
        "
      />
    </div>

    {/* Actions */}
    <div className="flex items-center justify-end gap-3 pt-4">
      <button
        type="submit"
        disabled={loading}
        className="
          px-6 py-2.5
          rounded-full
          bg-slate-800
          text-white text-sm font-medium
          hover:bg-slate-700
          transition
          disabled:opacity-50
        "
      >
        {loading ? "Saving..." : "Save User"}
      </button>
    </div>
  </form>
);

};

export default UserForm;
