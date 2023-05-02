(() => {
    const cx = io();

    cx.emit('getProducts', {
        limit: 10,
        page: 1
    });

    cx.on('listProducts', (data) => {

        const products = JSON.parse(data);

        const container = document.getElementById('productsContainer');
        const containerClon = container.cloneNode();


        products.map(parseProduct).forEach(elem => containerClon.appendChild(elem));

        container.replaceWith(containerClon);
    });

    cx.on('productDeleted', () => cx.emit('getProducts', {
        limit: 10,
        page: 1
    }));

    cx.on('productCreated', () => cx.emit('getProducts', {
        limit: 10,
        page: 1
    }));

    cx.on('error', async (data) => {
        console.error(JSON.parse(await data));
    });

    document.getElementById('createProductForm').addEventListener('submit', event => {
        event.preventDefault();


        const form = document.forms.createProductForm;

        const data = new FormData(form);

        const request = {
            title: data.get('title'),
            description: data.get('description'),
            code: data.get('code'),
            price: Number.parseFloat(data.get('price')),
            stock: Number.parseInt(data.get('stock')),
            category: data.get('category'),
            thumbnails: form.getAttribute('data-photos')?.split('|') || null
        };

        try {

            cx.emit('createProduct', JSON.stringify(request));
        }
        catch (error) {
            console.error(error);
        }
        finally {

            form.reset();
            form.getAttribute('data-photos', []);

            form.querySelector('#list-photos-added').innerHTML = '';
        }
    });

    document.getElementById('addNewThumbBtn').addEventListener('click', (event) => {
        const photoPath = prompt('Ingrese la ruta de la foto a agregar');

        const form = document.getElementById('createProductForm');

        let photos = form.getAttribute('data-photos')?.split('|') || [];
        photos.push(photoPath);
        form.setAttribute('data-photos', photos.join('|'));

        const photoListItem = document.createElement('li');
        photoListItem.innerText = photoPath;
        photoListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

        const photoListItemDeleteButton = document.createElement('button');
        photoListItemDeleteButton.classList.add('btn-close');

        photoListItemDeleteButton.addEventListener('click', (event) => {

            let photos = form.getAttribute('data-photos')?.split('|');

            photos = photos.filter(photo => photo != photoPath);

            form.setAttribute('data-photos', photos.join('|'));

            event.target.parentElement?.remove();
        });

        photoListItem.appendChild(photoListItemDeleteButton);

        document.getElementById('list-photos-added').appendChild(photoListItem);
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
        btnContainer.classList.add('d-flex', 'justify-content-center', 'my-2');
        const btnDelete = document.createElement('button');
        btnDelete.innerText = "borrar";
        btnDelete.classList.add('btn', 'btn-danger');

        btnDelete.addEventListener('click', () => {
            cx.emit('deleteProduct', product.id);
        });

        btnContainer.appendChild(btnDelete);

        parsedProduct.appendChild(btnContainer);

        return parsedProduct;
    };

})();