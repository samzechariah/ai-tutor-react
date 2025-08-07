# AI Tutor App

## Overview
The AI Tutor App is an interactive learning platform that leverages AI technology to provide step-by-step tutoring in various subjects. The application features voice input and output capabilities, allowing students to engage with the content in a more dynamic way.

## Features
- **Voice Input**: Utilizes OpenAI's Whisper API to transcribe student speech into text.
- **Voice Output**: Implements the Web Speech API for text-to-speech functionality, providing spoken feedback and guidance.
- **Step-by-Step Guidance**: Presents educational content in a structured format, guiding students through complex topics.

## Project Structure
```
ai-tutor-app
├── public
│   └── index.html          # Main HTML file for the application
├── src
│   ├── components          # Contains React components
│   │   ├── StepGuide.tsx   # Displays current tutoring step
│   │   ├── VoiceInput.tsx   # Handles voice input
│   │   ├── VoiceOutput.tsx  # Manages voice output
│   │   └── TutorInterface.tsx # Main interface for the tutoring app
│   ├── hooks               # Custom hooks for functionality
│   │   ├── useSpeechSynthesis.ts # Manages speech synthesis
│   │   └── useVoiceRecorder.ts    # Manages audio recording
│   ├── utils               # Utility functions
│   │   └── api.ts         # API calls to the backend
│   ├── App.tsx            # Main application component
│   ├── index.tsx          # Entry point for the React application
│   └── types              # TypeScript types
│       └── Step.ts        # Defines the structure of step data
├── package.json            # npm configuration file
├── tsconfig.json           # TypeScript configuration file
└── README.md               # Project documentation
```

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd ai-tutor-app
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage
1. Start the development server:
   ```
   npm start
   ```
2. Open your browser and navigate to `http://localhost:3000` to access the application.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.