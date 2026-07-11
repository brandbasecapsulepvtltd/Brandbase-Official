/**
 * Curated professional images per service category.
 * Prefer ImageKit brand assets where available; Unsplash/Pexels for stock.
 */

const unsplash = (id, w = 2070) =>
  `https://images.unsplash.com/photo-${id}?q=80&w=${w}&auto=format&fit=crop`;

const CATEGORY_IMAGE_POOLS = {
  'events-exhibition': [
    'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
    'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/Brandbase%20capsule%20stall%20(1).jpg',
    'https://ik.imagekit.io/vinayak06/ServiceSlider/fabrication.jpg',
    'https://ik.imagekit.io/vinayak06/ServiceSlider/onsite.jpg',
    'https://ik.imagekit.io/vinayak06/ServiceSlider/Branding.jpg',
    'https://ik.imagekit.io/vinayak06/stalls/Indian%20Exhibition/5.JPG',
    unsplash('1511578314322-379afb476865'),
    unsplash('1492684223066-81342ee5ff30'),
    unsplash('1511795409834-ef04bbd61622'),
    unsplash('1505373877841-8d25f7d46678'),
    unsplash('1470225620780-dba8ba36b745'),
  ],
  'exhibition-management': null, // alias below
  'event-management': null,
  'digital-marketing': [
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/SEOOptimize_no_bg_ta5un9b9.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/onlineAds_no_bg_3tj3n4nc.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/SMMarketing_no_bg_vk4ljl7g.png',
    unsplash('1460925895917-afdab827c52f'),
    unsplash('1551288049-bebda4e38f71'),
    unsplash('1611224923853-80b023f02d71'),
    unsplash('1611605698335-8b1569810432'),
    unsplash('1556742049-0cfed4f6a45d'),
    unsplash('1545235617-9465d2a55698'),
    unsplash('1563986768609-322da13575f3'),
    unsplash('1557836722-72c6f4e6d561'),
    unsplash('1552664730-d307ca884978'),
  ],
  'website-development': [
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/Business-removebg-preview.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/portfolioWeb-removebg-preview.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/LandingPage-removebg-preview.png',
    unsplash('1498050108023-c5249f4df085'),
    unsplash('1519389950473-47ba0277781c'),
    unsplash('1555066931-4365d14ba8a4'),
    unsplash('1486312338219-ce68d2c6f44d'),
    unsplash('1507679799987-c73779587ccf'),
    unsplash('1556761175-b413da4baf72'),
    unsplash('1558494949-ef010cbd8e17'),
    unsplash('1547658719-da2b51169166'),
    unsplash('1497215728101-856f4ea42174'),
  ],
  'av-production': [
    'https://ik.imagekit.io/vinayak06/Services/videoProd-removebg-preview.png',
    'https://images.pexels.com/photos/8412361/pexels-photo-8412361.jpeg',
    'https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg',
    'https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg',
    unsplash('1478720568477-152d9b325146'),
    unsplash('1516035069371-29a1b244cc32'),
    unsplash('1574717024650-61fd2cf4d44d'),
    unsplash('1598488035139-bdbb2231c04c'),
    unsplash('1492691527719-9d1e07e534b4'),
    unsplash('1516280440614-6697288d5d38'),
  ],
  'branding-design': [
    unsplash('1561070791-2526d30994b5'),
    unsplash('1626785774573-4b799315344d'),
    unsplash('1558651716-085f4e8ef752'),
    unsplash('1559028012-481c04fa702d'),
    unsplash('1542744094-24638d0b66df'),
    unsplash('1558655146-d09347e92766'),
    unsplash('1559136555-9303baea8ebd'),
  ],
  'mobile-app-development': [
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/iosapp_no_bg_n6osaiz9.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/androidapp_no_bg_cn94efzd.png',
    'https://ik.imagekit.io/vinayak06/Mavnox/BrandBase/cross-platform_no_bg_yzuz5eei.png',
    unsplash('1512941937669-90a1b58e7e9c'),
    unsplash('1511707171634-5f897ff02aa9'),
    unsplash('1551650975-87deedd944c3'),
    unsplash('1555774698-0c69cdfee959'),
    unsplash('1550745165-9bc0b252726f'),
  ],
  default: [
    'https://ik.imagekit.io/vinayak06/stalls/BlogsImages/exhibition.jpg',
    unsplash('1522071820081-009f0129c71c'),
    unsplash('1542744173-8e7e53415bb0'),
    unsplash('1556761175-b413da4baf72'),
  ],
};

CATEGORY_IMAGE_POOLS['exhibition-management'] = CATEGORY_IMAGE_POOLS['events-exhibition'];
CATEGORY_IMAGE_POOLS['event-management'] = CATEGORY_IMAGE_POOLS['events-exhibition'];

/** Jet engine / generic industrial placeholders — always replace */
const BANNED_IMAGE_IDS = [
  'photo-1497366216548',
  'photo-1558618666',
  'photo-1497366754035',
  'photo-1540575467063',
  'photo-1540575861501',
];

function hashString(str) {
  let h = 0;
  for (let i = 0; i < str.length; i += 1) {
    h = (h * 31 + str.charCodeAt(i)) >>> 0;
  }
  return h;
}

function getPool(category) {
  return CATEGORY_IMAGE_POOLS[category] || CATEGORY_IMAGE_POOLS.default;
}

function isBannedUrl(url) {
  if (!url || typeof url !== 'string') return true;
  return BANNED_IMAGE_IDS.some((id) => url.includes(id));
}

/**
 * Pick a unique image from the category pool for a given slot.
 */
function pickCategoryImage(category, slug, slotKey, usedOnPage = new Set()) {
  const pool = getPool(category);
  const start = hashString(`${category}:${slug}:${slotKey}`) % pool.length;

  for (let i = 0; i < pool.length; i += 1) {
    const candidate = pool[(start + i) % pool.length];
    if (isBannedUrl(candidate) || usedOnPage.has(candidate)) continue;
    usedOnPage.add(candidate);
    return candidate;
  }

  return pool[start];
}

module.exports = {
  CATEGORY_IMAGE_POOLS,
  BANNED_IMAGE_IDS,
  getPool,
  isBannedUrl,
  pickCategoryImage,
  hashString,
};
