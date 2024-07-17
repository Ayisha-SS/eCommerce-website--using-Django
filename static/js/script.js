//     //saved items....

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

    document.addEventListener('DOMContentLoaded', function () {
        loadSavedState();
    });



    // category item..

    document.addEventListener('DOMContentLoaded', function () {
        const categoryItems = document.querySelectorAll('.list-item[data-category-slug]');
        const categorySection = document.getElementById('category');
        const categoryItemsContainer = document.getElementById('category-items');
        const categoryTitle = categorySection.querySelector('.text');

        categoryItems.forEach(item => {
            item.addEventListener('click', function () {
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

            // Hide other sections
            document.getElementById('recent').style.display = 'none';
            document.getElementById('picked').style.display = 'none';
            document.getElementById('watched').style.display = 'none';

            categoryTitle.textContent = `Category: ${categoryName}`;
            categoryItemsContainer.innerHTML = '';

            items.forEach(item => {
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
                    <a href="/product/${item.id}/" class="image-text">${item.name}</a><br>
                    <span class="image-price">AU $${item.price}</span>
                </div>
            `;
                categoryItemsContainer.appendChild(itemDiv);
            });

            // Show category section
            categorySection.style.display = 'block';
        }

    });


    //search..
    // function performSearch() {
    //     const query = document.getElementById('search-input').value;
    //     if (query.trim() !== '') {
    //         window.location.href = `/?q=${encodeURIComponent(query)}`;
    //     }
    // }



    let selectedCategory = 'All';

    function toggleDropdown() {
        const searchAll = document.querySelector('.search-all');
        searchAll.classList.toggle('active');
    }
    
    function performSearch() {
        const query = document.getElementById('search-input').value;
        if (query.trim() !== '') {
            if (selectedCategory === 'All') {
                window.location.href = `/?q=${encodeURIComponent(query)}`;
            } else {
                window.location.href = `/?q=${encodeURIComponent(query)}&category=${encodeURIComponent(selectedCategory)}`;
            }
        } else {
            if (selectedCategory === 'All') {
                window.location.href = '/';
            } else {
                window.location.href = `/?category=${encodeURIComponent(selectedCategory)}`;
            }
        }
    }
    
    function searchByCategory(category) {
        selectedCategory = category;
        const searchAll = document.querySelector('.search-all');
        searchAll.innerHTML = `${category.charAt(0).toUpperCase() + category.slice(1)} <i class="fa fa-angle-down"></i><span class="dropdown">${searchAll.querySelector('.dropdown').innerHTML}</span>`;
        toggleDropdown(); // Close the dropdown
        performSearch(); // Perform search immediately after selecting category
    }








    //image onclick...
    function showImage(imageUrl) {
        const mainImage = document.getElementById('mainImage');
        mainImage.src = imageUrl;
    }


    //li button..
    document.addEventListener('DOMContentLoaded', function () {
        const homeButton = document.getElementById('home');
        homeButton.classList.add('active');

        const listItems = document.querySelectorAll('.list-item');
        listItems.forEach(item => {
            item.addEventListener('click', function () {
                listItems.forEach(item => item.classList.remove('active'));

                this.classList.add('active');
            });
        });
    });



    // quantiy change...
    document.addEventListener('DOMContentLoaded', () => {
        const decreaseButton = document.getElementById('decrease');
        const increaseButton = document.getElementById('increase');
        const quantitySpan = document.getElementById('quantity');
        const priceSpan = document.getElementById('price');
        const pricePerUnit = parseFloat(priceSpan.getAttribute('data-price')); // Initial price of the product
        const availableStockSpan = document.getElementById('available_stock')
        const availableStock = parseInt(availableStockSpan.textContent);
        const initialStock = parseInt(availableStockSpan.textContent);
        
        function updatePrice(quantity) {
            const newPrice = pricePerUnit * quantity;
            priceSpan.textContent = `AU $${newPrice.toFixed(2)}`;
        }

        function updateStock(quantity){
            const remainingStock = initialStock - (quantity-1);
            availableStockSpan.textContent = remainingStock;
        }
    
        function decreaseQuantity() {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantity -= 1;
                quantitySpan.textContent = quantity;
                updatePrice(quantity);
                updateStock(quantity);
            }
        }
    
        function increaseQuantity() {
            let quantity = parseInt(quantitySpan.textContent);
            if (availableStock > 0 && quantity < initialStock) {
                quantity += 1;
                quantitySpan.textContent = quantity;
                updatePrice(quantity);
                updateStock(quantity);
            }
        }
    
        if (decreaseButton) {
            decreaseButton.addEventListener('click', decreaseQuantity);
        }
        if (increaseButton) {
            increaseButton.addEventListener('click', increaseQuantity);
        }
    });
// });

