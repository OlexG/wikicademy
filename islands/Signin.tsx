import { useEffect } from "preact/hooks";

const CLIENT_ID =
  "21266036438-dqd3f10b458lnja9ard6h54ch7r7ukqe.apps.googleusercontent.com";
const REDIRECT = "http://localhost:8000/signin";



export default function Signin() {
  useEffect(() => {
    const url = new URL(window.location.href);
    console.log(url)
    if (url.searchParams.get("code")) {
      // Send the code to google to get the token
      const code = url.searchParams.get("code");
      fetch(`/api/auth?code=${code}`)
        .then((res) => res.json())
        .then((data) => {
          // Save to local storage and redirect to homepage
          if (data.error || !data.session) {
            // TODO: Show error message
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            window.location.href = "/";
          }
        });
    }
  }, []);

  const loginWithGoogle = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = url;
  };

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-light">
        Log in to <span className="text-blue-500">Wikicademy</span>
      </h1>
      <button
        className="mx-auto text-center bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
        onClick={loginWithGoogle}
      >
        Login with Google
      </button>
    </div>
  );
}
