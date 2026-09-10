// 下载统计本地存储
const STORAGE_KEY = "fibershow_download_stats";
function getStats() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; }
    catch (e) { return {}; }
}
function saveStats(stats) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(stats)); }
    catch (e) {}
}
function incrementDownload(resId) {
    const stats = getStats();
    stats[resId] = (stats[resId] || 0) + 1;
    saveStats(stats);
    return stats[resId];
}
function getDownloadCount(resId) {
    return getStats()[resId] || 0;
}
function handleDownloadClick(resId) {
    incrementDownload(resId);
    refreshAllCounts();
}
function refreshAllCounts() {
    document.querySelectorAll("[data-count-id]").forEach(el => {
        el.textContent = getDownloadCount(el.getAttribute("data-count-id")) + " downloads";
    });
}

// 页面切换
function switchView(viewId) {
    document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('nav a').forEach(el => el.classList.remove('active'));
    document.getElementById(`view-${viewId}`).classList.add('active');
    document.getElementById(`nav-${viewId}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 弹窗
function openModal(productId) {
    const product = window.productsList.find(p => p.id === productId);
    if (!product) return;

    document.getElementById('modal-title').textContent = product.name;
    document.getElementById('modal-category').textContent = product.category;

    let bodyHtml = `<p class="modal-desc">${product.desc}</p>`;

    if (product.specs) {
        bodyHtml += `<h3 style="margin-bottom:12px;">Specifications</h3><table class="spec-table">`;
        for (const [key, value] of Object.entries(product.specs)) {
            bodyHtml += `<tr><td>${key}</td><td>${value}</td></tr>`;
        }
        bodyHtml += `</table>`;
    }

    const renderModalResource = (items, title, icon) => {
        if(!items || items.length ===0) return "";
        let html = `<div class="modal-res-block"><h3>${title}</h3><ul class="modal-res-list">`;
        items.forEach(item=>{
            html += `
                <li>
                    <a class="modal-res-link" href="${item.url}" target="_blank" onclick="handleDownloadClick('${item.id}')">
                        <span>${icon}</span> ${item.title}
                    </a>
                    <span class="res-count" data-count-id="${item.id}">${getDownloadCount(item.id)} downloads</span>
                </li>
            `
        })
        html += `</ul></div>`;
        return html;
    }

    bodyHtml += renderModalResource(product.videoUrlList, "Videos / Tutorials", "▶️");
    bodyHtml += renderModalResource(product.softwareList, "Software / Tools", "💻");
    bodyHtml += renderModalResource(product.firmwareList, "Firmware", "⚙️");

    document.getElementById('modal-body').innerHTML = bodyHtml;
    document.getElementById('product-modal').classList.add('active');
    document.body.style.overflow = 'hidden';
    refreshAllCounts();
}

function closeModal() {
    document.getElementById('product-modal').classList.remove('active');
    document.body.style.overflow = '';
}
function closeModalOnOverlay(event) {
    if (event.target.id === 'product-modal') closeModal();
}
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
});

// 渲染产品
function renderProducts(productList) {
    const grid = document.getElementById('product-grid');
    if (productList.length === 0) {
        grid.innerHTML = `<div class="no-result">No products found. Try a different search term.</div>`;
        return;
    }
    grid.innerHTML = productList.map(product => {
        return `
        <div class="card">
            <div class="card-img-wrap">
                <img src="${product.imgSrc}" alt="${product.name}">
            </div>
            <span class="category">${product.category}</span>
            <h2>${product.name}</h2>
            <div class="desc">${product.desc.length > 80 ? product.desc.substring(0, 80) + '...' : product.desc}</div>
            <div class="card-btn-row">
                <a class="btn btn-primary" onclick="openModal('${product.id}')">View Details</a>
                <a class="btn btn-buy" href="${product.buyUrl}" target="_blank">Buy Now</a>
            </div>
        </div>
        `
    }).join('');
}

// 搜索
function applySearch() {
    const keyword = document.getElementById('product-search').value.toLowerCase();
    let filtered = window.productsList;
    if (keyword) {
        filtered = filtered.filter(p =>
            p.name.toLowerCase().includes(keyword) ||
            p.desc.toLowerCase().includes(keyword) ||
            p.category.toLowerCase().includes(keyword)
        );
    }
    renderProducts(filtered);
}

// 渲染支持页
function renderSupportPage() {
    const grid = document.getElementById('support-grid');
    grid.innerHTML = window.productsList.map(product => {
        let html = `
            <div class="support-item">
                <h2>${product.name}</h2>
                <div class="support-meta">${product.category}<br>${product.desc}</div>
        `;
        const renderList = (items, icon) => {
            if (!items || items.length === 0) return "";
            let listHtml = `<ul>`;
            items.forEach(item => {
                listHtml += `
                    <li>
                        <span class="link-text">
                            <span class="icon">${icon}</span>
                            <a href="${item.url}" target="_blank" onclick="handleDownloadClick('${item.id}')">${item.title}</a>
                        </span>
                        <span class="res-count" data-count-id="${item.id}">
                            ${getDownloadCount(item.id)} downloads
                        </span>
                    </li>
                `;
            });
            listHtml += `</ul>`;
            return listHtml;
        };
        if (product.videoUrlList?.length) {
            html += `<h3>Videos / Tutorials</h3>`;
            html += renderList(product.videoUrlList, "▶️");
        }
        if (product.softwareList?.length) {
            html += `<h3>Software / Tools</h3>`;
            html += renderList(product.softwareList, "💻");
        }
        if (product.firmwareList?.length) {
            html += `<h3>Firmware</h3>`;
            html += renderList(product.firmwareList, "⚙️");
        }
        html += `</div>`;
        return html;
    }).join('');
}

// 回到顶部
window.addEventListener('scroll', () => {
    const btn = document.getElementById('backToTop');
    if (window.scrollY > 360) {
        btn.classList.add('visible');
    } else {
        btn.classList.remove('visible');
    }
});

// 初始化：读取外部JSON
async function init() {
    try {
        const res = await fetch("products.json");
        window.productsList = await res.json();
        renderProducts(window.productsList);
        renderSupportPage();
        refreshAllCounts();
        document.getElementById('product-search').addEventListener('input', applySearch);
    } catch (err) {
        console.error("Load products error:", err);
    }
}
init();
