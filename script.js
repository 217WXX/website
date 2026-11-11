const languageText = (chinese, english) => window.siteLanguage?.t(chinese, english) ?? chinese;

const photoIntro = document.querySelector('.yunnan-photo-intro');
if (photoIntro) {
  const photoIntroSkip = photoIntro.querySelector('.photo-intro-skip');
  const pageLayers = document.querySelectorAll('.skip-link, .site-header, #main, .site-footer');
  const photoScenes = Array.from(photoIntro.querySelectorAll('[data-photo-scene]'));
  let photoSceneIndex = 0;
  let photoSceneTimer;
  const dismissPhotoIntro = () => {
    if (photoIntro.classList.contains('is-dismissed')) return;
    window.clearInterval(photoSceneTimer);
    photoIntro.classList.add('is-dismissed');
    photoIntro.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('photo-intro-open');
    pageLayers.forEach((layer) => { layer.inert = false; });
    document.querySelector('.site-header .brand')?.focus({ preventScroll: true });
  };

  document.body.classList.add('photo-intro-open');
  pageLayers.forEach((layer) => { layer.inert = true; });
  photoIntroSkip.focus({ preventScroll: true });
  photoIntro.addEventListener('click', dismissPhotoIntro);
  photoSceneTimer = window.setInterval(() => {
    photoSceneIndex += 1;
    photoIntro.dataset.scene = String(photoSceneIndex);
    if (photoSceneIndex === photoScenes.length - 1) {
      photoIntro.classList.add('is-final');
      window.clearInterval(photoSceneTimer);
    }
  }, 2400);
  photoIntroSkip.addEventListener('click', dismissPhotoIntro);
  document.addEventListener('keydown', (event) => {
    if (photoIntro.classList.contains('is-dismissed')) return;
    if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      dismissPhotoIntro();
    } else if (event.key === 'Tab') {
      event.preventDefault();
      photoIntroSkip.focus();
    }
  });
}

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.primary-nav');

menuButton.addEventListener('click', () => {
  const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isExpanded));
  menuButton.setAttribute('aria-label', languageText(
    isExpanded ? '打开导航菜单' : '关闭导航菜单',
    isExpanded ? 'Open navigation menu' : 'Close navigation menu'
  ));
  navigation.classList.toggle('is-open', !isExpanded);
});

navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', languageText('打开导航菜单', 'Open navigation menu'));
    navigation.classList.remove('is-open');
  }
});

const filterButtons = document.querySelectorAll('.filter-chip');
const experienceCards = document.querySelectorAll('.experience-card');
const filterCount = document.querySelector('.filter-count');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;
    filterButtons.forEach((item) => {
      const active = item === button;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-pressed', String(active));
    });
    experienceCards.forEach((card) => {
      const visible = filter === 'all' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterCount.textContent = languageText(`${visibleCount} 个体验入口`, `${visibleCount} experience ${visibleCount === 1 ? 'path' : 'paths'}`);
  });
});
const initialExperienceCount = Array.from(experienceCards).filter((card) => !card.hidden).length;
filterCount.textContent = languageText(
  `${initialExperienceCount} 个体验入口`,
  `${initialExperienceCount} experience ${initialExperienceCount === 1 ? 'path' : 'paths'}`
);

const categoryButtons = document.querySelectorAll('.category-button');
const activeCategory = document.querySelector('#active-category');
const productGrid = document.querySelector('#product-grid');
const productCount = document.querySelector('#product-count');
const productEmpty = document.querySelector('#product-empty');

const products = [
  { title: '棕榈半身裙', price: 180, image: 'palm-skirt.jpg', type: 'product', tags: ['扎染'], categories: ['扎染'] },
  { title: '梦幻半身裙', description: '采用纯天然植物染料', price: 250, image: 'fantasy-skirt.jpg', type: 'product', tags: ['蓝染', '扎染'], categories: ['扎染'] },
  { title: '手持包', price: 20, image: 'hand-bag.jpg', type: 'product', tags: ['扎染', '蓝染'], categories: [] },
  { title: '鼻烟', price: 200, image: 'snuff-bottle.jpg', type: 'product', tags: ['藏族文化'], categories: ['饰品'] },
  { title: '复古鼻烟', price: 200, image: 'classic-snuff-bottle.jpg', type: 'product', tags: ['饰品'], categories: [] },
  { title: '藏式鼻烟', price: 150, image: 'decorative-snuff-bottle.jpg', type: 'product', tags: ['饰品'], categories: [] },
  { title: '蓝染手套', description: '纯手工制作', price: 8, image: 'dyed-gloves.jpg', type: 'product', tags: ['蓝染'], categories: ['扎染'] },
  { title: '笔记本', price: 20, image: 'notebook.jpg', type: 'product', tags: ['扎染'], categories: [] },
  { title: '扎染香包', description: '采用植物染', price: 20, image: 'sachet.jpg', type: 'product', tags: ['扎染'], categories: ['扎染'] },
  { title: '淡黄纯棉衬衫', price: 220, image: 'cotton-shirt.jpg', type: 'product', tags: ['扎染'], categories: [] },
  { title: '皮影戏人物制作', description: '猪皮与纯天然颜料', price: 30, image: 'shadow-puppet-material.jpg', type: 'craft', tags: ['皮影戏'], categories: [] },
  { title: '蓝黄扎染衬衫', price: 90, image: 'blue-yellow-shirt.jpg', type: 'product', tags: ['扎染'], categories: [] },
  { title: '粉蓝扎染包', price: 21, image: 'pastel-tie-dye-bag.jpg', type: 'product', tags: ['扎染'], categories: [] }
];
const productEnglish = {
  '棕榈半身裙': 'Palm-fiber skirt',
  '梦幻半身裙': 'Dream skirt',
  '手持包': 'Handheld bag',
  '鼻烟': 'Snuff bottle',
  '复古鼻烟': 'Vintage snuff bottle',
  '藏式鼻烟': 'Tibetan-style snuff bottle',
  '蓝染手套': 'Indigo-dyed gloves',
  '笔记本': 'Notebook',
  '扎染香包': 'Tie-dye sachet',
  '淡黄纯棉衬衫': 'Pale yellow cotton shirt',
  '皮影戏人物制作': 'Shadow-puppet figure making kit',
  '蓝黄扎染衬衫': 'Blue-and-yellow tie-dye shirt',
  '粉蓝扎染包': 'Pastel blue tie-dye bag',
  '采用纯天然植物染料': 'Made with natural plant dyes',
  '纯手工制作': 'Handcrafted',
  '采用植物染': 'Plant-dyed',
  '小程序商品列表中的现有商品': 'A product currently listed in the mini program',
  '扎染': 'Tie-dye',
  '蓝染': 'Indigo dye',
  '藏族文化': 'Tibetan culture',
  '饰品': 'Accessories',
  '皮影戏': 'Shadow puppetry'
};
const categoryEnglish = {
  all: 'All products',
  spice: 'Spices',
  music: 'Instruments',
  dye: 'Tie-dye',
  accessories: 'Accessories',
  clothing: 'Clothing',
  tea: 'Tea'
};

const categoryMatches = {
  all: () => true,
  spice: (product) => product.categories.includes('香料') || product.tags.includes('香料'),
  music: (product) => product.categories.includes('乐器') || product.tags.includes('乐器'),
  dye: (product) => ['扎染', '蓝染'].some((tag) => product.categories.includes(tag) || product.tags.includes(tag)),
  accessories: (product) => ['饰品', '藏族文化'].some((tag) => product.categories.includes(tag) || product.tags.includes(tag)),
  clothing: (product) => /半身裙|衬衫|服装|民族服饰/.test(product.title) || product.categories.some((tag) => ['衣物', '服装', '民族服饰'].includes(tag)),
  tea: (product) => product.categories.includes('茶叶') || product.tags.includes('茶叶') || product.title.includes('茶叶')
};

categoryButtons.forEach((button) => {
  const count = products.filter(categoryMatches[button.dataset.category]).length;
  button.querySelector('span').textContent = String(count).padStart(2, '0');
});

function renderProducts(category) {
  const matches = products.filter(categoryMatches[category]);
  activeCategory.textContent = window.siteLanguage?.isEnglish ? categoryEnglish[category] : Array.from(categoryButtons).find((button) => button.dataset.category === category).dataset.categoryName;
  productCount.textContent = languageText(`${matches.length} 件商品`, `${matches.length} ${matches.length === 1 ? 'item' : 'items'}`);
  productEmpty.hidden = matches.length > 0;
  productGrid.hidden = matches.length === 0;
  productGrid.innerHTML = matches.map((product) => `
    <article class="product-card">
      <div class="product-card-image">
        <img src="assets/${product.image}" alt="${window.siteLanguage?.isEnglish ? productEnglish[product.title] || product.title : product.title}" loading="lazy">
        <span>${languageText(product.type === 'craft' ? '原材料' : '成品', product.type === 'craft' ? 'Material' : 'Finished item')}</span>
      </div>
      <div class="product-card-copy">
        <h4>${window.siteLanguage?.isEnglish ? productEnglish[product.title] || product.title : product.title}</h4>
        <p>${window.siteLanguage?.isEnglish ? productEnglish[product.description] || 'A product currently listed in the mini program' : product.description || '小程序商品列表中的现有商品'}</p>
        <div class="product-tags">${[...product.categories, ...product.tags].filter((tag, index, list) => list.indexOf(tag) === index).map((tag) => `<span>${window.siteLanguage?.isEnglish ? productEnglish[tag] || tag : tag}</span>`).join('')}</div>
        <strong>¥ ${Number(product.price).toFixed(2)}</strong>
      </div>
    </article>
  `).join('');
}

categoryButtons.forEach((button) => {
  button.addEventListener('click', () => {
    categoryButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-selected', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    renderProducts(button.dataset.category);
  });
});

document.querySelector('.show-all-products').addEventListener('click', () => {
  document.querySelector('[data-category="all"]').click();
});

renderProducts('all');

const guideTabs = document.querySelectorAll('.guide-tab');
const guidePanels = document.querySelectorAll('.guide-panel');

function showGuide(panelName, focusTab = false) {
  guideTabs.forEach((tab) => {
    const selected = tab.dataset.panel === panelName;
    tab.classList.toggle('is-current', selected);
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  });
  guidePanels.forEach((panel) => {
    const selected = panel.id === `panel-${panelName}`;
    panel.hidden = !selected;
    panel.classList.toggle('is-current', selected);
  });
}

guideTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => showGuide(tab.dataset.panel));
  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? guideTabs.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + guideTabs.length) % guideTabs.length;
    showGuide(guideTabs[nextIndex].dataset.panel, true);
  });
});

showGuide('explore');

const demoViews = {
  home: {
    image: 'screen-home.jpg',
    alt: '小程序首页实机截图，包含地图入口',
    caption: '首页地图 · 实机页面',
    title: '从首页地图进入内容',
    description: '首页的云南地图由 9 块拼图组成；小程序点击拼图会打开对应的视频详情。点击下方按钮模拟进入演示视频。',
    action: '打开示例视频',
    step: '步骤 1 / 3',
    en: {
      alt: 'Mini program home screen with the Yunnan map entry',
      caption: 'Home map · Real app screen',
      title: 'Start from the home map',
      description: 'The mini program home screen features a nine-piece map. Selecting a tile opens its video detail. Use the button below to preview the demo flow.',
      action: 'Open demo video',
      step: 'Step 1 / 3'
    }
  },
  video: {
    image: 'screen-video.jpg',
    alt: '小程序皮影戏视频详情实机截图，显示动手试试入口',
    caption: '视频详情 · 皮影戏实机页面',
    title: '看完视频，继续动手体验',
    description: '视频详情页展示技艺影像，并提供“动手试试”入口。演示截图中的内容是皮影戏。',
    action: '动手试试 · 查看原材料',
    step: '步骤 2 / 3',
    en: {
      alt: 'Mini program shadow-puppet video detail screen with a Try it entry',
      caption: 'Video story · Shadow puppetry',
      title: 'Watch the story, then try the craft',
      description: 'The video detail page introduces a craft and offers a “Try it” entry. This screen shows the shadow-puppet example.',
      action: 'Try it · Explore materials',
      step: 'Step 2 / 3'
    }
  },
  materials: {
    image: 'screen-materials.jpg',
    alt: '小程序非遗原材料页面实机截图，显示皮影戏人物制作订购数量弹窗',
    caption: '原材料 · 订购数量弹窗实机画面',
    title: '在原材料页查看相关商品',
    description: '视频页的体验入口会进入原材料列表。截图展示了“皮影戏人物制作”商品及数量填写弹窗；真实下单还需登录、收货地址和可用服务。',
    action: '模拟填写订购数量',
    step: '步骤 3 / 3',
    en: {
      alt: 'Mini program materials page with a quantity dialog for a shadow-puppet making kit',
      caption: 'Materials · Quantity dialog',
      title: 'Explore the related materials',
      description: 'The video experience leads to a materials list. The screenshot shows a shadow-puppet making kit and quantity dialog. A real order requires sign-in, a delivery address and a live service.',
      action: 'Preview quantity entry',
      step: 'Step 3 / 3'
    }
  },
  shop: {
    image: 'screen-shop.jpg',
    alt: '小程序非遗工坊实机截图，显示分类入口、商品和底部导航',
    caption: '非遗工坊 · 商品浏览实机页面',
    title: '按分类浏览文创商品',
    description: '工坊展示成品、文化分类与商品信息。下方网页的分类筛选可查看现有静态商品样本，不会发起购买。',
    action: '浏览网页商品分类',
    step: '独立页面',
    en: {
      alt: 'Mini program heritage shop with product categories and goods',
      caption: 'Heritage shop · Product browsing',
      title: 'Browse handmade goods by category',
      description: 'The shop presents finished goods, cultural categories and product details. The filters below use a static sample and do not place orders.',
      action: 'Browse product categories',
      step: 'Standalone screen'
    }
  },
  activity: {
    image: 'activity-list.jpg',
    alt: '小程序活动列表实机截图，展示活动信息、相关商品和报名入口',
    caption: '活动列表 · 实机页面',
    title: '查看活动并了解报名路径',
    description: '活动卡片展示名称、介绍、地点、联系电话、商家编号与报名状态，也可查看相关商品。报名需在小程序中登录并填写信息。',
    action: '查看活动使用步骤',
    step: '独立页面',
    en: {
      alt: 'Mini program event list with event details and registration',
      caption: 'Events · Real app screen',
      title: 'Find an event and learn how to join',
      description: 'Event cards show titles, descriptions, locations, contact details, merchant codes and registration status. Sign in to register in the mini program.',
      action: 'View event guide',
      step: 'Standalone screen'
    }
  },
  rank: {
    image: 'screen-rank.jpg',
    alt: '小程序排行榜早期实机截图，皮影戏演示热度为 40',
    caption: '排行榜 · 实机页面（旧演示值）',
    title: '从互动数据看文化关注度',
    description: '早期实机截图中的皮影戏热度为 40；网页下方另展示当前本地数据库快照。小程序排行榜由商品销量、视频浏览与活动报名数据聚合。',
    action: '查看热度数据拆解',
    step: '独立页面',
    en: {
      alt: 'Earlier mini program popularity ranking screen; shadow puppetry score shown as 40',
      caption: 'Popularity · Earlier demo data',
      title: 'See how people engage with heritage',
      description: 'The earlier screenshot shows a shadow-puppetry score of 40. The chart below is a separate local database snapshot. Scores combine product orders, video views and event registrations.',
      action: 'Explore the score breakdown',
      step: 'Standalone screen'
    }
  }
};

const demoScreen = document.querySelector('#demo-screen');
const demoCaption = document.querySelector('#demo-screen-caption');
const demoTitle = document.querySelector('#demo-step-title');
const demoDescription = document.querySelector('#demo-step-description');
const demoPanel = document.querySelector('#demo-panel');
const demoAction = document.querySelector('#demo-action');
const demoCount = document.querySelector('#demo-step-count');
const demoFeedback = document.querySelector('#demo-feedback');
const demoTabs = Array.from(document.querySelectorAll('.demo-tabs [role="tab"]'));
const demoPreviews = Array.from(document.querySelectorAll('.demo-gallery-card'));
const orderDialog = document.querySelector('#order-demo-dialog');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function scrollToSection(selector) {
  document.querySelector(selector).scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
}

function setDemoMode(mode, focusTab = false) {
  const sourceView = demoViews[mode];
  const view = window.siteLanguage?.isEnglish ? { ...sourceView, ...sourceView.en } : sourceView;
  if (!view) return;
  demoScreen.src = `assets/${view.image}`;
  demoScreen.alt = view.alt;
  demoCaption.textContent = view.caption;
  demoTitle.textContent = view.title;
  demoDescription.textContent = view.description;
  demoAction.innerHTML = `${view.action} <span aria-hidden="true">↗</span>`;
  demoCount.textContent = view.step;
  demoPanel.setAttribute('aria-labelledby', `demo-tab-${mode}`);
  demoTabs.forEach((tab) => {
    const selected = tab.dataset.demoMode === mode;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    if (selected && focusTab) tab.focus();
  });
  demoPreviews.forEach((preview) => {
    preview.setAttribute('aria-pressed', String(preview.dataset.demoPreview === mode));
  });
}

setDemoMode('home');

demoTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    setDemoMode(tab.dataset.demoMode);
    demoFeedback.textContent = tab.dataset.demoMode === 'rank'
      ? languageText('排行榜实机截图为旧演示值（皮影戏 40）；下方图表展示本地数据库快照。', 'The ranking screenshot shows earlier demo data (shadow puppetry: 40); the chart below uses a local database snapshot.')
      : languageText(`已切换至${tab.textContent.trim()}实机页面截图。`, `Switched to the ${tab.textContent.trim()} screen.`);
  });

  tab.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const nextIndex = event.key === 'Home' ? 0
      : event.key === 'End' ? demoTabs.length - 1
      : (index + (event.key === 'ArrowRight' ? 1 : -1) + demoTabs.length) % demoTabs.length;
    setDemoMode(demoTabs[nextIndex].dataset.demoMode, true);
  });
});

demoPreviews.forEach((preview) => {
  preview.addEventListener('click', () => setDemoMode(preview.dataset.demoPreview));
});

demoAction.addEventListener('click', () => {
  const mode = demoTabs.find((tab) => tab.getAttribute('aria-selected') === 'true').dataset.demoMode;
  if (mode === 'home') {
    setDemoMode('video');
    demoFeedback.textContent = languageText('已模拟从地图拼图进入视频详情。', 'Previewing the transition from a map tile to the video detail screen.');
  } else if (mode === 'video') {
    setDemoMode('materials');
    demoFeedback.textContent = languageText('已模拟点击“动手试试”，进入原材料页。', 'Previewing “Try it” and the related materials page.');
  } else if (mode === 'materials') {
    orderDialog.showModal();
  } else if (mode === 'shop') {
    scrollToSection('#categories');
  } else if (mode === 'activity') {
    showGuide('activity');
    scrollToSection('#guide');
  } else if (mode === 'rank') {
    scrollToSection('#rank');
  }
});

document.querySelector('#order-demo-cancel').addEventListener('click', () => orderDialog.close());
document.querySelector('#order-demo-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const quantity = document.querySelector('#demo-quantity').value;
  orderDialog.close();
  demoFeedback.textContent = languageText(
    `已演示填写 ${quantity} 件。未创建订单；实际下单需在小程序中登录并补充收货地址。`,
    `Previewed a quantity of ${quantity}. No order was created; a real order requires signing in and adding a delivery address in the mini program.`
  );
});

const mapTiles = Array.from(document.querySelectorAll('.map-tile'));
const mapVideoDialog = document.querySelector('#map-video-dialog');
const mapVideoRegion = document.querySelector('#map-video-region');
const mapSelection = document.querySelector('.map-selection');
const mapVideoOpen = document.querySelector('#map-video-open');
let activeMapTile = null;

mapTiles.forEach((tile) => {
  tile.addEventListener('click', () => {
    activeMapTile = tile;
    mapVideoRegion.textContent = languageText(`地图区域 ${tile.dataset.mapVideo} · 内容预览`, `Map area ${tile.dataset.mapVideo} · Preview`);
    mapSelection.textContent = languageText(`已打开地图区域 ${tile.dataset.mapVideo} 的视频预览。`, `Video preview opened for map area ${tile.dataset.mapVideo}.`);
    mapVideoDialog.showModal();
  });
});

function closeMapVideoDialog() {
  mapVideoDialog.close();
  activeMapTile?.focus();
}

document.querySelector('#map-video-close').addEventListener('click', closeMapVideoDialog);
document.querySelector('#map-video-dismiss').addEventListener('click', closeMapVideoDialog);
mapVideoDialog.addEventListener('click', (event) => {
  if (event.target === mapVideoDialog) closeMapVideoDialog();
});
mapVideoOpen.addEventListener('click', () => {
  mapVideoDialog.close();
  setDemoMode('video');
  demoFeedback.textContent = languageText('已从地图预览进入皮影戏视频详情静态演示。', 'Opened the static shadow-puppetry video detail demo from the map preview.');
  scrollToSection('#demo');
});

window.addEventListener('site-language-change', () => {
  const visibleCount = Array.from(experienceCards).filter((card) => !card.hidden).length;
  filterCount.textContent = languageText(`${visibleCount} 个体验入口`, `${visibleCount} experience ${visibleCount === 1 ? 'path' : 'paths'}`);
  categoryButtons.forEach((button) => {
    if (window.siteLanguage.isEnglish) button.dataset.categoryName = categoryEnglish[button.dataset.category];
    else button.dataset.categoryName = button.textContent.trim().replace(/\s+\d+$/, '');
  });
  renderProducts(document.querySelector('.category-button.is-selected')?.dataset.category || 'all');
  const selectedDemo = demoTabs.find((tab) => tab.getAttribute('aria-selected') === 'true')?.dataset.demoMode || 'home';
  setDemoMode(selectedDemo);
  if (activeMapTile) {
    const regionNumber = activeMapTile.dataset.mapVideo;
    mapVideoRegion.textContent = languageText(`地图区域 ${regionNumber} · 内容预览`, `Map area ${regionNumber} · Preview`);
    mapSelection.textContent = languageText(`已打开地图区域 ${regionNumber} 的视频预览。`, `Video preview opened for map area ${regionNumber}.`);
  }
});

document.querySelectorAll('[data-guide]').forEach((link) => {
  link.addEventListener('click', () => {
    const section = link.dataset.guide;
    const panel = section === 'shop' ? 'shop' : section === 'activity' ? 'activity' : 'explore';
    showGuide(panel);
  });
});

const adminTabs = document.querySelectorAll('.admin-tab');
const adminPanels = document.querySelectorAll('.admin-panel');

adminTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    adminTabs.forEach((item) => {
      const selected = item === tab;
      item.classList.toggle('is-current', selected);
      item.setAttribute('aria-selected', String(selected));
      item.tabIndex = selected ? 0 : -1;
    });
    adminPanels.forEach((panel) => {
      const selected = panel.id === `panel-admin-${tab.dataset.adminPanel}`;
      panel.hidden = !selected;
    });
  });
});

if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.js-reveal').forEach((element) => observer.observe(element));
} else {
  document.querySelectorAll('.js-reveal').forEach((element) => element.classList.add('is-visible'));
}

document.documentElement.classList.add('has-motion');
