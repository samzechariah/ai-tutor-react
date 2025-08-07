import React, { useEffect, useRef } from 'react';

interface VoiceOutputProps {
    text: string;
    rate?: number;
    pitch?: number;
    onSpeakingChange?: (isSpeaking: boolean) => void;
}

const VoiceOutput: React.FC<VoiceOutputProps> = ({ 
    text, 
    rate = 1, 
    pitch = 1, 
    onSpeakingChange 
}) => {
    const synth = useRef<SpeechSynthesis | null>(window.speechSynthesis);
    const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
    const lastTextRef = useRef<string>('');

    useEffect(() => {
        // Only speak if text has actually changed
        if (synth.current && text && text !== lastTextRef.current) {
            console.log('About to speak (new text):', text);
            lastTextRef.current = text;
            
            // Cancel any ongoing speech
            synth.current.cancel();
            
            // Wait for cancel to complete
            setTimeout(() => {
                const utterance = new SpeechSynthesisUtterance(text);
                utterance.rate = rate;
                utterance.pitch = pitch;
                utteranceRef.current = utterance;

                utterance.onstart = () => {
                    console.log('Speech started successfully');
                    onSpeakingChange?.(true);
                };

                utterance.onend = () => {
                    console.log('Speech ended normally');
                    onSpeakingChange?.(false);
                    utteranceRef.current = null;
                };

                utterance.onerror = (error) => {
                    console.log('Speech error:', error);
                    onSpeakingChange?.(false);
                    utteranceRef.current = null;
                };

                // Start speaking
                console.log('Starting speech...');
                synth.current?.speak(utterance);
            }, 200);
        }

        return () => {
            // Only cancel on unmount, not on every effect run
            if (synth.current && utteranceRef.current) {
                synth.current.cancel();
                onSpeakingChange?.(false);
            }
        };
    }, [text]); // Only depend on text, not on rate, pitch, or onSpeakingChange

    return null;
};

export default VoiceOutput;