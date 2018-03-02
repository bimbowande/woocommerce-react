import Wc from './WooCommerce/Wc'

export default {
    products: [
        {id: 1, name: 'Product #1', images: [], price: 100},
        {id: 2, name: 'Product #2', images: [], price: 800},
        {id: 3, name: 'Product #4', images: [], price: 300},
        {id: 4, name: 'Product #5', images: [], price: 450},
        {id: 5, name: 'Product #3', images: [], price: 703.56},
        {id: 6, name: 'Product #6', images: [], price: 800},
        {id: 7, name: 'Product #7', images: [], price: 200},
        {id: 8, name: 'Product #8', images: [], price: 400},
    ]
}

export const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))

export const kformat = num => (
    num > 999999? (num/1000).toFixed(1) + 'M' : (
        num > 999? (num/1000).toFixed(1) + 'k' : num
    )
)

export const isEmpty = o => {
    switch (typeof o) {
        case 'object':
            return Object.keys(o).length == 0
            break;
    }
}

export const moneyFormat = amt => amt.toLocaleString('en-US')

export const bindToThis = (dis, prop) => dis[prop] = dis[prop].bind(dis)

export const ORDER_API_SUCCESS = 'order.api.success'
export const ORDER_API_ERROR = 'order.api.error'

export const ORDER_ITEM_UPDATE = 'order.item.update'

export const API_CALLS = {
    async fetchProducts(per_page, page) {
        return await Wc.get('products', { per_page, page })
    },
    async createOrder(options) {
        return {statue: 'OK'}
        // return await Wc.post('products', options)
    },
}