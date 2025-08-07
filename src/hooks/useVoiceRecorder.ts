import { useState, useEffect, useCallback } from 'react';

const useVoiceRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
    const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
    const [mimeType, setMimeType] = useState('audio/webm');

    const handleDataAvailable = useCallback((event: BlobEvent) => {
        console.log('Data available:', event.data.size);
        if (event.data.size > 0) {
            setAudioChunks((prev) => [...prev, event.data]);
        }
    }, []);

    useEffect(() => {
        if (mediaRecorder) {
            mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
            return () => {
                mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
            };
        }
    }, [mediaRecorder, handleDataAvailable]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const selectedMimeType = MediaRecorder.isTypeSupported('audio/webm')
                ? 'audio/webm'
                : 'audio/wav';
            setMimeType(selectedMimeType);

            const recorder = new MediaRecorder(stream, { mimeType: selectedMimeType });
            setMediaRecorder(recorder);
            
            // Clear previous chunks
            setAudioChunks([]);
            
            recorder.start();
            setIsRecording(true);
            console.log('Recording started');
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    const stopRecording = () => {
        return new Promise<Blob>((resolve, reject) => {
            if (mediaRecorder && isRecording) {
                const handleDataAvailable = (event: BlobEvent) => {
                    console.log('Final data available:', event.data.size);
                    if (event.data.size > 0) {
                        setAudioChunks(prev => {
                            const newChunks = [...prev, event.data];
                            // Create blob with the final chunks
                            const blob = new Blob(newChunks, { type: mimeType });
                            resolve(blob);
                            return newChunks;
                        });
                    } else {
                        reject(new Error('No audio data recorded'));
                    }
                };

                const handleStop = () => {
                    setIsRecording(false);
                    console.log('Recording stopped');
                    
                    // Stop all tracks
                    mediaRecorder.stream.getTracks().forEach(track => track.stop());
                    
                    // Remove event listeners
                    mediaRecorder.removeEventListener('dataavailable', handleDataAvailable);
                    mediaRecorder.removeEventListener('stop', handleStop);
                };

                mediaRecorder.addEventListener('dataavailable', handleDataAvailable);
                mediaRecorder.addEventListener('stop', handleStop);
                mediaRecorder.stop();
            } else {
                reject(new Error('No recording in progress'));
            }
        });
    };

    const getAudioBlob = () => {
        console.log('Getting audio blob, chunks:', audioChunks.length);
        return new Blob(audioChunks, { type: mimeType });
    };

    const resetAudioChunks = () => {
        setAudioChunks([]);
    };

    return {
        isRecording,
        startRecording,
        stopRecording,
        getAudioBlob,
        resetAudioChunks
    };
};

export default useVoiceRecorder;

type UseVoiceRecorderReturn = {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
    audioBlob?: Blob;
    onRecordingComplete?: (audioBlob: Blob) => void;
};