
//saved items....

function toggleItem(element) {
    const productId = element.getAttribute("data-product-id");
    const heartIcon = element.querySelector("i");
    const savedCounter = document.getElementById("saved-counter");

    fetch(`/save-item/${productId}/`, { method: 'GET' })
    .then(response => response.json())
    .then(data => {
        let savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];

        if (data.saved) {
            // Add item..
            if (!savedItems.includes(productId)) {
                savedItems.push(productId);
            }
            heartIcon.classList.remove('fa-heart-o');
            heartIcon.classList.add('fa-heart');
            heartIcon.style.color = 'red';
        } else {
            // Remove item..
            savedItems = savedItems.filter(item => item !== productId);
            heartIcon.classList.remove('fa-heart');
            heartIcon.classList.add('fa-heart-o');
            heartIcon.style.color = '';
        

        // Remove item from the DOM if on the saved items page
        const savedItemDiv = document.getElementById(`saved-item-${productId}`);
        if (savedItemDiv) {
            savedItemDiv.remove();
        }
    }

        localStorage.setItem('savedItems', JSON.stringify(savedItems));
        savedCounter.textContent = savedItems.length;
    })
    .catch(error => console.error('Error:', error));
}

// load the saved state..
function loadSavedState() {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedCounter = document.getElementById("saved-counter");
    savedCounter.textContent = savedItems.length;

    savedItems.forEach(productId => {
        const heartIcon = document.querySelector(`#heart-${productId} i`);
        if (heartIcon) {
            heartIcon.classList.remove('fa-heart-o');
            heartIcon.classList.add('fa-heart');
            heartIcon.style.color = 'red';
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {
    loadSavedState();
});



// category item..
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
            console.log(`Fetching items for category: ${slug}`);
            const response = await fetch(`/category/${slug}/`);
            if (!response.ok) {
                throw new Error(`Failed to fetch category items: ${response.status} ${response.statusText}`);
            }
            const data = await response.json();
            console.log('Category items fetched:', data);
            renderCategoryItems(data.category_name, data.items);
        } catch (error) {
            console.error('Error fetching category items:', error);
            alert('Failed to fetch category items. Please try again later.');
        }
    }

    function renderCategoryItems(categoryName, items) {
        categoryTitle.textContent = `Category: ${categoryName}`;
        categoryItemsContainer.innerHTML = '';

        const itemsPerRow = 6;
        let rowContainer = null;

        items.forEach((item, index) => {
            if (index % itemsPerRow === 0) {
                rowContainer = document.createElement('div');
                rowContainer.classList.add('item-row');
                categoryItemsContainer.appendChild(rowContainer);
            }

            const itemDiv = document.createElement('div');
            itemDiv.classList.add('item'); 
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
    
    showDefaultSections();
});



//search..
function performSearch() {
    const query = document.getElementById('search-input').value;
    if (query.trim() !== '') { 
        window.location.href = `/?q=${encodeURIComponent(query)}`; 
    }
}



//image onclick...
function showImage(imageUrl) {
    const mainImage = document.getElementById('mainImage');
    mainImage.src = imageUrl;
}




