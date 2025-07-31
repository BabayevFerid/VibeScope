// components/AudioPlayer.tsx
import { useRef, useState } from "react";

type Props = {
  onAudioSelect: (file: File) => void;
};

export default function AudioPlayer({ onAudioSelect }: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [audioURL, setAudioURL] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAudioURL(url);
      onAudioSelect(file);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <input
        type="file"
        accept="audio/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <button
        onClick={() => fileInputRef.current?.click()}
        className="bg-teal-500 hover:bg-teal-600 text-white font-semibold px-4 py-2 rounded-xl shadow"
      >
        Musiqi Yüklə 🎵
      </button>

      {audioURL && (
        <audio controls src={audioURL} className="mt-4 w-full max-w-md" />
      )}
    </div>
  );
}
