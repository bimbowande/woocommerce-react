import flux from 'flux-react'
import actions from '../actions'
import constants, {isEmpty, API_CALLS, ORDER_API_ERROR, ORDER_API_SUCCESS, ORDER_ITEM_UPDATE, ORDER_SHIPPING_COST} from '../constants'

export default flux.createStore({
    orders: {},
    customer: {},
    shipping_methods: [],
    shipping_method: {},
    shipping_cost: '0.00',
    actions: [
        actions.addToCart,
        actions.removeFromCart,
        actions.deleteOrder,
        actions.updateQty,
        actions.checkout,
        actions.getShippingMethods,
        actions.setShippingMethod,
    ],
    addToCart: function(item) {
        if (!!this.orders[item.id]) this.orders[item.id].qty++
        else this.orders[item.id] = { product: item, qty: 1 }
        this.emit('order.add', {id: ORDER_ITEM_UPDATE, item_id: item.id})
    },
    removeFromCart: function(item) {
        if (!!this.orders[item.id]) {
            if (this.orders[item.id].qty == 1) delete this.orders[item.id]
            else this.orders[item.id].qty-- 
            this.emit('order.remove', {id: ORDER_ITEM_UPDATE, item_id: item.id})
        }
    },
    deleteOrder: function(id) {
        delete this.orders[id]
        this.emit('order.delete', {id: ORDER_ITEM_UPDATE, item_id: id}) // products depend on this is to update their state
    },
    updateQty: function(id, qty) {
        if (this.orders[id]) {
            this.orders[id].qty = qty
            this.emit('order.qty', {id: ORDER_ITEM_UPDATE, item_id: id})
        }
    },
    getLineItems() {
        const line_items = []
        for (let o in this.orders) {
            line_items.push({
                product_id: o,
                quantity: this.orders[o].qty
            })
        }
        return line_items;
    },
    checkout: async function(cust_data, isPaid = false) {
        this.customer = { ...this.customer, ...cust_data }
        const {customer} = this
        const [first_name, last_name] = customer['checkout.clientname'].split(' ', 2)
        const billing = {
            first_name,
            last_name: last_name || '',
            email: customer['checkout.email'],
            phone: customer['checkout.phone'],
            state: 'LOS',
            city: 'Lagos',
            country: 'NG',
        }
        const pl = {
            payment_method_title: isPaid? 'Paystack Online Payment':'Cash on delivery',
            payment_method: 'bacs',
            // payment_method_title: 'Direct Bank Transfer',
            set_paid: false,
            billing: {...billing},
            shipping: {...billing},
            line_items: this.getLineItems(),
            shipping_lines: [
                {
                method_id: this.shipping_method.method,
                method_title: this.shipping_method.desc,
                }
            ]
        }
        console.log(pl)
        const payload = {...constants.sample_order, line_items: this.getLineItems()}
        try {
            const response = await API_CALLS.createOrder(payload)
            console.log(response)
            this.emit('order.api-response', {id: ORDER_API_SUCCESS, response, isPaid})
        } catch (ex) {
            this.emit('order.api-error', {id: ORDER_API_ERROR, ex})
        }
    },
    getShippingMethods: async function() {
        try {
            const response = await API_CALLS.getShippingMethods()
            this.shipping_methods = []
            response.map(method => this.shipping_methods.push({
                method: method.id,
                desc: method.description
            }))
            // this.emit('shipping.methods-arrive')
        } catch (x) {}
    },
    setShippingMethod: function(data) {
        this.shipping_method = data
        this.shipping_cost = data.cost
        this.emit('order.shipping_cost', {id: ORDER_SHIPPING_COST, cost: data.cost})
    },
    persist: function() {

    },
    exports: {
        getQty: function(id) {
            return !!this.orders[id]? this.orders[id].qty:0
        },
        isEmpty: function() {
            return isEmpty(this.orders)
        },
        getTotal: function(order_total = false) {
            let total = 0
            isEmpty(this.orders)? 0:Object.keys(this.orders).map((o) => {
                total += (this.orders[o].qty * this.orders[o].product.price)
            })
            return total + (!order_total? +this.shipping_cost:0);
        },
        getAllOrders: function() {
            return Object.values(this.orders)
        },
        getShippingMethods: function() {
            return this.shipping_methods
        },
        getShippingCost: function() {
            return this.shipping_cost
        }
    }
})