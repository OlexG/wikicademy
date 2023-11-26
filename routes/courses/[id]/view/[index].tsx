import { PageProps } from "$fresh/server.ts";
import Editor from "../../../../islands/Editor.tsx";
import Header from "../../../../islands/Header.tsx";
import { Head, asset } from "$fresh/runtime.ts";
import Viewer from "../../../../islands/Viewer.tsx";
// read css file as a string
const css = await Deno.readTextFile("./static/styles.css");

export default function Course({ params }: PageProps) {
  return (
    <>
      <Head>
        <title>Viewer</title>
      </Head>
      <div className="h-screen flex flex-col">
        <style>{css}</style>
        <Header />
        <Viewer index={params.index} id={params.id} />
      </div>
    </>
  );
}
