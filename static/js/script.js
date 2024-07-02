// console.log("script loaded")

// function toggleItem(element){
//     const productId = element.getAttribute("data-product-id");
//     const heartIcon = element.querySelector("i");
//     const savedList = document.getElementById("saved-list");

//     if (heartIcon.classList.contains('fa-heart-o')) {
//         // Change color to red
//         heartIcon.classList.remove('fa-heart-o');
//         heartIcon.classList.add('fa-heart');
//         heartIcon.style.color = 'red';

//         // Add to saved list
//         const savedItem = document.createElement('li');
//         savedItem.className = 'list-item saved-item';
//         savedItem.id = `saved-${productId}`;
//         savedItem.innerHTML = `Product ${productId}`; // Customize the text as needed
//         savedList.appendChild(savedItem);
//     } else {
//         // Change color back to original
//         heartIcon.classList.remove('fa-heart');
//         heartIcon.classList.add('fa-heart-o');
//         heartIcon.style.color = '';

//         // Remove from saved list
//         const savedItem = document.getElementById(`saved-${productId}`);
//         if (savedItem) {
//             savedList.removeChild(savedItem);
//         }
//     }
// }

// static/js/script.js

// static/js/script.js

// console.log("script loaded");

// let savedItems = [];

// function toggleItem(element) {
//     const productId = element.getAttribute("data-product-id");
//     const heartIcon = element.querySelector("i");
//     const savedCounter = document.getElementById("saved-counter");

//     if (heartIcon.classList.contains('fa-heart-o')) {
//         // Change color to red
//         heartIcon.classList.remove('fa-heart-o');
//         heartIcon.classList.add('fa-heart');
//         heartIcon.style.color = 'red';

//         // Add to saved items
//         savedItems.push(productId);
//     } else {
//         // Change color back to original
//         heartIcon.classList.remove('fa-heart');
//         heartIcon.classList.add('fa-heart-o');
//         heartIcon.style.color = '';

//         // Remove from saved items
//         const index = savedItems.indexOf(productId);
//         if (index > -1) {
//             savedItems.splice(index, 1);
//         }
//     }

//     // Update saved counter
//     savedCounter.textContent = savedItems.length;
// }

// function toggleSavedItems() {
//     const savedItemsSection = document.getElementById("saved-items");
//     const savedItemsList = document.getElementById("saved-items-list");

//     // Toggle display of saved items section
//     if (savedItemsSection.style.display === 'none') {
//         savedItemsSection.style.display = 'block';
//         savedItemsList.innerHTML = ''; // Clear previous items

//         // Populate saved items list
//         savedItems.forEach(productId => {
//             const savedItem = document.createElement('li');
//             savedItem.textContent = `Product ${productId}`; // Replace with actual product details if available
//             savedItemsList.appendChild(savedItem);
//         });
//     } else {
//         savedItemsSection.style.display = 'none';
//     }
// }

function toggleItem(element) {
    const productId = element.getAttribute("data-product-id");
    const heartIcon = element.querySelector("i");
    const savedCounter = document.getElementById("saved-counter");

    if (heartIcon.classList.contains('fa-heart-o')) {
        // Change color to red
        heartIcon.classList.remove('fa-heart-o');
        heartIcon.classList.add('fa-heart');
        heartIcon.style.color = 'red';

        // Update saved counter
        let currentCount = parseInt(savedCounter.textContent);
        savedCounter.textContent = currentCount + 1;

        // Send a request to save the item (you might want to use AJAX or fetch API here)
        fetch(`/save-item/${productId}/`)
            .then(response => {
                if (response.ok) {
                    console.log(`Product ${productId} saved successfully.`);
                    // Optionally, you can update the saved items list dynamically here
                } else {
                    console.error(`Failed to save Product ${productId}.`);
                }
            })
            .catch(error => console.error('Error saving item:', error));
    } else {
        // Change color back to original
        heartIcon.classList.remove('fa-heart');
        heartIcon.classList.add('fa-heart-o');
        heartIcon.style.color = '';

        // Update saved counter
        let currentCount = parseInt(savedCounter.textContent);
        savedCounter.textContent = currentCount - 1;

        // Send a request to remove the saved item (similar AJAX/fetch request as above)
        fetch(`/remove-item/${productId}/`)
            .then(response => {
                if (response.ok) {
                    console.log(`Product ${productId} removed successfully.`);
                    // Optionally, you can update the saved items list dynamically here
                } else {
                    console.error(`Failed to remove Product ${productId}.`);
                }
            })
            .catch(error => console.error('Error removing item:', error));
    }
}

// Function to show saved items when "Saved" is clicked
document.getElementById("counter").addEventListener("click", function() {
    const savedItemsList = document.getElementById("saved-items-list");
    savedItemsList.classList.toggle("show");

    // Fetch saved items dynamically if needed
    if (savedItemsList.classList.contains("show")) {
        fetch('/saved/')
            .then(response => response.text())
            .then(data => {
                savedItemsList.innerHTML = data;
            })
            .catch(error => console.error('Error fetching saved items:', error));
    }
});




// document.addEventListener('DOMContentLoaded', function() {
//     const categoryItems = document.querySelectorAll('.list-item[data-category-slug]');
//     const categorySection = document.getElementById('category');
//     const recentSection = document.getElementById('recent');
//     const pickedSection = document.getElementById('picked');
//     const watchedSection = document.getElementById('watched');
//     const categoryItemsContainer = document.getElementById('category-items');

//     categoryItems.forEach(item => {
//         item.addEventListener('click', function() {
//             const categorySlug = this.getAttribute('data-category-slug');
//             fetchCategoryItems(categorySlug);
//         });
//     });

//     async function fetchCategoryItems(slug) {
//         try {
//             const response = await fetch(`/category/${slug}/`);
//             if (!response.ok) {
//                 throw new Error('Failed to fetch category items');
//             }
//             const data = await response.json();
//             renderCategoryItems(data.items);
//         } catch (error) {
//             console.error('Error fetching category items:', error);
//         }
//     }

//     function renderCategoryItems(categoryName,items) {
        
//         // Clear previous items
//         categoryItemsContainer.innerHTML = '';



//         // Determine number of items per row
//         const itemsPerRow = 6;
//         let rowContainer = null;

//         items.forEach((item, index) => {
//             if (index % itemsPerRow === 0) {
//                 // Create a new row container for every itemsPerRow items
//                 rowContainer = document.createElement('div');
//                 rowContainer.classList.add('item-row'); // Adjust this class based on your CSS
//                 categoryItemsContainer.appendChild(rowContainer);
//             }

//             const itemDiv = document.createElement('div');
//             itemDiv.classList.add('item'); // Adjust this class based on your CSS
//             itemDiv.innerHTML = `
//                 <div class="image">
//                     <img src="${item.image_url}" alt="${item.name}">
//                 </div>
//                 <span class="heart" data-product-id="${item.id}" onclick="toggleItem(this)">
//                     <i class="fa fa-heart-o" aria-hidden="true"></i>
//                 </span>
//                 <div class="text-content">
//                     <a href="/details/${item.id}" class="image-text">${item.name}</a><br>
//                     <span class="image-price">AU $${item.price}</span>
//                 </div>
//             `;
//             rowContainer.appendChild(itemDiv);
//         });

//         showCategorySection();
//     }

//     function showCategorySection() {
//         categorySection.style.display = 'block';
//         recentSection.style.display = 'none';
//         pickedSection.style.display = 'none';
//         watchedSection.style.display = 'none';
//     }

//     function showDefaultSections() {
//         categorySection.style.display = 'none';
//         recentSection.style.display = 'block';
//         pickedSection.style.display = 'block';
//         watchedSection.style.display = 'block';
//     }
    
//     // Initialize default state
//     showDefaultSections();
// });


document.addEventListener('DOMContentLoaded', function() {
    const categoryItems = document.querySelectorAll('.list-item[data-category-slug]');
    const categorySection = document.getElementById('category');
    const recentSection = document.getElementById('recent');
    const pickedSection = document.getElementById('picked');
    const watchedSection = document.getElementById('watched');
    const categoryItemsContainer = document.getElementById('category-items');
    const categoryTitle = categorySection.querySelector('.text');

    categoryItems.forEach(item => {
        item.addEventListener('click', function() {
            const categorySlug = this.getAttribute('data-category-slug');
            fetchCategoryItems(categorySlug);
        });
    });

    async function fetchCategoryItems(slug) {
        try {
            const response = await fetch(`/category/${slug}/`);
            if (!response.ok) {
                throw new Error('Failed to fetch category items');
            }
            const data = await response.json();
            renderCategoryItems(data.category_name, data.items);
        } catch (error) {
            console.error('Error fetching category items:', error);
        }
    }

    function renderCategoryItems(categoryName, items) {
        // Set the category title
        categoryTitle.textContent = `Category: ${categoryName}`;
        
        // Clear previous items
        categoryItemsContainer.innerHTML = '';

        // Determine number of items per row
        const itemsPerRow = 6;
        let rowContainer = null;

        items.forEach((item, index) => {
            if (index % itemsPerRow === 0) {
                // Create a new row container for every itemsPerRow items
                rowContainer = document.createElement('div');
                rowContainer.classList.add('item-row'); // Adjust this class based on your CSS
                categoryItemsContainer.appendChild(rowContainer);
            }

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item'); // Adjust this class based on your CSS
            itemDiv.innerHTML = `
                <div class="image">
                    <img src="${item.image_url}" alt="${item.name}">
                </div>
                <span class="heart" data-product-id="${item.id}" onclick="toggleItem(this)">
                    <i class="fa fa-heart-o" aria-hidden="true"></i>
                </span>
                <div class="text-content">
                    <a href="/details/${item.id}" class="image-text">${item.name}</a><br>
                    <span class="image-price">AU $${item.price}</span>
                </div>
            `;
            rowContainer.appendChild(itemDiv);
        });

        showCategorySection();
    }

    function showCategorySection() {
        categorySection.style.display = 'block';
        recentSection.style.display = 'none';
        pickedSection.style.display = 'none';
        watchedSection.style.display = 'none';
    }

    function showDefaultSections() {
        categorySection.style.display = 'none';
        recentSection.style.display = 'block';
        pickedSection.style.display = 'block';
        watchedSection.style.display = 'block';
    }
    
    // Initialize default state
    showDefaultSections();
});

function performSearch() {
    const query = document.getElementById('search-input').value;
    if (query.trim() !== '') { // Check if query is not empty
        window.location.href = `/?q=${encodeURIComponent(query)}`; // Encode query parameter
    }
}







