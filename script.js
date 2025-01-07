// Initialize the map with center and zoom level
const map = L.map('map', {
    center: [20, 0],  // Default center of the map (coordinates: 20, 0)
    zoom: 2,          // Initial zoom level (zoomed out a bit)
    minZoom: 2,       // Minimum zoom level (prevents zooming out too much)
    maxZoom: 10       // Maximum zoom level (prevents zooming in too much)
});

// Add OpenStreetMap tiles (base layer)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18,  // Max zoom allowed for the tile layer
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Example hotel data
const hotels = [
    {
        id: 1,
        name: "Hotel A",
        coords: [48.8566, 2.3522],
        video: "https://www.youtube.com/embed/example1",
        website: "https://www.hotela.com",
        phone: "+33 1 23 45 67 89",
        reviews: []
    },
    {
        id: 2,
        name: "Hotel B",
        coords: [40.7128, -74.0060],
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
                <input type="text" name="videoLink" placeholder="Optional: Video URL" />
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
    const videoLink = form.videoLink.value;

    const hotel = hotels.find(h => h.id === hotelId);
    if (hotel) {
        hotel.reviews.push({ text: reviewText, author, video: videoLink });
        map.eachLayer(layer => {
            if (layer.getLatLng && layer.getLatLng().equals(hotel.coords)) {
                layer.setPopupContent(renderPopupContent(hotel));
            }
        });
    }

    form.reset();
}
