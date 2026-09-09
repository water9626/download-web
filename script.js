document.addEventListener('DOMContentLoaded', () => {
    // 检查是否在 products 页面
    if (document.getElementById('product-grid')) {
        fetch('products.json')
            .then(response => response.json())
            .then(data => {
                renderProducts(data);
                
                // 搜索功能监听
                const searchInput = document.getElementById('search-input');
                searchInput.addEventListener('input', (e) => {
                    const searchTerm = e.target.value.toLowerCase();
                    const filteredData = data.filter(product => 
                        product.name.toLowerCase().includes(searchTerm) ||
                        product.category.toLowerCase().includes(searchTerm) ||
                        product.desc.toLowerCase().includes(searchTerm)
                    );
                    renderProducts(filteredData);
                });
            })
            .catch(error => console.error('Error loading product data:', error));
    }
});

// 渲染产品卡片函数
function renderProducts(products) {
    const grid = document.getElementById('product-grid');
    grid.innerHTML = ''; // 清空现有内容
    
    if (products.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No products found matching your search.</p>';
        return;
    }

    products.forEach(product => {
        // 处理详情页链接，使用 JSON 中的 name 作为参数
        const detailUrl = `product-detail.html?name=${encodeURIComponent(product.name)}`;
        
        const cardHtml = `
            <div class="product-card">
                <div>
                    <div class="card-category">${product.category}</div>
                    <h2 class="card-name">${product.name}</h2>
                    <p class="card-desc">${product.desc}</p>
                </div>
                <a href="${detailUrl}" class="btn-details">View Details & Downloads</a>
            </div>
        `;
        grid.innerHTML += cardHtml;
    });
}
