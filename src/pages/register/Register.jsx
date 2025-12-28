// Register.jsx
import { Link } from "react-router"; // react-router-dom ব্যবহার করলাম (standard)
import { authUser } from "../../providers/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
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
    logoutUser,
  } = authUser();

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // ---------- Toasts ----------
  const registerSuccessNotify = () =>
    toast.success("Registration successful!", {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });

  const registerErrNotify = (msg = "This email is already used!") =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });

  const registerFailedNotify = (msg = "Registration failed!") =>
    toast.error(msg, {
      position: "top-center",
      autoClose: 3000,
      theme: "colored",
    });

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

    try {
      // register user with email & password
      const res = await registerUser(formData.email, formData.password);
      // update profile (name, photo)
      try {
        await updateUserProfile(formData.name, formData.photo);
      } catch (profileErr) {
        // profile update failed — log but continue if auth succeeded
        console.error("Error updating profile:", profileErr);
      }

      registerSuccessNotify();
      // Optionally reset form
      form.reset();
    } catch (err) {
      // Example: Firebase returns error.code === 'auth/email-already-in-use'
      console.error("Registration error:", err);
      if (err?.code === "auth/email-already-in-use") {
        registerErrNotify("This email is already in use.");
      } else {
        registerFailedNotify();
      }
    }
  };

  // ---------- GOOGLE AUTH ----------
  const handleGoogleAuthentication = async () => {
    try {
      const res = await googleAuthentication();
      const isNewUser = res?.additionalUserInfo?.isNewUser;

      if (!isNewUser) {
        // existing user attempted to "signup" via Google — sign them out and show error
        try {
          await logoutUser();
        } catch (logoutErr) {
          console.error("Logout error:", logoutErr);
        }
        registerErrNotify(
          "This Google account is already registered. Please login instead."
        );
        return;
      }

      registerSuccessNotify();
    } catch (err) {
      console.error("Google auth error:", err);
      registerFailedNotify();
    }
  };

  // ---------- GITHUB AUTH ----------
  const handleGitHubAuthentication = async () => {
    try {
      const res = await githubAuthentication();
      // use additionalUserInfo for isNewUser consistently
      const isNewUser = res?.additionalUserInfo?.isNewUser;

      if (!isNewUser) {
        // existing user attempted to "signup" via GitHub — sign out and show error
        try {
          await logoutUser();
        } catch (logoutErr) {
          console.error("Logout error:", logoutErr);
        }
        registerErrNotify(
          "This GitHub account is already registered. Please login instead."
        );
        return;
      }

      registerSuccessNotify();
    } catch (err) {
      console.error("GitHub auth error:", err);
      registerFailedNotify();
    }
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
