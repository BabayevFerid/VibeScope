// pages/index.tsx
import Head from "next/head";
import { useState } from "react";
import AudioPlayer from "@/components/AudioPlayer";
import MoodAnalyzer from "@/components/MoodAnalyzer";
import GPTComment from "@/components/GPTComment";
import Waveform from "@/components/Waveform";

export default function Home() {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  return (
    <>
      <Head>
        <title>VibeScope</title>
      </Head>
      <main className="min-h-screen bg-gradient-to-br from-zinc-900 to-black text-white flex flex-col items-center justify-center p-6 space-y-10">
        <h1 className="text-5xl font-bold text-teal-400 drop-shadow-md">
          VibeScope 🎶
        </h1>

        <AudioPlayer onAudioSelect={setAudioFile} />
        {audioFile && (
          <>
            <Waveform file={audioFile} />
            <MoodAnalyzer file={audioFile} />
            <GPTComment file={audioFile} />
          </>
        )}
      </main>
    </>
  );
}
