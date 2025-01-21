// Fetch the JSON data from a file
fetch('../../content.json')
    .then(response => response.json())
    .then(data => {
        console.log(data);  // This will log your JSON data
        updateContent(data);  // This will only be called when data is successfully loaded
    })
    .catch(error => {
        console.error('Error loading JSON file:', error);
    });

// Function to get query parameters (heading and subheading)
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    const heading = params.get('heading');
    const subheading = params.get('subheading');
    return { heading, subheading };
}

// Function to update the page content based on query params and JSON data
function updateContent(data) {
    const { heading, subheading } = getQueryParams();

    if (heading && subheading && data[heading] && data[heading][subheading]) {
        const contentData = data[heading][subheading];
        const headingElement = document.querySelector('.service-heading');
        const contentElement = document.querySelector('.service-content');
        const imageElement = document.querySelector('.service-right-image');
        const breadCrumElement = document.querySelector('.bread-crums');
        const createBreadCrum = "Services - " + contentData.heading + " - " + contentData.subheading;

        // Update the content on the page
        headingElement.textContent = heading.replace(/_/g, ' ').toUpperCase();
        contentElement.textContent = contentData.content;
        imageElement.src = contentData.image;
        breadCrumElement.textContent = createBreadCrum;
    } else {
        alert("No Content Found");
    }
}
