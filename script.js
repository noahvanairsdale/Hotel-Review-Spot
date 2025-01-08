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
                <input type="text" name="author" placeholder="Your name" required />
                <input type="email" name="email" placeholder="Optional: Your email" />
                <label for="rating">Rate your stay (1-10):</label>
                <select name="rating" required>
                    <option value="" disabled selected>Select a rating</option>
                    <option value="1">1 - Poor</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10 - Excellent</option>
                </select>
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
    const rating = form.rating.value;

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
