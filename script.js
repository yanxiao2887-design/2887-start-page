document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. 时间功能 ---
    function updateTime() {
        const now = new Date();
        const timeStr = String(now.getHours()).padStart(2,'0') + ":" + String(now.getMinutes()).padStart(2,'0');
        const dateStr = now.getFullYear() + "年" + (now.getMonth()+1) + "月" + now.getDate() + "日";
        
        document.getElementById('current-time').textContent = timeStr;
        document.getElementById('current-date').textContent = dateStr;
    }
    setInterval(updateTime, 1000);
    updateTime();

    // --- 2. 搜索功能 ---
    document.getElementById('search-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const val = document.getElementById('search-input').value;
        const engine = document.getElementById('search-engine').value;
        const urls = {
            'google': 'https://www.google.com/search?q=',
            'baidu': 'https://www.baidu.com/s?wd=',
            'bing': 'https://www.bing.com/search?q=',
            'duckduckgo': 'https://duckduckgo.com/?q='
        };
        
        if(val) {
            window.open(urls[engine] + encodeURIComponent(val), '_blank');
        }
    });

    // --- 3. 筛选功能 (核心更新) ---
    const pills = document.querySelectorAll('.category-pill');
    const cards = document.querySelectorAll('.link-card');

    pills.forEach(pill => {
        pill.addEventListener('click', () => {
            // A. 切换 Pill 的激活样式
            pills.forEach(p => p.classList.remove('active'));
            pill.classList.add('active');

            // B. 筛选卡片
            const target = pill.getAttribute('data-target');

            cards.forEach(card => {
                if (target === 'all') {
                    // 如果是“全部”，显示所有卡片
                    card.style.display = 'flex';
                } else {
                    // 否则，只显示 data-category 匹配的卡片
                    if (card.getAttribute('data-category') === target) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
});