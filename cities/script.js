const regionGrid = document.getElementById('regionGrid');
const regionSearch = document.getElementById('regionSearch');
const districtCount = document.getElementById('districtCount');

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
        ${region.districts.map((district) => `<a class="district-link" href="${createDistrictUrl(region.name, district)}">${district}</a>`).join('')}
      </div>
    </article>
  `).join('') : '<p>검색한 지역의 안내가 준비 중입니다. 무료 상담으로 문의해주세요.</p>';
}

districtCount.textContent = `${getDistrictCount()}개`;
renderRegions();
regionSearch.addEventListener('input', (event) => renderRegions(event.target.value));
