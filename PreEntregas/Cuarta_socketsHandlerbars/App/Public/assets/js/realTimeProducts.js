(() => {
    const cx = io();

    cx.emit('getProducts');

    cx.on('sendProducts', (data) => {

        const products = JSON.parse(data);

        const container = document.getElementById('productsContainer');
        const containerClon = container.cloneNode();


        products.map(parseProduct).forEach(elem => containerClon.appendChild(elem));

        container.replaceWith(containerClon);
    });

    cx.on('productDeleted', () => {
        cx.emit('getProducts');
    });

    const parseProduct = (product) => {
        const parsedProduct = document.createElement('article');
        parsedProduct.classList.add('card', 'shadow', 'border', 'border-dark', 'm-2', 'rounded');

        if (product.thumbnails.length) {
            const img = document.createElement('img');
            img.src = product.thumbnails[0];
            img.alt = product.description;
            img.classList.add('card-img-top');

            parsedProduct.appendChild(img);
        }

        const productTitle = document.createElement('h4');
        productTitle.innerText = product.title;
        productTitle.classList.add('card-title', 'fw-semibold', 'fs-6', 'p-2');

        parsedProduct.appendChild(productTitle);

        const productDescription = document.createElement('p');
        productDescription.innerText = product.description;
        productDescription.classList.add('card-text', 'p-2');

        parsedProduct.appendChild(productDescription);

        const priceContainer = document.createElement('div');
        priceContainer.classList.add('d-block', 'align-self-end', 'p-2', 'text-black');

        const price = document.createElement('p');
        price.innerText = product.price;

        priceContainer.appendChild(price);

        parsedProduct.appendChild(priceContainer);

        const btnContainer = document.createElement('div');
        btnContainer.classList.add('d-flex','justify-content-center','my-2')
        const btnDelete = document.createElement('button');
        btnDelete.innerText = "borrar";
        btnDelete.classList.add('btn', 'btn-danger');

        btnDelete.addEventListener('click',() => {
            cx.emit('deleteProduct',product.id)
        });

        btnContainer.appendChild(btnDelete);

        parsedProduct.appendChild(btnContainer);

        return parsedProduct;
    }

})();