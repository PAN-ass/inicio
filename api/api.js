// Pokedax: lógica para lista paginada, búsqueda y modal de detalles (vanilla JS)
const API_BASE = 'https://pokeapi.co/api/v2';
const LIMIT = 20;

// DOM
const grid = document.getElementById('grid');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageInfo = document.getElementById('pageInfo');
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resetBtn = document.getElementById('resetBtn');

// Modal elements
const modalBackdrop = document.getElementById('modalBackdrop');
const closeModal = document.getElementById('closeModal');
const modalName = document.getElementById('modalName');
const modalImg = document.getElementById('modalImg');
const modalId = document.getElementById('modalId');
const modalTypes = document.getElementById('modalTypes');
const modalAbilities = document.getElementById('modalAbilities');
const modalStats = document.getElementById('modalStats');
const modalHeight = document.getElementById('modalHeight');
const modalWeight = document.getElementById('modalWeight');
const modalExp = document.getElementById('modalExp');

let offset = 0;
let totalCount = 0;

async function fetchPokemonList(offset = 0) {
    const res = await fetch(`${API_BASE}/pokemon?limit=${LIMIT}&offset=${offset}`);
    if (!res.ok) throw new Error('Error fetching list');
    return res.json();
}

async function fetchPokemonDetails(urlOrName) {
    const url = typeof urlOrName === 'string' && urlOrName.includes('https://') ? urlOrName : `${API_BASE}/pokemon/${urlOrName}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('No encontrado');
    return res.json();
}

async function renderPage() {
    grid.innerHTML = 'Cargando...';
    try {
        const data = await fetchPokemonList(offset);
        totalCount = data.count;
        pageInfo.textContent = `Mostrando ${Math.floor(offset / LIMIT) + 1} / ${Math.ceil(totalCount / LIMIT)} (total ${totalCount})`;

        // Obtener detalles de cada pokemon en paralelo
        const details = await Promise.all(data.results.map(r => fetchPokemonDetails(r.url).catch(() => null)));
        renderGrid(details.filter(Boolean));

        // actualizar botones
        prevBtn.disabled = offset === 0;
        nextBtn.disabled = offset + LIMIT >= totalCount;
    } catch (err) {
        grid.innerHTML = '<p>Error al cargar pokémones.</p>';
        console.error(err);
    }
}

function getImageFromSprites(sprites) {
    return (sprites && (sprites.other?.['official-artwork']?.front_default || sprites.front_default)) || '';
}

function renderGrid(pokemons) {
    if (!pokemons || pokemons.length === 0) {
        grid.innerHTML = '<p>No se encontraron pokémones.</p>';
        return;
    }
    grid.innerHTML = '';
    pokemons.forEach(p => {
        const card = document.createElement('div');
        card.className = 'card';
        card.setAttribute('data-name', p.name);

        const img = document.createElement('img');
        img.src = getImageFromSprites(p.sprites) || '';
        img.alt = p.name;

        const name = document.createElement('div');
        name.className = 'name';
        name.textContent = p.name;

        card.appendChild(img);
        card.appendChild(name);

        card.addEventListener('click', () => showDetails(p));
        grid.appendChild(card);
    });
}

function showDetails(pokemon) {
    modalBackdrop.style.display = 'flex';
    modalBackdrop.setAttribute('aria-hidden', 'false');
    modalName.textContent = pokemon.name;
    modalImg.src = getImageFromSprites(pokemon.sprites) || '';
    modalImg.alt = pokemon.name;
    modalId.textContent = `#${pokemon.id} — ${pokemon.species?.name || ''}`;

    modalTypes.innerHTML = '';
    pokemon.types.forEach(t => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = t.type.name;
        modalTypes.appendChild(span);
    });

    modalAbilities.innerHTML = '';
    pokemon.abilities.forEach(a => {
        const span = document.createElement('span');
        span.className = 'chip';
        span.textContent = a.ability.name + (a.is_hidden ? ' (oculta)' : '');
        modalAbilities.appendChild(span);
    });

    modalStats.innerHTML = '';
    pokemon.stats.forEach(s => {
        const div = document.createElement('div');
        div.textContent = `${s.stat.name}: ${s.base_stat}`;
        modalStats.appendChild(div);
    });

    modalHeight.textContent = `Altura: ${pokemon.height}`;
    modalWeight.textContent = `Peso: ${pokemon.weight}`;
    modalExp.textContent = `Exp base: ${pokemon.base_experience}`;
}

function hideModal() {
    modalBackdrop.style.display = 'none';
    modalBackdrop.setAttribute('aria-hidden', 'true');
}

// Eventos
prevBtn.addEventListener('click', () => {
    if (offset === 0) return;
    offset = Math.max(0, offset - LIMIT);
    renderPage();
});

nextBtn.addEventListener('click', () => {
    if (offset + LIMIT >= totalCount) return;
    offset += LIMIT;
    renderPage();
});

searchBtn.addEventListener('click', async () => {
    const q = searchInput.value.trim();
    if (!q) return renderPage();
    grid.innerHTML = 'Buscando...';
    try {
        const p = await fetchPokemonDetails(q.toLowerCase());
        renderGrid([p]);
        // hide pagination while showing single result
        pageInfo.textContent = 'Resultado de búsqueda';
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } catch (err) {
        grid.innerHTML = `<p>Pokémon "${q}" no encontrado.</p>`;
    }
});

resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    offset = 0;
    renderPage();
});

// Enter key on search
searchInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') searchBtn.click(); });

closeModal.addEventListener('click', hideModal);
modalBackdrop.addEventListener('click', (e) => { if (e.target === modalBackdrop) hideModal(); });

// Inicializar
renderPage();




