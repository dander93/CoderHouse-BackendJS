const form = document.getElementById('formProductos');
const limitSelect = document.getElementById('select-limit');
const orderSelect = document.getElementById('select-order')

document.addEventListener('load',function(event){
    getPage(1)
})

form.addEventListener('submit', (event) => {
    event.preventDefault()


});


const getPage = (page) => {

    fetch(`/api/products?limit=${limitSelect.value}&order=${orderSelect.value}&page=${page}`,
        {
            method: 'GET',
        })
        .then(response => response.json())
        .then(result => {

            const bodyTrs = result.payload.map(product => {
                const row = document.createElement('tr');

                const tdID = document.createElement('td');
                tdID.innerText = product.id;
                row.appendChild(tdID);

                const tdTitle = document.createElement('td');
                tdTitle.innerText = product.title;
                row.appendChild(tdTitle);

                const tdDescription = document.createElement('td');
                tdDescription.innerText = product.description;
                row.appendChild(tdDescription);

                const tdPrice = document.createElement('td');
                tdPrice.innerText = product.price;
                row.appendChild(tdPrice);

                const tdStock = document.createElement('td');
                tdStock.innerText = product.stock;
                row.appendChild(tdStock);

                const tdCode = document.createElement('td')
                tdCode.innerText = product.code;
                row.appendChild(tdCode);

                const tdCategory = document.createElement('td')
                tdCategory.innerText = product.category
                row.appendChild(tdCategory);

                const tdStatus = document.createElement('td')
                tdStatus.innerText = product.status
                row.appendChild(tdStatus);

                const rowActioncontainer = document.createElement('td');

                const btnAddToCart = document.createElement('button');
                btnAddToCart.innerText = "Agregar al carrito";
                btnAddToCart.classList.add('btn')
                btnAddToCart.classList.add('btn-outline-warning')

                rowActioncontainer.appendChild(btnAddToCart);

                row.appendChild(rowActioncontainer)

                return row;
            });

            const tbody = document.createElement('tbody');
            tbody.id = "products-table-body";

            bodyTrs.forEach(elem => tbody.appendChild(elem));

            const tableBody = document.getElementById('products-table-body');
            tableBody.replaceWith(tbody);

            console.log(result)

            document.getElementById('pages').innerText = `${result.page}/${result.totalPages}`;

            if (result.hasNextPage) {
                const nextBtn = document.getElementById('next-page-btn');
                nextBtn.classList.remove('disabled');
                nextBtn.click = getPage(result.page + 1)
            }

            if (result.hasPrevPage) {
                const prevBtn = document.getElementById('prev-page-btn');
                prevBtn.classList.remove('disabled')
                prevBtn.click = getPage(result.page - 1)
            }

        })
        .catch(console.error)
}