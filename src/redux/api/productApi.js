const host = process.env.REACT_APP_HOST;
const path = '/product';
const basePath = host+path;

export default class ProductApi {
    static getAllProducts(query) {
        return new Promise((resolve, reject) => {
            let url = host+path+'?';
            url += 'size=' + query.pageSize;
            url += '&page=' + (query.page);
            url += '&sort=name,' + (query.orderDirection ? query.orderDirection : "asc");
            url += '&name=' + (query.search);
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    resolve({
                        data: result.content,
                        page: result.number,
                        totalCount: result.totalElements,
                    })
                })
        })
    }

    static getProductById(id) {
        const url = basePath +'/' + id;
        return fetch(url).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }

    static saveProduct(product) {
        return fetch(basePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    static remove(product) {
        return fetch(basePath, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product),
        })
            .catch((error) => {
                console.error('Error:', error);
            });
    }
}