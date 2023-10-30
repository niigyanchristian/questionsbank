const searchInput = document.getElementById('searchInput');
        const pascos = document.querySelectorAll('[data-search]');
        
        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase();
          
          pascos.forEach((pasco) => {
            const searchValue = pasco.getAttribute('data-search').toLowerCase();
            const containsSearchTerm = searchValue.includes(searchTerm);
            
            pasco.style.display = containsSearchTerm ? 'flex' : 'none';
          });
        });