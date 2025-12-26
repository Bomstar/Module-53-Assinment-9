import { Link } from "react-router";
import { authUser } from "../../providers/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

function Register() {
  const { registerUser, updateUserProfile } = authUser();
  const [showPassword, setShowPassword] = useState(false);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photo.value;
    const password = form.password.value;

    // Notification for successful registration
    const registerSuccessNotify = () =>
      toast.success("Registration successful!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    // Notification for registration error
    const registerErrNotify = () =>
      toast.error("This email is already used!", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

    // Call the registerUser function from AuthProvider via context
    registerUser(email, password)
      .then((res) => {
        // Update user profile after successful registration
        updateUserProfile(name, photoURL)
          .then(() => {
            console.log("User profile updated successfully");
          })
          .catch((err) => {
            console.error("Error updating profile:", err);
          });
        registerSuccessNotify();
      })
      .catch((err) => {
        registerErrNotify();
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <div>
        <form onSubmit={handleOnSubmit}>
          <h2 className="text-3xl text-center font-bold mb-6">Register Page</h2>
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
          </div>
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
          </div>
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
          </div>
          <div className="mb-6 ">
            <label
              className="block text-lg font-medium mb-2"
              htmlFor="password"
            >
              Password:
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3  cursor-pointer z-10">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                >
                  {" "}
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
          </div>
          <div className="text-center">
            <button
              className="transform duration-200 bg-primary text-white px-16 font-semibold py-2 rounded-md hover:bg-blue-900"
              type="submit"
            >
              Register
              <ToastContainer
                position="top-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
            </button>
          </div>
        </form>

        <div className="px-20 mt-2 space-y-1">
          <div className="font-medium py-2 flex justify-center items-center gap-5 text-center border-2 rounded-md">
            <img className="w-5 h-5" src="/icons/google.png" alt="Google" />
            <p>Google</p>
          </div>
          <div className="font-medium py-2 flex justify-center items-center gap-5 text-center border-2 rounded-md">
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
      </div>
    </div>
  );
}

export default Register;
