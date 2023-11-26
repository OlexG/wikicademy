import Header from "../islands/Header.tsx";
import CreatePage from "../islands/Create.tsx";

export default function Create() {
  return (
    <div className="flex flex-col h-screen">
      <Header />
      <CreatePage />
    </div>
  )
}