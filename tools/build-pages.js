// Prerenders every regional detail page to static HTML so search engines (especially Naver,
// which does not run JavaScript) can read the title, description, canonical and content.
// Usage: node tools/build-pages.js
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const SITE_URL = 'https://gedcoach.kr';
const SERVICES = {
  cities: { ogImage: `${SITE_URL}/images/ged-guide-og.jpg`, linkSuffix: '' },
  csat: { ogImage: `${SITE_URL}/images/tutoring-guide-og.jpg`, linkSuffix: ' 수능 과외' },
  'school-record': { ogImage: `${SITE_URL}/images/tutoring-guide-og.jpg`, linkSuffix: ' 내신 과외' }
};
const LASTMOD = new Date().toISOString().slice(0, 10);

const read = (file) => fs.readFileSync(path.join(ROOT, file), 'utf8');
const sharedSource = ['cities/neighborhoods.js', 'cities/data.js', 'cities/local-seo.js'].map(read).join('\n;\n');

function escapeAttribute(value) {
  return String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
}

function createRenderer(service) {
  const elements = {};
  const document = {
    title: '',
    getElementById(id) {
      elements[id] = elements[id] || { content: '', href: '', textContent: '', innerHTML: '' };
      return elements[id];
    }
  };
  const context = vm.createContext({ document, window: { location: { search: '' } }, URLSearchParams, encodeURIComponent });
  vm.runInContext(`${sharedSource}\n;globalThis.__render = function () {\n${read(`${service}/detail.js`)}\n};\nglobalThis.__data = { regionData, getNeighborhoods, createDistrictUrl, createNeighborhoodUrl };`, context);

  return {
    data: context.__data,
    render(regionName, districtName, neighborhoodName) {
      for (const key of Object.keys(elements)) delete elements[key];
      document.title = '';
      const params = new URLSearchParams({ region: regionName, district: districtName });
      if (neighborhoodName) params.set('dong', neighborhoodName);
      context.window.location.search = `?${params}`;
      context.__render();
      if (elements.pageRobots && elements.pageRobots.content.includes('noindex')) {
        throw new Error(`Not found: ${service} ${regionName} ${districtName} ${neighborhoodName || ''}`);
      }
      return {
        title: document.title,
        description: elements.pageDescription.content,
        canonical: elements.pageCanonical.href,
        jsonLd: elements.pageJsonLd.textContent,
        content: elements.detailContent.innerHTML
      };
    }
  };
}

function fillTemplate(template, values) {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    if (key === 'content') return values.content;
    if (key === 'jsonLd') return values.jsonLd.replace(/</g, '\\u003c');
    return escapeAttribute(values[key]);
  });
}

function renderRegionGrid(service, data) {
  const suffix = SERVICES[service].linkSuffix;
  return data.regionData.map((region) => `
    <article class="region-card">
      <h3>${region.name}</h3>
      <div class="district-list">
        ${region.districts.map((district) => `<a class="district-link" href="${data.createDistrictUrl(region.name, district)}">${district}${suffix}</a>`).join('')}
      </div>
    </article>
  `).join('');
}

function writeSitemap(file, urls) {
  const body = urls.map((url) => `  <url><loc>${url}</loc><lastmod>${LASTMOD}</lastmod></url>`).join('\n');
  fs.writeFileSync(path.join(ROOT, file), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`);
}

const sitemapFiles = ['sitemap-main.xml', 'sitemap-info.xml'];
writeSitemap('sitemap-main.xml', [`${SITE_URL}/`, `${SITE_URL}/cities/`, `${SITE_URL}/csat/`, `${SITE_URL}/school-record/`]);
// sitemap-info.xml is written by tools/build-info-pages.js.

for (const service of Object.keys(SERVICES)) {
  const renderer = createRenderer(service);
  const { regionData, getNeighborhoods } = renderer.data;
  const template = read(`tools/templates/${service}.html`);
  const serviceDir = path.join(ROOT, service);

  // Remove previously generated region folders so renamed areas do not linger.
  for (const region of regionData) fs.rmSync(path.join(serviceDir, region.name.replace(/\s+/g, '-')), { recursive: true, force: true });

  const urls = [];
  for (const region of regionData) {
    for (const district of region.districts) {
      for (const neighborhood of [null, ...getNeighborhoods(region.name, district)]) {
        const page = renderer.render(region.name, district, neighborhood);
        const segments = [region.name, district, neighborhood].filter(Boolean).map((name) => name.replace(/\s+/g, '-'));
        const outputDir = path.join(serviceDir, ...segments);
        fs.mkdirSync(outputDir, { recursive: true });
        fs.writeFileSync(path.join(outputDir, 'index.html'), fillTemplate(template, { ...page, ogImage: SERVICES[service].ogImage }));
        urls.push(page.canonical);
      }
    }
  }

  const hubPath = path.join(serviceDir, 'index.html');
  const hub = fs.readFileSync(hubPath, 'utf8');
  const updatedHub = hub.replace(/(<div id="regionGrid" class="region-grid">)[\s\S]*?(<\/div><\/div><\/section>)/, `$1${renderRegionGrid(service, renderer.data)}$2`);
  if (updatedHub === hub && !hub.includes('class="region-card"')) throw new Error(`regionGrid not found in ${service}/index.html`);
  fs.writeFileSync(hubPath, updatedHub);

  writeSitemap(`sitemap-${service}.xml`, urls);
  sitemapFiles.push(`sitemap-${service}.xml`);
  console.log(`${service}: ${urls.length} pages`);
}

fs.writeFileSync(path.join(ROOT, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapFiles.map((file) => `  <sitemap><loc>${SITE_URL}/${file}</loc><lastmod>${LASTMOD}</lastmod></sitemap>`).join('\n')}\n</sitemapindex>\n`);
