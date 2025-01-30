export const copyToClipboard = (shortUrl) => {
    if (shortUrl) {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shortUrl)
          .then(() => alert("URL copied to clipboard!"))
          .catch(() => alert("Failed to copy the URL!"));
      } else {
        // Fallback for unsupported environments
        const textArea = document.createElement("textarea");
        textArea.value = shortUrl;
        textArea.style.position = "fixed"; // Avoid scrolling to bottom
        textArea.style.opacity = "0"; // Make it invisible
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand("copy");
          alert("URL copied to clipboard!");
        } catch (err) {
          alert("Failed to copy the URL!");
        }
        document.body.removeChild(textArea);
      }
    }
  };
  