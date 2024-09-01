import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import useAuth from "../../hooks/use_auth";
import { ThreeDots } from "react-loader-spinner";

export default function AuthDialog() {
    const navigate = useNavigate();
    const [serverError, setServerError] = useState<string>("");
    const [showLogin, setShowLogin] = useState<boolean>(false);

    const [isLoading, setLoading] = useState<boolean>(false);

    const { signIn, signUp } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("sihtoken");
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
            setLoading(true);
            setServerError("");

            const error = await signUp({
                values: values,
            });

            setLoading(false);
            if (error == null) {
                showSnackbar();
                navigate("/");
            } else {
                setServerError(error);
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
            setServerError("");
            setLoading(true);

            const error = await signIn({ values: values });

            setLoading(false);
            if (error == null) {
                showSnackbar();
                navigate("/");
            } else {
                setServerError(error);
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
        <div
            onClick={(event) => {
                if (isLoading) {
                    return;
                }

                if (event.target === event.currentTarget) {
                    navigate("/");
                }
            }}
            className="absolute inset-0 flex items-center justify-center backdrop-blur-sm z-10"
        >
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
                                    className="w-full flex items-center justify-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    {isLoading ? (
                                        <ThreeDots
                                            height={24}
                                            color="#facc15"
                                        />
                                    ) : (
                                        <p className="h-[24px]">Login</p>
                                    )}
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
                                    className="w-full flex items-center justify-center py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                                >
                                    {isLoading ? (
                                        <ThreeDots
                                            height={24}
                                            color="#facc15"
                                        />
                                    ) : (
                                        <p className="h-[24px]">Sign Up</p>
                                    )}
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
                                {/* <ThreeDots /> */}
                                {showLogin ? "Sign Up" : "Login"}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
