// Register.jsx
import { Link } from "react-router"; // react-router-dom ব্যবহার করলাম (standard)
import { authUser } from "../../providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";
import { z } from "zod";

// ---------------------- ZOD SCHEMA ----------------------
const registerSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long"),
  email: z.email("Invalid email address"),
  photo: z.url("Invalid photo URL"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)/,
      "Password must include at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// ---------------------- COMPONENT ----------------------
function Register() {
  const {
    registerUser,
    updateUserProfile,
    googleAuthentication,
    githubAuthentication,
    successNotify,
    errNotify,
  } = authUser();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // ---------- FORM SUBMIT ----------
  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      photo: form.photo.value.trim(),
      password: form.password.value,
    };

    // Zod validation
    const validation = registerSchema.safeParse(formData);
    if (!validation.success) {
      // use flatten() to get nice field errors
      const { fieldErrors, formErrors } = validation.error.flatten();
      const formatted = {};
      Object.keys(fieldErrors).forEach((k) => {
        const arr = fieldErrors[k];
        formatted[k] = Array.isArray(arr) && arr.length ? arr[0] : "";
      });
      if (formErrors && formErrors.length) {
        formatted._form = formErrors.join(", ");
      }
      setErrors(formatted);
      return;
    }

    // valid -> clear errors
    setErrors({});

    // ---------- EMAIL & PASSWORD REGISTRATION ----------

    registerUser(formData.email, formData.password)
      .then(async (res) => {
        // update profile
        await updateUserProfile(formData.name, formData.photo);
        successNotify("Registration Successful");
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          errNotify("Email already in use. Please login instead.");
          return;
        }
        errNotify("Registration failed! " + err.message);
      });
  };

  // ---------- GOOGLE AUTH ----------
  const handleGoogleAuthentication = async () => {
    googleAuthentication()
      .then((res) => {
        successNotify("Google Registration Successful");
      })
      .catch((err) => {
        errNotify("Google Registration failed!");
      });
  };

  // ---------- GITHUB AUTH ----------
  const handleGitHubAuthentication = async () => {
    githubAuthentication()
      .then((res) => {
        successNotify("GitHub Registration Successful");
      })
      .catch((err) => {
        errNotify("GitHub Registration failed!");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      {/* ToastContainer */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />

      <div>
        <form onSubmit={handleOnSubmit}>
          <h2 className="text-3xl text-center font-bold mb-6">Register Page</h2>

          {/* Name */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="text"
              id="name"
              name="name"
              required
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="email">
              Email:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="email"
              id="email"
              name="email"
              required
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">{errors.email}</p>
            )}
          </div>

          {/* Photo */}
          <div className="mb-4">
            <label className="block text-lg font-medium mb-2" htmlFor="photo">
              Photo URL:
            </label>
            <input
              className="w-full p-2 border border-gray-300 rounded-md"
              type="url"
              id="photo"
              name="photo"
              required
            />
            {errors.photo && (
              <p className="text-red-500 text-sm mt-1">{errors.photo}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6 ">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer z-10">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
              <input
                className="w-full p-2 border border-gray-300 rounded-md pr-10"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                required
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-2">{errors.password}</p>
            )}
          </div>

          {/* Submit */}
          <div className="text-center">
            <button
              className="transform duration-200 bg-primary text-white px-16 font-semibold py-2 rounded-md hover:bg-blue-900"
              type="submit"
            >
              Register
            </button>
          </div>
        </form>

        {/* Social Buttons */}
        <div className="px-20 mt-2 space-y-1">
          <div
            onClick={handleGoogleAuthentication}
            className="font-medium py-2 cursor-pointer flex justify-center items-center gap-5 text-center border-2 rounded-md"
          >
            <img className="w-5 h-5" src="/icons/google.png" alt="Google" />
            <p>Google</p>
          </div>
          <div
            onClick={handleGitHubAuthentication}
            className="font-medium py-2 cursor-pointer flex justify-center items-center gap-5 text-center border-2 rounded-md"
          >
            <img className="w-5 h-5" src="/icons/github.png" alt="GitHub" />
            <p>GitHub</p>
          </div>
        </div>
      </div>

      <div className="text-center mt-4">
        <p>
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Login here
          </Link>
        </p>
        {/* show form-level error if present */}
        {errors._form && (
          <p className="text-red-600 mt-2 text-sm">{errors._form}</p>
        )}
      </div>
    </div>
  );
}

export default Register;
