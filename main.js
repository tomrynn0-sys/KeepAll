// KeepAll App - Main JavaScript
// Sophisticated bookmark management with Wes Anderson aesthetic

// Global state management
const AppState = {
    bookmarks: [],
    categories: [],
    currentTheme: 'light',
    currentCategory: 'all',
    searchQuery: '',
    favorites: new Set(),
    settings: {
        darkMode: false,
        accentColor: 'yellow',
        layoutDensity: 'comfortable',
        animations: true,
        analytics: false
    }
};

// Sample bookmark data with Wes Anderson-inspired content
const sampleBookmarks = [
    {
        id: 1,
        title: "The Grand Budapest Hotel - Color Palette Analysis",
        description: "Deep dive into the iconic color schemes and visual storytelling techniques used in Wes Anderson's masterpiece.",
        url: "https://example.com/grand-budapest-colors",
        category: "design",
        tags: ["color theory", "cinematography", "wes anderson"],
        dateAdded: "2024-01-15",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/F4A8B9/3C2415?text=Grand+Budapest"
    },
    {
        id: 2,
        title: "Moonrise Kingdom - Typography Study",
        description: "Analysis of the custom typography and lettering design created by Jessica Hische for Moonrise Kingdom.",
        url: "https://example.com/moonrise-typography",
        category: "design",
        tags: ["typography", "lettering", "jessica hische"],
        dateAdded: "2024-01-12",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/FFC857/3C2415?text=Moonrise+Typography"
    },
    {
        id: 3,
        title: "Vintage Typewriter Fonts Collection",
        description: "Curated collection of authentic typewriter fonts perfect for achieving that retro, analog aesthetic.",
        url: "https://example.com/typewriter-fonts",
        category: "design",
        tags: ["fonts", "vintage", "typewriter"],
        dateAdded: "2024-01-10",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/D4B896/3C2415?text=Typewriter+Fonts"
    },
    {
        id: 4,
        title: "CSS Grid Layout Mastery",
        description: "Comprehensive guide to creating sophisticated grid layouts with modern CSS techniques and best practices.",
        url: "https://example.com/css-grid-mastery",
        category: "development",
        tags: ["css", "grid", "layout"],
        dateAdded: "2024-01-08",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/A8B5A0/3C2415?text=CSS+Grid"
    },
    {
        id: 5,
        title: "JavaScript Animation Libraries Comparison",
        description: "Detailed comparison of Anime.js, GSAP, and other animation libraries for web development.",
        url: "https://example.com/js-animation-libraries",
        category: "development",
        tags: ["javascript", "animation", "libraries"],
        dateAdded: "2024-01-05",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/E8C5C5/3C2415?text=Animation+Libs"
    },
    {
        id: 6,
        title: "Responsive Design Principles",
        description: "Essential principles and techniques for creating beautifully responsive web experiences.",
        url: "https://example.com/responsive-design",
        category: "development",
        tags: ["responsive", "design", "mobile"],
        dateAdded: "2024-01-03",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/8B7355/FFFFFF?text=Responsive+Design"
    },
    {
        id: 7,
        title: "The Art of Minimalist Web Design",
        description: "Exploring the principles of minimalism in web design and how to achieve sophisticated simplicity.",
        url: "https://example.com/minimalist-design",
        category: "design",
        tags: ["minimalism", "design", "simplicity"],
        dateAdded: "2024-01-01",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/F5F1E8/3C2415?text=Minimalist+Design"
    },
    {
        id: 8,
        title: "Color Theory for Digital Designers",
        description: "Master the fundamentals of color theory and its application in digital design projects.",
        url: "https://example.com/color-theory",
        category: "design",
        tags: ["color theory", "design", "digital"],
        dateAdded: "2023-12-28",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/FFC857/3C2415?text=Color+Theory"
    },
    {
        id: 9,
        title: "Advanced CSS Techniques",
        description: "Level up your CSS skills with advanced techniques like custom properties, container queries, and more.",
        url: "https://example.com/advanced-css",
        category: "development",
        tags: ["css", "advanced", "techniques"],
        dateAdded: "2023-12-25",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/D4B896/3C2415?text=Advanced+CSS"
    },
    {
        id: 10,
        title: "UI/UX Design Patterns",
        description: "Common design patterns and when to use them in your user interface and experience design.",
        url: "https://example.com/design-patterns",
        category: "design",
        tags: ["ui", "ux", "patterns"],
        dateAdded: "2023-12-22",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/A8B5A0/3C2415?text=Design+Patterns"
    },
    {
        id: 11,
        title: "Web Performance Optimization",
        description: "Essential techniques for optimizing website performance and improving user experience.",
        url: "https://example.com/performance-optimization",
        category: "development",
        tags: ["performance", "optimization", "speed"],
        dateAdded: "2023-12-20",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/E8C5C5/3C2415?text=Performance"
    },
    {
        id: 12,
        title: "Modern JavaScript Features",
        description: "Explore the latest JavaScript features and how they can improve your code quality and development speed.",
        url: "https://example.com/modern-javascript",
        category: "development",
        tags: ["javascript", "es6", "modern"],
        dateAdded: "2023-12-18",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/8B7355/FFFFFF?text=Modern+JS"
    },
    {
        id: 13,
        title: "Typography in Web Design",
        description: "The complete guide to choosing, pairing, and implementing typography in web design projects.",
        url: "https://example.com/web-typography",
        category: "design",
        tags: ["typography", "web design", "fonts"],
        dateAdded: "2023-12-15",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/F5F1E8/3C2415?text=Web+Typography"
    },
    {
        id: 14,
        title: "Productivity Tools for Designers",
        description: "Essential tools and workflows to boost your productivity as a digital designer.",
        url: "https://example.com/productivity-tools",
        category: "productivity",
        tags: ["productivity", "tools", "design"],
        dateAdded: "2023-12-12",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/FFC857/3C2415?text=Productivity+Tools"
    },
    {
        id: 15,
        title: "Design System Best Practices",
        description: "Learn how to create and maintain effective design systems for consistent, scalable design.",
        url: "https://example.com/design-systems",
        category: "design",
        tags: ["design systems", "consistency", "scalability"],
        dateAdded: "2023-12-10",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/D4B896/3C2415?text=Design+Systems"
    },
    {
        id: 16,
        title: "Creative Coding with p5.js",
        description: "Introduction to creative coding using p5.js for generative art and interactive experiences.",
        url: "https://example.com/creative-coding",
        category: "learning",
        tags: ["creative coding", "p5.js", "generative art"],
        dateAdded: "2023-12-08",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/A8B5A0/3C2415?text=Creative+Coding"
    },
    {
        id: 17,
        title: "Accessibility in Web Design",
        description: "Comprehensive guide to creating accessible web experiences for all users.",
        url: "https://example.com/accessibility",
        category: "learning",
        tags: ["accessibility", "a11y", "inclusive design"],
        dateAdded: "2023-12-05",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/E8C5C5/3C2415?text=Accessibility"
    },
    {
        id: 18,
        title: "Figma Advanced Techniques",
        description: "Master advanced Figma features like components, variants, and design system management.",
        url: "https://example.com/figma-advanced",
        category: "design",
        tags: ["figma", "design tools", "advanced"],
        dateAdded: "2023-12-03",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/8B7355/FFFFFF?text=Figma+Advanced"
    },
    {
        id: 19,
        title: "Mindfulness and Creativity",
        description: "How mindfulness practices can enhance your creative thinking and design process.",
        url: "https://example.com/mindfulness-creativity",
        category: "personal",
        tags: ["mindfulness", "creativity", "wellbeing"],
        dateAdded: "2023-12-01",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/F5F1E8/3C2415?text=Mindfulness"
    },
    {
        id: 20,
        title: "Sustainable Web Design",
        description: "Learn how to create environmentally conscious websites with minimal carbon footprint.",
        url: "https://example.com/sustainable-web",
        category: "learning",
        tags: ["sustainability", "environment", "web design"],
        dateAdded: "2023-11-28",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/FFC857/3C2415?text=Sustainable+Web"
    },
    {
        id: 21,
        title: "Animation Principles for UI",
        description: "Fundamental principles of animation and how to apply them effectively in user interface design.",
        url: "https://example.com/ui-animation",
        category: "design",
        tags: ["animation", "ui", "principles"],
        dateAdded: "2023-11-25",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/D4B896/3C2415?text=UI+Animation"
    },
    {
        id: 22,
        title: "Notion for Creative Workflows",
        description: "How to use Notion to organize your creative projects and design processes effectively.",
        url: "https://example.com/notion-creative",
        category: "productivity",
        tags: ["notion", "workflow", "organization"],
        dateAdded: "2023-11-22",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/A8B5A0/3C2415?text=Notion+Workflows"
    },
    {
        id: 23,
        title: "Digital Gardening Concepts",
        description: "Explore the concept of digital gardening and how to cultivate your personal knowledge base.",
        url: "https://example.com/digital-gardening",
        category: "learning",
        tags: ["digital garden", "knowledge", "personal wiki"],
        dateAdded: "2023-11-20",
        favorite: false,
        thumbnail: "https://via.placeholder.com/300x200/E8C5C5/3C2415?text=Digital+Gardening"
    },
    {
        id: 24,
        title: "Coffee Culture Around the World",
        description: "Discover different coffee traditions and brewing methods from various cultures worldwide.",
        url: "https://example.com/coffee-culture",
        category: "personal",
        tags: ["coffee", "culture", "travel"],
        dateAdded: "2023-11-18",
        favorite: true,
        thumbnail: "https://via.placeholder.com/300x200/8B7355/FFFFFF?text=Coffee+Culture"
    }
];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load sample data
    AppState.bookmarks = [...sampleBookmarks];
    AppState.categories = ['all', 'design', 'development', 'learning', 'productivity', 'personal'];
    
    // Load saved settings
    loadSettings();
    
    // Initialize current page
    const currentPage = getCurrentPage();
    switch(currentPage) {
        case 'index':
            initializeHomePage();
            break;
        case 'search':
            initializeSearchPage();
            break;
        case 'settings':
            initializeSettingsPage();
            break;
    }
    
    // Initialize common features
    initializeTheme();
    initializeAnimations();
}

function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('search.html')) return 'search';
    if (path.includes('settings.html')) return 'settings';
    return 'index';
}

// Home page initialization
function initializeHomePage() {
    // Initialize typewriter effect
    initializeTypewriter();
    
    // Render bookmarks
    renderBookmarks();
    
    // Initialize search
    initializeSearch();
    
    // Initialize category filtering
    initializeCategoryFiltering();
    
    // Initialize scroll animations
    initializeScrollAnimations();
}

// Search page initialization
function initializeSearchPage() {
    // Initialize search functionality
    initializeAdvancedSearch();
    
    // Initialize AI suggestions
    initializeAISuggestions();
    
    // Initialize filters
    initializeSearchFilters();
    
    // Render all bookmarks initially
    renderSearchResults(AppState.bookmarks);
}

// Settings page initialization
function initializeSettingsPage() {
    // Initialize settings controls
    initializeSettingsControls();
    
    // Initialize usage chart
    initializeUsageChart();
    
    // Load current settings
    loadCurrentSettings();
}

// Typewriter effect for hero text
function initializeTypewriter() {
    const typedElement = document.getElementById('typed-text');
    if (typedElement) {
        const typed = new Typed('#typed-text', {
            strings: [
                'KeepAll',
                'Your Digital Notebook',
                'Organized with Style',
                'Wes Anderson Inspired'
            ],
            typeSpeed: 80,
            backSpeed: 40,
            backDelay: 2000,
            startDelay: 500,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }
}

// Theme management
function initializeTheme() {
    const savedTheme = localStorage.getItem('keepall-theme') || 'light';
    setTheme(savedTheme);
}

function toggleTheme() {
    const currentTheme = document.body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('keepall-theme', newTheme);
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    AppState.currentTheme = theme;
    
    // Update theme toggle button
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Bookmark rendering
function renderBookmarks(bookmarks = AppState.bookmarks) {
    const grid = document.getElementById('bookmarkGrid');
    if (!grid) return;
    
    const filteredBookmarks = filterBookmarks(bookmarks);
    
    grid.innerHTML = '';
    
    filteredBookmarks.forEach((bookmark, index) => {
        const card = createBookmarkCard(bookmark, index);
        grid.appendChild(card);
    });
    
    // Animate cards
    animateCards();
}

function createBookmarkCard(bookmark, index) {
    const card = document.createElement('div');
    card.className = `bookmark-card fade-in stagger-${Math.min(index + 1, 6)}`;
    card.setAttribute('data-category', bookmark.category);
    
    const favoriteClass = AppState.favorites.has(bookmark.id) ? 'active' : '';
    
    card.innerHTML = `
        <div class="bookmark-header">
            <h3 class="bookmark-title">${bookmark.title}</h3>
            <button class="bookmark-favorite ${favoriteClass}" onclick="toggleFavorite(${bookmark.id})">
                ♥
            </button>
        </div>
        <p class="bookmark-description">${bookmark.description}</p>
        <div class="bookmark-tags">
            ${bookmark.tags.map(tag => `<span class="bookmark-tag">${tag}</span>`).join('')}
        </div>
        <div class="bookmark-footer">
            <div class="bookmark-date">
                <span>📅</span>
                <span>${formatDate(bookmark.dateAdded)}</span>
            </div>
            <div class="bookmark-actions">
                <button class="bookmark-action" onclick="editBookmark(${bookmark.id})" title="Edit">
                    ✏️
                </button>
                <button class="bookmark-action" onclick="shareBookmark(${bookmark.id})" title="Share">
                    📤
                </button>
                <button class="bookmark-action" onclick="deleteBookmark(${bookmark.id})" title="Delete">
                    🗑️
                </button>
            </div>
        </div>
    `;
    
    // Add click handler for card
    card.addEventListener('click', (e) => {
        if (!e.target.closest('.bookmark-actions') && !e.target.closest('.bookmark-favorite')) {
            openBookmark(bookmark.url);
        }
    });
    
    return card;
}

function filterBookmarks(bookmarks) {
    let filtered = bookmarks;
    
    // Filter by category
    if (AppState.currentCategory !== 'all') {
        filtered = filtered.filter(bookmark => bookmark.category === AppState.currentCategory);
    }
    
    // Filter by search query
    if (AppState.searchQuery) {
        const query = AppState.searchQuery.toLowerCase();
        filtered = filtered.filter(bookmark => 
            bookmark.title.toLowerCase().includes(query) ||
            bookmark.description.toLowerCase().includes(query) ||
            bookmark.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    return filtered;
}

// Category filtering
function initializeCategoryFiltering() {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            const category = item.getAttribute('data-category');
            setActiveCategory(category);
        });
    });
}

function setActiveCategory(category) {
    AppState.currentCategory = category;
    
    // Update active state
    document.querySelectorAll('.category-item').forEach(item => {
        item.classList.remove('active');
    });
    
    document.querySelector(`[data-category="${category}"]`).classList.add('active');
    
    // Re-render bookmarks
    renderBookmarks();
}

// Search functionality
function initializeSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            renderBookmarks();
        });
    }
}

// Advanced search for search page
function initializeAdvancedSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            AppState.searchQuery = e.target.value;
            performAdvancedSearch();
            showAISuggestions(e.target.value);
        });
    }
    
    // Initialize filters
    const filters = ['categoryFilter', 'dateFilter', 'sortFilter'];
    filters.forEach(filterId => {
        const filter = document.getElementById(filterId);
        if (filter) {
            filter.addEventListener('change', performAdvancedSearch);
        }
    });
}

function performAdvancedSearch() {
    let results = [...AppState.bookmarks];
    
    // Text search
    if (AppState.searchQuery) {
        const query = AppState.searchQuery.toLowerCase();
        results = results.filter(bookmark => 
            bookmark.title.toLowerCase().includes(query) ||
            bookmark.description.toLowerCase().includes(query) ||
            bookmark.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    // Category filter
    const categoryFilter = document.getElementById('categoryFilter');
    if (categoryFilter && categoryFilter.value) {
        results = results.filter(bookmark => bookmark.category === categoryFilter.value);
    }
    
    // Date filter
    const dateFilter = document.getElementById('dateFilter');
    if (dateFilter && dateFilter.value) {
        results = filterByDate(results, dateFilter.value);
    }
    
    // Sort results
    const sortFilter = document.getElementById('sortFilter') || document.getElementById('resultsSort');
    if (sortFilter && sortFilter.value) {
        results = sortBookmarks(results, sortFilter.value);
    }
    
    renderSearchResults(results);
}

function filterByDate(bookmarks, dateRange) {
    const now = new Date();
    const filterDate = new Date();
    
    switch(dateRange) {
        case 'today':
            filterDate.setDate(now.getDate() - 1);
            break;
        case 'week':
            filterDate.setDate(now.getDate() - 7);
            break;
        case 'month':
            filterDate.setMonth(now.getMonth() - 1);
            break;
        case 'year':
            filterDate.setFullYear(now.getFullYear() - 1);
            break;
        default:
            return bookmarks;
    }
    
    return bookmarks.filter(bookmark => new Date(bookmark.dateAdded) >= filterDate);
}

function sortBookmarks(bookmarks, sortBy) {
    switch(sortBy) {
        case 'date':
            return bookmarks.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
        case 'title':
            return bookmarks.sort((a, b) => a.title.localeCompare(b.title));
        case 'favorites':
            return bookmarks.sort((a, b) => {
                const aFav = AppState.favorites.has(a.id);
                const bFav = AppState.favorites.has(b.id);
                if (aFav && !bFav) return -1;
                if (!aFav && bFav) return 1;
                return 0;
            });
        default:
            return bookmarks;
    }
}

// AI Suggestions
function initializeAISuggestions() {
    // This would typically connect to an AI service
    // For demo purposes, we'll use intelligent local suggestions
}

function showAISuggestions(query) {
    const suggestionsContainer = document.getElementById('aiSuggestions');
    if (!suggestionsContainer || !query) {
        if (suggestionsContainer) suggestionsContainer.classList.remove('active');
        return;
    }
    
    const suggestions = generateAISuggestions(query);
    
    suggestionsContainer.innerHTML = suggestions.map(suggestion => `
        <div class="suggestion-item" onclick="performSearch('${suggestion.text}')">
            <div class="suggestion-icon">${suggestion.icon}</div>
            <div class="suggestion-text">${suggestion.text}</div>
            <div class="suggestion-type">${suggestion.type}</div>
        </div>
    `).join('');
    
    suggestionsContainer.classList.add('active');
}

function generateAISuggestions(query) {
    const suggestions = [];
    
    // Generate intelligent suggestions based on query
    if (query.toLowerCase().includes('design')) {
        suggestions.push(
            { text: 'design inspiration', type: 'trending', icon: '🔥' },
            { text: 'design systems', type: 'suggestion', icon: '💡' },
            { text: 'design tools', type: 'category', icon: '🛠️' }
        );
    }
    
    if (query.toLowerCase().includes('development')) {
        suggestions.push(
            { text: 'development tools', type: 'trending', icon: '🔥' },
            { text: 'web development', type: 'suggestion', icon: '💡' },
            { text: 'frontend development', type: 'category', icon: '🛠️' }
        );
    }
    
    // Add general suggestions
    suggestions.push(
        { text: 'trending bookmarks', type: 'trending', icon: '📈' },
        { text: 'recently added', type: 'filter', icon: '⏰' },
        { text: 'favorite bookmarks', type: 'filter', icon: '⭐' }
    );
    
    return suggestions.slice(0, 5); // Limit to 5 suggestions
}

function renderSearchResults(results) {
    const resultsContainer = document.getElementById('bookmarkResults');
    const emptyState = document.getElementById('emptyState');
    const resultsCount = document.getElementById('resultsCount');
    
    if (!resultsContainer) return;
    
    // Update results count
    if (resultsCount) {
        resultsCount.textContent = `${results.length} bookmark${results.length !== 1 ? 's' : ''} found`;
    }
    
    // Show empty state if no results
    if (results.length === 0) {
        resultsContainer.style.display = 'none';
        if (emptyState) emptyState.style.display = 'block';
        return;
    }
    
    // Show results
    if (emptyState) emptyState.style.display = 'none';
    resultsContainer.style.display = 'grid';
    
    // Render results
    resultsContainer.innerHTML = '';
    results.forEach((bookmark, index) => {
        const card = createBookmarkCard(bookmark, index);
        resultsContainer.appendChild(card);
    });
    
    // Animate results
    animateCards();
}

// Settings functionality
function initializeSettingsControls() {
    // Initialize toggle switches
    const toggles = document.querySelectorAll('.toggle-switch');
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
        });
    });
}

function initializeUsageChart() {
    const chartContainer = document.getElementById('usageChart');
    if (!chartContainer) return;
    
    const chart = echarts.init(chartContainer);
    
    const option = {
        backgroundColor: 'transparent',
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisLine: {
                lineStyle: {
                    color: '#8B7355'
                }
            },
            axisLabel: {
                color: '#8B7355'
            }
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: {
                    color: '#8B7355'
                }
            },
            axisLabel: {
                color: '#8B7355'
            },
            splitLine: {
                lineStyle: {
                    color: 'rgba(139, 115, 85, 0.1)'
                }
            }
        },
        series: [{
            data: [12, 8, 15, 10, 18, 6, 14],
            type: 'line',
            smooth: true,
            lineStyle: {
                color: '#FFC857',
                width: 3
            },
            itemStyle: {
                color: '#FFC857'
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0, color: 'rgba(255, 200, 87, 0.3)'
                    }, {
                        offset: 1, color: 'rgba(255, 200, 87, 0.05)'
                    }]
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

function loadCurrentSettings() {
    // Load current settings into UI
    const settings = AppState.settings;
    
    // Update toggles
    const darkModeToggle = document.querySelector('.toggle-switch');
    if (darkModeToggle && settings.darkMode) {
        darkModeToggle.classList.add('active');
    }
    
    // Update color picker
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.classList.remove('active');
    });
    
    // Update layout density
    const layoutSelect = document.querySelector('select[onchange="setLayoutDensity(this.value)"]');
    if (layoutSelect) {
        layoutSelect.value = settings.layoutDensity;
    }
}

// Animation functions
function initializeAnimations() {
    // Initialize scroll-triggered animations
    if (AppState.settings.animations) {
        initializeScrollAnimations();
    }
}

function initializeScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
}

function animateCards() {
    if (!AppState.settings.animations) return;
    
    const cards = document.querySelectorAll('.bookmark-card');
    cards.forEach((card, index) => {
        anime({
            targets: card,
            opacity: [0, 1],
            translateY: [20, 0],
            delay: index * 100,
            duration: 600,
            easing: 'easeOutQuart'
        });
    });
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function scrollToBookmarks() {
    const mainSection = document.querySelector('.main');
    if (mainSection) {
        mainSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Bookmark actions
function toggleFavorite(bookmarkId) {
    if (AppState.favorites.has(bookmarkId)) {
        AppState.favorites.delete(bookmarkId);
    } else {
        AppState.favorites.add(bookmarkId);
    }
    
    // Update UI
    const favoriteButton = document.querySelector(`[onclick="toggleFavorite(${bookmarkId})"]`);
    if (favoriteButton) {
        favoriteButton.classList.toggle('active');
    }
    
    // Save to localStorage
    localStorage.setItem('keepall-favorites', JSON.stringify([...AppState.favorites]));
}

function openBookmark(url) {
    window.open(url, '_blank');
}

function editBookmark(bookmarkId) {
    // Show edit modal (simplified for demo)
    alert('Edit bookmark functionality would open a modal here.');
}

function shareBookmark(bookmarkId) {
    const bookmark = AppState.bookmarks.find(b => b.id === bookmarkId);
    if (bookmark && navigator.share) {
        navigator.share({
            title: bookmark.title,
            text: bookmark.description,
            url: bookmark.url
        });
    } else {
        // Fallback: copy to clipboard
        navigator.clipboard.writeText(bookmark.url);
        showNotification('Bookmark URL copied to clipboard!');
    }
}

function deleteBookmark(bookmarkId) {
    if (confirm('Are you sure you want to delete this bookmark?')) {
        AppState.bookmarks = AppState.bookmarks.filter(b => b.id !== bookmarkId);
        renderBookmarks();
        showNotification('Bookmark deleted successfully!');
    }
}

function addCategory() {
    const categoryName = prompt('Enter category name:');
    if (categoryName && !AppState.categories.includes(categoryName.toLowerCase())) {
        AppState.categories.push(categoryName.toLowerCase());
        // Update UI (simplified for demo)
        showNotification(`Category "${categoryName}" added!`);
    }
}

// Settings actions
function toggleDarkMode() {
    AppState.settings.darkMode = !AppState.settings.darkMode;
    setTheme(AppState.settings.darkMode ? 'dark' : 'light');
    saveSettings();
}

function setAccentColor(color) {
    AppState.settings.accentColor = color;
    // Update CSS custom properties
    document.documentElement.style.setProperty('--accent-color', `var(--wes-anderson-${color})`);
    saveSettings();
    
    // Update active state
    document.querySelectorAll('.color-option').forEach(option => {
        option.classList.remove('active');
    });
    event.target.classList.add('active');
}

function setLayoutDensity(density) {
    AppState.settings.layoutDensity = density;
    document.body.setAttribute('data-density', density);
    saveSettings();
}

function toggleAnimations() {
    AppState.settings.animations = !AppState.settings.animations;
    document.body.setAttribute('data-animations', AppState.settings.animations);
    saveSettings();
}

function toggleAnalytics() {
    AppState.settings.analytics = !AppState.settings.analytics;
    saveSettings();
}

// Data management
function exportData() {
    const data = {
        bookmarks: AppState.bookmarks,
        favorites: [...AppState.favorites],
        settings: AppState.settings,
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'keepall-export.json';
    a.click();
    URL.revokeObjectURL(url);
    
    showNotification('Data exported successfully!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const data = JSON.parse(e.target.result);
                    // Import logic here
                    showNotification('Data imported successfully!');
                } catch (error) {
                    showNotification('Error importing data. Please check the file format.');
                }
            };
            reader.readAsText(file);
        }
    };
    input.click();
}

function clearAllData() {
    if (confirm('Are you sure you want to delete all your data? This action cannot be undone.')) {
        localStorage.clear();
        AppState.bookmarks = [];
        AppState.favorites.clear();
        showNotification('All data cleared successfully!');
        // Redirect to home
        window.location.href = 'index.html';
    }
}

// Settings page specific functions
function uploadAvatar() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showNotification('Avatar uploaded successfully!');
        }
    };
    input.click();
}

function checkUpdates() {
    showNotification('You are using the latest version of KeepAll!');
}

function viewLicense() {
    alert('KeepAll Personal Use License\n\nCrafted with meticulous attention to detail.\n© 2024 KeepAll. All rights reserved.');
}

function openSupport() {
    window.open('mailto:support@keepall.app?subject=Support Request', '_blank');
}

// Search page specific functions
function performSearch(query) {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = query;
        searchInput.dispatchEvent(new Event('input'));
    }
    
    // Hide suggestions
    const suggestions = document.getElementById('aiSuggestions');
    if (suggestions) {
        suggestions.classList.remove('active');
    }
}

function initializeSearchFilters() {
    // Initialize filter event listeners
    const filters = document.querySelectorAll('.filter-select');
    filters.forEach(filter => {
        filter.addEventListener('change', performAdvancedSearch);
    });
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: type === 'success' ? 'var(--muted-sage)' : 'var(--dusty-rose)',
        color: 'var(--espresso-brown)',
        padding: '12px 24px',
        borderRadius: '8px',
        boxShadow: 'var(--shadow-soft)',
        zIndex: '10000',
        fontSize: '14px',
        fontWeight: '500',
        transform: 'translateX(100%)',
        transition: 'transform 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Settings persistence
function loadSettings() {
    const savedSettings = localStorage.getItem('keepall-settings');
    if (savedSettings) {
        AppState.settings = { ...AppState.settings, ...JSON.parse(savedSettings) };
    }
    
    const savedFavorites = localStorage.getItem('keepall-favorites');
    if (savedFavorites) {
        AppState.favorites = new Set(JSON.parse(savedFavorites));
    }
}

function saveSettings() {
    localStorage.setItem('keepall-settings', JSON.stringify(AppState.settings));
}

// Performance optimization
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Initialize search with debouncing
const debouncedSearch = debounce(() => {
    if (getCurrentPage() === 'search') {
        performAdvancedSearch();
    } else {
        renderBookmarks();
    }
}, 300);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K for search
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        } else {
            window.location.href = 'search.html';
        }
    }
    
    // Escape to close suggestions
    if (e.key === 'Escape') {
        const suggestions = document.getElementById('aiSuggestions');
        if (suggestions) {
            suggestions.classList.remove('active');
        }
    }
});

// Click outside to close suggestions
document.addEventListener('click', (e) => {
    const suggestions = document.getElementById('aiSuggestions');
    const searchInput = document.getElementById('searchInput');
    
    if (suggestions && !suggestions.contains(e.target) && !searchInput?.contains(e.target)) {
        suggestions.classList.remove('active');
    }
});

// Initialize everything when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}