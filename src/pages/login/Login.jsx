import { Link } from "react-router";
import { authUser } from "../../providers/AuthProvider.jsx";
import { ToastContainer } from "react-toastify";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useState } from "react";

function Login(props) {
  const {
    loginUser,
    googleAuthentication,
    githubAuthentication,
    successNotify,
    errNotify,
  } = authUser();
  const [showPassword, setShowPassword] = useState(false);

  // Notification for successful login

  // Notification for login error

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    // Call the loginUser function from AuthProvider via context
    loginUser(email, password)
      .then((res) => {
        successNotify("Email and Password Login Success");
      })
      .catch((err) => {
        errNotify("Email Or password Wrong");
      });
  };

  // Google and GitHub authentication handlers can be added here
  const handleGoogleAuthentication = () => {
    googleAuthentication()
      .then((res) => {
        successNotify("Google Login Success");
      })
      .catch((err) => {
        errNotify("Google Login Error! Please check your internet!!");
      });
  };

  const handleGitHubAuthentication = () => {
    githubAuthentication()
      .then((res) => {
        successNotify("GitHub Login Success");
      })
      .catch((err) => {
        errNotify("GitHub Login Error! Please check your internet!!");
      });
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-lg shadow-md">
      <div>
        <form onSubmit={handleOnSubmit}>
          <h2 className="text-3xl text-center font-bold mb-6">Login Page</h2>
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
          <div className="mb-6">
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
              className="transform duration-200 bg-primary  px-16 text-primary-contrast font-semibold py-2 rounded-md hover:bg-blue-900"
              type="submit"
            >
              Login
            </button>
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
          </div>
        </form>

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
          If you don't have an account,{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
