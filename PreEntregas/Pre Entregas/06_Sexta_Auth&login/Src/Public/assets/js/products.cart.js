window.addEventListener('load', async (event) => {
    //FIXME: CAMBIAR EL ID CART A COOKIE HTTP o manejarlo del lado del back con un id de usuario relacionado a un idcart
    const url = window.location.href.split('/');
    await getCart(url[url.length - 1]);
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

function getRows(products) {
    return products.map(product => {
        const row = document.createElement('tr');

        row.classList.add('border-bottom');
        const { title, price, code } = product.productID;

        row.appendChild(createTableCell(title));
        row.appendChild(createTableCell(code, ['text-center']));
        row.appendChild(createTableCell(textToCurrency(price), ['text-center']));
        row.appendChild(createTableCell(product.quantity, ['text-center']));

        const rowActioncontainer = document.createElement('td');
        rowActioncontainer.classList.add('bg-dark', 'bg-opacity-25', 'd-flex', 'justify-content-center', 'border-0');

        const btnAddToCart = document.createElement('button');
        btnAddToCart.innerText = "Eliminar del carrito";
        btnAddToCart.classList.add('btn', 'btn-danger');


        rowActioncontainer.appendChild(btnAddToCart);
        row.appendChild(rowActioncontainer);

        return row;
    });
}


async function getCart(idCart) {
    try {
        const httpResult = await fetch(`/api/carts/${idCart}`, {
            method: 'GET'
        });

        if (httpResult.status === 200) {
            const result = await httpResult.json();

            const tableBodyRows = getRows(result);

            const tbody = document.createElement('tbody');
            tbody.id = "products-table-body";

            tableBodyRows.forEach(elem => tbody.appendChild(elem));

            const tableBody = document.getElementById('cart-table-body');
            tableBody.replaceWith(tbody);

            const total = result.reduce((acumulador, product) => acumulador + (product.productID.price * product.quantity), 0);

            document.getElementById('totalPrice').innerText = textToCurrency(total);

        }
        else {
            alert('Carrito no valido');
        }
    }
    catch (error) {
        console.error(error);
    }
}