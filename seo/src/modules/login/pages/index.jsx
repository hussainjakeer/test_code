import { useGoogleLogin } from "@react-oauth/google";
import LocalStorage from "../../../services/localStorage";
import { useDispatch } from "react-redux";
import { handleAuthentication } from "../../../store/commonSlice";
import { useNavigate } from "react-router-dom";
import routesConstants from "../../../routes/routesConstants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scopes = [
    "https://www.googleapis.com/auth/webmasters.readonly", // Read-only access to Search Console
    "https://www.googleapis.com/auth/webmasters",           // Full access to Search Console
    "https://www.googleapis.com/auth/userinfo.email",      // Access to user's email
    "https://www.googleapis.com/auth/userinfo.profile",    // Access to user's profile
    "openid"                                              // OpenID Connect, for authentication
  ].join(" ");  // Joining scopes with a space, as expected by Google OAuth
  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse.access_token);
      if (tokenResponse?.access_token) {
        LocalStorage.set("token", tokenResponse.access_token);
        dispatch(handleAuthentication(true));
        navigate(routesConstants.HOME);
      }
      // const userInfo = await axios.get(
      //   "https://www.googleapis.com/oauth2/v3/userinfo",
      //   {
      //     headers: {
      //       Authorization: `Bearer ${tokenResponse.access_token}`,
      //     },
      //   }
      // );

      // const userData = userInfo.data;
      // console.log(userData);
    },
    onError: () => {
      console.log("Login Failed. Please try again.");
    },
    scope: scopes,
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f9fafb]">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-semibold mb-6">Login</h1>
        <button
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 hover:bg-blue-600"
          onClick={() => login()}
        >
          Sign in with Google 🚀
        </button>
      </div>
    </div>
  );
};

export default Login;