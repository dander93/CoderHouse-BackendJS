const form = document.getElementById('formProductos');
const limitSelect = document.getElementById('select-limit');
const orderSelect = document.getElementById('select-order')


window.addEventListener("load", async (event) => {
    window.dataLayer = window.dataLayer || {}
    window.dataLayer.currentPage = 1
    await getPage();
})

form.addEventListener('submit', async (event) => {
    event.preventDefault()
    await getPage();
});

function createTableCell(text) {
    const td = document.createElement('td');
    td.appendChild(document.createTextNode(text))
    return td;
}

function setNextPageBtn(result) {
    if (result.hasNextPage) {
        const nextBtn = document.getElementById('next-page-btn');
        nextBtn.classList.remove('disabled');
        nextBtn.classList.add('btn-outline-warning');
        nextBtn.onclick = () => {
            window.dataLayer.currentPage = result.page + 1;
            getPage(result.page + 1);
        }
    }
    else {
        const nextBtn = document.getElementById('next-page-btn');
        nextBtn.classList.add('disabled');
        nextBtn.classList.remove('btn-outline-warning');
        nextBtn.onclick = null;
    }
}

function setPrevPageBtn(result) {
    if (result.hasPrevPage) {
        const prevBtn = document.getElementById('prev-page-btn');
        prevBtn.classList.remove('disabled')
        prevBtn.classList.add('btn-outline-warning')
        prevBtn.onclick = () => {
            window.dataLayer.currentPage = Number.parseInt(result.page) - 1;
            getPage(Number.parseInt(result.page) - 1)
        };
    }
    else {
        const prevBtn = document.getElementById('prev-page-btn');
        prevBtn.classList.add('disabled');
        prevBtn.classList.remove('btn-outline-warning');
        prevBtn.onclick = null;
    }
}

function getRows(products) {
    return products.map(product => {
        const row = document.createElement('tr');

        row.appendChild(createTableCell(product.id));
        row.appendChild(createTableCell(product.title));
        row.appendChild(createTableCell(product.description));
        row.appendChild(createTableCell(product.price));
        row.appendChild(createTableCell(product.stock));
        row.appendChild(createTableCell(product.code));
        row.appendChild(createTableCell(product.category));
        row.appendChild(createTableCell(product.status));

        const rowActioncontainer = document.createElement('td');
        rowActioncontainer.classList.add('bg-dark','bg-opacity-50','d-flex','justify-content-center')

        const btnAddToCart = document.createElement('button');
        btnAddToCart.innerText = "Agregar al carrito";
        btnAddToCart.classList.add('btn', 'btn-outline-warning');
        
        rowActioncontainer.appendChild(btnAddToCart);
        row.appendChild(rowActioncontainer);

        return row;
    });
}

const getPage = async (page) => {
    try {
        const httpResult = await fetch(`/api/products?limit=${limitSelect.value}&sort=${orderSelect.value}&page=${page || window.dataLayer.currentPage}`,
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
        console.error(error)
    }
}