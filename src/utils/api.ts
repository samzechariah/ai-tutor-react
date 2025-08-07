import axios from 'axios';

const API_BASE_URL = 'https://knova.knomadixapp.com';

export const transcribeAudio = async (audioBlob: Blob) => {
    try {
        // Send audio file directly to Python backend
        const formData = new FormData();
        const extension = audioBlob.type.split('/')[1] || 'webm';
        formData.append('audio', audioBlob, `recording.${extension}`);

        const response = await axios.post(`${API_BASE_URL}/transcribe`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });

        return response.data;
    } catch (error) {
        console.error('Error transcribing audio:', error);
        throw error;
    }
};

export const fetchStepData = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/steps`);
        return response.data;
    } catch (error) {
        console.error('Error fetching step data:', error);
        throw error;
    }
};