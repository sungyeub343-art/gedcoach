const regionGrid = document.getElementById('regionGrid');
const regionSearch = document.getElementById('regionSearch');

function createCsatDistrictUrl(regionName, districtName) {
  return `detail.html?region=${encodeURIComponent(regionName)}&district=${encodeURIComponent(districtName)}`;
}

function renderRegions(keyword = '') {
  const normalizedKeyword = keyword.trim().toLowerCase();
  const filteredRegions = regionData.map((region) => ({
    ...region,
    districts: region.districts.filter((district) => `${region.name} ${district}`.toLowerCase().includes(normalizedKeyword))
  })).filter((region) => region.name.toLowerCase().includes(normalizedKeyword) || region.districts.length);

  regionGrid.innerHTML = filteredRegions.length ? filteredRegions.map((region) => `
    <article class="region-card">
      <h3>${region.name}</h3>
      <div class="district-list">
        ${region.districts.map((district) => `<a class="district-link" href="${createCsatDistrictUrl(region.name, district)}">${district} 수능 과외</a>`).join('')}
      </div>
    </article>
  `).join('') : '<p>검색한 지역의 수능 과외 안내가 준비 중입니다. 무료 상담으로 문의해주세요.</p>';
}

renderRegions();
regionSearch.addEventListener('input', (event) => renderRegions(event.target.value));
