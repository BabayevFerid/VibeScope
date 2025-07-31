// components/MoodAnalyzer.tsx
import { useEffect, useState } from "react";

type Props = {
  file: File;
};

export default function MoodAnalyzer({ file }: Props) {
  const [mood, setMood] = useState<string>("Analiz olunur...");

  useEffect(() => {
    const analyze = async () => {
      const audioCtx = new AudioContext();
      const arrayBuffer = await file.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const channelData = audioBuffer.getChannelData(0);
      const samples = channelData.slice(0, 44100); // ilk 1 saniyə

      const avg = samples.reduce((sum, val) => sum + Math.abs(val), 0) / samples.length;

      // Sadə qayda ilə emosiya çıxart (demo məqsədi ilə)
      let detectedMood = "Neutral";
      if (avg > 0.05) detectedMood = "Energetic";
      else if (avg > 0.02) detectedMood = "Calm";
      else detectedMood = "Sad";

      setMood(detectedMood);
      audioCtx.close();
    };

    analyze();
  }, [file]);

  return (
    <div className="mt-6 text-center">
      <h2 className="text-2xl font-semibold text-teal-400">🎭 Mood Detected:</h2>
      <p className="text-3xl font-bold mt-2">{mood}</p>
    </div>
  );
}
