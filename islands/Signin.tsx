import { useEffect, useState } from "preact/hooks";

export default function Signin({
  redirect,
  clientId,
}: {
  redirect: string;
  clientId: string;
}) {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const url = new URL(window.location.href);
    if (url.searchParams.get("code")) {
      // Send the code to google to get the token
      setLoading(true);
      const code = url.searchParams.get("code");
      fetch(`/api/auth?code=${code}`)
        .then((res) => res.json())
        .then(async (data) => {
          // Save to local storage and redirect to homepage
          if (data.error || !data.session) {
            // TODO: Show error message
          } else {
            localStorage.setItem("user", JSON.stringify(data));
            setLoading(false);
            window.location.href = "/";
          }
        });
    }
  }, []);

  const loginWithGoogle = () => {
    const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirect}&response_type=code&scope=openid%20email%20profile`;
    window.location.href = url;
  };

  if (loading) {
    return <div className="animate-pulse w-full h-full text-center">Loading...</div>;
  }

  return (
    <div className="w-screen h-full flex flex-col items-center justify-center gap-8">
      <h1 className="text-2xl font-light">
        Log in to <span className="text-teal">Wikicademy</span>
      </h1>
      {!clientId || !redirect ? (
        <div className="animate-pulse w-full h-full text-center">
          Loading...
        </div>
      ) : (
        <button
          className="mx-auto text-center bg-teal hover:bg-blue-700 text-white py-2 px-4 rounded-sm"
          onClick={loginWithGoogle}
        >
          Login with Google
        </button>
      )}
    </div>
  );
}
