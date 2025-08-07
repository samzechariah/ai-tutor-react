import { useEffect, useRef } from 'react';

const useSpeechSynthesis = () => {
  const synth = window.speechSynthesis;
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speak = (text: string, rate: number = 1, pitch: number = 1) => {
    if (synth.speaking) {
      synth.cancel();
    }

    utteranceRef.current = new SpeechSynthesisUtterance(text);
    utteranceRef.current.rate = rate;
    utteranceRef.current.pitch = pitch;

    synth.speak(utteranceRef.current);
  };

  const cancel = () => {
    if (synth.speaking) {
      synth.cancel();
    }
  };

  useEffect(() => {
    return () => {
      cancel();
    };
  }, []);

  return { speak, cancel };
};

export default useSpeechSynthesis;