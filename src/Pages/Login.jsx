import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import react-hot-toast

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const navigate = useNavigate();

  const handleLogin = () => {
    setIsLoading(true); // Start loading
    if (username === "admin" && password === "admin") {
      setTimeout(() => {
        localStorage.setItem("auth", "true");
        toast.success("Login successful!");
        navigate("/todo");
      }, 1500); // Simulate a loading delay
    } else {
      setTimeout(() => {
        toast.error("Invalid username or password"); // Error notification
        setIsLoading(false); // Stop loading on error
      }, 1500); // Simulate a loading delay
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 flex items-center justify-center min-h-screen">
      <div
        className="w-full max-w-md bg-white rounded-lg shadow-xl dark:bg-gray-800 dark:border-gray-700 p-8 
        transition-all duration-500 ease-in-out
        hover:shadow-lg hover:shadow-teal-500/50
        focus:outline-none focus:ring-4 focus:ring-teal-500/50 
        glow-effect"
      >
        <h1 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-6">
          Login to your account
        </h1>

        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label
              htmlFor="username"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 transition-all"
              required
            />
          </div>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="btn glass w-full text-teal-500 font-bold text-lg rounded-lg px-8 py-3 text-center flex items-center justify-center space-x-2 transition-all"
          >
            {isLoading ? (
              <span className=" loading loading-ring loading-lg text-teal-300 absolute left-1/2 transform -translate-x-1/2"></span>
            ) : (
              "Login"
            )}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
