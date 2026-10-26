async function loadEvents() {
    const container = document.getElementById('events-container');
    
    try {
        const response = await fetch('events.json');
        const events = await response.json();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); 

        let htmlContent = '';

        events.forEach(event => {
            const eventDate = new Date(event.date);
            
            if (eventDate >= today) {
                htmlContent += `
                    <!-- The tile has an onclick event to toggle the 'show-details' CSS class -->
                    <div class="event-tile" onclick="this.classList.toggle('show-details')">
                        
                        <!-- Front of the Card -->
                        <div class="event-front">
                            <div style="background-image: url('${event.image}'); background-size: cover; background-position: center; height: 200px; width: 100%;"></div>
                            <div style="padding: 1.5rem; text-align: left;">
                                <h3 style="color: var(--primary-color); margin-bottom: 0.5rem;">${event.title}</h3>
                                <p style="font-weight: bold; font-size: 0.9rem;">🗓 ${eventDate.toLocaleDateString('en-NZ', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                                <p style="font-size: 0.9rem;">⏰ ${event.time}</p>
                                <p style="font-size: 0.8rem; color: #666; margin-top: 1rem;">Tap for details &rarr;</p>
                            </div>
                        </div>

                        <!-- Back of the Card (Overlay) -->
                        <div class="event-overlay">
                            <h3 style="color: var(--primary-color); margin-bottom: 1rem;">${event.title}</h3>
                            <p style="font-size: 0.95rem; margin-bottom: 1rem;">${event.description}</p>
                            <p style="font-size: 0.8rem; color: #666; font-weight: bold;">Tap to close</p>
                        </div>

                    </div>
                `;
            }
        });

        if (htmlContent === '') {
            htmlContent = '<p style="grid-column: 1 / -1; text-align: center;">No special events coming up right now. Join us this Sunday!</p>';
        }

        container.innerHTML = htmlContent;

    } catch (error) {
        console.error('Error loading events:', error);
        container.innerHTML = '<p>Could not load events at this time.</p>';
    }
}

document.addEventListener('DOMContentLoaded', loadEvents);