const host = process.env.REACT_APP_HOST;
const path = '/sale';
const basePath = host + path;

export default class SaleApi {
    static getAllSales(query) {
        return new Promise((resolve, reject) => {
            let url = host + path + '?';
            url += 'size=' + query.pageSize;
            url += '&page=' + (query.page);
            url += '&sort=client.name,' + (query.orderDirection ? query.orderDirection : "asc");
            url += '&client.name=' + (query.search);
            fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    } else {
                        throw new Error('Something went wrong');
                    }
                }).then(result => {
                resolve({
                    data: result.content,
                    page: result.number,
                    totalCount: result.totalElements,
                })
            }).catch(() => reject())
        });
    }

    static getSaleById(id) {
        const url = basePath + '/' + id;
        return fetch(url).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('Something went wrong');
            }
        }).catch(error => {
            throw error;
        });
    }

    static saveSale(sale) {
        return fetch(basePath, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong');
                }
            })
            .catch((error) => {
                throw error;
            });
    }

    static remove(sale) {
        return fetch(basePath, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sale),
        }).then((response) => {
            if (response.ok) {
                return response.ok;
            } else {
                throw new Error('Something went wrong');
            }
        })
            .catch((error) => {
                throw error;
            });
    }
}