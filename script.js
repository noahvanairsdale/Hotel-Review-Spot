// Initialize the map
var map = L.map('map').setView([51.505, -0.09], 13);  // Set initial view (latitude, longitude, zoom level)

// Add the OpenStreetMap tile layer (you can change this to another map source)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Sample hotel data with coordinates
var hotels = [
    { name: 'Hotel Example', lat: 51.505, lon: -0.09, videoUrl: 'your-review-video.mp4' },
    { name: 'Hotel 2', lat: 51.515, lon: -0.1, videoUrl: 'hotel-2-video.mp4' },
    { name: 'Hotel 3', lat: 51.525, lon: -0.12, videoUrl: 'hotel-3-video.mp4' }
];

// Function to add pins (markers) to the map
hotels.forEach(function(hotel) {
    var marker = L.marker([hotel.lat, hotel.lon]).addTo(map);
    marker.bindPopup(`<b>${hotel.name}</b><br><a href="${hotel.videoUrl}" target="_blank">Watch Review</a>`);
});

// Search function
document.getElementById('search-input').addEventListener('input', function(event) {
    var query = event.target.value.toLowerCase();
    hotels.forEach(function(hotel) {
        if (hotel.name.toLowerCase().includes(query)) {
            // Show pin if match
            L.marker([hotel.lat, hotel.lon]).addTo(map)
                .bindPopup(`<b>${hotel.name}</b><br><a href="${hotel.videoUrl}" target="_blank">Watch Review</a>`);
        }
    });
});
