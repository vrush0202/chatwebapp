import React, { useState, useEffect } from "react";

const App = () => {
  const [response, setResponse] = useState("");
  const [listening, setListening] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      setSpeechRecognition(recognition);
    } else {
      console.log("Speech recognition not supported.");
    }
  }, []);

  const handleGenerateAudio = async () => {
    try {
      var synthesis = window.speechSynthesis;
      if ("speechSynthesis" in window) {
        // Get the first `en` language voice in the list
        var voice = synthesis.getVoices().filter(function (voice) {
          return voice.lang === "en";
        })[0];

        // Create an utterance object
        var utterance = new SpeechSynthesisUtterance(response);
        // Set utterance properties
        utterance.voice = voice;
        utterance.pitch = 1.0;
        utterance.rate = 1.0;
        utterance.volume = 1;

        // Speak the utterance
        console.log("Synthesis is speaking");
        synthesis.speak(utterance);
      } else {
        console.log("Text-to-speech not supported.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleListen = () => {
    if (speechRecognition) {
      setListening(true);
      speechRecognition.start();
    } else {
      console.log("Speech recognition not supported.");
    }
  };

  const handleStopListening = () => {
    if (speechRecognition) {
      setListening(false);
      speechRecognition.stop();
    } else {
      console.log("Speech recognition not supported.");
    }
  };

  if (speechRecognition) {
    speechRecognition.onresult = (event) => {
      const speechToText = event.results[0][0].transcript;
      setResponse(speechToText);
    };
  }

  return (
    <div>
      <h1>GPT Audio Web App</h1>
      <div style={{ display: "flex" }}>
        <button onClick={handleGenerateAudio}>Generate Audio</button>
        <button onClick={listening ? handleStopListening : handleListen}>
          {listening ? "Stop Listening" : "Start Listening"}
        </button>
      </div>
      {response && <p>Response: {response}</p>}
    </div>
  );
};

export default App;
