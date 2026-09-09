// 这里是你的原始数据
const productsData = [
  {
    "category": "HW-ma5671A SFP ONU",
    "name": "MA5671A",
    "desc": "GPON SFP ONU Stick",
    "videoUrlList": [
      { "title": "Settings for using MA5671A with MikroTik (Chinese)", "url": "https://youtu.be/ygxaMOKvX7Y?is=EN1JAr7x5U7uGoeJ" },
      { "title": "16-digit to 12-digit LOID/SN converter", "url": "https://youtu.be/1uWbhbN80os?is=hybT2ZSZ85rAC1Q5" },
      { "title": "10G Xgspon 8311", "url": "https://youtu.be/FBBT3GTuYtw?is=Vy9_tgmbJXeZGQKW" }
    ],
    "pdfList": [],
    "softwareList": [
      { "title": "Download M5671A ONU Dedicated Configuration Tool", "url": "https://github.com/wifixshare/gpon-stick-configuration-tool/releases/" }
    ],
    "firmwareList": []
  },
  {
    "category": "ODI PONstick",
    "name": "ODI RTL9601d stick",
    "desc": "ODI RTL9601d stick",
    "videoUrlList": [
      { "title": "MAC Key Calculation for ODI", "url": "https://youtu.be/TD4QhAxm4R8?is=lw5UrqiTHv8E3_3m" },
      { "title": "Reposted: Detailed ODI Setup Tutorial", "url": "https://r1bnc.com/post/94/" },
      { "title": "Reposted: Detailed ODI/vsol Setup Tutorial", "url": "https://github.com/Anime4000/RTL960x/blob/main/Docs/Setup_Stick.md" }
    ],
    "pdfList": [],
    "softwareList": [
      { "title": "Website used to calculate the MAC Key for ODI", "url": "http://www.ip33.com/md5.html" }
    ],
    "firmwareList": [
      { "title": "Reposted Firmware", "url": "https://github.com/Anime4000/RTL960x/tree/main/Firmware/DFP-34X-2C2" }
    ]
  },
  {
    "category": "Volt mini olt",
    "name": "mini gpon olt SFP",
    "desc": "mini gpon olt SFP",
    "videoUrlList": [
      { "title": "How to set ONU to router mode", "url": "https://youtu.be/ckJvqJloSzg?is=03qWgC6W4H0qiQox" },
      { "title": "How to set ONU to bridge mode", "url": "https://youtu.be/QFcUg1Ra1p0?is=zFiDKugYn9h1TeVn" },
      { "title": "How to Install VOLT Software", "url": "https://youtu.be/zTkDRKb20QM?is=U_GQk3XpTTJrivRB" }
    ],
    "pdfList": [],
    "softwareList": [
      { "title": "For volt", "url": "https://mega.nz/folder/uopBTQYI#0XRXL0XkLRK3GAoaL8RVkQ" }
    ],
    "firmwareList": []
  },
  {
    "category": "Vsol ONU/Olt",
    "name": "Vsol ONU/Olt",
    "desc": "V2801SG/V2801Q/V2802RH/OLT",
    "videoUrlList": [
      { "title": "How to change SN and MAC address", "url": "https://youtu.be/mH7NNXCYMK8?is=XdmunwA5zcqQjr9x" },
      { "title": "V2801 / V2801Q / V2802RH: Login IP & Telnet Enable", "url": "https://youtu.be/mHXsrBKqy3k?is=xEB6T5Wd6g-FalOA" }
    ],
    "pdfList": [],
    "softwareList": [],
    "firmwareList": []
  }
];

// 获取当前页面路径
const path = window.location.pathname;

// --- 首页逻辑 (index.html) ---
if (path.endsWith('index.html') || path === '/' || path.endsWith('/')) {
    const grid = document.getElementById('product-grid');
    const searchInput = document.getElementById('productSearch');

    function renderProducts(filterText = '') {
        grid.innerHTML = ''; // 清空当前列表
        
        productsData.forEach(product => {
            // 简单的搜索过滤
            if (product.name.toLowerCase().includes(filterText.toLowerCase()) || 
                product.desc.toLowerCase().includes(filterText.toLowerCase())) {
                
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${product.name}</h3>
                    <p class="category">${product.category}</p>
                    <p>${product.desc}</p>
                    <a href="support.html#${product.name.replace(/\s+/g, '-')}" class="btn">View Details & Downloads</a>
                `;
                grid.appendChild(card);
            }
        });
    }

    // 初始化渲染
    renderProducts();

    // 监听搜索框输入
    if(searchInput) {
        searchInput.addEventListener('input', (e) => {
            renderProducts(e.target.value);
        });
    }
}

// --- 支持与下载页逻辑 (support.html) ---
if (path.includes('support.html')) {
    const container = document.getElementById('support-content');
    
    productsData.forEach(product => {
        const section = document.createElement('div');
        section.className = 'support-section';
        section.id = product.name.replace(/\s+/g, '-'); // 设置锚点ID
        
        let htmlContent = `<h2>${product.name} <small>(${product.category})</small></h2>`;
        htmlContent += `<p>${product.desc}</p>`;

        // 生成视频列表
        if (product.videoUrlList && product.videoUrlList.length > 0) {
            htmlContent += `<div class="resource-group"><h3>🎥 Tutorials & Videos</h3><ul>`;
            product.videoUrlList.forEach(v => {
                htmlContent += `<li><a href="${v.url}" target="_blank">${v.title}</a></li>`;
            });
            htmlContent += `</ul></div>`;
        }

        // 生成软件列表
        if (product.softwareList && product.softwareList.length > 0) {
            htmlContent += `<div class="resource-group"><h3>💾 Software Tools</h3><ul>`;
            product.softwareList.forEach(s => {
                htmlContent += `<li><a href="${s.url}" target="_blank" class="download-link">${s.title}</a></li>`;
            });
            htmlContent += `</ul></div>`;
        }

        // 生成固件列表
        if (product.firmwareList && product.firmwareList.length > 0) {
            htmlContent += `<div class="resource-group"><h3>⚙️ Firmware</h3><ul>`;
            product.firmwareList.forEach(f => {
                htmlContent += `<li><a href="${f.url}" target="_blank" class="download-link">${f.title}</a></li>`;
            });
            htmlContent += `</ul></div>`;
        }

        section.innerHTML = htmlContent;
        container.appendChild(section);
    });
}
