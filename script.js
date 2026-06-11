// بيانات الأنمي التجريبية
const animeData = [
    {
        id: 1,
        title: "Attack on Titan",
        japanese: "進撃の巨人",
        image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg",
        rating: 9.0,
        year: 2013,
        genre: ["action", "drama", "fantasy"],
        episodes: 87,
        description: "في عالم يسكنه عمالقة يأكلون البشر، يعيش البشر داخل جدران ضخمة...",
        videoId: "MGRm4IzK1SQ"
    },
    {
        id: 2,
        title: "Demon Slayer",
        japanese: "鬼滅の刃",
        image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
        rating: 8.9,
        year: 2019,
        genre: ["action", "fantasy"],
        episodes: 44,
        description: "تانجيرو يصبح صياد شياطين لإنقاذ أخته نيزوكو...",
        videoId: "VQGCKyvzIM4"
    },
    {
        id: 3,
        title: "Jujutsu Kaisen",
        japanese: "呪術廻戦",
        image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
        rating: 8.8,
        year: 2020,
        genre: ["action", "fantasy"],
        episodes: 24,
        description: "يبتلع يوجي إيتادوري إصبعًا ملعونًا ليصبح مضيفًا للشيطان ريومن سوكونا...",
        videoId: "1nlB5BGGXK0"
    },
    {
        id: 4,
        title: "One Piece",
        japanese: "ワンピース",
        image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg",
        rating: 9.1,
        year: 1999,
        genre: ["action", "adventure", "comedy"],
        episodes: 1000,
        description: "مونكي دي لوفي يبحر ليجد الكنز الأسطوري ون بيس ويصبح ملك القراصنة...",
        videoId: "S8_YwFLCh4U"
    },
    {
        id: 5,
        title: "Naruto",
        japanese: "ナルト",
        image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg",
        rating: 8.5,
        year: 2002,
        genre: ["action", "adventure", "comedy"],
        episodes: 220,
        description: "ناروتو أوزوماكي، نينجا شاب يحلم بأن يصبح الهوكاجي...",
        videoId: "gZ8P8cK2l3s"
    },
    {
        id: 6,
        title: "Death Note",
        japanese: "デスノート",
        image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg",
        rating: 9.0,
        year: 2006,
        genre: ["drama", "thriller"],
        episodes: 37,
        description: "طالب ثانوي يجد دفتراً يمكنه من قتل أي شخص يكتب اسمه فيه...",
        videoId: "NlJZ-YgAt-c"
    },
    {
        id: 7,
        title: "Fullmetal Alchemist",
        japanese: "鋼の錬金術師",
        image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg",
        rating: 9.1,
        year: 2009,
        genre: ["action", "adventure", "drama"],
        episodes: 64,
        description: "شقيقان يستخدمان الخيمياء لمحاولة إحياء والدتهما...",
        videoId: "pxpO64YgC4U"
    },
    {
        id: 8,
        title: "Tokyo Revengers",
        japanese: "東京リベンジャーズ",
        image: "https://cdn.myanimelist.net/images/anime/1717/114001.jpg",
        rating: 8.5,
        year: 2021,
        genre: ["action", "drama"],
        episodes: 24,
        description: "تاكيميتشي يسافر بالزمن لإنقاذ حبيبته السابقة...",
        videoId: "wG9aIiwCdNc"
    }
];

// أحدث الحلقات
const recentEpisodes = [
    { anime: "Attack on Titan", episode: 87, title: "The Final Attack", date: "2024-01-15" },
    { anime: "Demon Slayer", episode: 44, title: "To the Hashira Training", date: "2024-01-14" },
    { anime: "Jujutsu Kaisen", episode: 24, title: "The Shibuya Incident", date: "2024-01-13" },
    { anime: "One Piece", episode: 1000, title: "The Legend Begins", date: "2024-01-12" },
    { anime: "Naruto", episode: 220, title: "The Final Mission", date: "2024-01-11" }
];

// عرض الأنمي
function displayAnime(animeList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = animeList.map(anime => `
        <div class="anime-card" data-id="${anime.id}">
            <img src="${anime.image}" alt="${anime.title}" loading="lazy">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <div class="anime-meta">
                    <span class="anime-rating"><i class="fas fa-star"></i> ${anime.rating}</span>
                    <span class="anime-year">${anime.year}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // إضافة حدث النقر
    document.querySelectorAll(`#${containerId} .anime-card`).forEach(card => {
        card.addEventListener('click', () => {
            const id = parseInt(card.dataset.id);
            const anime = animeList.find(a => a.id === id);
            if (anime) playAnime(anime);
        });
    });
}

// عرض الحلقات الأخيرة
function displayRecentEpisodes() {
    const container = document.getElementById('recentEpisodes');
    if (!container) return;
    
    container.innerHTML = recentEpisodes.map(ep => `
        <div class="episode-card">
            <div class="episode-num">الحلقة ${ep.episode}</div>
            <div class="episode-title">${ep.anime} - ${ep.title}</div>
            <div class="episode-date">${ep.date}</div>
        </div>
    `).join('');
}

// عرض الأنمي المميز
function displayFeatured() {
    const featured = animeData.slice(0, 6);
    displayAnime(featured, 'featuredGrid');
}

// تشغيل الأنمي
function playAnime(anime) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const videoFrame = document.getElementById('videoFrame');
    const episodeList = document.getElementById('episodeList');
    
    modalTitle.textContent = anime.title;
    videoFrame.src = `https://www.youtube.com/embed/${anime.videoId}?autoplay=1`;
    
    // عرض قائمة الحلقات
    episodeList.innerHTML = `
        <div style="text-align: center; padding: 1rem; color: var(--gray);">
            <i class="fas fa-spinner fa-spin"></i> جاري تحميل الحلقات...
        </div>
    `;
    
    // محاكاة تحميل الحلقات
    setTimeout(() => {
        let episodesHtml = '';
        for (let i = 1; i <= Math.min(anime.episodes, 24); i++) {
            episodesHtml += `
                <div class="episode-list-item" data-ep="${i}">
                    الحلقة ${i} - ${anime.title}
                </div>
            `;
        }
        episodeList.innerHTML = episodesHtml;
        
        document.querySelectorAll('.episode-list-item').forEach(item => {
            item.addEventListener('click', () => {
                videoFrame.src = `https://www.youtube.com/embed/${anime.videoId}?autoplay=1`;
                modalTitle.textContent = `${anime.title} - الحلقة ${item.dataset.ep}`;
            });
        });
    }, 500);
    
    modal.style.display = 'block';
}

// البحث
function searchAnime(query) {
    if (!query) return animeData;
    return animeData.filter(anime => 
        anime.title.toLowerCase().includes(query.toLowerCase()) ||
        anime.japanese.toLowerCase().includes(query.toLowerCase())
    );
}

// الفلترة حسب التصنيف
function filterByCategory(category) {
    if (category === 'all') return animeData;
    return animeData.filter(anime => anime.genre.includes(category));
}

// تهيئة الموقع
function init() {
    displayAnime(animeData.slice(0, 8), 'popularGrid');
    displayRecentEpisodes();
    displayFeatured();
    
    // البحث
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', () => {
        const results = searchAnime(searchInput.value);
        displayAnime(results, 'popularGrid');
    });
    
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const results = searchAnime(searchInput.value);
            displayAnime(results, 'popularGrid');
        }
    });
    
    // التصنيفات
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.cat;
            const filtered = filterByCategory(category);
            displayAnime(filtered, 'popularGrid');
        });
    });
    
    // مودال الفيديو
    const modal = document.getElementById('videoModal');
    const closeBtn = document.querySelector('.close-btn');
    
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
        document.getElementById('videoFrame').src = '';
    });
    
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.getElementById('videoFrame').src = '';
        }
    });
    
    // زر مشاهدة الآن
    const watchNowBtn = document.getElementById('watchNowBtn');
    if (watchNowBtn) {
        watchNowBtn.addEventListener('click', () => {
            playAnime(animeData[0]);
        });
    }
    
    // القائمة الموبايل
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenu && navLinks) {
        mobileMenu.addEventListener('click', () => {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
            navLinks.style.flexDirection = 'column';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '70px';
            navLinks.style.left = '0';
            navLinks.style.right = '0';
            navLinks.style.background = 'var(--dark)';
            navLinks.style.padding = '1rem';
            navLinks.style.gap = '1rem';
        });
    }
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', init);