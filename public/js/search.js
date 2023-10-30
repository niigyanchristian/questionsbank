
// // Searching through Items
// const searchInput = document.getElementById('searchInput');
//         const pascos = document.querySelectorAll('[data-search]');
        
//         searchInput.addEventListener('input', () => {
//           const searchTerm = searchInput.value.toLowerCase();
          
//           pascos.forEach((pasco) => {
//             const searchValue = pasco.getAttribute('data-search').toLowerCase();
//             const containsSearchTerm = searchValue.includes(searchTerm);
            
//             pasco.style.display = containsSearchTerm ? 'block' : 'none';
//           });
//         });

function handleSearch() {
  const searchInput = document.getElementById('searchInput');
  const pascos = document.querySelectorAll('[data-search]');

  const searchTerm = searchInput.value.toLowerCase();

  pascos.forEach((pasco) => {
    const searchValue = pasco.getAttribute('data-search').toLowerCase();
    const containsSearchTerm = searchValue.includes(searchTerm);

    pasco.style.display = containsSearchTerm ? 'block' : 'none';
  });
}

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    handleSearch();
    const section = document.getElementById('loads');
  section.scrollIntoView({ behavior: 'smooth' });
  }
}

function handleInput() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput.value === '') {
    handleSearch();
  }
}

const searchInput = document.getElementById('searchInput');
const searchIcon = document.getElementById('searchIcon');

searchInput.addEventListener('keypress', handleKeyPress);
searchIcon.addEventListener('click', handleSearch);
searchInput.addEventListener('input', handleInput);