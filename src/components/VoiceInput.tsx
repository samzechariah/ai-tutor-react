import React, { useState, useCallback } from 'react';
import useVoiceRecorder from '../hooks/useVoiceRecorder';
import { transcribeAudio } from '../utils/api';
import VoiceOutput from './VoiceOutput';
import SpeakingIndicator from './SpeakingIndicator';

type VoiceInputProps = {
    setAiResponse: (text: string) => void;
};

const VoiceInput: React.FC<VoiceInputProps> = ({ setAiResponse }) => {
    const [isSpeaking, setIsSpeaking] = useState(false);
    const [speechId, setSpeechId] = useState(0);
    const [aiResponse, setAiResponseLocal] = useState('');
    const { isRecording, startRecording, stopRecording, resetAudioChunks } = useVoiceRecorder();

    const handleStopRecording = async () => {
        try {
            const audioBlob = await stopRecording();
            if (audioBlob && audioBlob.size > 0) {
                const response = await transcribeAudio(audioBlob);
                setAiResponseLocal(response.ai_reply); // update local state
                setAiResponse(response.ai_reply); // update parent if needed
                setSpeechId(id => id + 1); // Force new speech
                resetAudioChunks();
            } else {
                console.error('No audio data recorded');
            }
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    const handleSpeakingChange = useCallback((speaking: boolean) => {
        setIsSpeaking(speaking);
    }, []);

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <button 
                onClick={isRecording ? handleStopRecording : startRecording}
                style={{
                    padding: '15px 30px',
                    fontSize: '18px',
                    backgroundColor: isRecording ? '#ff4444' : '#4CAF50',
                    color: 'white',
                    border: 'none',
                    borderRadius: '25px',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                {isRecording ? '🛑 Stop Recording' : '🎤 Start Recording'}
            </button>

            {/* Show speaking indicator when AI is talking */}
            {isSpeaking && <SpeakingIndicator />}
            
            <VoiceOutput 
                key={speechId}
                text={aiResponse}
                onSpeakingChange={handleSpeakingChange}
            />
        </div>
    );
};

export default VoiceInput;