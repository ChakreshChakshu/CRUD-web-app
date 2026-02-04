export const validateUser = (values) => {
  const errors = {};

  if (!values.name || values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!values.email.includes("@")) {
    errors.email = "Enter a valid email";
  }

  if (!values.phone) {
    errors.phone = "Phone is required";
  } else if (values.phone.length !== 10) {
    errors.phone = "Phone must be 10 digits";
  }

  if (values.age && values.age <= 0) {
    errors.age = "Age must be greater than 0";
  }

  return errors;
};
