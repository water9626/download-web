// script.js - 产品加载与搜索功能

document.addEventListener('DOMContentLoaded', function () {
    const productList = document.getElementById('product-list');
    const searchInput = document.getElementById('search-input');

    // 从 JSON 文件加载产品数据
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // 初始渲染所有产品
            renderProducts(products);

            // 搜索功能：实时筛选
            searchInput.addEventListener('input', function (e) {
                const searchTerm = e.target.value.toLowerCase();
                const filteredProducts = products.filter(product => 
                    product.name.toLowerCase().includes(searchTerm) || 
                    product.model.toLowerCase().includes(searchTerm)
                );
                renderProducts(filteredProducts);
            });
        })
        .catch(error => console.error('Error loading products:', error));

    // 渲染产品卡片的函数
    function renderProducts(products) {
        productList.innerHTML = ''; // 清空当前列表
        if (products.length === 0) {
            productList.innerHTML = '<p style="color: #666;">No products found.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';
            
            card.innerHTML = `
                <div>
                    <h3>${product.name}</h3>
                    <p>${product.model}</p>
                </div>
                <a href="support.html" class="btn">View Details & Downloads</a>
            `;
            productList.appendChild(card);
        });
    }
});
