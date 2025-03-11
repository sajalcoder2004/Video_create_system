
// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", function () {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const body = document.body;
    
    // Check if Dark Mode was previously enabled
    if (localStorage.getItem("darkMode") === "enabled") {
        body.classList.add("dark-mode");
        darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }

    // Toggle Dark Mode
    darkModeToggle.addEventListener("click", function () {
        body.classList.toggle("dark-mode");

        if (body.classList.contains("dark-mode")) {
            localStorage.setItem("darkMode", "enabled");
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.removeItem("darkMode");
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
});


// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";
const GEMINI_API_KEY = "AIzaSyD21ncQ66Pa1j8VjIZcXt5U2497VzXv9jw"; // Replace this with your actual API key

document.addEventListener("DOMContentLoaded", function () {
    const generateScriptBtn = document.getElementById("generateScript");
    const regenerateScriptBtn = document.getElementById("regenerateScript");
    const copyScriptBtn = document.getElementById("copyScript");
    const videoType = document.getElementById("videoType");
    const videoDescription = document.getElementById("videoDescription");
    const loading = document.getElementById("loading");
    const scriptOutput = document.getElementById("scriptOutput");
    const scriptText = document.getElementById("scriptText");

    // Function to fetch AI-generated script from Gemini API
    async function generateAIScript() {
        const type = videoType.value;
        const description = videoDescription.value.trim();

        if (description === "") {
            alert("Please enter a video description.");
            return;
        }

        // Show loading animation
        loading.style.display = "block";
        scriptOutput.style.display = "none";

        // Create the AI prompt
        const prompt = `Act as a professional scriptwriter. Generate a high-quality, engaging, and structured video script based on the following details:\n\n
        - **Video Type:** ${type}\n
        - **Description:** ${description}\n
        - **Tone:** Professional, Conversational, Persuasive\n
        - **Structure:** Include an engaging **Intro**, informative **Main Content**, and a compelling **Call-to-Action (CTA)**.\n
        - **Target Audience:** Make it suitable for a business, educational, entertainment, or marketing audience.\n
        - **Script Length:** Keep it concise yet impactful (about 150-200 words).\n
        - **Style:** Use a storytelling approach for better engagement.\n\n
        Generate the script in a structured format like:\n\n
        [INTRO]\n
        - Catchy opening line that grabs attention.\n
        - Hook to keep the audience engaged.\n\n
        [MAIN CONTENT]\n
        - Detailed content relevant to ${description}.\n
        - Step-by-step explanation or key points.\n\n
        [CLOSING]\n
        - Strong Call-to-Action (CTA) based on ${type}.`;

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            
            // Extract AI-generated text
            const aiScript = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No script generated.";

            // Hide loading and display script
            loading.style.display = "none";
            scriptText.textContent = aiScript;
            scriptOutput.style.display = "block";

        } catch (error) {
            console.error("Error fetching AI script:", error);
            loading.style.display = "none";
            alert("Failed to generate script. Please try again.");
        }
    }

    // Event Listener for Generate Script Button
    generateScriptBtn.addEventListener("click", generateAIScript);

    // Event Listener for Regenerate Script Button
    regenerateScriptBtn.addEventListener("click", generateAIScript);

    // Event Listener for Copy Script Button
    copyScriptBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(scriptText.textContent);
        alert("Script copied to clipboard!");
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const generateStoryBtn = document.getElementById("generateStory");
    const regenerateStoryBtn = document.getElementById("regenerateStory");
    const copyStoryBtn = document.getElementById("copyStory");
    const storyScript = document.getElementById("storyScript");
    const storyLoading = document.getElementById("storyLoading");
    const storyOutput = document.getElementById("storyOutput");
    const storyText = document.getElementById("storyText");

    // Function to fetch AI-generated story from Gemini API
    async function generateAIStory() {
        const scriptText = storyScript.value.trim();

        if (scriptText === "") {
            alert("Please enter a script.");
            return;
        }

        // Show loading animation
        storyLoading.style.display = "block";
        storyOutput.style.display = "none";

        // Create the AI prompt
        const prompt = `Act as a professional video storyteller. Create a high-quality, engaging, and structured story based on the given script:\n\n
        - **Script:** ${scriptText}\n
        - **Story Style:** Engaging, cinematic, emotionally compelling\n
        - **Story Structure:** Follow a **beginning, middle, and end** format\n
        - **Tone:** Conversational, immersive, and easy to visualize\n
        - **Details:** Include **strong character development, vivid scene descriptions, and emotional impact**\n
        - **Story Length:** Keep it engaging but concise (200-300 words)\n\n
        Format the story as follows:\n\n
        [INTRODUCTION]\n
        - Set the scene and introduce the main character(s).\n
        - Hook the audience with an intriguing setup.\n\n
        [STORY DEVELOPMENT]\n
        - Build suspense, conflict, or emotion based on the script.\n
        - Show the main events that lead to the climax.\n\n
        [CONCLUSION]\n
        - Deliver a powerful resolution.\n
        - End with a thought-provoking or emotionally satisfying conclusion.\n\n
        Generate the story in **simple, easy-to-follow language**, ensuring it's visually appealing and impactful for a video.`;

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            
            // Extract AI-generated story
            const aiStory = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No story generated.";

            // Hide loading and display story
            storyLoading.style.display = "none";
            storyText.textContent = aiStory;
            storyOutput.style.display = "block";

        } catch (error) {
            console.error("Error fetching AI story:", error);
            storyLoading.style.display = "none";
            alert("Failed to generate story. Please try again.");
        }
    }

    // Event Listener for Generate Story Button
    generateStoryBtn.addEventListener("click", generateAIStory);

    // Event Listener for Regenerate Story Button
    regenerateStoryBtn.addEventListener("click", generateAIStory);

    // Event Listener for Copy Story Button
    copyStoryBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(storyText.textContent);
        alert("Story copied to clipboard!");
    });
});

// ..................GEMINI_API_KEY.........GEMINI_API_KEY.....



document.addEventListener("DOMContentLoaded", function () {
    const generateImagePromptBtn = document.getElementById("generateImagePrompt");
    const regenerateImagePromptBtn = document.getElementById("regenerateImagePrompt");
    const copyImagePromptBtn = document.getElementById("copyImagePrompt");
    const imageStory = document.getElementById("imageStory");
    const imageLoading = document.getElementById("imageLoading");
    const imageOutput = document.getElementById("imageOutput");
    const imagePromptList = document.getElementById("imagePromptList");

    // Function to fetch AI-generated image prompts from Gemini API
    async function generateAIImagePrompt() {
        const storyText = imageStory.value.trim();

        if (storyText === "") {
            alert("Please enter or paste a story.");
            return;
        }

        // Show loading animation
        imageLoading.style.display = "block";
        imageOutput.style.display = "none";

        // Create the AI prompt
        const prompt = `Act as an expert AI prompt engineer. Create highly detailed, visually rich, and creative image prompts based on the following story:\n\n
        - **Story:** ${storyText}\n
        - **Prompt Style:** Cinematic, detailed, vivid descriptions\n
        - **Number of Prompts:** Generate at least **3 different** image prompts for various key moments in the story\n
        - **Details to Include:** Scene composition, lighting, colors, character emotions, camera angles\n\n
        Format the prompts as follows:\n\n
        1. **[Scene Title]** - A brief summary of the scene.\n
           - Detailed description: [Describe the environment, characters, action, lighting, and mood]\n
           - Camera angle: [Close-up, wide-angle, first-person, etc.]\n
           - Color scheme: [Dark and moody, bright and colorful, cyberpunk, etc.]\n\n
        Generate multiple variations so that each prompt represents a different scene from the story.`;

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            
            // Extract AI-generated prompts
            const aiPrompt = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No prompts generated.";
            const promptArray = aiPrompt.split("\n").filter(line => line.trim() !== "");

            // Hide loading and display output
            imageLoading.style.display = "none";
            imagePromptList.innerHTML = promptArray.map(prompt => `<li>${prompt}</li>`).join("");
            imageOutput.style.display = "block";

        } catch (error) {
            console.error("Error fetching AI image prompts:", error);
            imageLoading.style.display = "none";
            alert("Failed to generate image prompts. Please try again.");
        }
    }

    // Event Listener for Generate Image Prompt Button
    generateImagePromptBtn.addEventListener("click", generateAIImagePrompt);

    // Event Listener for Regenerate Image Prompt Button
    regenerateImagePromptBtn.addEventListener("click", generateAIImagePrompt);

    // Event Listener for Copy Image Prompt Button
    copyImagePromptBtn.addEventListener("click", function () {
        const promptsText = Array.from(imagePromptList.children).map(li => li.textContent).join("\n");
        navigator.clipboard.writeText(promptsText);
        alert("Image prompts copied to clipboard!");
    });
});




document.addEventListener("DOMContentLoaded", function () {
    const extractSpeechBtn = document.getElementById("extractSpeech");
    const regenerateSpeechBtn = document.getElementById("regenerateSpeech");
    const copySpeechBtn = document.getElementById("copySpeech");
    const speechStory = document.getElementById("speechStory");
    const speechLoading = document.getElementById("speechLoading");
    const speechOutput = document.getElementById("speechOutput");
    const speechText = document.getElementById("speechText");

    // Function to fetch AI-extracted speech from Gemini API
    async function extractAISpeech() {
        const storyText = speechStory.value.trim();

        if (storyText === "") {
            alert("Please enter or paste a story.");
            return;
        }

        // Show loading animation
        speechLoading.style.display = "block";
        speechOutput.style.display = "none";

        // Create the AI prompt
        const prompt = `Act as a professional script editor. Extract only the spoken dialogues from the given story, removing all descriptions, actions, and narration:\n\n
        - **Story:** ${storyText}\n
        - **Format:**\n
           - Keep the dialogues in a **script format**\n
           - Include character names before their dialogues\n
           - Remove unnecessary descriptions, actions, and scene details\n\n
        Example Output:\n
        JOHN: "Hey, have you seen my notebook?"\n
        LISA: "Yes, I placed it on the table near the window."\n
        JOHN: "Thanks, I was looking for it everywhere!"\n\n
        Ensure that the extracted speech flows naturally and is well-structured for AI voice generation.`;

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            
            // Extract AI-generated speech text
            const aiSpeech = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No speech extracted.";

            // Hide loading and display speech
            speechLoading.style.display = "none";
            speechText.textContent = aiSpeech;
            speechOutput.style.display = "block";

        } catch (error) {
            console.error("Error extracting AI speech:", error);
            speechLoading.style.display = "none";
            alert("Failed to extract speech. Please try again.");
        }
    }

    // Event Listener for Extract Speech Button
    extractSpeechBtn.addEventListener("click", extractAISpeech);

    // Event Listener for Regenerate Speech Button
    regenerateSpeechBtn.addEventListener("click", extractAISpeech);

    // Event Listener for Copy Speech Button
    copySpeechBtn.addEventListener("click", function () {
        navigator.clipboard.writeText(speechText.textContent);
        alert("Extracted speech copied to clipboard!");
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const generateVoiceBtn = document.getElementById("generateVoice");
    const voiceStory = document.getElementById("voiceStory");
    const voiceLoading = document.getElementById("voiceLoading");
    const voiceOutput = document.getElementById("voiceOutput");
    const voiceAudio = document.getElementById("voiceAudio");

    // Function to fetch AI-generated voice from Gemini API
    async function generateAIVoice() {
        const storyText = voiceStory.value.trim();

        if (storyText === "") {
            alert("Please enter or paste a story.");
            return;
        }

        // Show loading animation
        voiceLoading.style.display = "block";
        voiceOutput.style.display = "none";

        // Create the AI prompt
        const prompt = `Convert the following story into realistic AI-generated speech:\n\n"${storyText}"`;

        try {
            // Call Gemini API
            const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }]
                })
            });

            const data = await response.json();
            
            // Extract AI-generated voice (this is a placeholder as Gemini API does not support direct voice output)
            const aiVoiceText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Error: No voice generated.";

            // Convert text to speech using browser TTS (since Gemini API does not return audio)
            const utterance = new SpeechSynthesisUtterance(aiVoiceText);
            window.speechSynthesis.speak(utterance);

            // Create a Blob URL for downloading
            const blob = new Blob([aiVoiceText], { type: "audio/wav" });
            const url = URL.createObjectURL(blob);

            // Set the audio source
            voiceAudio.src = url;

            // Hide loading and display audio player
            voiceLoading.style.display = "none";
            voiceOutput.style.display = "block";

            // Enable download button
            document.getElementById("downloadVoice").onclick = function () {
                const a = document.createElement("a");
                a.href = url;
                a.download = "AI_Voice.wav";
                a.click();
            };

        } catch (error) {
            console.error("Error fetching AI voice:", error);
            voiceLoading.style.display = "none";
            alert("Failed to generate voice. Please try again.");
        }
    }

    // Event Listener for Generate Voice Button
    generateVoiceBtn.addEventListener("click", generateAIVoice);
});

