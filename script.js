// Initialize the map with center and zoom level for the USA
const map = L.map('map', {
    center: [39.8283, -98.5795],  // Center of the USA (Kansas)
    zoom: 4,                      // Initial zoom level
    minZoom: 4,                   // Minimum zoom level (prevents zooming out too far)
    maxZoom: 8,                   // Maximum zoom level (prevents zooming in too much)
    maxBounds: [
        [24.396308, -125.0],      // Southwest corner (bottom-left) of the USA
        [49.384358, -66.93457]    // Northeast corner (top-right) of the USA
    ],                            // Boundaries of the USA (not allowing zoom or panning outside the USA)
    maxBoundsViscosity: 1.0       // Keeps map within bounds when zooming or panning
});

// Add OpenStreetMap tiles (base layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,  // Max zoom allowed for the tile layer
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example hotel data (USA only)
const hotels = [
    {
        id: 1,
        name: "Hotel A",
        coords: [48.8566, -122.3522],  // San Francisco, CA
        video: "https://www.youtube.com/embed/example1",
        website: "https://www.hotela.com",
        phone: "+1 415-555-1234",
        reviews: []
    },
    {
        id: 2,
        name: "Hotel B",
        coords: [40.7128, -74.0060],  // New York City, NY
        video: "https://www.youtube.com/embed/example2",
        website: "https://www.hotelb.com",
        phone: "+1 212-555-1234",
        reviews: []
    }
];

// Render hotel pins on the map
hotels.forEach(hotel => {
    const marker = L.marker(hotel.coords).addTo(map);
    marker.bindPopup(renderPopupContent(hotel));
});

// Function to render popup content for hotels
function renderPopupContent(hotel) {
    const reviewList = hotel.reviews
        .map(review => `<p><strong>${review.author}:</strong> ${review.text}</p>`)
        .join('');

    return `
        <div class="review-popup">
            <h3>${hotel.name}</h3>
            <iframe src="${hotel.video}" frameborder="0" allowfullscreen></iframe>
            <p><strong>Website:</strong> <a href="${hotel.website}" target="_blank">${hotel.website}</a></p>
            <p><strong>Phone:</strong> ${hotel.phone}</p>
            <div class="review-list">
                <h4>User Reviews:</h4>
                ${reviewList || "<p>No reviews yet. Be the first to add one!</p>"}
            </div>
            <form class="review-form" onsubmit="addReview(event, ${hotel.id})">
                <h4>Add Your Review:</h4>
                <textarea name="reviewText" placeholder="Write your review..." required></textarea>
                <input type="email" name="email" placeholder="Your email (optional)" />
                <div class="rating">
                    <input type="radio" id="rating10-${hotel.id}" name="rating-${hotel.id}" value="10" /><label for="rating10-${hotel.id}">⭐</label>
                    <input type="radio" id="rating9-${hotel.id}" name="rating-${hotel.id}" value="9" /><label for="rating9-${hotel.id}">⭐</label>
                    <input type="radio" id="rating8-${hotel.id}" name="rating-${hotel.id}" value="8" /><label for="rating8-${hotel.id}">⭐</label>
                    <input type="radio" id="rating7-${hotel.id}" name="rating-${hotel.id}" value="7" /><label for="rating7-${hotel.id}">⭐</label>
                    <input type="radio" id="rating6-${hotel.id}" name="rating-${hotel.id}" value="6" /><label for="rating6-${hotel.id}">⭐</label>
                    <input type="radio" id="rating5-${hotel.id}" name="rating-${hotel.id}" value="5" /><label for="rating5-${hotel.id}">⭐</label>
                    <input type="radio" id="rating4-${hotel.id}" name="rating-${hotel.id}" value="4" /><label for="rating4-${hotel.id}">⭐</label>
                    <input type="radio" id="rating3-${hotel.id}" name="rating-${hotel.id}" value="3" /><label for="rating3-${hotel.id}">⭐</label>
                    <input type="radio" id="rating2-${hotel.id}" name="rating-${hotel.id}" value="2" /><label for="rating2-${hotel.id}">⭐</label>
                    <input type="radio" id="rating1-${hotel.id}" name="rating-${hotel.id}" value="1" /><label for="rating1-${hotel.id}">⭐</label>
                </div>
                <button type="submit">Submit Review</button>
            </form>
        </div>
    `;
}

// Function to add a user review
function addReview(event, hotelId) {
    event.preventDefault();

    const form = event.target;
    const reviewText = form.reviewText.value;
    const author = form.author.value;
    const email = form.email.value;
    const rating = form.querySelector('input[name="rating-' + hotelId + '"]:checked') ? form.querySelector('input[name="rating-' + hotelId + '"]:checked').value : 'No rating';

    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
        hotel.reviews.push({ text: reviewText, author, email, rating });
        map.eachLayer(layer => {
            if (layer.getLatLng && layer.getLatLng().equals(hotel.coords)) {
                layer.setPopupContent(renderPopupContent(hotel));
            }
        });
    }

    form.reset();
}
