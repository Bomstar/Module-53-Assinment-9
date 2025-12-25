import { Link } from "react-router";
import { authUser } from "../../providers/AuthProvider.jsx";

export default function Navber() {
  const { userData, logoutUser } = authUser();
  console.log("Navber user data:", userData);

  const handleLogOut = () => {
    logoutUser().then(() => {
      console.log("User logged out successfully");
    }).catch(err => {
      console.error("Logout error:", err);
    });
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-5xl font-bold">Mojo Bel</div>
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
                <div className="w-12 h-12 rounded-full border-2">
                  <img
                    src={userData.photoURL}
                    alt="User profile Photo"
                    title={userData.displayName}
                  />
                </div> 
              </div>
              <div className="text-lg font-medium">
                <button onClick={handleLogOut} className="bg-red-500 text-white px-4 py-2 rounded-md transform duration-200 hover:bg-red-600">
                  Logout
                </button>
              </div>
            </div>
          ) :  (
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
    </nav>
  );
}
