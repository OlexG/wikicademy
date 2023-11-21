import Header from "../islands/Header.tsx";
import Signin from "../islands/Signin.tsx";

export default function SigninPage() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <Signin />
    </div>
  );
}
