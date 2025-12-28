import { Link } from "react-router";
import { authUser } from "../../providers/AuthProvider.jsx";
import { ToastContainer, toast } from "react-toastify";

export default function Navber() {
  const { userData, logoutUser } = authUser();

  // Notification for successful logout
  const logoutSuccessNotify = () =>
    toast.success("Logout successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Notification for logout error
  const logoutErrNotify = () =>
    toast.error("Logout error!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  // Handle user logout
  const handleLogOut = () => {
    logoutUser()
      .then(() => {
        logoutSuccessNotify();
        console.log("User logged out successfully");
      })
      .catch((err) => {
        logoutErrNotify();
      });
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-5xl font-bold">
          Home <span className="text-primary">Villa</span>
        </div>
        <div>
          <ul className="flex gap-8 text-lg font-medium">
            <Link
              className="transform duration-200 border-b-2 border-white hover:text-primary hover:border-primary hover:border-b-2"
              to="/"
            >
              Home
            </Link>
            <Link
              className="transform duration-200 border-b-2 border-white hover:text-primary hover:border-primary hover:border-b-2"
              to="/update-profile"
            >
              Update profile
            </Link>
            <Link
              className="transform duration-200 border-b-2 border-white hover:text-primary hover:border-primary hover:border-b-2"
              to="/about-us"
            >
              About Us
            </Link>
          </ul>
        </div>
        <div>
          {userData ? (
            <div className="flex gap-4 items-center">
              <div>
                <div className="w-12 h-12 rounded-full overflow-hidden border-2">
                  <img
                    src={userData.photoURL}
                    alt="User profile Photo"
                    title={userData.displayName}
                  />
                </div>
              </div>
              <div className="text-lg font-medium">
                <button
                  onClick={handleLogOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-md transform duration-200 hover:bg-red-600"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <div>
              <Link
                className="transform duration-200 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/95"
                to="/login"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </nav>
  );
}
