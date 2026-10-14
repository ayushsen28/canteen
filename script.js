/* =========================================
   CAMPUS BITES - INTERACTIVE LOGIC
   Vanilla JavaScript Application
   ========================================= */

(function() {
    'use strict';

    // --- 1. DATA & CONFIGURATION ---
    const SERVICE_FEE = 20;
    const VALID_COUPONS = {
        'CAMPUS10': { type: 'percent', value: 10, label: '10% Off' },
        'STUDENT20': { type: 'flat', value: 20, label: '₹20 Off' },
        'FIRST50': { type: 'percent', value: 50, label: '50% Off (Max ₹100)', maxDiscount: 100 }
    };

    const CATEGORIES = [
        { id: 'all', name: 'All Items', icon: '🍽️' },
        { id: 'Burgers', name: 'Burgers', icon: '🍔' },
        { id: 'Pizza', name: 'Pizza', icon: '🍕' },
        { id: 'Sandwiches', name: 'Sandwiches', icon: '🥪' },
        { id: 'Indian Snacks', name: 'Indian Snacks', icon: '🥟' },
        { id: 'South Indian', name: 'South Indian', icon: '🥞' },
        { id: 'Meals & Thalis', name: 'Meals & Thalis', icon: '🍛' },
        { id: 'Beverages', name: 'Beverages', icon: '🧋' },
        { id: 'Desserts', name: 'Desserts', icon: '🍰' }
    ];

    const PRODUCTS = [
        { id: 1, name: "Classic Smash Burger", desc: "Double smashed patties, American cheese, pickles, secret sauce on a brioche bun.", price: 149, category: "Burgers", rating: 4.8, prepTime: "12 min", isVeg: false, popular: true, image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=300&fit=crop&auto=format" },
        { id: 2, name: "Spicy Chicken Burger", desc: "Crispy fried chicken thigh, jalapeños, sriracha mayo, shredded lettuce.", price: 179, category: "Burgers", rating: 4.6, prepTime: "15 min", isVeg: false, popular: false, image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&h=300&fit=crop&auto=format" },
        { id: 3, name: "Paneer Tikka Burger", desc: "Grilled paneer tikka patty, mint chutney, onion rings, fresh veggies.", price: 129, category: "Burgers", rating: 4.5, prepTime: "10 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400&h=300&fit=crop&auto=format" },
        { id: 4, name: "Margherita Pizza", desc: "Classic Neapolitan style with San Marzano tomato sauce, fresh mozzarella, basil.", price: 199, category: "Pizza", rating: 4.9, prepTime: "18 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&auto=format" },
        { id: 5, name: "Pepperoni Feast Pizza", desc: "Loaded with spicy pepperoni slices, mozzarella blend, oregano seasoning.", price: 249, category: "Pizza", rating: 4.7, prepTime: "20 min", isVeg: false, popular: true, image: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&h=300&fit=crop&auto=format" },
        { id: 6, name: "Farmhouse Veg Pizza", desc: "Capsicum, mushroom, onion, black olives, sweet corn on a crispy base.", price: 219, category: "Pizza", rating: 4.4, prepTime: "18 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=300&fit=crop&auto=format" },
        { id: 7, name: "Club Sandwich", desc: "Triple-decker toasted sandwich with chicken, bacon, egg, lettuce, tomato.", price: 139, category: "Sandwiches", rating: 4.6, prepTime: "8 min", isVeg: false, popular: false, image: "https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=400&h=300&fit=crop&auto=format" },
        { id: 8, name: "Veggie Delight Sandwich", desc: "Cucumber, bell peppers, carrots, hummus spread on multigrain bread.", price: 99, category: "Sandwiches", rating: 4.3, prepTime: "5 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1553909489-cd47e0907980?w=400&h=300&fit=crop&auto=format" },
        { id: 9, name: "Samosa Plate (4 pcs)", desc: "Crispy golden pastry stuffed with spiced potatoes and peas. Served with chutneys.", price: 49, category: "Indian Snacks", rating: 4.8, prepTime: "5 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&h=300&fit=crop&auto=format" },
        { id: 10, name: "Chole Bhature", desc: "Fluffy deep-fried bhature served with spicy chickpea curry, onions, pickle.", price: 89, category: "Indian Snacks", rating: 4.7, prepTime: "12 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400&h=300&fit=crop&auto=format" },
        { id: 11, name: "Vada Pav (2 pcs)", desc: "Mumbai's favorite spicy potato fritter in a soft bun with garlic chutney.", price: 39, category: "Indian Snacks", rating: 4.5, prepTime: "5 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1606471191009-63994c53db0b?w=400&h=300&fit=crop&auto=format" },
        { id: 12, name: "Masala Dosa", desc: "Crispy fermented crepe stuffed with spiced potato mash. Served with sambar & coconut chutney.", price: 79, category: "South Indian", rating: 4.9, prepTime: "10 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1668236543090-82eb5eace7fc?w=400&h=300&fit=crop&auto=format" },
        { id: 13, name: "Idli Sambar Combo", desc: "4 soft steamed rice cakes served with hot lentil stew and fresh coconut chutney.", price: 59, category: "South Indian", rating: 4.6, prepTime: "8 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1589301773859-a9f234f86be0?w=400&h=300&fit=crop&auto=format" },
        { id: 14, name: "Rajma Chawal Thali", desc: "Kidney bean curry, steamed basmati rice, salad, papad, pickle, and a sweet.", price: 119, category: "Meals & Thalis", rating: 4.7, prepTime: "10 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&h=300&fit=crop&auto=format" },
        { id: 15, name: "Chicken Biryani Meal", desc: "Fragrant basmati rice layered with tender spiced chicken, raita, and salan.", price: 169, category: "Meals & Thalis", rating: 4.8, prepTime: "15 min", isVeg: false, popular: true, image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&h=300&fit=crop&auto=format" },
        { id: 16, name: "Veg Thali Special", desc: "Dal makhani, paneer butter masala, mixed veg, 3 rotis, rice, salad, papad, sweet.", price: 139, category: "Meals & Thalis", rating: 4.6, prepTime: "12 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1546832876-3e6bc38eb4cc?w=400&h=300&fit=crop&auto=format" },
        { id: 17, name: "Cold Coffee", desc: "Creamy blended chilled coffee with ice cream, topped with chocolate syrup.", price: 69, category: "Beverages", rating: 4.5, prepTime: "4 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop&auto=format" },
        { id: 18, name: "Fresh Lime Soda", desc: "Refreshing sweet or salted lime juice mixed with sparkling soda water and mint.", price: 39, category: "Beverages", rating: 4.4, prepTime: "2 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=400&h=300&fit=crop&auto=format" },
        { id: 19, name: "Masala Chai", desc: "Traditional Indian tea brewed with ginger, cardamom, cloves, and whole milk.", price: 25, category: "Beverages", rating: 4.9, prepTime: "3 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=400&h=300&fit=crop&auto=format" },
        { id: 20, name: "Chocolate Brownie", desc: "Warm fudgy walnut brownie served with a scoop of vanilla ice cream and drizzle.", price: 99, category: "Desserts", rating: 4.8, prepTime: "5 min", isVeg: true, popular: true, image: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?w=400&h=300&fit=crop&auto=format" },
        { id: 21, name: "Gulab Jamun (3 pcs)", desc: "Soft deep-fried milk dumplings soaked in warm rose-cardamom sugar syrup.", price: 59, category: "Desserts", rating: 4.7, prepTime: "3 min", isVeg: true, popular: false, image: "https://images.unsplash.com/photo-1666190050424-e0f8c5fce11c?w=400&h=300&fit=crop&auto=format" }
    ];

    const SPECIALS = [
        { id: 'sp1', name: "Student Power Combo", desc: "Any Burger + Cold Coffee + Brownie. The ultimate study fuel!", originalPrice: 317, price: 249, discount: "20% OFF", image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=600&h=340&fit=crop&auto=format", items: [1, 17, 20] },
        { id: 'sp2', name: "Desi Feast Thali Deal", desc: "Rajma Chawal Thali + Masala Chai + Gulab Jamun. Pure comfort.", originalPrice: 203, price: 169, discount: "15% OFF", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&h=340&fit=crop&auto=format", items: [14, 19, 21] },
        { id: 'sp3', name: "Pizza Party Duo", desc: "2 Margherita Pizzas + 2 Fresh Lime Sodas. Perfect for sharing.", originalPrice: 476, price: 349, discount: "25% OFF", image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=600&h=340&fit=crop&auto=format", items: [4, 4, 18, 18] }
    ];

    const REVIEWS = [
        { name: "Priya Sharma", initials: "PS", dept: "Computer Science", rating: 5, text: "The Paneer Tikka Burger is absolutely insane! Best canteen food I've had in my entire college life. The app makes ordering between classes so easy." },
        { name: "Rahul Verma", initials: "RV", dept: "Mechanical Eng.", rating: 4, text: "Love the Rajma Chawal Thali. It reminds me of home-cooked food. Very affordable for students and the portions are generous." },
        { name: "Ananya Singh", initials: "AS", dept: "Business Admin", rating: 5, text: "The combo deals save me so much money every week. Plus, the interface is beautiful. Finally, a college canteen that feels modern!" },
        { name: "Karthik Iyer", initials: "KI", dept: "Electronics", rating: 5, text: "Masala Dosa here rivals any South Indian restaurant outside. And getting it delivered to my table via this site is magic." },
        { name: "Sneha Patel", initials: "SP", dept: "Architecture", rating: 4, text: "Quick pickup feature is a lifesaver during short breaks. I order ahead and just grab my food. Chocolate Brownie is a must-try!" },
        { name: "Arjun Das", initials: "AD", dept: "Physics", rating: 5, text: "Clean, hygienic, and incredibly tasty. The veg options are fantastic. I use Campus Bites literally every single day." }
    ];

    // --- 2. STATE MANAGEMENT ---
    let state = {
        cart: [],
        wishlist: [],
        recentlyViewed: [],
        activeCategory: 'all',
        searchQuery: '',
        sortBy: 'default',
        appliedCoupon: null,
        currentCheckoutStep: 1,
        theme: 'light',
        carouselIndex: 0
    };

    // Load persisted state
    function loadState() {
        try {
            const savedCart = localStorage.getItem('cb_cart');
            const savedWishlist = localStorage.getItem('cb_wishlist');
            const savedTheme = localStorage.getItem('cb_theme');
            const savedRecent = localStorage.getItem('cb_recent');
            
            if (savedCart) state.cart = JSON.parse(savedCart) || [];
            if (savedWishlist) state.wishlist = JSON.parse(savedWishlist) || [];
            if (savedTheme) state.theme = savedTheme;
            if (savedRecent) state.recentlyViewed = JSON.parse(savedRecent) || [];
        } catch (e) {
            console.warn('Could not load state from localStorage:', e);
        }
    }

    function saveState() {
        try {
            localStorage.setItem('cb_cart', JSON.stringify(state.cart));
            localStorage.setItem('cb_wishlist', JSON.stringify(state.wishlist));
            localStorage.setItem('cb_theme', state.theme);
            localStorage.setItem('cb_recent', JSON.stringify(state.recentlyViewed.slice(0, 10)));
        } catch (e) {
            console.warn('Could not save state to localStorage:', e);
        }
    }

    // --- 3. UTILITY FUNCTIONS ---
    function $(selector) { return document.querySelector(selector); }
    function $$(selector) { return document.querySelectorAll(selector); }

    function createElement(tag, attributes = {}, children = []) {
        const el = document.createElement(tag);
        for (const [key, value] of Object.entries(attributes)) {
            if (key === 'textContent') el.textContent = value;
            else if (key === 'className') el.className = value;
            else if (key.startsWith('data')) el.setAttribute(key.replace(/([A-Z])/g, '-$1').toLowerCase(), value);
            else el.setAttribute(key, value);
        }
        children.forEach(child => {
            if (typeof child === 'string') el.appendChild(document.createTextNode(child));
            else if (child) el.appendChild(child);
        });
        return el;
    }

    function showToast(message, type = 'info') {
        const container = $('#toast-container');
        const toast = createElement('div', { className: `toast toast-${type}`, role: 'alert' }, [message]);
        container.appendChild(toast);
        setTimeout(() => {
            toast.classList.add('removing');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }

    function formatPrice(amount) {
        return '₹' + Number(amount).toFixed(0);
    }

    function generateOrderId() {
        return '#CB-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substring(2, 5).toUpperCase();
    }

    function handleImageError(img) {
        img.onerror = null;
        img.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" fill="%23f0f0f0"%3E%3Crect width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="16" fill="%23999"%3EImage Unavailable%3C/text%3E%3C/svg%3E';
        img.alt = 'Image unavailable';
    }

    // --- 4. THEME MANAGEMENT ---
    function initTheme() {
        document.documentElement.setAttribute('data-theme', state.theme);
        updateThemeIcon();
    }

    function toggleTheme() {
        state.theme = state.theme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', state.theme);
        saveState();
        updateThemeIcon();
    }

    function updateThemeIcon() {
        const btn = $('#themeToggle');
        if (!btn) return;
        const sun = btn.querySelector('.sun-icon');
        const moon = btn.querySelector('.moon-icon');
        if (state.theme === 'dark') {
            if(sun) sun.style.display = 'block';
            if(moon) moon.style.display = 'none';
        } else {
            if(sun) sun.style.display = 'none';
            if(moon) moon.style.display = 'block';
        }
    }

    // --- 5. NAVIGATION ---
    function initNavbar() {
        const navbar = $('#navbar');
        const hamburger = $('#hamburger');
        const navLinks = $('#navLinks');
        
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        }, { passive: true });

        hamburger.addEventListener('click', () => {
            const isOpen = navLinks.classList.toggle('open');
            hamburger.classList.toggle('active');
            hamburger.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navLinks.addEventListener('click', (e) => {
            if (e.target.classList.contains('nav-link')) {
                navLinks.classList.remove('open');
                hamburger.classList.remove('active');
                hamburger.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
                
                $$('.nav-link').forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            }
        });

        // Active section tracking
        const sections = $$('section[id], footer[id]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    $$('.nav-link').forEach(link => {
                        link.classList.toggle('active', link.getAttribute('data-section') === id);
                    });
                }
            });
        }, { rootMargin: '-40% 0px -60% 0px' });

        sections.forEach(sec => observer.observe(sec));

        // Search Toggle
        const searchToggle = $('#searchToggle');
        const searchBar = $('#searchBarContainer');
        const searchInput = $('#globalSearch');
        const searchClear = $('#searchClear');

        searchToggle.addEventListener('click', () => {
            const isHidden = searchBar.hidden;
            searchBar.hidden = !isHidden;
            searchToggle.setAttribute('aria-expanded', isHidden);
            if (isHidden) searchInput.focus();
        });

        searchInput.addEventListener('input', (e) => {
            state.searchQuery = e.target.value.trim().toLowerCase();
            searchClear.hidden = !state.searchQuery;
            renderMenu();
        });

        searchClear.addEventListener('click', () => {
            searchInput.value = '';
            state.searchQuery = '';
            searchClear.hidden = true;
            renderMenu();
        });

        // Category links in footer
        $$('.footer-links a[data-filter]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                state.activeCategory = link.getAttribute('data-filter');
                renderMenu();
                renderFilterTabs();
                document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    // --- 6. RENDERING: CATEGORIES ---
    function renderCategories() {
        const grid = $('#categoriesGrid');
        grid.innerHTML = '';
        CATEGORIES.forEach(cat => {
            if (cat.id === 'all') return;
            const card = createElement('div', { 
                className: 'category-card reveal', 
                role: 'listitem',
                tabindex: '0',
                'aria-label': `View ${cat.name}`
            });
            card.innerHTML = `<span class="category-icon">${cat.icon}</span><span class="category-name">${cat.name}</span>`;
            card.addEventListener('click', () => {
                state.activeCategory = cat.id;
                renderFilterTabs();
                renderMenu();
                document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            });
            card.addEventListener('keydown', (e) => { if(e.key === 'Enter') card.click(); });
            grid.appendChild(card);
        });
    }

    // --- 7. RENDERING: MENU ---
    function renderFilterTabs() {
        const tabs = $('#filterTabs');
        tabs.innerHTML = '';
        CATEGORIES.forEach(cat => {
            const btn = createElement('button', {
                className: `filter-tab ${state.activeCategory === cat.id ? 'active' : ''}`,
                role: 'tab',
                'aria-selected': state.activeCategory === cat.id ? 'true' : 'false',
                textContent: cat.name
            });
            btn.addEventListener('click', () => {
                state.activeCategory = cat.id;
                renderFilterTabs();
                renderMenu();
            });
            tabs.appendChild(btn);
        });
    }

    function getFilteredProducts() {
        let products = [...PRODUCTS];
        
        if (state.activeCategory !== 'all') {
            products = products.filter(p => p.category === state.activeCategory);
        }
        
        if (state.searchQuery) {
            products = products.filter(p => 
                p.name.toLowerCase().includes(state.searchQuery) || 
                p.desc.toLowerCase().includes(state.searchQuery) ||
                p.category.toLowerCase().includes(state.searchQuery)
            );
        }

        switch (state.sortBy) {
            case 'price-low': products.sort((a, b) => a.price - b.price); break;
            case 'price-high': products.sort((a, b) => b.price - a.price); break;
            case 'rating': products.sort((a, b) => b.rating - a.rating); break;
            case 'popular': products.sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0)); break;
        }

        return products;
    }

    function renderMenu() {
        const grid = $('#menuGrid');
        const empty = $('#emptyState');
        const products = getFilteredProducts();
        
        grid.innerHTML = '';

        if (products.length === 0) {
            empty.hidden = false;
            grid.hidden = true;
            return;
        }

        empty.hidden = true;
        grid.hidden = false;

        products.forEach((product, index) => {
            const isFav = state.wishlist.includes(product.id);
            const card = createElement('div', { 
                className: 'food-card reveal', 
                role: 'listitem',
                'data-id': product.id
            });
            card.style.transitionDelay = `${Math.min(index * 0.05, 0.5)}s`;

            card.innerHTML = `
                <div class="food-card-inner">
                    <div class="card-img-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="card-img" loading="lazy" onerror="window.handleImgErr(this)">
                        <div class="card-badges">
                            <span class="veg-badge ${product.isVeg ? 'veg' : 'non-veg'}" title="${product.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}"></span>
                            ${product.popular ? '<span class="popular-badge">Popular</span>' : ''}
                        </div>
                        <button class="fav-btn ${isFav ? 'active' : ''}" data-action="toggle-fav" data-id="${product.id}" aria-label="${isFav ? 'Remove from' : 'Add to'} wishlist">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="${isFav ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
                        </button>
                    </div>
                    <div class="card-body">
                        <h3 class="card-title">${product.name}</h3>
                        <p class="card-desc">${product.desc}</p>
                        <div class="card-meta">
                            <span class="rating">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                                ${product.rating}
                            </span>
                            <span class="prep-time">
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                                ${product.prepTime}
                            </span>
                        </div>
                        <div class="card-footer">
                            <span class="price">${formatPrice(product.price)}</span>
                            <button class="add-cart-btn ripple-btn" data-action="add-cart" data-id="${product.id}" aria-label="Add ${product.name} to cart">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                Add
                            </button>
                        </div>
                    </div>
                </div>
            `;

            // 3D Tilt Effect
            if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(hover: hover)').matches) {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    const rotateX = (y - centerY) / 20;
                    const rotateY = (centerX - x) / 20;
                    const inner = card.querySelector('.food-card-inner');
                    if(inner) inner.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
                });
                card.addEventListener('mouseleave', () => {
                    const inner = card.querySelector('.food-card-inner');
                    if(inner) inner.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
                });
            }

            // Quick view on double click
            card.addEventListener('dblclick', (e) => {
                if(!e.target.closest('button')) openQuickView(product.id);
            });

            grid.appendChild(card);
        });

        observeRevealElements();
    }

    // Expose error handler globally for inline onerror
    window.handleImgErr = handleImageError;

    // --- 8. CART SYSTEM ---
    function addToCart(productId, qty = 1) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        const existing = state.cart.find(item => item.id === productId);
        if (existing) {
            existing.quantity = Math.min(existing.quantity + qty, 10);
        } else {
            state.cart.push({ id: productId, quantity: qty });
        }
        
        saveState();
        updateCartUI();
        showToast(`${product.name} added to cart`, 'success');
        
        // Animate button
        const btn = document.querySelector(`[data-action="add-cart"][data-id="${productId}"]`);
        if (btn) {
            btn.classList.add('added');
            btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg> Added`;
            setTimeout(() => {
                btn.classList.remove('added');
                btn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add`;
            }, 1500);
        }
    }

    function updateQuantity(productId, delta) {
        const item = state.cart.find(i => i.id === productId);
        if (!item) return;
        
        item.quantity += delta;
        if (item.quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        item.quantity = Math.min(item.quantity, 10);
        
        saveState();
        updateCartUI();
        renderCartDrawer();
    }

    function removeFromCart(productId) {
        state.cart = state.cart.filter(i => i.id !== productId);
        saveState();
        updateCartUI();
        renderCartDrawer();
        showToast('Item removed from cart', 'info');
    }

    function clearCart() {
        state.cart = [];
        state.appliedCoupon = null;
        saveState();
        updateCartUI();
        renderCartDrawer();
        showToast('Cart cleared', 'info');
    }

    function getCartTotals() {
        let subtotal = 0;
        state.cart.forEach(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (product) subtotal += product.price * item.quantity;
        });

        let discount = 0;
        if (state.appliedCoupon && VALID_COUPONS[state.appliedCoupon]) {
            const coupon = VALID_COUPONS[state.appliedCoupon];
            if (coupon.type === 'percent') {
                discount = subtotal * (coupon.value / 100);
                if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
            } else {
                discount = coupon.value;
            }
        }
        discount = Math.min(discount, subtotal);

        const total = Math.max(0, subtotal + SERVICE_FEE - discount);
        const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

        return { subtotal, discount, total, itemCount, serviceFee: SERVICE_FEE };
    }

    function updateCartUI() {
        const totals = getCartTotals();
        const badges = ['#cartCount', '#mobileCartCount'];
        badges.forEach(sel => {
            const el = $(sel);
            if (el) {
                el.textContent = totals.itemCount;
                el.classList.add('bump');
                setTimeout(() => el.classList.remove('bump'), 300);
            }
        });

        const mobileBtn = $('#mobileCartBtn');
        if (mobileBtn) mobileBtn.hidden = totals.itemCount === 0;
    }

    function applyCoupon(code) {
        const upperCode = code.trim().toUpperCase();
        if (VALID_COUPONS[upperCode]) {
            state.appliedCoupon = upperCode;
            saveState();
            renderCartDrawer();
            showToast(`Coupon "${upperCode}" applied! ${VALID_COUPONS[upperCode].label}`, 'success');
        } else {
            showToast('Invalid coupon code', 'error');
        }
    }

    function renderCartDrawer() {
        const body = $('#cartItems');
        const footer = $('#cartFooter');
        body.innerHTML = '';

        if (state.cart.length === 0) {
            footer.hidden = true;
            body.innerHTML = `
                <div class="cart-empty">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
                    <h3>Your cart is empty</h3>
                    <p>Add some delicious items from our menu!</p>
                </div>
            `;
            return;
        }

        footer.hidden = false;

        state.cart.forEach(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return;

            const div = createElement('div', { className: 'cart-item' });
            div.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="cart-item-img" loading="lazy" onerror="window.handleImgErr(this)">
                <div class="cart-item-details">
                    <h4 class="cart-item-name">${product.name}</h4>
                    <p class="cart-item-price">${formatPrice(product.price * item.quantity)}</p>
                    <div class="cart-item-actions">
                        <button class="qty-btn" data-action="qty-dec" data-id="${product.id}" aria-label="Decrease quantity">−</button>
                        <span class="qty-val">${item.quantity}</span>
                        <button class="qty-btn" data-action="qty-inc" data-id="${product.id}" aria-label="Increase quantity">+</button>
                        <button class="remove-item" data-action="remove-item" data-id="${product.id}" aria-label="Remove ${product.name}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
                        </button>
                    </div>
                </div>
            `;
            body.appendChild(div);
        });

        const totals = getCartTotals();
        $('#subtotalAmount').textContent = formatPrice(totals.subtotal);
        $('#serviceFee').textContent = formatPrice(totals.serviceFee);
        
        const discountRow = $('#discountRow');
        if (totals.discount > 0) {
            discountRow.hidden = false;
            $('#discountAmount').textContent = '-' + formatPrice(totals.discount);
        } else {
            discountRow.hidden = true;
        }
        
        $('#grandTotal').textContent = formatPrice(totals.total);
    }

    function toggleCart(open) {
        const drawer = $('#cartDrawer');
        if (open) {
            drawer.hidden = false;
            requestAnimationFrame(() => drawer.classList.add('open'));
            document.body.style.overflow = 'hidden';
            renderCartDrawer();
            $('#closeCart').focus();
        } else {
            drawer.classList.remove('open');
            document.body.style.overflow = '';
            setTimeout(() => { drawer.hidden = true; }, 500);
        }
    }

    // --- 9. WISHLIST ---
    function toggleWishlist(productId) {
        const idx = state.wishlist.indexOf(productId);
        if (idx > -1) {
            state.wishlist.splice(idx, 1);
            showToast('Removed from wishlist', 'info');
        } else {
            state.wishlist.push(productId);
            showToast('Added to wishlist', 'success');
        }
        saveState();
        updateWishlistUI();
        renderMenu();
    }

    function updateWishlistUI() {
        const count = $('#wishlistCount');
        if (count) count.textContent = state.wishlist.length;
    }

    // --- 10. QUICK VIEW ---
    function openQuickView(productId) {
        const product = PRODUCTS.find(p => p.id === productId);
        if (!product) return;

        // Track recently viewed
        state.recentlyViewed = state.recentlyViewed.filter(id => id !== productId);
        state.recentlyViewed.unshift(productId);
        saveState();

        const body = $('#quickViewBody');
        body.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="qv-img" onerror="window.handleImgErr(this)">
            <div class="qv-info">
                <span class="section-tag">${product.category}</span>
                <h2 class="qv-title">${product.name}</h2>
                <p class="qv-desc">${product.desc}</p>
                <div class="card-meta">
                    <span class="rating">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                        ${product.rating}
                    </span>
                    <span class="prep-time">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                        ${product.prepTime}
                    </span>
                    <span class="veg-badge ${product.isVeg ? 'veg' : 'non-veg'}" style="display:inline-flex;width:24px;height:24px;"></span>
                </div>
                <span class="qv-price">${formatPrice(product.price)}</span>
                <button class="btn btn-primary full-width ripple-btn" data-action="add-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        const modal = $('#quickViewModal');
        modal.hidden = false;
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
        $('#closeQuickView').focus();
    }

    function closeQuickView() {
        const modal = $('#quickViewModal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { modal.hidden = true; }, 500);
    }

    // --- 11. CHECKOUT ---
    function openCheckout() {
        if (state.cart.length === 0) {
            showToast('Your cart is empty!', 'error');
            return;
        }
        toggleCart(false);
        state.currentCheckoutStep = 1;
        updateCheckoutSteps();
        
        const modal = $('#checkoutModal');
        modal.hidden = false;
        requestAnimationFrame(() => modal.classList.add('open'));
        document.body.style.overflow = 'hidden';
    }

    function closeCheckout() {
        const modal = $('#checkoutModal');
        modal.classList.remove('open');
        document.body.style.overflow = '';
        setTimeout(() => { 
            modal.hidden = true;
            state.currentCheckoutStep = 1;
            updateCheckoutSteps();
        }, 500);
    }

    function updateCheckoutSteps() {
        const steps = $$('.checkout-progress .step');
        const lines = $$('.step-line');
        const panels = $$('.checkout-step');

        steps.forEach((step, i) => {
            const num = i + 1;
            step.classList.remove('active', 'completed');
            if (num === state.currentCheckoutStep) step.classList.add('active');
            if (num < state.currentCheckoutStep) step.classList.add('completed');
        });

        panels.forEach((panel, i) => {
            panel.hidden = (i + 1) !== state.currentCheckoutStep;
        });

        if (state.currentCheckoutStep === 3) renderCheckoutSummary();
    }

    function validateStep(step) {
        if (step === 1) {
            const name = $('#custName').value.trim();
            const phone = $('#custPhone').value.trim();
            let valid = true;

            if (!name) {
                $('#errName').hidden = false;
                $('#custName').style.borderColor = '#E53935';
                valid = false;
            } else {
                $('#errName').hidden = true;
                $('#custName').style.borderColor = '';
            }

            if (!phone || phone.length < 10) {
                $('#errPhone').hidden = false;
                $('#custPhone').style.borderColor = '#E53935';
                valid = false;
            } else {
                $('#errPhone').hidden = true;
                $('#custPhone').style.borderColor = '';
            }

            return valid;
        }
        return true;
    }

    function renderCheckoutSummary() {
        const container = $('#summaryItems');
        container.innerHTML = '';
        
        state.cart.forEach(item => {
            const product = PRODUCTS.find(p => p.id === item.id);
            if (!product) return;
            const row = createElement('div', { className: 'total-row' });
            row.innerHTML = `<span>${product.name} × ${item.quantity}</span><span>${formatPrice(product.price * item.quantity)}</span>`;
            container.appendChild(row);
        });

        const totals = getCartTotals();
        $('#sumSubtotal').textContent = formatPrice(totals.subtotal);
        $('#sumFee').textContent = formatPrice(totals.serviceFee);
        
        const discRow = $('#sumDiscountRow');
        if (totals.discount > 0) {
            discRow.hidden = false;
            $('#sumDiscount').textContent = '-' + formatPrice(totals.discount);
        } else {
            discRow.hidden = true;
        }
        
        $('#sumGrand').textContent = formatPrice(totals.total);
    }

    function placeOrder() {
        const orderId = generateOrderId();
        $('#generatedOrderId').textContent = orderId;
        
        state.currentCheckoutStep = 4;
        updateCheckoutSteps();

        // Simulate timeline
        setTimeout(() => $('#tlPreparing').classList.add('active'), 2000);
        setTimeout(() => $('#tlReady').classList.add('active'), 4000);

        // Clear cart after order
        state.cart = [];
        state.appliedCoupon = null;
        saveState();
        updateCartUI();
    }

    // --- 12. SPECIALS ---
    function renderSpecials() {
        const grid = $('#specialsGrid');
        grid.innerHTML = '';

        SPECIALS.forEach(special => {
            const card = createElement('div', { className: 'special-card reveal' });
            card.innerHTML = `
                <span class="special-discount">${special.discount}</span>
                <img src="${special.image}" alt="${special.name}" class="special-img" loading="lazy" onerror="window.handleImgErr(this)">
                <div class="special-body">
                    <h3 class="special-title">${special.name}</h3>
                    <p class="special-desc">${special.desc}</p>
                    <div class="special-pricing">
                        <span class="special-price">${formatPrice(special.price)}</span>
                        <span class="special-original">${formatPrice(special.originalPrice)}</span>
                    </div>
                    <div class="countdown-timer" data-special="${special.id}">
                        <div class="countdown-box"><span class="countdown-num hours">00</span><span class="countdown-label">Hours</span></div>
                        <div class="countdown-box"><span class="countdown-num minutes">00</span><span class="countdown-label">Mins</span></div>
                        <div class="countdown-box"><span class="countdown-num seconds">00</span><span class="countdown-label">Secs</span></div>
                    </div>
                    <button class="btn btn-primary full-width ripple-btn" data-action="add-combo" data-items='${JSON.stringify(special.items)}'>Add Combo to Cart</button>
                </div>
            `;
            grid.appendChild(card);
        });

        startCountdownTimers();
    }

    function startCountdownTimers() {
        // Demo countdown: ends at midnight tonight
        const now = new Date();
        const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

        function updateTimers() {
            const current = new Date();
            let diff = Math.max(0, Math.floor((endOfDay - current) / 1000));
            
            const hours = Math.floor(diff / 3600);
            diff %= 3600;
            const mins = Math.floor(diff / 60);
            const secs = diff % 60;

            $$('.countdown-timer').forEach(timer => {
                const h = timer.querySelector('.hours');
                const m = timer.querySelector('.minutes');
                const s = timer.querySelector('.seconds');
                if(h) h.textContent = String(hours).padStart(2, '0');
                if(m) m.textContent = String(mins).padStart(2, '0');
                if(s) s.textContent = String(secs).padStart(2, '0');
            });
        }

        updateTimers();
        setInterval(updateTimers, 1000);
    }

    // --- 13. REVIEWS CAROUSEL ---
    function renderReviews() {
        const track = $('#reviewTrack');
        const dots = $('#carouselDots');
        track.innerHTML = '';
        dots.innerHTML = '';

        REVIEWS.forEach(review => {
            const card = createElement('div', { className: 'review-card' });
            const stars = Array(5).fill(0).map((_, i) => 
                `<svg width="16" height="16" viewBox="0 0 24 24" fill="${i < review.rating ? 'currentColor' : 'none'}" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
            ).join('');

            card.innerHTML = `
                <div class="review-header">
                    <div class="review-avatar">${review.initials}</div>
                    <div class="review-info">
                        <h4>${review.name}</h4>
                        <p>${review.dept}</p>
                    </div>
                </div>
                <div class="review-stars">${stars}</div>
                <p class="review-text">"${review.text}"</p>
            `;
            track.appendChild(card);
        });

        // Create dots
        const visibleCards = getVisibleReviewCards();
        const totalPages = Math.ceil(REVIEWS.length / visibleCards);
        for (let i = 0; i < totalPages; i++) {
            const dot = createElement('button', { 
                className: `dot ${i === 0 ? 'active' : ''}`, 
                'aria-label': `Go to review page ${i + 1}` 
            });
            dot.addEventListener('click', () => goToReviewSlide(i));
            dots.appendChild(dot);
        }

        setupCarouselControls();
    }

    function getVisibleReviewCards() {
        if (window.innerWidth <= 768) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    function goToReviewSlide(index) {
        const track = $('#reviewTrack');
        const cards = track.children;
        if (!cards.length) return;

        const visible = getVisibleReviewCards();
        const maxIndex = Math.ceil(cards.length / visible) - 1;
        state.carouselIndex = Math.max(0, Math.min(index, maxIndex));

        const cardWidth = cards[0].offsetWidth + 32; // gap
        const offset = state.carouselIndex * visible * cardWidth;
        track.style.transform = `translateX(-${offset}px)`;

        $$('#carouselDots .dot').forEach((d, i) => d.classList.toggle('active', i === state.carouselIndex));
    }

    function setupCarouselControls() {
        $('#prevReview').addEventListener('click', () => goToReviewSlide(state.carouselIndex - 1));
        $('#nextReview').addEventListener('click', () => goToReviewSlide(state.carouselIndex + 1));

        // Touch/Swipe support
        const track = $('#reviewTrack');
        let startX = 0, isDragging = false;

        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
        }, { passive: true });

        track.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) goToReviewSlide(state.carouselIndex + 1);
                else goToReviewSlide(state.carouselIndex - 1);
            }
            isDragging = false;
        }, { passive: true });
    }

    // --- 14. ANIMATIONS & EFFECTS ---
    function observeRevealElements() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        $$('.reveal:not(.visible)').forEach(el => observer.observe(el));
    }

    function initParallax() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!window.matchMedia('(hover: hover)').matches) return;

        document.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2;
            const y = (e.clientY / window.innerHeight - 0.5) * 2;

            $$('[data-parallax]').forEach(el => {
                const speed = parseFloat(el.getAttribute('data-parallax'));
                const moveX = x * speed * 100;
                const moveY = y * speed * 100;
                el.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }

    function initHero3D() {
        const card = $('#heroCard');
        if (!card || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        if (!window.matchMedia('(hover: hover)').matches) return;

        card.parentElement.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -10;
            const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 10;
            card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });

        card.parentElement.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateX(0) rotateY(0)';
        });
    }

    function createParticles() {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const container = $('#particles');
        if (!container) return;
        
        for (let i = 0; i < 20; i++) {
            const p = createElement('div', { className: 'particle' });
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.animationDuration = (4 + Math.random() * 4) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 4) + 'px';
            container.appendChild(p);
        }
    }

    function initCustomCursor() {
        if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const cursor = $('#customCursor');
        const follower = $('#cursorFollower');
        let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.left = mouseX + 'px';
            cursor.style.top = mouseY + 'px';
        });

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.15;
            followerY += (mouseY - followerY) * 0.15;
            follower.style.left = followerX + 'px';
            follower.style.top = followerY + 'px';
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        document.addEventListener('mouseover', (e) => {
            if (e.target.matches('a, button, .food-card, input, select, textarea, .category-card')) {
                document.body.classList.add('cursor-hover');
            }
        });
        document.addEventListener('mouseout', (e) => {
            if (e.target.matches('a, button, .food-card, input, select, textarea, .category-card')) {
                document.body.classList.remove('cursor-hover');
            }
        });
    }

    function initAnimatedCounters() {
        const counters = $$('.stat-number[data-target]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const el = entry.target;
                    const target = parseInt(el.getAttribute('data-target'));
                    let current = 0;
                    const increment = target / 60;
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            el.textContent = target;
                            clearInterval(timer);
                        } else {
                            el.textContent = Math.floor(current);
                        }
                    }, 20);
                    observer.unobserve(el);
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(c => observer.observe(c));
    }

    function initRippleEffect() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.ripple-btn');
            if (!btn) return;
            
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            const rect = btn.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    }

    // --- 15. EVENT DELEGATION ---
    function initEventDelegation() {
        document.addEventListener('click', (e) => {
            const target = e.target.closest('[data-action]');
            if (!target) return;

            const action = target.getAttribute('data-action');
            const id = parseInt(target.getAttribute('data-id'));

            switch (action) {
                case 'add-cart':
                    addToCart(id);
                    break;
                case 'toggle-fav':
                    e.stopPropagation();
                    toggleWishlist(id);
                    break;
                case 'qty-inc':
                    updateQuantity(id, 1);
                    break;
                case 'qty-dec':
                    updateQuantity(id, -1);
                    break;
                case 'remove-item':
                    removeFromCart(id);
                    break;
                case 'add-combo':
                    const items = JSON.parse(target.getAttribute('data-items'));
                    items.forEach(itemId => addToCart(itemId, 1));
                    break;
            }
        });
    }

    // --- 16. MODAL & DRAWER CONTROLS ---
    function initModalsAndDrawers() {
        // Cart
        $('#cartToggle').addEventListener('click', () => toggleCart(true));
        $('#mobileCartBtn').addEventListener('click', () => toggleCart(true));
        $('#closeCart').addEventListener('click', () => toggleCart(false));
        $('#drawerOverlay').addEventListener('click', () => toggleCart(false));

        // Checkout
        $('#checkoutBtn').addEventListener('click', openCheckout);
        $('#closeCheckout').addEventListener('click', closeCheckout);
        $('#checkoutOverlay').addEventListener('click', closeCheckout);
        $('#closeCheckoutFinal').addEventListener('click', () => {
            closeCheckout();
            clearCart();
        });

        // Checkout navigation
        $$('.next-step').forEach(btn => {
            btn.addEventListener('click', () => {
                const currentStep = state.currentCheckoutStep;
                if (currentStep === 4) return;
                
                if (!validateStep(currentStep)) return;

                if (currentStep === 3) {
                    placeOrder();
                    return;
                }

                state.currentCheckoutStep = parseInt(btn.getAttribute('data-next'));
                updateCheckoutSteps();
            });
        });

        $$('.prev-step').forEach(btn => {
            btn.addEventListener('click', () => {
                state.currentCheckoutStep = parseInt(btn.getAttribute('data-prev'));
                updateCheckoutSteps();
            });
        });

        // Dine-in table number toggle
        $$('input[name="orderType"]').forEach(radio => {
            radio.addEventListener('change', (e) => {
                $('#tableGroup').hidden = e.target.value !== 'dinein';
            });
        });

        // Coupon
        $('#applyCoupon').addEventListener('click', () => {
            applyCoupon($('#couponInput').value);
        });

        $('#clearCartBtn').addEventListener('click', clearCart);

        // Quick View
        $('#closeQuickView').addEventListener('click', closeQuickView);
        $('#quickViewOverlay').addEventListener('click', closeQuickView);

        // Wishlist toggle (just show a toast for now)
        $('#wishlistToggle').addEventListener('click', () => {
            if (state.wishlist.length === 0) {
                showToast('Your wishlist is empty', 'info');
            } else {
                showToast(`You have ${state.wishlist.length} items in your wishlist`, 'info');
                // Filter menu to show only wishlist items
                state.activeCategory = 'all';
                state.searchQuery = '';
                const grid = $('#menuGrid');
                grid.innerHTML = '';
                const wishProducts = PRODUCTS.filter(p => state.wishlist.includes(p.id));
                if (wishProducts.length) {
                    // Temporarily override for display
                    const originalProducts = [...PRODUCTS];
                    PRODUCTS.length = 0;
                    PRODUCTS.push(...wishProducts);
                    renderMenu();
                    PRODUCTS.length = 0;
                    PRODUCTS.push(...originalProducts);
                }
                document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
            }
        });

        // Login button
        $('#loginBtn').addEventListener('click', () => {
            showToast('Demo mode: Login functionality is simulated.', 'info');
        });

        // Back to top
        $('#backToTop').addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });

        // Clear filters
        $('#clearFilters').addEventListener('click', () => {
            state.activeCategory = 'all';
            state.searchQuery = '';
            state.sortBy = 'default';
            $('#globalSearch').value = '';
            $('#sortSelect').value = 'default';
            renderFilterTabs();
            renderMenu();
        });

        // Sort
        $('#sortSelect').addEventListener('change', (e) => {
            state.sortBy = e.target.value;
            renderMenu();
        });

        // Newsletter
        $('#newsletterForm').addEventListener('submit', (e) => {
            e.preventDefault();
            const email = $('#newsletterEmail').value.trim();
            if (email && email.includes('@')) {
                showToast('Demo: Thanks for subscribing! (No data was actually sent)', 'success');
                $('#newsletterEmail').value = '';
            } else {
                showToast('Please enter a valid email address', 'error');
            }
        });

        // Print receipt
        $('#printReceipt').addEventListener('click', () => {
            window.print();
        });

        // Keyboard accessibility
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                if (!$('#checkoutModal').hidden) closeCheckout();
                else if (!$('#quickViewModal').hidden) closeQuickView();
                else if ($('#cartDrawer').classList.contains('open')) toggleCart(false);
                
                // Close mobile nav
                const navLinks = $('#navLinks');
                if (navLinks.classList.contains('open')) {
                    navLinks.classList.remove('open');
                    $('#hamburger').classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });

        // Theme toggle
        $('#themeToggle').addEventListener('click', toggleTheme);
    }

    // --- 17. INITIALIZATION ---
    function init() {
        loadState();
        initTheme();
        initNavbar();
        renderCategories();
        renderFilterTabs();
        renderMenu();
        renderSpecials();
        renderReviews();
        updateCartUI();
        updateWishlistUI();
        createParticles();
        initParallax();
        initHero3D();
        initCustomCursor();
        initAnimatedCounters();
        initRippleEffect();
        initEventDelegation();
        initModalsAndDrawers();
        observeRevealElements();

        // Handle resize for carousel
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                goToReviewSlide(0);
                renderReviews();
            }, 250);
        });
    }

    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();