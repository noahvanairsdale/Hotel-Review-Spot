// Initialize the map with a center and zoom level
var map = L.map('map').setView([37.0902, -95.7129], 5); // Center of the USA

// Add tile layer (OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Prevent zooming outside USA bounds
var bounds = [
    [24.396308, -125.0], // Southwest corner
    [49.384358, -66.93457] // Northeast corner
];
map.setMaxBounds(bounds);

// Add some sample hotels
var hotels = [
    { name: 'Example Hotel 1', lat: 34.0522, lon: -118.2437, rating: 8, video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { name: 'Example Hotel 2', lat: 40.7128, lon: -74.0060, rating: 9, video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' },
    { name: 'Example Hotel 3', lat: 41.8781, lon: -87.6298, rating: 7, video: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ' }
];

// Function to add pins to the map
hotels.forEach(function(hotel) {
    var marker = L.marker([hotel.lat, hotel.lon]).addTo(map);
    marker.bindPopup(`
        <b>${hotel.name}</b><br>
        Rating: ${hotel.rating}/10<br>
        <a href="${hotel.video}" target="_blank">Watch Review</a>
    `);
});

// Handling review form submission
document.getElementById('review-form').addEventListener('submit', function(event) {
    event.preventDefault();

    var email = document.getElementById('user-email').value;
    var hotelName = document.getElementById('hotel-name').value;
    var rating = document.getElementById('rating').value;
    var youtubeLink = document.getElementById('youtube-link').value;
    var writtenReview = document.getElementById('written-review').value;

    alert(`Review submitted!\nHotel: ${hotelName}\nRating: ${rating}/10\nReview: ${writtenReview}`);

    // Add the new review pin on the map
    var newHotel = { name: hotelName, lat: 37.0902, lon: -95.7129, rating: rating, video: youtubeLink };
    var marker = L.marker([newHotel.lat, newHotel.lon]).addTo(map);
    marker.bindPopup(`
        <b>${newHotel.name}</b><br>
        Rating: ${newHotel.rating}/10<br>
        <a href="${newHotel.video}" target="_blank">Watch Review</a>
    `);

    // Clear form fields after submission
    document.getElementById('review-form').reset();
});
