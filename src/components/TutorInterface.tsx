import React, { useState } from 'react';
import StepGuide from './StepGuide';
import VoiceInput from './VoiceInput';
import VoiceOutput from './VoiceOutput';

// Example initial data for demonstration
const initialStep = {
    description: "",
    intro_message: "",
    question: "",
    start: {
        TopicExplanation: "",
        Visual: { Content: "", Label: "", Type: "" },
        Voice: ""
    },
    steps: [],
    step_number: 1,
    topic: "Parentheses First!",
    step_description: "Let's start with the innermost parentheses. What's inside?",
    equation: "8 + (6 ÷ 2 × (3 + 1)) - 5",
    answer: "4",
    calculation: "(3 + 1) = 4",
    conceptual_questions: [],
    notes: { Description: "", UpdatedExpression: "" }
};

const TutorInterface: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(initialStep);
    const [aiResponse, setAiResponse] = useState("Let's begin!");
    const [rate, setRate] = useState(1);
    const [pitch, setPitch] = useState(1);

    return (
        <div className="tutor-interface">
            <h1>AI Tutor Interface</h1>
            <StepGuide step={currentStep} />
            <VoiceInput setAiResponse={setAiResponse} />
            <VoiceOutput text={aiResponse} rate={rate} pitch={pitch} />
        </div>
    );
};

export default TutorInterface;