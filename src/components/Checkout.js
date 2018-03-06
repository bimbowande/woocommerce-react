import React from 'react'
import css from '../../styles/vars'
import { withCheckout } from '../hoc'
import { bindToThis, pullInt } from '../constants'
import { Button, ButtonPane, Section, Sectionizr, View } from '.'

export default class Checkout extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            form: {
                'map.searchbox.update': props.location
            }
        }
        
        // bind
        bindToThis(this, 'actionHandler')
    }
    getShippingMethods() {
        this.actionHandler('get.shipping.methods');
    }
    actionHandler(type, data) {
        switch (type) {
            case 'map.searchbox.update':
                this.props.actionHandler(type, data)
            case 'checkout.clientname':
            case 'checkout.email':
            case 'checkout.phone':
                let {form} = this.state
                form[type] = data.value
                this.setState({ form })
                break;
            case 'checkout.pay':
            case 'checkout.finish':
                const test = !data['map.searchbox.update'] || !data['checkout.clientname'] || !data['checkout.email'] || !data['checkout.phone']
                if (test) alert("We need all these details to process your order")
                else this.props.actionHandler(type, data)
                break;
            case 'shipping.method':
                let spl = data.options[data.selectedIndex].text.split(':')
                this.actionHandler('set.shipping.cost', pullInt(spl[spl.length - 1]))
                break;
            default:
                console.log('Default', type)
                this.props.actionHandler(type, data)
                break;
        }
    }
    confirmLocationView() {
        let {props} = this
        return (
            <Section>
                <div className="ConfirmLocation">
                    <div className="wrapper">
                        <div className="group">
                            <label className="label">Confirm your address</label>
                            <input className="field" type="text" defaultValue={props.location} onChange={e => this.actionHandler('map.searchbox.update', e.target)} placeholder="Where are you located?" />
                        </div>
                        <div className="group">
                            <label className="label">Your name</label>
                            <input className="field" type="text" defaultValue="Test Ignore" onChange={e => this.actionHandler('checkout.clientname', e.target)} placeholder="Put your name here" />
                        </div>
                        <div className="group">
                            <label className="label">Email address</label>
                            <input className="field" type="email" defaultValue="test@igno.re" onChange={e => this.actionHandler('checkout.email', e.target)} placeholder="Enter your active email address" />
                        </div>
                        <div className="group">
                            <label className="label">Phone</label>
                            <input className="field" type="text" defaultValue="09090909090" onChange={e => this.actionHandler('checkout.phone', e.target)} placeholder="Phone number goes here" />
                        </div>
                        <div className="group">
                            <label className="label">Shipping preference</label>
                            <select name="shipping_method[0]" data-index="0" id="shipping_method_0" className="field" onChange={e => this.actionHandler('shipping.method', e.target)}>
                                <option value="">Select Shipping Method</option>
                                <option value="flat_rate:22">Airport road - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:46">Ajah - 2hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:35">Amuwo-odofin - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:20">Anthony - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:48">Alausa - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:23">Ajao Estate - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:30">Apapa - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:37">Festac town - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:29">Gbagada - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:45">Igbo efon (6th roundabout) - VGC 1hr30mins: ₦800.00</option>
                                <option value="flat_rate:31">Ijora - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:44">Ikate (3rd roundabout) - Agungi 1hr-1hr 15mins: ₦600.00</option>
                                <option value="flat_rate:21">Ikeja - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:42">Ikoyi - 45mins-1hr delivery time: ₦400.00</option>
                                <option value="flat_rate:25">Ilupeju - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:39">Isolo - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:43">Lekki phase 1 - Marua (2nd roundabout) 45mins - 1hr: ₦400.00</option>
                                <option value="flat_rate:27">Magodo - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:41">Marina &amp; Lagos island - 45mins - 1hr 15mins delivery time: ₦400.00</option>
                                <option value="flat_rate:24">Mafoluku - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:19">Maryland - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:33">Ogba - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:28">Ojodu - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:32">Ogudu - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:26">Ojota - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:18">Ojuelegba - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:34">Omole - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:36">Okota - 3hrs delivery time: ₦1,200.00</option>
                                <option value="flat_rate:47">Oregun - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:17">Surulere - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:38">Satellite town - 3hrs delivery: ₦1,200.00</option>
                                <option value="flat_rate:40">Victoria island - 45mins-1hr delivery time: ₦400.00</option>
                                <option value="flat_rate:16">Yaba - 3hrs delivery time: ₦800.00</option>
                                <option value="flat_rate:51">Store Pick Up (20 Minutes)</option>
                            </select>
                            
                        </div>
                        <div className="clearfix"></div>
                        <ButtonPane>
                            <Button label="Pay Online" clickHandler={e => {this.actionHandler('checkout.pay', this.state.form)}} />
                            &emsp;
                            <Button label="Pay On Delivery" clickHandler={e => {this.actionHandler('checkout.finish', this.state.form)}} />
                        </ButtonPane>
                    </div>
                </div>

                {/* styles */}
                <style jsx>{`
                    .ConfirmLocation {
                        // background: ${css.colors.rogueblue};
                        height: 100%;
                        overflow: auto;
                        // color: ${css.colors.ultrawhite};
                        padding: 1rem 2px;
                        display: flex;
                    }
                    .wrapper {
                        width: 100%;
                    }
                    .title {
                        font-weight: 100;
                        border-bottom: solid thin #fff
                        max-width: 360px;
                    }
                    .group {
                        margin-bottom: 1rem;
                    }
                    @media(min-width: 601px) {
                        .group {
                            width: calc(50% - 5px);
                            float: left;
                        }
                        .group:nth-child(even) {
                            float: right;
                        }
                    }
                    .label {
                        display: block;
                        margin-bottom: .3rem;
                        color: ${css.colors.fallleaf};
                    }
                    .field {
                        display: block;
                        box-sizing: border-box;
                        border: 1px solid ${css.colors.wisteriasnow};
                        width: 100%;
                        padding: .5rem 1rem;
                        border-radius: 3px;
                        // box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
                        font-size: 14px;
                        outline: none;
                        font-family: 'Playfair Display', sans-serif;
                        background-color: white;
                    }
                    select.field {
                        appearance: none;
                    }
                    ::placeholder {
                        color: rgba(0, 0, 0, 0.3);
                        font-family: 'Source Sans Pro', sans-serif;
                    }
                `}</style>
            </Section>
        )
    }
    render() {
        return withCheckout(
            <Sectionizr className="Checkout">
                {this.confirmLocationView()}
                <Section />

                {/* styles */}
                <style jsx>{`
                    .Checkout {
                        background: ${css.colors.rogueblue}
                    }
                `}</style>
            </Sectionizr>,
            {
                page_title: 'SmoothieExpress: Checkout',
                section_name: 'checkout',
                section_header: 'Checkout',
                actionHandler: this.actionHandler,
            }
        )
    }
}