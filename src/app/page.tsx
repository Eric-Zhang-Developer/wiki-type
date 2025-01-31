"use client";
import { useState } from "react";
import fetchPage from "@/utils/fetch-page";
import cleanString from "@/utils/clean-text";

export default function Home() {
  const [text, setText] = useState("");

  const handelFetch = async () => {
    const pageText = await fetchPage();
    setText(cleanString(pageText));
  }
  
  return (
    <div className="">
      <main className="flex flex-col">
        <button
          className="bg-slate-200 text-xl p-5 hover:bg-slate-300 active:bg-slate-400"
          onClick={() => handelFetch()}
        >
          Fetch Wikipeida Page
        </button>
        <p className="bg-slate-600 text-white text-center">{text}</p>
      </main>
    </div>
  );
}
