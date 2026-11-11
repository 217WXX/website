const products = [
  { title: "棕榈半身裙", price: 180, image: "palm-skirt.jpg", type: "product", tags: ["扎染"], categories: ["扎染"] },
  { title: "梦幻半身裙", description: "采用纯天然植物染料", price: 250, image: "fantasy-skirt.jpg", type: "product", tags: ["蓝染", "扎染"], categories: ["扎染"] },
  { title: "手持包", price: 20, image: "hand-bag.jpg", type: "product", tags: ["扎染", "蓝染"], categories: [] },
  { title: "鼻烟", price: 200, image: "snuff-bottle.jpg", type: "product", tags: ["藏族文化"], categories: ["饰品"] },
  { title: "复古鼻烟", price: 200, image: "classic-snuff-bottle.jpg", type: "product", tags: ["饰品"], categories: [] },
  { title: "藏式鼻烟", price: 150, image: "decorative-snuff-bottle.jpg", type: "product", tags: ["饰品"], categories: [] },
  { title: "蓝染手套", description: "纯手工制作", price: 8, image: "dyed-gloves.jpg", type: "product", tags: ["蓝染"], categories: ["扎染"] },
  { title: "笔记本", price: 20, image: "notebook.jpg", type: "product", tags: ["扎染"], categories: [] },
  { title: "扎染香包", description: "采用植物染", price: 20, image: "sachet.jpg", type: "product", tags: ["扎染"], categories: [] },
  { title: "淡黄纯棉衬衫", price: 220, image: "cotton-shirt.jpg", type: "product", tags: ["扎染"], categories: [] },
  { title: "皮影戏人物制作", description: "猪皮与纯天然颜料", price: 30, image: "shadow-puppet-material.jpg", type: "craft", tags: ["皮影戏"], categories: [] },
  { title: "蓝黄扎染衬衫", price: 90, image: "blue-yellow-shirt.jpg", type: "product", tags: ["扎染"], categories: [] },
  { title: "粉蓝扎染包", price: 21, image: "pastel-tie-dye-bag.jpg", type: "product", tags: ["扎染"], categories: [] }
];

const categoryMatches = {
  all: () => true,
  spice: (product) => product.categories.includes("香料") || product.tags.includes("香料"),
  music: (product) => product.categories.includes("乐器") || product.tags.includes("乐器"),
  dye: (product) => ["扎染", "蓝染"].some((tag) => product.categories.includes(tag) || product.tags.includes(tag)),
  accessories: (product) => ["饰品", "藏族文化"].some((tag) => product.categories.includes(tag) || product.tags.includes(tag)),
  clothing: (product) => /半身裙|衬衫|服装|民族服饰/.test(product.title) || product.categories.some((tag) => ["衣物", "服装", "民族服饰"].includes(tag)),
  tea: (product) => product.categories.includes("茶叶") || product.tags.includes("茶叶") || product.title.includes("茶叶")
};

const categoryNames = {
  all: "全部商品",
  spice: "香料",
  music: "乐器",
  dye: "扎染",
  accessories: "饰品",
  clothing: "衣物",
  tea: "茶叶"
};
const categoryButtons = [...document.querySelectorAll(".category-chips .chip")];
const productGrid = document.querySelector("#product-grid");
const productEmpty = document.querySelector("#product-empty");
const productCount = document.querySelector("#product-count");
const activeCategory = document.querySelector("#active-category");

function renderProducts(category) {
  const matches = products.filter(categoryMatches[category]);
  activeCategory.textContent = categoryNames[category];
  productCount.textContent = `${matches.length} 件商品`;
  productEmpty.hidden = matches.length > 0;
  productGrid.hidden = matches.length === 0;
  productGrid.innerHTML = matches.map((product) => {
    const tags = [...new Set([...product.categories, ...product.tags])];
    return `
      <article class="product-card">
        <img src="assets/${product.image}" alt="${product.title}" loading="lazy">
        <div>
          <p>${tags.length ? tags.join(" · ") : "非遗工坊"} · ${product.type === "craft" ? "原材料" : "成品"}</p>
          <h3>${product.title}</h3>
          <strong>¥ ${Number(product.price).toFixed(2)}</strong>
        </div>
      </article>
    `;
  }).join("");
}

categoryButtons.forEach((button) => {
  const category = button.dataset.category;
  button.querySelector("b").textContent = String(products.filter(categoryMatches[category]).length).padStart(2, "0");
  button.addEventListener("click", () => {
    categoryButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    });
    renderProducts(category);
  });
});

document.querySelector(".show-all-products").addEventListener("click", () => {
  document.querySelector('[data-category="all"]').click();
});

renderProducts("all");
