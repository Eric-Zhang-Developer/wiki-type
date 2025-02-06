"use client";
import { useState } from "react";
import fetchPage from "@/utils/fetch-page";
import cleanString from "@/utils/clean-text";
import { RotateCcw } from 'lucide-react';

export default function Home() {
  const [text, setText] = useState("Placeholder Text");

  const handelFetch = async () => {
    const pageText = await fetchPage();
    setText(cleanString(pageText));
  };
  return (
    <div className="">
      <main className="flex flex-col items-center gap-8">
        <button
          className="transform bg-slate-800 text-white text-2xl mt-6
          py-3 px-4 mr-4 rounded-lg shadow-md flex justify-center items-center gap-2
          transition hover:shadow-xl hover:bg-emerald-500 hover:scale-105
          w-3/4 lg:w-2/4 font-serif"
          onClick={() => handelFetch()}
        >
          Fetch Wikipeida Page <RotateCcw></RotateCcw>
        </button>
        <p className="bg-slate-900 text-slate-200 text-center p-4">{text}</p>

        <div>
          <input
            className=""
          />
        </div>

      </main>
    </div>
  );
}
