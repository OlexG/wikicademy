import { PageProps } from "$fresh/server.ts";
import Editor from "../../../../islands/Editor.tsx";
import Header from "../../../../islands/Header.tsx";
import { Head, asset } from "$fresh/runtime.ts";
// read css file as a string
const css = await Deno.readTextFile("./static/styles.css");

export default function Course({ params }: PageProps) {
  return (
    <>
      <Head>
        <title>Editor</title>
      </Head>
      <div className="h-screen flex flex-col">
        <style>{css}</style>
        <Header />
        <Editor index={params.index} id={params.id} />
      </div>
    </>
  );
}
