import Image from "next/image";
import React, { useState } from "react";

const TextToImage = () => {
  const [inputText, setInputText] = useState("");
  const [textResult, setTextResult] = useState("");
  const [imageURL, setImageURL] = useState("");

  const queryAPI = async () => {
    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/playgroundai/playground-v2-1024px-aesthetic",
        {
          method: "POST",
          headers: {
            Authorization: "Bearer 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",
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ inputs: inputText }),
        }
      );
      // Check if the request was successful (status code 200)
      if (!response.ok) {
        throw new Error(`Request failed with status: ${response.status}`);
      }
      // Determine the content type of the response
      const contentType = response.headers.get("content-type");
      // Handle different content types
      if (contentType && contentType.includes("application/json")) {
        // If the response is JSON, parse it
        const result = await response.json();
        console.log(result);
        // Display the text result
        setTextResult(result);
        setImageURL("");
      } else if (contentType && contentType.includes("image")) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        // Display the image
        setImageURL(url);
        setTextResult("");
      } else {
        throw new Error(`Unexpected content type: ${contentType}`);
      }
    } catch (error: any) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div>
      <h1>Image-to-Text API</h1>
      <input
        type="text"
        placeholder="Enter text for processing"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button onClick={queryAPI}>Process</button>

      {textResult && <div>Text Result: {textResult}</div>}
      {imageURL && (
        <Image src={imageURL} alt="Processed Image" width={500} height={500} />
      )}
    </div>
  );
};

export default TextToImage;
