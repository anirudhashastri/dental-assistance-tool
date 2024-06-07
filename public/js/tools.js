document.addEventListener('DOMContentLoaded', function() {
    const startToolBtn = document.getElementById('startToolBtn');
    if (startToolBtn) {
        startToolBtn.addEventListener('click', function() {
            fetch('/tools/run-tool', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    // Display the image
                    document.getElementById('resultImage').src = data.imagePath;
                    document.getElementById('resultImage').style.display = 'block';
                } else {
                    console.error('Tool execution failed:', data.error);
                }
            })
            .catch(error => {
                console.error('Error running tool:', error);
            });
        });
    } else {
        console.error('Element with ID "startToolBtn" not found');
    }
});
