// KeepAll - Main JavaScript Functionality
// Author: Tom Rynn
// Description: Core functionality for KeepAll bookmark management website

class KeepAllApp {
    constructor() {
        this.currentTheme = localStorage.getItem('keepall-theme') || 'light';
        this.bookmarks = this.generateSampleBookmarks();
        this.categories = this.generateSampleCategories();
        this.currentCategory = 'all';
        this.searchTerm = '';
        this.selectedBookmarks = new Set();
        
        this.init();
    }
    
    init() {
        this.setupTheme();
        this.setupAnimations();
        this.setupEventListeners();
        this.setupPageSpecificFeatures();
        this.renderContent();
    }
    
    // Theme Management
    setupTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        
        const themeToggle = document.getElementById('theme-toggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                this.toggleTheme();
            });
        }
        
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.currentTheme === 'dark';
            darkModeToggle.addEventListener('change', () => {
                this.toggleTheme();
            });
        }
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem('keepall-theme', this.currentTheme);
        
        // Update toggle states
        const darkModeToggle = document.getElementById('dark-mode-toggle');
        if (darkModeToggle) {
            darkModeToggle.checked = this.currentTheme === 'dark';
        }
        
        // Animate theme transition
        anime({
            targets: 'body',
            opacity: [0.8, 1],
            duration: 300,
            easing: 'easeOutQuad'
        });
    }
    
    // Animation Setup
    setupAnimations() {
        // Fade in animations on scroll
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Typewriter effect for hero text
        if (document.getElementById('typed-text')) {
            new Typed('#typed-text', {
                strings: ['KeepAll'],
                typeSpeed: 150,
                backSpeed: 50,
                backDelay: 2000,
                loop: false,
                showCursor: false
            });
        }
        
        // Floating particles animation
        this.animateParticles();
    }
    
    animateParticles() {
        const particles = document.querySelectorAll('.particle');
        particles.forEach((particle, index) => {
            anime({
                targets: particle,
                translateY: [
                    { value: '100vh', duration: 0 },
                    { value: '-100px', duration: 20000 }
                ],
                translateX: [
                    { value: () => anime.random(-50, 50), duration: 10000 },
                    { value: () => anime.random(-50, 50), duration: 10000 }
                ],
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 0.1, duration: 1000 },
                    { value: 0.1, duration: 18000 },
                    { value: 0, duration: 1000 }
                ],
                delay: index * 2000,
                loop: true,
                easing: 'linear'
            });
        });
    }
    
    // Event Listeners
    setupEventListeners() {
        // Search functionality
        const searchInput = document.getElementById('search-input');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.searchTerm = e.target.value.toLowerCase();
                this.renderBookmarks();
                this.toggleSearchSuggestions(e.target.value);
            });
            
            searchInput.addEventListener('focus', (e) => {
                this.toggleSearchSuggestions(e.target.value);
            });
            
            searchInput.addEventListener('blur', () => {
                setTimeout(() => {
                    document.getElementById('search-suggestions').classList.add('hidden');
                }, 200);
            });
        }
        
        // Category filters
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                this.setActiveCategory(e.target.dataset.category);
            });
        });
        
        // Category management
        const addCategoryBtn = document.getElementById('add-category-btn');
        if (addCategoryBtn) {
            addCategoryBtn.addEventListener('click', () => {
                this.showAddCategoryForm();
            });
        }
        
        const saveCategoryBtn = document.getElementById('save-category');
        if (saveCategoryBtn) {
            saveCategoryBtn.addEventListener('click', () => {
                this.saveNewCategory();
            });
        }
        
        const cancelCategoryBtn = document.getElementById('cancel-category');
        if (cancelCategoryBtn) {
            cancelCategoryBtn.addEventListener('click', () => {
                this.hideAddCategoryForm();
            });
        }
        
        // Settings toggles
        this.setupSettingsToggles();
        
        // Add bookmark FAB
        const addBookmarkFab = document.getElementById('add-bookmark-fab');
        if (addBookmarkFab) {
            addBookmarkFab.addEventListener('click', () => {
                this.showAddBookmarkModal();
            });
        }
        
        // View toggles
        const listViewBtn = document.getElementById('list-view');
        const gridViewBtn = document.getElementById('grid-view');
        if (listViewBtn && gridViewBtn) {
            listViewBtn.addEventListener('click', () => {
                this.setViewMode('list');
            });
            gridViewBtn.addEventListener('click', () => {
                this.setViewMode('grid');
            });
        }
    }
    
    setupSettingsToggles() {
        // Animation toggle
        const animationsToggle = document.getElementById('animations-toggle');
        if (animationsToggle) {
            animationsToggle.addEventListener('change', (e) => {
                document.documentElement.style.setProperty(
                    '--animations-enabled', 
                    e.target.checked ? '1' : '0'
                );
            });
        }
        
        // Font size slider
        const fontSizeSlider = document.getElementById('font-size-slider');
        if (fontSizeSlider) {
            fontSizeSlider.addEventListener('input', (e) => {
                document.documentElement.style.setProperty('--base-font-size', `${e.target.value}px`);
            });
        }
        
        // Color palette options
        document.querySelectorAll('.color-option').forEach(option => {
            option.addEventListener('click', (e) => {
                document.querySelectorAll('.color-option').forEach(opt => opt.classList.remove('active'));
                e.target.classList.add('active');
                // Apply color palette changes here
            });
        });
    }
    
    // Page-specific Features
    setupPageSpecificFeatures() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch (currentPage) {
            case 'index.html':
            case '':
                this.setupIndexPage();
                break;
            case 'categories.html':
                this.setupCategoriesPage();
                break;
            case 'settings.html':
                this.setupSettingsPage();
                break;
        }
    }
    
    setupIndexPage() {
        // Initialize bookmark grid
        this.renderBookmarks();
    }
    
    setupCategoriesPage() {
        // Initialize category list
        this.renderCategories();
        
        // Initialize category chart
        this.initCategoryChart();
        
        // Setup drag and drop
        this.setupDragAndDrop();
    }
    
    setupSettingsPage() {
        // Initialize settings values
        this.initSettingsValues();
    }
    
    // Content Rendering
    renderContent() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        switch (currentPage) {
            case 'index.html':
            case '':
                this.renderBookmarks();
                break;
            case 'categories.html':
                this.renderCategories();
                this.renderBookmarkList();
                break;
        }
    }
    
    renderBookmarks() {
        const bookmarkGrid = document.getElementById('bookmark-grid');
        if (!bookmarkGrid) return;
        
        const filteredBookmarks = this.filterBookmarks();
        
        bookmarkGrid.innerHTML = '';
        
        filteredBookmarks.forEach((bookmark, index) => {
            const bookmarkCard = this.createBookmarkCard(bookmark, index);
            bookmarkGrid.appendChild(bookmarkCard);
        });
        
        // Animate cards in
        anime({
            targets: '.bookmark-card',
            opacity: [0, 1],
            translateY: [20, 0],
            delay: anime.stagger(100),
            duration: 600,
            easing: 'easeOutQuad'
        });
    }
    
    createBookmarkCard(bookmark, index) {
        const card = document.createElement('div');
        card.className = 'bookmark-card bg-cream rounded-lg border border-parchment p-6 card-hover cursor-pointer';
        card.style.opacity = '0';
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <div class="flex-1">
                    <h3 class="font-semibold text-lg text-espresso mb-2 line-clamp-2">${bookmark.title}</h3>
                    <p class="text-sm text-warm-gray mb-2 line-clamp-2">${bookmark.description}</p>
                    <div class="flex items-center space-x-2">
                        <span class="px-2 py-1 bg-parchment text-xs rounded-full text-warm-gray">${bookmark.category}</span>
                        <span class="text-xs text-warm-gray">${bookmark.date}</span>
                    </div>
                </div>
                <button class="favorite-btn p-2 rounded-lg hover:bg-parchment transition-colors ${bookmark.favorite ? 'text-latte' : 'text-warm-gray'}" data-id="${bookmark.id}">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z"/>
                    </svg>
                </button>
            </div>
            <div class="flex justify-between items-center">
                <a href="${bookmark.url}" target="_blank" class="text-sm text-latte hover:underline truncate flex-1 mr-2">
                    ${bookmark.url}
                </a>
                <div class="flex space-x-2">
                    <button class="edit-btn p-1 text-warm-gray hover:text-latte transition-colors" data-id="${bookmark.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
                        </svg>
                    </button>
                    <button class="delete-btn p-1 text-warm-gray hover:text-red-500 transition-colors" data-id="${bookmark.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        card.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(bookmark.id);
        });
        
        card.querySelector('.edit-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.editBookmark(bookmark.id);
        });
        
        card.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteBookmark(bookmark.id);
        });
        
        return card;
    }
    
    renderCategories() {
        const categoryList = document.getElementById('category-list');
        if (!categoryList) return;
        
        categoryList.innerHTML = '';
        
        this.categories.forEach(category => {
            const categoryItem = document.createElement('div');
            categoryItem.className = `category-item p-3 rounded-lg cursor-pointer flex justify-between items-center ${category.id === this.currentCategory ? 'active' : ''}`;
            
            categoryItem.innerHTML = `
                <div class="flex items-center space-x-3">
                    <div class="w-3 h-3 rounded-full" style="background-color: ${category.color}"></div>
                    <span class="font-medium">${category.name}</span>
                </div>
                <span class="text-sm text-warm-gray">${category.count}</span>
            `;
            
            categoryItem.addEventListener('click', () => {
                this.setCurrentCategory(category.id);
            });
            
            categoryList.appendChild(categoryItem);
        });
    }
    
    renderBookmarkList() {
        const bookmarkList = document.getElementById('bookmark-list');
        const emptyState = document.getElementById('empty-state');
        
        if (!bookmarkList) return;
        
        const filteredBookmarks = this.filterBookmarks();
        
        if (filteredBookmarks.length === 0) {
            bookmarkList.classList.add('hidden');
            emptyState.classList.remove('hidden');
            return;
        }
        
        bookmarkList.classList.remove('hidden');
        emptyState.classList.add('hidden');
        
        bookmarkList.innerHTML = '';
        
        filteredBookmarks.forEach(bookmark => {
            const listItem = this.createBookmarkListItem(bookmark);
            bookmarkList.appendChild(listItem);
        });
        
        // Update bookmark count
        const bookmarkCount = document.getElementById('bookmark-count');
        if (bookmarkCount) {
            bookmarkCount.textContent = `${filteredBookmarks.length} bookmarks`;
        }
    }
    
    createBookmarkListItem(bookmark) {
        const item = document.createElement('div');
        item.className = 'bookmark-item p-4 rounded-lg border border-parchment cursor-pointer';
        item.draggable = true;
        
        item.innerHTML = `
            <div class="flex items-center space-x-4">
                <input type="checkbox" class="bookmark-checkbox" data-id="${bookmark.id}">
                <div class="flex-1">
                    <h3 class="font-semibold text-espresso mb-1">${bookmark.title}</h3>
                    <p class="text-sm text-warm-gray mb-2">${bookmark.description}</p>
                    <div class="flex items-center space-x-4">
                        <span class="px-2 py-1 bg-parchment text-xs rounded-full text-warm-gray">${bookmark.category}</span>
                        <span class="text-xs text-warm-gray">${bookmark.date}</span>
                        <a href="${bookmark.url}" target="_blank" class="text-xs text-latte hover:underline truncate">
                            ${bookmark.url}
                        </a>
                    </div>
                </div>
                <div class="flex items-center space-x-2">
                    <button class="favorite-btn p-2 rounded-lg hover:bg-parchment transition-colors ${bookmark.favorite ? 'text-latte' : 'text-warm-gray'}" data-id="${bookmark.id}">
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 2L13.09 8.26L20 9L14 14.74L15.18 21.02L10 17.77L4.82 21.02L6 14.74L0 9L6.91 8.26L10 2Z"/>
                        </svg>
                    </button>
                    <button class="delete-btn p-2 text-warm-gray hover:text-red-500 transition-colors" data-id="${bookmark.id}">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        // Add event listeners
        item.querySelector('.bookmark-checkbox').addEventListener('change', (e) => {
            this.toggleBookmarkSelection(bookmark.id, e.target.checked);
        });
        
        item.querySelector('.favorite-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleFavorite(bookmark.id);
        });
        
        item.querySelector('.delete-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.deleteBookmark(bookmark.id);
        });
        
        // Drag and drop
        item.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', bookmark.id);
            item.classList.add('dragging');
        });
        
        item.addEventListener('dragend', () => {
            item.classList.remove('dragging');
        });
        
        return item;
    }
    
    // Category Chart
    initCategoryChart() {
        const chartElement = document.getElementById('category-chart');
        if (!chartElement) return;
        
        const chart = echarts.init(chartElement);
        
        const data = this.categories.map(category => ({
            name: category.name,
            value: category.count
        }));
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: 'Bookmarks',
                type: 'pie',
                radius: '70%',
                center: ['50%', '50%'],
                data: data,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                itemStyle: {
                    color: function(params) {
                        const colors = ['#F4E4BC', '#D4A574', '#8B7355', '#E8DCC0'];
                        return colors[params.dataIndex % colors.length];
                    }
                }
            }]
        };
        
        chart.setOption(option);
        
        // Resize chart on window resize
        window.addEventListener('resize', () => {
            chart.resize();
        });
    }
    
    // Utility Functions
    filterBookmarks() {
        return this.bookmarks.filter(bookmark => {
            const matchesCategory = this.currentCategory === 'all' || bookmark.category.toLowerCase() === this.currentCategory;
            const matchesSearch = !this.searchTerm || 
                bookmark.title.toLowerCase().includes(this.searchTerm) ||
                bookmark.description.toLowerCase().includes(this.searchTerm) ||
                bookmark.url.toLowerCase().includes(this.searchTerm);
            
            return matchesCategory && matchesSearch;
        });
    }
    
    setActiveCategory(category) {
        document.querySelectorAll('.category-chip').forEach(chip => {
            chip.classList.remove('active');
        });
        
        document.querySelector(`[data-category="${category}"]`).classList.add('active');
        this.currentCategory = category;
        this.renderBookmarks();
    }
    
    setCurrentCategory(categoryId) {
        this.currentCategory = categoryId;
        this.renderCategories();
        this.renderBookmarkList();
        
        const currentCategoryTitle = document.getElementById('current-category');
        if (currentCategoryTitle) {
            const category = this.categories.find(cat => cat.id === categoryId);
            currentCategoryTitle.textContent = category ? category.name : 'All Bookmarks';
        }
    }
    
    toggleSearchSuggestions(value) {
        const suggestions = document.getElementById('search-suggestions');
        if (value.length > 0) {
            suggestions.classList.remove('hidden');
        } else {
            suggestions.classList.add('hidden');
        }
    }
    
    toggleFavorite(bookmarkId) {
        const bookmark = this.bookmarks.find(b => b.id === bookmarkId);
        if (bookmark) {
            bookmark.favorite = !bookmark.favorite;
            this.renderContent();
        }
    }
    
    toggleBookmarkSelection(bookmarkId, selected) {
        if (selected) {
            this.selectedBookmarks.add(bookmarkId);
        } else {
            this.selectedBookmarks.delete(bookmarkId);
        }
        
        this.updateBulkActions();
    }
    
    updateBulkActions() {
        const bulkActions = document.getElementById('bulk-actions');
        const selectedCount = document.getElementById('selected-count');
        
        if (this.selectedBookmarks.size > 0) {
            bulkActions.classList.remove('hidden');
            selectedCount.textContent = this.selectedBookmarks.size;
        } else {
            bulkActions.classList.add('hidden');
        }
    }
    
    // Sample Data Generation
    generateSampleBookmarks() {
        return [
            {
                id: 1,
                title: 'Design Inspiration Gallery',
                description: 'Beautiful collection of web design inspiration and creative portfolios',
                url: 'https://designspiration.net',
                category: 'Work',
                date: 'Nov 18, 2024',
                favorite: true
            },
            {
                id: 2,
                title: 'Modern CSS Techniques',
                description: 'Advanced CSS patterns and modern layout techniques for responsive design',
                url: 'https://css-tricks.com',
                category: 'Learning',
                date: 'Nov 17, 2024',
                favorite: false
            },
            {
                id: 3,
                title: 'Authentic Italian Recipes',
                description: 'Traditional Italian cooking methods and authentic recipe collection',
                url: 'https://gimmesomeoven.com',
                category: 'Personal',
                date: 'Nov 16, 2024',
                favorite: true
            },
            {
                id: 4,
                title: 'JavaScript Best Practices',
                description: 'Comprehensive guide to modern JavaScript development patterns',
                url: 'https://javascript.info',
                category: 'Learning',
                date: 'Nov 15, 2024',
                favorite: false
            },
            {
                id: 5,
                title: 'Minimalist Home Office Setup',
                description: 'Clean and organized workspace inspiration for productive remote work',
                url: 'https://minimaldesksetups.com',
                category: 'Work',
                date: 'Nov 14, 2024',
                favorite: true
            },
            {
                id: 6,
                title: 'The Future of AI in Design',
                description: 'Exploring how artificial intelligence is transforming creative workflows',
                url: 'https://medium.com',
                category: 'Reading',
                date: 'Nov 13, 2024',
                favorite: false
            },
            {
                id: 7,
                title: 'Typography Resources',
                description: 'Curated collection of beautiful fonts and typography tools',
                url: 'https://fonts.google.com',
                category: 'Work',
                date: 'Nov 12, 2024',
                favorite: true
            },
            {
                id: 8,
                title: 'Travel Photography Tips',
                description: 'Professional techniques for capturing stunning travel memories',
                url: 'https://nationalgeographic.com',
                category: 'Personal',
                date: 'Nov 11, 2024',
                favorite: false
            },
            {
                id: 9,
                title: 'React Performance Optimization',
                description: 'Advanced techniques for building fast React applications',
                url: 'https://react.dev',
                category: 'Learning',
                date: 'Nov 10, 2024',
                favorite: true
            },
            {
                id: 10,
                title: 'Sustainable Living Guide',
                description: 'Practical tips for eco-friendly lifestyle and conscious consumption',
                url: 'https://earth911.com',
                category: 'Reading',
                date: 'Nov 9, 2024',
                favorite: false
            },
            {
                id: 11,
                title: 'Color Theory for Designers',
                description: 'Understanding color psychology and harmonious color palettes',
                url: 'https://color.adobe.com',
                category: 'Work',
                date: 'Nov 8, 2024',
                favorite: true
            },
            {
                id: 12,
                title: 'Meditation and Mindfulness',
                description: 'Daily meditation practices for mental clarity and stress reduction',
                url: 'https://headspace.com',
                category: 'Personal',
                date: 'Nov 7, 2024',
                favorite: false
            }
        ];
    }
    
    generateSampleCategories() {
        return [
            { id: 'all', name: 'All Bookmarks', count: 347, color: '#F4E4BC' },
            { id: 'work', name: 'Work', count: 89, color: '#D4A574' },
            { id: 'personal', name: 'Personal', count: 67, color: '#8B7355' },
            { id: 'learning', name: 'Learning', count: 123, color: '#E8DCC0' },
            { id: 'reading', name: 'Reading', count: 68, color: '#F4E4BC' }
        ];
    }
    
    // Category Management
    showAddCategoryForm() {
        document.getElementById('add-category-form').classList.remove('hidden');
        document.getElementById('new-category-name').focus();
    }
    
    hideAddCategoryForm() {
        document.getElementById('add-category-form').classList.add('hidden');
        document.getElementById('new-category-name').value = '';
    }
    
    saveNewCategory() {
        const nameInput = document.getElementById('new-category-name');
        const name = nameInput.value.trim();
        
        if (name) {
            const newCategory = {
                id: name.toLowerCase().replace(/\s+/g, '-'),
                name: name,
                count: 0,
                color: '#D4A574'
            };
            
            this.categories.push(newCategory);
            this.renderCategories();
            this.hideAddCategoryForm();
            
            // Show success message
            this.showNotification(`Category "${name}" created successfully!`);
        }
    }
    
    // Drag and Drop
    setupDragAndDrop() {
        const categoryItems = document.querySelectorAll('.category-item');
        
        categoryItems.forEach(item => {
            item.addEventListener('dragover', (e) => {
                e.preventDefault();
                item.classList.add('drag-over');
            });
            
            item.addEventListener('dragleave', () => {
                item.classList.remove('drag-over');
            });
            
            item.addEventListener('drop', (e) => {
                e.preventDefault();
                item.classList.remove('drag-over');
                
                const bookmarkId = e.dataTransfer.getData('text/plain');
                const categoryId = item.dataset.categoryId || 'all';
                
                this.moveBookmarkToCategory(bookmarkId, categoryId);
            });
        });
    }
    
    moveBookmarkToCategory(bookmarkId, categoryId) {
        const bookmark = this.bookmarks.find(b => b.id == bookmarkId);
        const category = this.categories.find(c => c.id === categoryId);
        
        if (bookmark && category) {
            // Update bookmark category
            const oldCategory = bookmark.category;
            bookmark.category = category.name;
            
            // Update category counts
            const oldCategoryObj = this.categories.find(c => c.name === oldCategory);
            if (oldCategoryObj) oldCategoryObj.count--;
            category.count++;
            
            this.renderContent();
            this.showNotification(`Bookmark moved to ${category.name}`);
        }
    }
    
    // Settings
    initSettingsValues() {
        // Initialize toggle states based on saved preferences
        const savedSettings = JSON.parse(localStorage.getItem('keepall-settings') || '{}');
        
        Object.keys(savedSettings).forEach(key => {
            const element = document.getElementById(key);
            if (element && element.type === 'checkbox') {
                element.checked = savedSettings[key];
            }
        });
    }
    
    // Notifications
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'fixed top-20 right-4 bg-latte text-cream px-6 py-3 rounded-lg shadow-lg z-50 transform translate-x-full transition-transform duration-300';
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Animate out and remove
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    // Modal Functions
    showAddBookmarkModal() {
        this.showNotification('Add bookmark feature coming soon!');
    }
    
    editBookmark(bookmarkId) {
        this.showNotification('Edit bookmark feature coming soon!');
    }
    
    deleteBookmark(bookmarkId) {
        if (confirm('Are you sure you want to delete this bookmark?')) {
            this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
            this.renderContent();
            this.showNotification('Bookmark deleted successfully!');
        }
    }
    
    setViewMode(mode) {
        const listViewBtn = document.getElementById('list-view');
        const gridViewBtn = document.getElementById('grid-view');
        
        if (mode === 'list') {
            listViewBtn.classList.add('bg-latte', 'text-cream');
            listViewBtn.classList.remove('text-warm-gray');
            gridViewBtn.classList.remove('bg-latte', 'text-cream');
            gridViewBtn.classList.add('text-warm-gray');
        } else {
            gridViewBtn.classList.add('bg-latte', 'text-cream');
            gridViewBtn.classList.remove('text-warm-gray');
            listViewBtn.classList.remove('bg-latte', 'text-cream');
            listViewBtn.classList.add('text-warm-gray');
        }
        
        this.showNotification(`Switched to ${mode} view`);
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new KeepAllApp();
});

// Handle page visibility changes for animations
document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
        // Resume animations when page becomes visible
        const app = window.keepAllApp;
        if (app) {
            app.animateParticles();
        }
    }
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = KeepAllApp;
}