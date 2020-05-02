const host = process.env.REACT_APP_HOST;
const path = '/balance';
const basePath = host + path;

export default class BalanceApi {

    static getBalance(date, end) {
        date = new Date(date).toLocaleDateString("pt-BR");
        date = date.split("/")[2] + '-' + date.split("/")[1] + '-' + date.split("/")[0];

        end = new Date(end).toLocaleDateString("pt-BR");
        end = end.split("/")[2] + '-' + end.split("/")[1] + '-' + end.split("/")[0];
        const url = basePath + '?start=' + date + '&end=' + end;
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
}