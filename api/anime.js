// API للبوتات - بحث أنمي
// للاستخدام مع واتساب، تيليجرام، ديسكورد

// قاعدة بيانات الأنمي
const animeDatabase = [
    { id: 918, title: "Gintama", title_ar: "جينتاما", image: "https://cdn.myanimelist.net/images/anime/10/73245.jpg", rating: 9.05, year: 2006, episodes: 367, genres: ["Action", "Comedy", "Sci-Fi"], description: "في عالم بديل حيث سيطر الأجانب على اليابان، يكافح الساموراي للحفاظ على روحهم." },
    { id: 16498, title: "Attack on Titan", title_ar: "هجوم العمالقة", image: "https://cdn.myanimelist.net/images/anime/10/47347.jpg", rating: 9.0, year: 2013, episodes: 87, genres: ["Action", "Drama", "Fantasy"], description: "في عالم يسكنه عمالقة يأكلون البشر، يعيش البشر داخل جدران ضخمة." },
    { id: 38000, title: "Demon Slayer", title_ar: "قاتل الشياطين", image: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg", rating: 8.9, year: 2019, episodes: 55, genres: ["Action", "Fantasy"], description: "تانجيرو يصبح صياد شياطين لإنقاذ أخته نيزوكو." },
    { id: 40748, title: "Jujutsu Kaisen", title_ar: "جوجوتسو كايسن", image: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg", rating: 8.8, year: 2020, episodes: 47, genres: ["Action", "Fantasy"], description: "يبتلع يوجي إيتادوري إصبعًا ملعونًا ليصبح مضيفًا للشيطان." },
    { id: 21, title: "One Piece", title_ar: "ون بيس", image: "https://cdn.myanimelist.net/images/anime/6/73245.jpg", rating: 9.22, year: 1999, episodes: 1100, genres: ["Action", "Adventure", "Comedy"], description: "مونكي دي لوفي يبحر ليجد الكنز الأسطوري ون بيس." },
    { id: 20, title: "Naruto", title_ar: "ناروتو", image: "https://cdn.myanimelist.net/images/anime/13/17405.jpg", rating: 8.5, year: 2002, episodes: 220, genres: ["Action", "Adventure", "Comedy"], description: "ناروتو أوزوماكي، نينجا شاب يحلم بأن يصبح الهوكاجي." },
    { id: 1535, title: "Death Note", title_ar: "مذكرة الموت", image: "https://cdn.myanimelist.net/images/anime/9/9453.jpg", rating: 9.0, year: 2006, episodes: 37, genres: ["Drama", "Thriller"], description: "طالب ثانوي يجد دفتراً يمكنه من قتل أي شخص يكتب اسمه فيه." },
    { id: 5114, title: "Fullmetal Alchemist", title_ar: "الخيميائي الفولاذي", image: "https://cdn.myanimelist.net/images/anime/1223/96541.jpg", rating: 9.1, year: 2009, episodes: 64, genres: ["Action", "Adventure", "Drama"], description: "شقيقان يستخدمان الخيمياء لمحاولة إحياء والدتهما." },
    { id: 30276, title: "One Punch Man", title_ar: "رجل اللكمة الواحدة", image: "https://cdn.myanimelist.net/images/anime/12/76049.jpg", rating: 8.8, year: 2015, episodes: 24, genres: ["Action", "Comedy"], description: "ساتيما، بطل خارق قوي لدرجة أنه يهزم أي خصم بضربة واحدة." },
    { id: 31964, title: "My Hero Academia", title_ar: "أكاديمية بطلي", image: "https://cdn.myanimelist.net/images/anime/10/78745.jpg", rating: 8.4, year: 2016, episodes: 138, genres: ["Action", "Comedy"], description: "في عالم حيث 80% من السكان لديهم قدرات خارقة." }
];

export default async function handler(req, res) {
    // CORS للبوتات
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Content-Type', 'application/json');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // GET: معلومات API
    if (req.method === 'GET') {
        return res.status(200).json({
            name: 'AnimeWorm API',
            version: '1.0',
            description: 'API للبحث عن الأنمي - مناسب لبوتات واتساب وتيليجرام',
            endpoints: {
                'POST /api/anime': {
                    body: { search: 'اسم الأنمي' },
                    example: { search: 'gintama' }
                },
                'GET /api/anime': 'قائمة بجميع الأنميات'
            }
        });
    }

    // POST: بحث أنمي
    if (req.method === 'POST') {
        const { search, id } = req.body;
        
        // بحث بالمعرف
        if (id) {
            const anime = animeDatabase.find(a => a.id == id);
            if (anime) {
                return res.status(200).json({
                    success: true,
                    data: anime
                });
            }
            return res.status(404).json({ success: false, error: 'Anime not found' });
        }
        
        // بحث بالنص
        if (search) {
            const results = animeDatabase.filter(anime => 
                anime.title.toLowerCase().includes(search.toLowerCase()) ||
                anime.title_ar.includes(search)
            );
            return res.status(200).json({
                success: true,
                count: results.length,
                results: results
            });
        }
        
        // إذا لم يوجد بحث، عرض كل الأنميات
        return res.status(200).json({
            success: true,
            count: animeDatabase.length,
            results: animeDatabase
        });
    }
    
    return res.status(405).json({ error: 'Method not allowed' });
}
