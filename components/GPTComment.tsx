// components/GPTComment.tsx
import { useEffect, useState } from "react";

type Props = {
  file: File;
};

export default function GPTComment({ file }: Props) {
  const [comment, setComment] = useState<string>("Yüklənir...");
  const [mood, setMood] = useState<string>("Calm"); // moodAnalyzer-dən real olaraq gələcək

  useEffect(() => {
    const fetchComment = async () => {
      const res = await fetch("/api/gpt-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ mood }),
      });

      const data = await res.json();
      setComment(data.comment || "Şərh alınmadı.");
    };

    fetchComment();
  }, [file]);

  return (
    <div className="mt-8 bg-zinc-800 p-6 rounded-xl max-w-xl text-center shadow-lg">
      <h3 className="text-xl text-teal-300 font-semibold">🤖 GPT Yorum:</h3>
      <p className="mt-3 text-lg text-zinc-100 italic">“{comment}”</p>
    </div>
  );
}
