import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../redux/slices/authslice";
import GridMotion from "../../blocks/Backgrounds/GridMotion/GridMotion";
import { Input, Typography } from "@material-tailwind/react";
import { EyeIcon, FilmIcon, EyeSlashIcon } from "@heroicons/react/24/solid";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: authError } = useSelector((state) => state.auth);

  const validate = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.values(newErrors).every((x) => x === "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (touched[name]) {
      validate(name, value);
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    validate(name, value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(newTouched);

    const isValid = Object.keys(formData).every((key) =>
      validate(key, formData[key])
    );
    if (!isValid) return;

    try {
      await dispatch(login(formData)).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Sample movie poster URLs (replace with your own or fetch dynamically)
  const posterUrls = [
    "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg", // Wonder Woman 1984
    "https://image.tmdb.org/t/p/w500/6KErczPBROQty7QoIsaa6wJYXZi.jpg", // Soul
    "https://image.tmdb.org/t/p/w500/9kg73Mg8WJKlB9Y2SAJzeDKAnuB.jpg", // The Croods: A New Age
    "https://image.tmdb.org/t/p/w500/6agKYU5IQFpuDyUYPu39w7UCRrJ.jpg", // Monster Hunter
    "https://image.tmdb.org/t/p/w500/5KCVkau1HEl7ZzfPsKAPM0sMiKc.jpg", // The Midnight Sky
    "https://image.tmdb.org/t/p/w500/7D430eqZj8y3oVkLFfsWXGRcpEG.jpg", // The Empty Man
    "https://image.tmdb.org/t/p/w500/4n8QNNdk4BOX9Dslfbz5Dy6j1HK.jpg", // The New Mutants
    "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg", // Rogue
    "https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg", // Tenet
    "https://image.tmdb.org/t/p/w500/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg", // Greenland
    "https://image.tmdb.org/t/p/w500/6wxfWZxQcuv2QgxIQKj0eYTdKTv.jpg", // Fatman
    "https://image.tmdb.org/t/p/w500/5KmhjlR5CEarB8mKtpjcjHRYIu9.jpg", // The Call
    "https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg", // The Witches
    "https://image.tmdb.org/t/p/w500/6zbKgwgaaCyyBXE4Sun4oWQfQmi.jpg", // Honest Thief
    "https://image.tmdb.org/t/p/w500/9hlqmYqRRpNpB4zA5iW2D2xZi1F.jpg", // The War with Grandpa
    "https://image.tmdb.org/t/p/w500/6TPZSJ06OEXeelx1U1VIAt0j9Ry.jpg", // Jiu Jitsu
    "https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg", // Vanguard
    "https://image.tmdb.org/t/p/w500/4n8QNNdk4BOX9Dslfbz5Dy6j1HK.jpg", // The New Mutants (repeat for more items)
    "https://image.tmdb.org/t/p/w500/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
    "https://image.tmdb.org/t/p/w500/riYInlsq2kf1AWoGm80JQW5dLKp.jpg",
    "https://image.tmdb.org/t/p/w500/7prYzufdIOy1KCTZKVWpjBFqqNr.jpg",
    "https://image.tmdb.org/t/p/w500/6wxfWZxQcuv2QgxIQKj0eYTdKTv.jpg",
    "https://image.tmdb.org/t/p/w500/5KmhjlR5CEarB8mKtpjcjHRYIu9.jpg",
    "https://image.tmdb.org/t/p/w500/4ZocdxnOO6q2UbdKye2wgofLFhB.jpg",
    "https://image.tmdb.org/t/p/w500/6zbKgwgaaCyyBXE4Sun4oWQfQmi.jpg",
    "https://image.tmdb.org/t/p/w500/9hlqmYqRRpNpB4zA5iW2D2xZi1F.jpg",
    "https://image.tmdb.org/t/p/w500/6TPZSJ06OEXeelx1U1VIAt0j9Ry.jpg",
    "https://image.tmdb.org/t/p/w500/1UCOF11QCw8kcqvce8LKOO6pimh.jpg",
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <GridMotion
        gradientColor="linear-gradient(135deg, #000 0%, #B41C1C 100%)"
        items={posterUrls}
      />

      {/* Logo positioned top left */}
      <div className="absolute top-4 left-4  z-20 md:top-4 md:left-40">
        <div className="flex items-center ">
          <FilmIcon className="h-8 w-8 text-red-500 mr-2" />
          <Typography
            as={Link}
            to="/"
            className="mr-4 cursor-pointer py-1.5 font-bold text-3xl md:text-4xl text-red-600 hover:text-red-500 transition-colors"
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              textShadow: "0 0 8px rgba(229, 9, 20, 0.6)",
              letterSpacing: "1px",
            }}
          >
            FLICKSY
          </Typography>
        </div>
      </div>

      {/* Login form container with responsive adjustments */}
      <div className="absolute inset-0 flex items-center justify-center z-10 pt-16 pb-4 px-4">
        <div className="w-full max-w-md bg-black/80 backdrop-blur-md rounded-xl shadow-lg p-6 sm:p-8">
          <div className="text-center">
            <Typography
              variant="h3"
              className="text-white font-bold mb-1 text-2xl sm:text-3xl"
            >
              Welcome Back
            </Typography>
            <Typography className="text-gray-400 text-sm sm:text-base">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-red-500 hover:text-red-400"
              >
                Sign Up
              </Link>
            </Typography>
          </div>

          {authError && (
            <div className="bg-red-900/50 border border-red-500 text-red-100 px-4 py-3 rounded-lg mt-4 text-sm sm:text-base">
              {authError}
            </div>
          )}

          <form
            className="mt-4 sm:mt-6 space-y-4 sm:space-y-5"
            onSubmit={handleSubmit}
          >
            <div className="space-y-3 sm:space-y-4">
              <div>
                <Input
                  size="lg"
                  label="Email"
                  name="email"
                  type="email"
                  color="white"
                  error={!!errors.email}
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-white placeholder-gray-400"
                  labelProps={{
                    className:
                      "!text-gray-300 peer-focus:!text-white text-sm sm:text-base",
                  }}
                />
                {errors.email && touched.email && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal text-xs sm:text-sm"
                  >
                    {errors.email}
                  </Typography>
                )}
              </div>

              <div className="relative">
                <Input
                  size="lg"
                  label="Password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  color="white"
                  error={!!errors.password}
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="text-white placeholder-gray-400 pr-10"
                  labelProps={{
                    className:
                      "!text-gray-300 peer-focus:!text-white text-sm sm:text-base",
                  }}
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-400 hover:text-white"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeSlashIcon className="h-5 w-5" />
                  ) : (
                    <EyeIcon className="h-5 w-5" />
                  )}
                </button>
                {errors.password && touched.password && (
                  <Typography
                    variant="small"
                    color="red"
                    className="mt-1 flex items-center gap-1 font-normal text-xs sm:text-sm"
                  >
                    {errors.password}
                  </Typography>
                )}
              </div>
            </div>

            <div className="flex justify-end">
              <Link
                to="/forgot-password"
                className=" text-gray-400 hover:text-white text-xs sm:text-sm"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 sm:py-3 px-4 bg-red-700 hover:bg-red-800 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>

            <Typography className="text-center text-gray-400 text-xs sm:text-sm">
              <Link to="/" className="hover:text-white">
                Back to Home
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
