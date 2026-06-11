// API Jikan (MyAnimeList الرسمي)
const JIKAN_API = 'https://api.jikan.moe/v4';
const ANILIST_API = 'https://graphql.anilist.co';

// قائمة IDs لأشهر الأنميات من MyAnimeList
const TOP_ANIME_IDS = [21, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 22, 23, 24, 25];
const POPULAR_ANIME = [
    { mal_id: 21, title: "One Piece", image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", rating: 9.22, year: 1999 },
    { mal_id: 1, title: "Attack on Titan", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", rating: 9.0, year: 2013 },
    { mal_id: 2, title: "Demon Slayer", image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", rating: 8.9, year: 2019 },
    { mal_id: 3, title: "Jujutsu Kaisen", image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", rating: 8.8, year: 2020 },
    { mal_id: 4, title: "Naruto", image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg", rating: 8.5, year: 2002 },
    { mal_id: 5, title: "Death Note", image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", rating: 9.0, year: 2006 },
    { mal_id: 6, title: "Fullmetal Alchemist", image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", rating: 9.1, year: 2009 }
];

// جلب بيانات الأنمي من API الرسمي
async function fetchAnimeFromAPI(malId) {
    try {
        const response = await fetch(`${JIKAN_API}/anime/${malId}`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('خطأ في جلب البيانات:', error);
        return null;
    }
}

// جلب أحدث الأنميات
async function fetchTopAnime() {
    try {
        const response = await fetch(`${JIKAN_API}/top/anime?limit=24`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('خطأ:', error);
        return POPULAR_ANIME;
    }
}

// جلب الأنميات حسب التصنيف
async function fetchAnimeByGenre(genreId) {
    try {
        const response = await fetch(`${JIKAN_API}/anime?genres=${genreId}&order_by=score&sort=desc&limit=12`);
        const data = await response.json();
        return data.data;
    } catch (error) {
        return [];
    }
}

// جلب الحلقات الجديدة
async function fetchSeasonalAnime() {
    try {
        const now = new Date();
        const year = now.getFullYear();
        const seasons = ['winter', 'spring', 'summer', 'fall'];
        const season = seasons[Math.floor(now.getMonth() / 3)];
        
        const response = await fetch(`${JIKAN_API}/seasons/${year}/${season}`);
        const data = await response.json();
        return data.data.slice(0, 12);
    } catch (error) {
        return [];
    }
}

// عرض الأنمي
function displayAnime(animeList, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    if (!animeList || animeList.length === 0) {
        container.innerHTML = '<div style="text-align:center;padding:2rem;">لا توجد نتائج</div>';
        return;
    }
    
    container.innerHTML = animeList.map(anime => `
        <div class="anime-card" data-id="${anime.mal_id || anime.id}">
            <img src="${anime.images?.jpg?.image_url || anime.image}" alt="${anime.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/225x350?text=Anime'">
            <div class="anime-info">
                <h3>${anime.title}</h3>
                <div class="anime-meta">
                    <span class="anime-rating"><i class="fas fa-star"></i> ${anime.score || anime.rating || 'N/A'}</span>
                    <span class="anime-year">${anime.year || anime.aired?.prop?.from?.year || 'N/A'}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    document.querySelectorAll(`#${containerId} .anime-card`).forEach(card => {
        card.addEventListener('click', async () => {
            const id = parseInt(card.dataset.id);
            const anime = animeList.find(a => (a.mal_id || a.id) === id);
            if (anime) await showAnimeDetails(anime);
        });
    });
}

// عرض تفاصيل الأنمي
async function showAnimeDetails(anime) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const animeDetails = document.getElementById('animeDetails');
    const episodeList = document.getElementById('episodeList');
    const linksGrid = document.querySelector('.links-grid');
    
    modalTitle.textContent = anime.title;
    
    // جلب التفاصيل الكاملة من API
    let fullAnime = anime;
    if (anime.mal_id) {
        const fetched = await fetchAnimeFromAPI(anime.mal_id);
        if (fetched) fullAnime = fetched;
    }
    
    // عرض التفاصيل
    animeDetails.innerHTML = `
        <div style="display: flex; gap: 1rem; margin: 1rem 0; flex-wrap: wrap;">
            <img src="${fullAnime.images?.jpg?.image_url || anime.image}" style="width: 150px; border-radius: 10px;" onerror="this.style.display='none'">
            <div style="flex: 1;">
                <p><strong>التقييم:</strong> ⭐ ${fullAnime.score || 'N/A'}</p>
                <p><strong>عدد الحلقات:</strong> ${fullAnime.episodes || 'غير معروف'}</p>
                <p><strong>الحالة:</strong> ${fullAnime.status || 'غير معروف'}</p>
                <p><strong>التصنيفات:</strong> ${fullAnime.genres?.map(g => g.name).join(', ') || 'غير معروف'}</p>
                <p><strong>الوصف:</strong> ${fullAnime.synopsis?.substring(0, 300) || 'لا يوجد وصف'}...</p>
            </div>
        </div>
    `;
    
    // روابط المشاهدة الرسمية
    linksGrid.innerHTML = `
        <a href="https://www.crunchyroll.com/search?q=${encodeURIComponent(anime.title)}" target="_blank" class="watch-link crunchyroll">
            <i class="fab fa-sistrix"></i> Crunchyroll
        </a>
        <a href="https://www.netflix.com/search?q=${encodeURIComponent(anime.title)}" target="_blank" class="watch-link netflix">
            <i class="fab fa-netflix"></i> Netflix
        </a>
        <a href="https://animeplanet.com/anime/${anime.title.toLowerCase().replace(/ /g, '-')}" target="_blank" class="watch-link animeplanet">
            <i class="fas fa-globe"></i> Anime-Planet
        </a>
        <a href="https://myanimelist.net/anime/${fullAnime.mal_id}" target="_blank" class="watch-link mal">
            <i class="fas fa-chart-line"></i> MyAnimeList
        </a>
    `;
    
    // قائمة الحلقات (محاكاة)
    const episodes = fullAnime.episodes || 24;
    let episodesHtml = '<h4>قائمة الحلقات:</h4><div style="max-height: 200px; overflow-y: auto;">';
    for (let i = 1; i <= Math.min(episodes, 24); i++) {
        episodesHtml += `
            <div class="episode-list-item" data-ep="${i}">
                الحلقة ${i} - ${anime.title}
            </div>
        `;
    }
    episodesHtml += '</div>';
    episodeList.innerHTML = episodesHtml;
    
    // تشغيل أول حلقة على يوتيوب (بحث)
    try {
        const searchRes = await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${encodeURIComponent(anime.title + ' episode 1')}&key=AIzaSyDEFAULT_KEY`);
        // ملاحظة: تحتاج API key حقيقية للتشغيل الفعلي
    } catch(e) {}
    
    // تشغيل فيديو تجريبي
    const videoFrame = document.getElementById('videoFrame');
    videoFrame.src = `https://www.youtube.com/embed?q=${encodeURIComponent(anime.title)}`;
    
    modal.style.display = 'block';
}

// تهيئة الموقع
async function init() {
    // جلب البيانات الرسمية
    const topAnime = await fetchTopAnime();
    displayAnime(topAnime.slice(0, 12), 'popularGrid');
    
    const seasonalAnime = await fetchSeasonalAnime();
    displayAnime(seasonalAnime.slice(0, 8), 'featuredGrid');
    
    // إحصائيات
    document.getElementById('totalAnime').textContent = '500+';
    document.getElementById('totalEpisodes').textContent = '10K+';
    document.getElementById('totalUsers').textContent = '100K+';
    
    // أحدث الحلقات
    const recentContainer = document.getElementById('recentEpisodes');
    if (recentContainer) {
        recentContainer.innerHTML = topAnime.slice(0, 6).map(anime => `
            <div class="episode-card">
                <div class="episode-num">جديد</div>
                <div class="episode-title">${anime.title}</div>
                <div class="episode-date">${anime.aired?.prop?.from?.year || '2024'}</div>
            </div>
        `).join('');
    }
    
    // البحث
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    
    searchBtn.addEventListener('click', async () => {
        const query = searchInput.value;
        if (!query) return;
        const response = await fetch(`${JIKAN_API}/anime?q=${encodeURIComponent(query)}&limit=24`);
        const data = await response.json();
        displayAnime(data.data, 'popularGrid');
    });
    
    // التصنيفات
    const genreMap = { action: 1, adventure: 2, drama: 8, comedy: 4, romance: 22, fantasy: 10, 'sci-fi': 24, horror: 14 };
    document.querySelectorAll('.category-card').forEach(card => {
        card.addEventListener('click', async () => {
            const cat = card.dataset.cat;
            const genreId = genreMap[cat];
            if (genreId) {
                const filtered = await fetchAnimeByGenre(genreId);
                displayAnime(filtered, 'popularGrid');
            }
        });
    });
    
    // مودال
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
}

// بدء التشغيل
document.addEventListener('DOMContentLoaded', init);