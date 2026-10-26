async function loadStudyTopic() {
    const studyContainer = document.getElementById('megagroup-study-title');
    
    // Only run if the element actually exists on the page
    if (!studyContainer) return; 

    try {
        const response = await fetch('study.json');
        const data = await response.json();
        
        // Inject the text from the JSON file
        studyContainer.textContent = data.megagroup;

    } catch (error) {
        console.error('Error loading study topic:', error);
        studyContainer.textContent = 'Check announcements for current topic';
    }
}

document.addEventListener('DOMContentLoaded', loadStudyTopic);