// Auto-redirect to login page after 3.5 seconds
window.addEventListener('load', function() {
    // Add smooth fade out before redirect
    setTimeout(function() {
        document.querySelector('.splash-container').style.animation = 'fadeOut 0.5s ease-out forwards';
        
        // Redirect after fade out animation
        setTimeout(function() {
            window.location.href = 'pages/login.html';
        }, 500);
    }, 3000); // Wait 3 seconds before starting fade out
});

// Fade out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
