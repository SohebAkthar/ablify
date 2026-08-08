/* ============================================
   WHEELCHAIR NAVIGATION - COMPLETE FIXED VERSION
   All Features Working - Simplified & Reliable
   ============================================ */

console.log('🚀 Wheelchair Navigation Loading...');

// ========== GLOBAL VARIABLES ==========
let map;
let currentLocationMarker;
let routingControl;
let markers = [];
let nearbyMarkers = [];
let currentRoute = {
    start: null,
    end: null,
    distance: null,
    time: null,
    startCoords: null,
    endCoords: null
};

// ========== INITIALIZE MAP ==========
function initMap() {
    try {
        map = L.map('map', {
            zoomControl: false
        }).setView([12.9716, 77.5946], 12);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap',
            maxZoom: 19,
            minZoom: 3
        }).addTo(map);
        
        createCustomMarkerIcon();
        
        setTimeout(() => {
            getCurrentLocation();
        }, 1000);
        
        console.log('✅ Map initialized');
        showNotification('🗺️ Map loaded!', 'info');
        
    } catch (error) {
        console.error('❌ Map error:', error);
        showNotification('❌ Map failed to load', 'error');
    }
}

// ========== CUSTOM MARKERS ==========
function createCustomMarkerIcon() {
    window.wheelchairIcon = L.divIcon({
        className: 'custom-wheelchair-marker',
        html: '<div style="background:#2c5aa0; color:white; border-radius:50%; width:35px; height:35px; display:flex; align-items:center; justify-content:center; font-size:1.2rem; border:3px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.4);"><i class="fas fa-wheelchair"></i></div>',
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });
    
    window.hospitalIcon = L.divIcon({
        className: 'custom-hospital-marker',
        html: '<div style="background:#ef4444; color:white; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; font-size:1rem; border:3px solid white; box-shadow:0 2px 8px rgba(0,0,0,0.3);"><i class="fas fa-hospital"></i></div>',
        iconSize: [30, 30],
        iconAnchor: [15, 30],
        popupAnchor: [0, -30]
    });
}

// ========== 1. SEARCH LOCATION ==========
async function searchPlace() {
    const searchInput = document.getElementById('searchInput');
    const searchQuery = searchInput ? searchInput.value.trim() : '';
    
    if (!searchQuery) {
        showNotification('⚠️ Please enter a location', 'warning');
        return;
    }
    
    showLoading(true);
    console.log('🔍 Searching:', searchQuery);
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchQuery)}&limit=1`,
            { headers: { 'User-Agent': 'Abilify-WheelchairNav/1.0' } }
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            const place = data[0];
            const lat = parseFloat(place.lat);
            const lon = parseFloat(place.lon);
            
            clearMarkers();
            
            const marker = L.marker([lat, lon], { icon: wheelchairIcon })
                .addTo(map)
                .bindPopup(`<strong>📍 ${place.display_name}</strong>`);
            
            markers.push(marker);
            map.setView([lat, lon], 15);
            marker.openPopup();
            
            showNotification('✅ Location found!', 'success');
        } else {
            showNotification('⚠️ Location not found', 'warning');
        }
    } catch (error) {
        console.error('Search error:', error);
        showNotification('❌ Search failed', 'error');
    } finally {
        showLoading(false);
    }
}

// ========== 2. GET DIRECTIONS ==========
async function getDirections() {
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    
    const startLocation = startInput ? startInput.value.trim() : '';
    const endLocation = endInput ? endInput.value.trim() : '';
    
    if (!startLocation || !endLocation) {
        showNotification('⚠️ Enter both locations', 'warning');
        return;
    }
    
    showLoading(true);
    console.log('🛤️ Routing:', startLocation, '→', endLocation);
    
    try {
        const startCoords = await geocodeLocation(startLocation);
        const endCoords = await geocodeLocation(endLocation);
        
        if (!startCoords || !endCoords) {
            showNotification('⚠️ Could not find locations', 'warning');
            showLoading(false);
            return;
        }
        
        if (routingControl) {
            map.removeControl(routingControl);
        }
        clearMarkers();
        clearNearbyMarkers();
        
        currentRoute.start = startLocation;
        currentRoute.end = endLocation;
        currentRoute.startCoords = startCoords;
        currentRoute.endCoords = endCoords;
        
        routingControl = L.Routing.control({
            waypoints: [
                L.latLng(startCoords.lat, startCoords.lon),
                L.latLng(endCoords.lat, endCoords.lon)
            ],
            router: L.Routing.osrmv1({
                serviceUrl: 'https://router.project-osrm.org/route/v1',
                profile: 'foot'
            }),
            routeWhileDragging: false,
            addWaypoints: false,
            draggableWaypoints: false,
            fitSelectedRoutes: true,
            showAlternatives: false,
            lineOptions: {
                styles: [{ color: '#2c5aa0', opacity: 0.8, weight: 6 }]
            },
            createMarker: function(i, waypoint, n) {
                const color = i === 0 ? '#059669' : '#ef4444';
                const label = i === 0 ? 'A' : 'B';
                return L.marker(waypoint.latLng, {
                    icon: L.divIcon({
                        className: 'custom-route-marker',
                        html: `<div style="background:${color}; color:white; border-radius:50%; width:32px; height:32px; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:1rem; border:3px solid white; box-shadow:0 3px 10px rgba(0,0,0,0.4);">${label}</div>`,
                        iconSize: [32, 32],
                        iconAnchor: [16, 32]
                    })
                });
            },
            containerClassName: 'leaflet-routing-container-custom'
        }).addTo(map);
        
        routingControl.on('routesfound', function(e) {
            const summary = e.routes[0].summary;
            const distanceKm = (summary.totalDistance / 1000).toFixed(2);
            const timeMin = Math.round(summary.totalTime / 60);
            
            currentRoute.distance = `${distanceKm} km`;
            currentRoute.time = timeMin > 60 ? `${Math.floor(timeMin/60)}h ${timeMin%60}min` : `${timeMin} min`;
            
            displayRouteInfo();
            showNotification(`✅ Route: ${distanceKm} km, ${currentRoute.time}`, 'success');
        });
        
        showLoading(false);
        
    } catch (error) {
        console.error('Routing error:', error);
        showNotification('❌ Routing failed', 'error');
        showLoading(false);
    }
}

async function geocodeLocation(address) {
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&limit=1`,
            { headers: { 'User-Agent': 'Abilify-WheelchairNav/1.0' } }
        );
        
        const data = await response.json();
        
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

function displayRouteInfo() {
    const routeInfo = document.getElementById('routeInfo');
    const routeFrom = document.getElementById('routeFrom');
    const routeTo = document.getElementById('routeTo');
    const routeDistance = document.getElementById('routeDistance');
    const routeTime = document.getElementById('routeTime');
    
    if (routeFrom) routeFrom.textContent = currentRoute.start || 'N/A';
    if (routeTo) routeTo.textContent = currentRoute.end || 'N/A';
    if (routeDistance) routeDistance.textContent = currentRoute.distance || 'N/A';
    if (routeTime) routeTime.textContent = currentRoute.time || 'N/A';
    
    if (routeInfo) routeInfo.classList.add('active');
}

// ========== 3. CLEAR ROUTE ==========
function clearRoute() {
    if (routingControl) {
        map.removeControl(routingControl);
        routingControl = null;
    }
    
    clearMarkers();
    clearNearbyMarkers();
    
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    if (startInput) startInput.value = '';
    if (endInput) endInput.value = '';
    
    const routeInfo = document.getElementById('routeInfo');
    if (routeInfo) routeInfo.classList.remove('active');
    
    currentRoute = { start: null, end: null, distance: null, time: null, startCoords: null, endCoords: null };
    
    map.setView([12.9716, 77.5946], 12);
    showNotification('🗑️ Route cleared', 'info');
}

// ========== 4. GET CURRENT LOCATION ==========
function getCurrentLocation() {
    if (!navigator.geolocation) {
        showNotification('❌ Geolocation not supported', 'error');
        return;
    }
    
    showNotification('📍 Getting location...', 'info');
    
    navigator.geolocation.getCurrentPosition(
        (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            
            if (currentLocationMarker) {
                map.removeLayer(currentLocationMarker);
            }
            
            currentLocationMarker = L.marker([lat, lon], {
                icon: L.divIcon({
                    className: 'current-location-pulse',
                    html: '<div style="background:#3b82f6; width:16px; height:16px; border-radius:50%; border:3px solid white; box-shadow:0 0 0 4px rgba(59,130,246,0.3), 0 2px 8px rgba(0,0,0,0.3);"></div>',
                    iconSize: [16, 16],
                    iconAnchor: [8, 8]
                })
            }).addTo(map);
            
            currentLocationMarker.bindPopup('<strong>📍 You are here</strong>');
            map.setView([lat, lon], 15);
            currentLocationMarker.openPopup();
            
            showNotification('✅ Location found!', 'success');
        },
        (error) => {
            let msg = '❌ Location unavailable';
            if (error.code === 1) msg = '⚠️ Permission denied';
            showNotification(msg, 'warning');
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
}

// ========== 5. FIND NEARBY - WITH OVERPASS FALLBACK ==========
async function findNearby(type) {
    showNotification(`🔍 Finding ${type}...`, 'info');
    console.log('🔍 Searching:', type);
    
    const center = map.getCenter();
    const lat = center.lat;
    const lon = center.lng;
    
    clearNearbyMarkers();
    showLoading(true);
    
    try {
        // Special handling for wheelchair accessible locations
        if (type.toLowerCase() === 'accessible') {
            console.log('Using Overpass API for wheelchair data...');
            
            const overpassQuery = `
                [out:json][timeout:15];
                (
                  node["wheelchair"="yes"](around:3000,${lat},${lon});
                  way["wheelchair"="yes"](around:3000,${lat},${lon});
                );
                out center 20;
            `;
            
            try {
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout
                
                const response = await fetch('https://overpass-api.de/api/interpreter', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: 'data=' + encodeURIComponent(overpassQuery),
                    signal: controller.signal
                });
                
                clearTimeout(timeoutId);
                
                if (!response.ok) {
                    throw new Error(`Overpass API Error: ${response.status}`);
                }
                
                const data = await response.json();
                
                console.log('Overpass API returned:', data.elements?.length || 0, 'wheelchair locations');
                
                if (data.elements && data.elements.length > 0) {
                    let addedCount = 0;
                    
                    data.elements.forEach((element) => {
                        if (addedCount >= 20) return;
                        
                        let placeLat, placeLon;
                        
                        if (element.lat && element.lon) {
                            placeLat = element.lat;
                            placeLon = element.lon;
                        } else if (element.center) {
                            placeLat = element.center.lat;
                            placeLon = element.center.lon;
                        } else {
                            return;
                        }
                        
                        const tags = element.tags || {};
                        const placeName = tags.name || 
                                         tags.amenity || 
                                         tags.shop ||
                                         tags.tourism ||
                                         'Wheelchair Accessible';
                        
                        const placeType = tags.amenity || 
                                         tags.shop || 
                                         tags.tourism || 
                                         tags.building ||
                                         'Location';
                        
                        const wheelchairStatus = tags.wheelchair || 'yes';
                        const wheelchairDesc = tags['wheelchair:description'] || '';
                        
                        const marker = L.marker([placeLat, placeLon], { icon: wheelchairIcon })
                            .addTo(map)
                            .bindPopup(`
                                <div style="font-size:0.9rem; min-width:200px;">
                                    <strong>♿ ${placeName}</strong><br>
                                    <small style="color:#6c757d; text-transform:capitalize;">${placeType}</small><br>
                                    <small style="color:${wheelchairStatus === 'yes' ? '#059669' : '#f59e0b'}; font-weight:600;">
                                        ${wheelchairStatus === 'yes' ? '✓ Fully accessible' : '⚠ Limited accessibility'}
                                    </small>
                                    ${wheelchairDesc ? `<br><small style="color:#666;">${wheelchairDesc}</small>` : ''}
                                </div>
                            `);
                        
                        nearbyMarkers.push(marker);
                        addedCount++;
                        
                        if (addedCount === 1) {
                            marker.openPopup();
                        }
                    });
                    
                    if (addedCount > 0) {
                        showNotification(`✅ Found ${addedCount} wheelchair accessible locations`, 'success');
                    } else {
                        showNotification(`⚠️ No wheelchair accessibility data in this area`, 'warning');
                    }
                } else {
                    showNotification(`⚠️ No wheelchair data found in this area`, 'warning');
                }
                
            } catch (overpassError) {
                console.warn('Overpass API failed, using fallback search:', overpassError.message);
                showNotification('⚠️ Using fallback search for accessible locations...', 'info');
                
                // FALLBACK: Search for wheelchair-friendly places using Nominatim
                const fallbackQuery = 'wheelchair accessible disabled access';
                const searchRadius = 0.03;
                const viewbox = `${lon - searchRadius},${lat - searchRadius},${lon + searchRadius},${lat + searchRadius}`;
                
                const fallbackResponse = await fetch(
                    `https://nominatim.openstreetmap.org/search?` +
                    `format=json&` +
                    `q=${encodeURIComponent(fallbackQuery)}&` +
                    `viewbox=${viewbox}&` +
                    `bounded=1&` +
                    `limit=15`,
                    { 
                        headers: { 
                            'User-Agent': 'Abilify-WheelchairNav/1.0',
                            'Accept-Language': 'en'
                        } 
                    }
                );
                
                if (fallbackResponse.ok) {
                    const fallbackData = await fallbackResponse.json();
                    
                    if (fallbackData && fallbackData.length > 0) {
                        fallbackData.forEach((place, index) => {
                            if (index >= 15) return;
                            
                            const placeLat = parseFloat(place.lat);
                            const placeLon = parseFloat(place.lon);
                            const nameParts = place.display_name.split(',');
                            const placeName = nameParts[0].trim();
                            
                            const marker = L.marker([placeLat, placeLon], { icon: wheelchairIcon })
                                .addTo(map)
                                .bindPopup(`
                                    <div style="font-size:0.9rem; min-width:200px;">
                                        <strong>♿ ${placeName}</strong><br>
                                        <small style="color:#6c757d;">Accessible location</small><br>
                                        <small style="color:#888;">${place.display_name}</small>
                                    </div>
                                `);
                            
                            nearbyMarkers.push(marker);
                            
                            if (index === 0) marker.openPopup();
                        });
                        
                        showNotification(`✅ Found ${fallbackData.length} accessible locations`, 'success');
                    } else {
                        showNotification(`⚠️ No accessible locations found. Try a major city.`, 'warning');
                    }
                }
            }
            
            showLoading(false);
            return;
        }
        
        // ========== REGULAR SEARCH FOR ALL OTHER BUTTONS ==========
        let searchQuery = '';
        
        switch(type.toLowerCase()) {
            case 'hospital':
                searchQuery = 'hospital';
                break;
            case 'pharmacy':
                searchQuery = 'pharmacy drugstore chemist';
                break;
            case 'toilet':
            case 'restroom':
                searchQuery = 'public toilet restroom bathroom';
                break;
            case 'clinic':
                searchQuery = 'clinic medical center';
                break;
            case 'parking':
                searchQuery = 'parking';
                break;
            default:
                searchQuery = type;
        }
        
        const searchRadius = 0.05;
        const viewbox = `${lon - searchRadius},${lat - searchRadius},${lon + searchRadius},${lat + searchRadius}`;
        
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?` +
            `format=json&` +
            `q=${encodeURIComponent(searchQuery)}&` +
            `viewbox=${viewbox}&` +
            `bounded=1&` +
            `limit=20`,
            { 
                headers: { 
                    'User-Agent': 'Abilify-WheelchairNav/1.0',
                    'Accept-Language': 'en'
                } 
            }
        );
        
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        
        const data = await response.json();
        
        console.log(`Nominatim returned ${data.length} results for ${type}`);
        
        if (data && data.length > 0) {
            const uniquePlaces = [];
            
            data.forEach(place => {
                const isDuplicate = uniquePlaces.some(existing => {
                    const distance = calculateDistance(
                        parseFloat(existing.lat), parseFloat(existing.lon),
                        parseFloat(place.lat), parseFloat(place.lon)
                    );
                    return distance < 0.05;
                });
                
                if (!isDuplicate) {
                    uniquePlaces.push(place);
                }
            });
            
            if (uniquePlaces.length === 0) {
                showNotification(`⚠️ No ${type} found nearby`, 'warning');
                showLoading(false);
                return;
            }
            
            uniquePlaces.forEach((place, index) => {
                const placeLat = parseFloat(place.lat);
                const placeLon = parseFloat(place.lon);
                const nameParts = place.display_name.split(',');
                const placeName = nameParts[0].trim();
                
                let icon = wheelchairIcon;
                if (type.toLowerCase() === 'hospital' || type.toLowerCase() === 'clinic') {
                    icon = hospitalIcon;
                }
                
                const marker = L.marker([placeLat, placeLon], { icon: icon })
                    .addTo(map)
                    .bindPopup(`
                        <div style="font-size:0.9rem; min-width:180px;">
                            <strong>${placeName}</strong><br>
                            <small style="color:#6c757d; text-transform:capitalize;">${type}</small><br>
                            <small style="color:#888;">${place.display_name}</small>
                        </div>
                    `);
                
                nearbyMarkers.push(marker);
                
                if (index === 0) {
                    marker.openPopup();
                    map.setView([placeLat, placeLon], 14);
                }
            });
            
            showNotification(`✅ Found ${uniquePlaces.length} ${type}`, 'success');
            
        } else {
            showNotification(`⚠️ No ${type} found in this area`, 'warning');
        }
        
    } catch (error) {
        console.error('❌ Nearby search error:', error);
        showNotification('❌ Search failed. Please try again.', 'error');
    } finally {
        showLoading(false);
    }
}


// ========== HELPER: CALCULATE DISTANCE BETWEEN TWO POINTS ==========
function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Returns distance in km
}



// ========== 6. SAVE FAVORITE ==========
function saveFavorite() {
    if (!currentRoute.start || !currentRoute.end) {
        showNotification('⚠️ No route to save', 'warning');
        return;
    }
    
    const name = prompt('💾 Enter route name:');
    if (!name || !name.trim()) return;
    
    const favorites = JSON.parse(localStorage.getItem('wheelchairFavorites') || '[]');
    
    favorites.push({
        name: name.trim(),
        start: currentRoute.start,
        end: currentRoute.end,
        distance: currentRoute.distance,
        time: currentRoute.time,
        startCoords: currentRoute.startCoords,
        endCoords: currentRoute.endCoords,
        date: new Date().toLocaleDateString('en-IN')
    });
    
    localStorage.setItem('wheelchairFavorites', JSON.stringify(favorites));
    loadFavorites();
    showNotification(`💾 "${name}" saved!`, 'success');
}

// ========== 7. LOAD FAVORITES ==========
function loadFavorites() {
    const favorites = JSON.parse(localStorage.getItem('wheelchairFavorites') || '[]');
    const list = document.getElementById('favoritesList');
    
    if (!list) return;
    
    if (favorites.length === 0) {
        list.innerHTML = '<p style="color:var(--text-muted); text-align:center; padding:1rem;">No saved routes</p>';
        return;
    }
    
    list.innerHTML = favorites.map((fav, index) => `
        <div class="favorite-item" onclick="loadFavoriteRoute(${index})">
            <div style="flex:1;">
                <div><i class="fas fa-star" style="color:#f59e0b;"></i> <strong>${fav.name}</strong></div>
                <small style="color:var(--text-muted);">${fav.start} → ${fav.end}</small><br>
                <small style="color:var(--text-muted);">📏 ${fav.distance} • ⏱️ ${fav.time}</small>
            </div>
            <button class="remove-favorite" onclick="event.stopPropagation(); removeFavorite(${index})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

function loadFavoriteRoute(index) {
    const favorites = JSON.parse(localStorage.getItem('wheelchairFavorites') || '[]');
    const fav = favorites[index];
    if (!fav) return;
    
    const startInput = document.getElementById('startLocation');
    const endInput = document.getElementById('endLocation');
    if (startInput) startInput.value = fav.start;
    if (endInput) endInput.value = fav.end;
    
    getDirections();
    showNotification(`📍 Loading: ${fav.name}`, 'info');
}

function removeFavorite(index) {
    const favorites = JSON.parse(localStorage.getItem('wheelchairFavorites') || '[]');
    if (!confirm(`Delete "${favorites[index]?.name}"?`)) return;
    
    favorites.splice(index, 1);
    localStorage.setItem('wheelchairFavorites', JSON.stringify(favorites));
    loadFavorites();
    showNotification('🗑️ Route deleted', 'info');
}

// ========== 8 & 9. THEME & FONT ==========
function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const icon = document.querySelector('#themeToggle i');
    const isDark = document.body.classList.contains('dark-mode');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    localStorage.setItem('darkMode', isDark);
    showNotification(isDark ? '🌙 Dark mode' : '☀️ Light mode', 'info');
}

function toggleFontSize() {
    document.body.classList.toggle('large-font');
    const isLarge = document.body.classList.contains('large-font');
    localStorage.setItem('largeFont', isLarge);
    showNotification(isLarge ? '🔠 Large font' : '🔡 Normal font', 'info');
}

// ========== UTILITIES ==========
function clearMarkers() {
    markers.forEach(m => map.removeLayer(m));
    markers = [];
}

function clearNearbyMarkers() {
    nearbyMarkers.forEach(m => map.removeLayer(m));
    nearbyMarkers = [];
}

function showNotification(message, type = 'info') {
    const colors = { success: '#10b981', warning: '#f59e0b', error: '#ef4444', info: '#2c5aa0' };
    const notif = document.createElement('div');
    notif.style.cssText = `
        position:fixed; bottom:20px; right:20px; background:${colors[type]||colors.info}; 
        color:white; padding:1rem 1.5rem; border-radius:0.75rem; z-index:10000; 
        font-weight:600; box-shadow:0 10px 30px rgba(0,0,0,0.3); animation:slideIn 0.3s;
    `;
    notif.textContent = message;
    document.body.appendChild(notif);
    setTimeout(() => {
        notif.style.opacity = '0';
        notif.style.transform = 'translateX(100px)';
        notif.style.transition = 'all 0.3s';
        setTimeout(() => notif.remove(), 300);
    }, 3500);
}

function showLoading(show) {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) overlay.classList.toggle('hidden', !show);
}

function loadPreferences() {
    if (localStorage.getItem('darkMode') === 'true') {
        document.body.classList.add('dark-mode');
        const icon = document.querySelector('#themeToggle i');
        if (icon) icon.className = 'fas fa-sun';
    }
    if (localStorage.getItem('largeFont') === 'true') {
        document.body.classList.add('large-font');
    }
}

function setupKeyHandlers() {
    const searchInput = document.getElementById('searchInput');
    const endInput = document.getElementById('endLocation');
    
    if (searchInput) searchInput.addEventListener('keypress', e => e.key === 'Enter' && searchPlace());
    if (endInput) endInput.addEventListener('keypress', e => e.key === 'Enter' && getDirections());
}

function addCustomStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn { from { opacity:0; transform:translateX(100px); } to { opacity:1; transform:translateX(0); } }
        .leaflet-routing-container { display: none !important; }
    `;
    document.head.appendChild(style);
}

// ========== INITIALIZE ==========
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing...');
    addCustomStyles();
    initMap();
    loadFavorites();
    loadPreferences();
    setupKeyHandlers();
    console.log('✅ Ready!');
});

// ========== EXPORT TO GLOBAL ==========
window.searchPlace = searchPlace;
window.getDirections = getDirections;
window.clearRoute = clearRoute;
window.getCurrentLocation = getCurrentLocation;
window.findNearby = findNearby;
window.saveFavorite = saveFavorite;
window.loadFavoriteRoute = loadFavoriteRoute;
window.removeFavorite = removeFavorite;
window.toggleTheme = toggleTheme;
window.toggleFontSize = toggleFontSize;
