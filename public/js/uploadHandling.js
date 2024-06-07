document.getElementById('uploadBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function() {
    const files = this.files;
    const formData = new FormData();
    for (let i = 0; i < files.length; i++) {
        formData.append('image', files[i]);
    }

    fetch('/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            console.log('Upload successful');
            // Optionally update the UI here with the image path or name
        } else {
            console.log('Upload failed', data.error);
        }
    })
    .catch(error => {
        console.error('Error uploading files', error);
    });
});

function uploadFiles(input) {
    if (input.files.length > 0) {
        const formData = new FormData();
        Array.from(input.files).forEach(file => {
            formData.append('images', file); // Ensure 'images' matches your server-side expectation
        });

        fetch('/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log('Upload successful');
                // Add uploaded image to list and possibly display it
                const imgList = document.querySelector('.images-list');
                const imgDisplay = document.querySelector('.image-display');
                data.images.forEach(image => {
                    const listItem = document.createElement('div');
                    listItem.textContent = image.filename; // Assuming 'filename' is sent back from server
                    listItem.onclick = () => {
                        const img = new Image();
                        img.src = image.path; // Assuming 'path' is the URL sent back from server
                        imgDisplay.innerHTML = ''; // Clear previous images
                        imgDisplay.appendChild(img);
                    };
                    imgList.appendChild(listItem);
                });
            } else {
                console.log('Upload failed', data.error);
            }
        })
        .catch(error => console.error('Error uploading files:', error));
    }
}

function displayImage(imagePath) {
    const image = new Image();
    image.src = imagePath;
    const display = document.querySelector('.image-display');
    display.innerHTML = ''; // Clear previous images
    display.appendChild(image);
}
