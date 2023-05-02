const form = document.getElementById('formProductos');
const limitSelect = document.getElementById('select-limit');
const orderSelect = document.getElementById('select-order');
const categorySelect = document.getElementById('categorys-select');

window.addEventListener("load", async (event) => {
    window.dataLayer = window.dataLayer || {};
    window.dataLayer.currentPage = 1;
    await getPage();
});

form.addEventListener('submit', async (event) => {
    event.preventDefault();
    await getPage();
});

function createTableCell(text, classList) {
    const td = document.createElement('td');
    td.classList.add('border-0');
    if (classList) {
        classList.forEach(elem => td.classList.add(elem));
    }
    td.appendChild(document.createTextNode(text));
    return td;
}

function setNextPageBtn(result) {
    if (result.hasNextPage) {
        const nextBtn = document.getElementById('next-page-btn');
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('btn-warning');
        nextBtn.onclick = () => {
            window.dataLayer.currentPage = result.page + 1;
            getPage(result.page + 1);
        };
    }
    else {
        const nextBtn = document.getElementById('next-page-btn');
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('btn-warning');
        nextBtn.onclick = null;
    }
}

function setPrevPageBtn(result) {
    if (result.hasPrevPage) {
        const prevBtn = document.getElementById('prev-page-btn');
        prevBtn.classList.remove('disabled');
        prevBtn.classList.add('btn-warning');
        prevBtn.onclick = () => {
            window.dataLayer.currentPage = Number.parseInt(result.page) - 1;
            getPage(Number.parseInt(result.page) - 1);
        };
    }
    else {
        const prevBtn = document.getElementById('prev-page-btn');
        prevBtn.classList.add('disabled');
        prevBtn.classList.remove('btn-warning');
        prevBtn.onclick = null;
    }
}

function getRows(products) {
    return products.map(product => {
        const row = document.createElement('tr');

        row.classList.add('border-bottom');

        const { id, title, description, price, stock, code, category, status } = product;

        row.appendChild(createTableCell(id));
        row.appendChild(createTableCell(title, ['text-center']));
        row.appendChild(createTableCell(description, ['text-center']));
        row.appendChild(createTableCell(textToCurrency(price), ['text-center']));
        row.appendChild(createTableCell(stock, ['text-center']));
        row.appendChild(createTableCell(code, ['text-center']));
        row.appendChild(createTableCell(category, ['text-center']));
        row.appendChild(createTableCell(status ? 'Activo' : 'Inactivo', ['text-center']));

        const rowActioncontainer = document.createElement('td');
        rowActioncontainer.classList.add('bg-dark', 'bg-opacity-25', 'd-flex', 'justify-content-center', 'border-0');

        const btnAddToCart = document.createElement('button');
        btnAddToCart.innerText = "Agregar al carrito";
        btnAddToCart.classList.add('btn', 'btn-warning');


        rowActioncontainer.appendChild(btnAddToCart);
        row.appendChild(rowActioncontainer);

        return row;
    });
}

function getPageUrl({ limit, sort, page, status, category }) {

    const baseURl = '/api/products';
    const params = new URLSearchParams();

    if (limit) {
        params.set('limit', limit);
    }

    if (sort) {
        params.set('sort', sort);
    }

    if (page) {
        params.set('page', page);
    }

    if (status) {
        params.set('status', status);
    }

    if (category) {
        params.set('category', category);
    }

    return `${baseURl}?${params.toString()}`;
};

function getStatusSelected() {
    const radioSelected = [...document.getElementsByName('product-state')].filter(radio => radio.checked)[0];

    return radioSelected.value;
}


async function getPage(page) {
    try {

        const getPageUrlOptions = {
            limit: limitSelect.value,
            sort: orderSelect.value,
            page: page || window.dataLayer.currentPage,
            status: getStatusSelected(),
            category: categorySelect.value === 'TODAS' ? undefined : categorySelect.value
        };

        console.log(getPageUrl(getPageUrlOptions));

        const httpResult = await fetch(getPageUrl(getPageUrlOptions),
            // const httpResult = await fetch(`/api/products?limit=${limitSelect.value}&sort=${orderSelect.value}&page=${page || window.dataLayer.currentPage}`,
            {
                method: 'GET',
            });

        const result = await httpResult.json();
        const bodyRows = getRows(result.payload);

        const tbody = document.createElement('tbody');
        tbody.id = "products-table-body";

        bodyRows.forEach(elem => tbody.appendChild(elem));

        const tableBody = document.getElementById('products-table-body');
        tableBody.replaceWith(tbody);

        document.getElementById('pages').innerText = `${result.page}/${result.totalPages}`;

        setNextPageBtn(result);
        setPrevPageBtn(result);
    }
    catch (error) {
        console.error(error);
    }
}
