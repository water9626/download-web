// script.js - 负责读取数据并生成页面内容

document.addEventListener('DOMContentLoaded', function() {
    // 1. 获取 products.json 数据
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            // 2. 找到页面上用来放产品卡片的容器
            const gridContainer = document.getElementById('product-grid');

            // 3. 循环遍历每个产品，生成 HTML
            products.forEach(product => {
                const cardHTML = `
                    <div class="card">
                        <h3>${product.name}</h3>
                        <p>${product.category}</p>
                        <p>${product.desc}</p>
                        <a href="support.html#${product.name.replace(/\s/g, '-')}" class="btn">View Details & Downloads</a>
                    </div>
                `;
                // 4. 把生成的卡片添加到网页中
                gridContainer.innerHTML += cardHTML;
            });
        })
        .catch(error => console.error('Error loading products:', error));
});
