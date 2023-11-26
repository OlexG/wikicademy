import Header from "../islands/Header.tsx";
import Signin from "../islands/Signin.tsx";
const REDIRECT = Deno.env.get("RED_URL") || "";
const CLIENT_ID = Deno.env.get("CLIENT_ID") || "";
export default function SigninPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Signin redirect={REDIRECT} clientId={CLIENT_ID} />
    </div>
  );
}
