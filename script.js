// Initialize map
var map = L.map('map').setView([51.505, -0.09], 2); // Default view (zoom out to show entire world)

// Set bounds for the map so it doesn't zoom out beyond the world
var bounds = [[-90, -180], [90, 180]]; // Coordinates for full world bounds
map.setMaxBounds(bounds);

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Hotel data (just a sample)
var hotels = [
    { name: 'Example Hotel', lat: 51.505, lon: -0.09, rating: 9, link: 'https://www.example.com', phone: '(123) 456-7890', video: 'your-review-video.mp4' }
];

// Add pins for each hotel on the map
hotels.forEach(function(hotel) {
    var marker = L.marker([hotel.lat, hotel.lon]).addTo(map);
    marker.bindPopup(`<b>${hotel.name}</b><br><a href="${hotel.link}" target="_blank">Visit Website</a><br>Rating: ${hotel.rating}/10`);
});

// Handle review form submission
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form values
    var hotelName = document.getElementById('hotel-name').value;
    var reviewText = document.getElementById('review-text').value;
    var userEmail = document.getElementById('user-email').value;
    var rating = document.getElementById('rating').value;
    var videoLink = document.getElementById('video-link').value;

    // Create a new hotel review pin
    var userMarker = L.marker([51.505, -0.09]).addTo(map); // For simplicity, placing all user reviews in the same location (51.505, -0.09)
    userMarker.bindPopup(`
        <b>${hotelName}</b><br>
        Rating: ${rating}/10<br>
        <p>${reviewText}</p>
        <a href="${videoLink}" target="_blank">Watch Review Video</a>
    `);

    // Clear the form after submission
    document.getElementById('review-form').reset();
});
