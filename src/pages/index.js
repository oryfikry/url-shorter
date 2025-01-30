import { useState } from "react";
import Spinner from "@/components/Spinner";
import "tailwindcss/tailwind.css";
import { Copy, CornerRightDown, Link2, X } from "lucide-react";
import { copyToClipboard } from "@/lib/utils";

const themes = {
  blue: "bg-blue-500 hover:bg-blue-600",
  green: "bg-green-500 hover:bg-green-600",
  red: "bg-red-500 hover:bg-red-600",
  purple: "bg-purple-500 hover:bg-purple-600",
};

export default function Home() {
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [theme, setTheme] = useState("blue");
  const removeUrl = ()=>{
    setOriginalUrl("")
    setShortUrl("")
  }

  const generateShortUrl = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalUrl }),
      });

      const data = await response.json();
      if (response.ok) {
        setShortUrl(
          `${process.env.NEXT_PUBLIC_REDIRECT_URL_SHORT}api/${data.shortId}`
        );
      } else {
        setError(data.error || "Failed to generate short link");
      }
    } catch (err) {
      setError("An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Theme Selector */}
      <div className="absolute top-4 right-4">
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className="p-2 border text-${theme}-500 rounded shadow"
        >
          {Object.keys(themes).map((key) => (
            <option key={key} value={key}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className={`flex item-center justify-center text-2xl font-bold text-center text-${theme}-500`}>
          Go Sh<Link2 size={20} style={{marginTop:'10px'}} />rt
        </h1>
        <h2 className="text-center mb-8">
          Short your messy link !
        </h2>
        {/* Input Field with Clear Button */}
        <div className="relative">
          <input
            type="url"
            placeholder="Enter your URL"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            className="w-full p-2 pr-10 border rounded mb-4"
          />
          {originalUrl && (
            <button
              style={{ transform: "translateY(-75%)" }}
              onClick={() => removeUrl()}
              className="absolute right-2 top-2/4 bg-gray-200 hover:bg-gray-300 text-gray-600 p-1 rounded-full"
            >
              <X size={18} />
            </button>
          )}
        </div>

        <button
          onClick={generateShortUrl}
          disabled={isLoading}
          className={`w-full font-bold text-white p-2 rounded ${themes[theme]}`}
        >
          {isLoading ? <Spinner /> : "Generate"}
        </button>

        {shortUrl && (
          <div className="mt-4 text-center py-4">
            <div className="text-center flex items-center pb-2">URL has been shortened <CornerRightDown size={20} /></div>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`font-bold w-full block p-2 rounded text-white text-center ${themes[theme]}`}
            >
              {shortUrl}
            </a>
            <button
              onClick={copyToClipboard(shortUrl)}
              className={`flex item-center mt-2 font-bold w-full block p-2 rounded text-white text-center ${themes[theme]}`}
            >
              Copy URL <Copy className="pl-2" />
            </button>
          </div>
        )}

        {error && <div className="mt-4 text-red-500 text-center">{error}</div>}
        <div className="mt-4 text-white-500 text-center pt-6">Created by oryfikry</div>
      </div>
    </div>
  );
}
