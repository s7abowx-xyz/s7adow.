// ========== Crunchyroll API Integration ==========
// المصدر: Crunchyroll API - أشهر منصة أنمي رسمية [citation:1][citation:2]

const CRUNCHYROLL_API = 'https://www.crunchyroll.com';
const CRUNCHYROLL_API_V2 = 'https://api.crunchyroll.com';

// بيانات Crunchyroll لـ Gintama
const GINTAMA_CRUNCHYROLL = {
    seriesId: 'G63V4NQJY',  // معرف Gintama في Crunchyroll
    title: 'Gintama',
    url: 'https://www.crunchyroll.com/series/G63V4NQJY/gintama',
    embedUrl: 'https://www.crunchyroll.com/embed/G63V4NQJY'
};

// دالة لجلب بيانات الأنمي من Crunchyroll (بدون الحاجة لتسجيل دخول)
async function fetchFromCrunchyroll(seriesId) {
    try {
        // استخدام Crunchyroll API العام [citation:1][citation:2]
        const response = await fetch(`${CRUNCHYROLL_API}/api/v1/series/${seriesId}`, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            return await response.json();
        }
    } catch (error) {
        console.log('Crunchyroll API error:', error);
    }
    return null;
}

// دالة جلب الحلقات من Crunchyroll [citation:9][citation:10]
async function getCrunchyrollEpisodes(seriesId) {
    try {
        // Crunchyroll API endpoint للحلقات
        const response = await fetch(`${CRUNCHYROLL_API}/api/v1/series/${seriesId}/episodes`, {
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'application/json'
            }
        });
        if (response.ok) {
            const data = await response.json();
            return data.data || [];
        }
    } catch (error) {
        console.log('Failed to fetch episodes:', error);
    }
    return [];
}

// دالة تشغيل مباشرة من Crunchyroll [citation:6]
function playOnCrunchyroll(seriesId, episodeNumber = 1) {
    const videoContainer = document.querySelector('.video-container');
    const embedUrl = `https://www.crunchyroll.com/embed/${seriesId}?episode=${episodeNumber}`;
    
    videoContainer.innerHTML = `
        <iframe 
            src="${embedUrl}"
            frameborder="0" 
            allowfullscreen 
            allow="autoplay; encrypted-media"
            style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
        </iframe>
    `;
}

// عرض تفاصيل Gintama مع روابط Crunchyroll
async function showAnimeDetails(anime) {
    const modal = document.getElementById('videoModal');
    const modalTitle = document.getElementById('modalTitle');
    const animeDetails = document.getElementById('animeDetails');
    const episodeList = document.getElementById('episodeList');
    const linksGrid = document.querySelector('.links-grid');
    
    if (anime.title.includes('Gintama')) {
        modalTitle.textContent = 'Gintama - جينتاما (Crunchyroll)';
        
        // بيانات Gintama من مصادر رسمية [citation:6]
        animeDetails.innerHTML = `
            <div style="display: flex; gap: 1.5rem; margin: 1rem 0; flex-wrap: wrap;">
                <img src="https://cdn.myanimelist.net/images/anime/10/73245.jpg" style="width: 180px; border-radius: 10px;">
                <div style="flex: 1;">
                    <p><strong>التقييم:</strong> ⭐ 9.05 (MAL) | 🧡 4.8/5 (Crunchyroll)</p>
                    <p><strong>عدد الحلقات:</strong> 367+ على Crunchyroll</p>
                    <p><strong>الحالة:</strong> مكتمل (Completed)</p>
                    <p><strong>التصنيفات:</strong> أكشن، كوميدي، خيال علمي، دراما</p>
                    <p><strong>الاستوديو:</strong> Sunrise (Bandai Namco Pictures)</p>
                    <p><strong>المشاهدة الرسمية:</strong> متوفرة على Crunchyroll بجودة HD مع ترجمة عربية</p>
                </div>
            </div>
        `;
        
        // روابط المشاهدة الرسمية (Crunchyroll أولاً) [citation:10]
        linksGrid.innerHTML = `
            <a href="https://www.crunchyroll.com/series/G63V4NQJY/gintama" target="_blank" class="watch-link crunchyroll" style="background: #f47521;">
                <i class="fab fa-sistrix"></i> مشاهدة على Crunchyroll (رسمي)
            </a>
            <a href="https://myanimelist.net/anime/918/Gintama" target="_blank" class="watch-link mal" style="background: #2e51a2;">
                <i class="fas fa-chart-line"></i> MyAnimeList
            </a>
            <a href="https://anilist.co/anime/918/Gintama" target="_blank" class="watch-link" style="background: #02a9ff;">
                <i class="fas fa-dragon"></i> AniList
            </a>
        `;
        
        // قائمة الحلقات (أول 51 حلقة من Crunchyroll)
        let episodesHtml = '<h4>🎬 الحلقات على Crunchyroll:</h4><div style="max-height: 300px; overflow-y: auto;">';
        for (let i = 1; i <= 51; i++) {
            episodesHtml += `
                <div class="episode-list-item" data-ep="${i}" data-series="${GINTAMA_CRUNCHYROLL.seriesId}">
                    🎞️ الحلقة ${i} - Gintama
                    <span style="float: left; color: var(--primary); font-size: 0.7rem;">▶️ تشغيل على Crunchyroll</span>
                </div>
            `;
        }
        episodesHtml += '</div>';
        episodeList.innerHTML = episodesHtml;
        
        // إضافة حدث النقر - تشغيل مباشر من Crunchyroll [citation:9]
        document.querySelectorAll('.episode-list-item').forEach(item => {
            item.addEventListener('click', () => {
                const epNum = item.dataset.ep;
                const seriesId = item.dataset.series;
                modalTitle.textContent = `Gintama - الحلقة ${epNum} (Crunchyroll)`;
                
                // التشغيل مباشرة من Crunchyroll
                const videoContainer = document.querySelector('.video-container');
                videoContainer.innerHTML = `
                    <iframe 
                        src="https://www.crunchyroll.com/embed/${seriesId}?episode=${epNum}"
                        frameborder="0" 
                        allowfullscreen
                        style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;">
                    </iframe>
                `;
            });
        });
    }
    
    modal.style.display = 'block';
}

// زر "شاهد الآن" - يفتح Crunchyroll مباشرة
document.getElementById('watchNowBtn')?.addEventListener('click', () => {
    // فتح Crunchyroll في تبويب جديد
    window.open('https://www.crunchyroll.com/series/G63V4NQJY/gintama', '_blank');
});