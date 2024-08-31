import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

export default function AuthDialog() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string>("");
    const [showLogin, setShowLogin] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token != null && token.length > 0) {
            navigate("/");
        }
    }, [navigate]);

    const signUpForm = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required."),
            email: Yup.string()
                .required("Email is required.")
                .email("Please enter a valid email."),
            password: Yup.string()
                .required("Password is required.")
                .min(8, "Password should be at least 8 characters."),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setServerError("");
            try {
                const response = await fetch(
                    "https://sih-internal-backend-pm7h.onrender.com/auth/signup",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: values.name,
                            password: values.password,
                            email: values.email,
                        }),
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    console.log("data : ", data);
                    if (data.success) {
                        localStorage.setItem("token", data.token);
                        showSnackbar();
                        navigate("/");
                    } else {
                        setServerError(
                            data.message ||
                                "There is some problem in creating your account."
                        );
                    }
                } else {
                    setServerError(
                        data.message ||
                            "There is some problem in creating your account."
                    );
                }
            } catch (error) {
                console.error(error);
                setServerError(
                    "There is some problem in creating your account."
                );
            }
        },
    });

    const loginForm = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: Yup.object({
            email: Yup.string()
                .required("Email is required.")
                .email("Please enter a valid email."),
            password: Yup.string()
                .required("Password is required.")
                .min(8, "Password should be at least 8 characters."),
        }),
        onSubmit: async (values) => {
            console.log(values);
            setServerError("");
            try {
                const response = await fetch(
                    "https://sih-internal-backend-pm7h.onrender.com/auth/login",
                    {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            password: values.password,
                            email: values.email,
                        }),
                    }
                );
                const data = await response.json();
                if (response.ok) {
                    console.log("data : ", data);
                    if (data.success) {
                        localStorage.setItem("token", data.token);
                        showSnackbar();
                        navigate("/");
                    } else {
                        setServerError(
                            data.message ||
                                "There is some problem in logging in."
                        );
                    }
                } else {
                    setServerError(
                        data.message || "There is some problem in logging in."
                    );
                }
            } catch (error) {
                console.error(error);
                setServerError("There is some problem in logging in.");
            }
        },
    });

    const showSnackbar = () => {
        // Get the snackbar DIV
        const x = document.getElementById("snackbar");

        // Add the "show" class to DIV
        if (x) {
            x.className = "show";

            // After 3 seconds, remove the show class from DIV
            setTimeout(() => {
                x.className = x.className.replace("show", "");
            }, 3000);
        }
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10">
            <div className="bg-amber-300 shadow sm:rounded-lg w-full max-w-lg p-6 sm:p-12">
                <div className="flex flex-col items-center">
                    <h1 className="text-2xl font-extrabold mb-6">
                        {showLogin ? "Login" : "Sign Up"}
                    </h1>
                    <div className="w-full">
                        {showLogin ? (
                            <form
                                onSubmit={loginForm.handleSubmit}
                                className="space-y-4"
                            >
                                <input
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                    type="email"
                                    placeholder="Email"
                                    {...loginForm.getFieldProps("email")}
                                />
                                {loginForm.errors.email && (
                                    <p className="text-red-600 text-xs">
                                        {loginForm.errors.email}
                                    </p>
                                )}
                                <input
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                    type="password"
                                    placeholder="Password"
                                    {...loginForm.getFieldProps("password")}
                                />
                                {loginForm.errors.password && (
                                    <p className="text-red-600 text-xs">
                                        {loginForm.errors.password}
                                    </p>
                                )}
                                {serverError && (
                                    <p className="text-red-600 text-xs">
                                        {serverError}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Login
                                </button>
                            </form>
                        ) : (
                            <form
                                onSubmit={signUpForm.handleSubmit}
                                className="space-y-4"
                            >
                                <input
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                    type="text"
                                    placeholder="Name"
                                    {...signUpForm.getFieldProps("name")}
                                />
                                {signUpForm.errors.name && (
                                    <p className="text-red-600 text-xs">
                                        {signUpForm.errors.name}
                                    </p>
                                )}
                                <input
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                    type="email"
                                    placeholder="Email"
                                    {...signUpForm.getFieldProps("email")}
                                />
                                {signUpForm.errors.email && (
                                    <p className="text-red-600 text-xs">
                                        {signUpForm.errors.email}
                                    </p>
                                )}
                                <input
                                    className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-200 text-sm focus:outline-none focus:border-gray-400"
                                    type="password"
                                    placeholder="Password"
                                    {...signUpForm.getFieldProps("password")}
                                />
                                {signUpForm.errors.password && (
                                    <p className="text-red-600 text-xs">
                                        {signUpForm.errors.password}
                                    </p>
                                )}
                                {serverError && (
                                    <p className="text-red-600 text-xs">
                                        {serverError}
                                    </p>
                                )}
                                <button
                                    type="submit"
                                    className="w-full py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    Sign Up
                                </button>
                            </form>
                        )}
                        <p className="mt-4 text-xs text-gray-600 text-center">
                            {showLogin
                                ? "Don't have an account?"
                                : "Already have an account?"}
                            <button
                                onClick={() => setShowLogin(!showLogin)}
                                className="ml-1 text-indigo-500 hover:underline"
                            >
                                {showLogin ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
