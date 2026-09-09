// script.js - 读取 JSON 数据并渲染到 HTML 页面

document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('product-container');
    
    // 只有主页有这个容器才继续执行
    if (!container) return; 

    // 读取 products.json 文件
    fetch('products.json')
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                // 创建卡片 HTML
                const cardHTML = `
                    <div class="card">
                        <h3>${item.name}</h3>
                        <p>${item.desc}</p>
                        <a href="#" class="btn">View Details & Downloads</a>
                    </div>
                `;
                // 添加到页面中
                container.innerHTML += cardHTML;
            });
        })
        .catch(error => console.error('Error loading products:', error));
});
