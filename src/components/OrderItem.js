import css from '../../styles/vars'
import {moneyFormat} from '../constants'

export default ({item, clickHandler}) => <div className="OrderItem flex">
    <div className="img" />
    <div className="info">
        <h3 className="title font-sourcesans">{item.product.name}</h3>
        <p className="text font-playfair">{`\u20A6`}{moneyFormat(item.product.price)} per unit</p>
    </div>
    <div className="action">
        <div><strong>Qty:</strong></div>
        <input type="number" value={item.qty} />
    </div>

    {/* styles */}
    <style jsx>{`
        .OrderItem {
            color: ${css.colors.rogueblue};
            margin-bottom: 1rem;
            position: relative;
        }
        .OrderItem + .OrderItem > .info::before {
            position: absolute;
            width: 100%;
            height: 1px;
            background: ${css.colors.orchidash};
            top: -.5rem;
            content: '';
        }
        .img {
            width: 48px;
            height: 48px;
            background: url(${item.product.images.length? item.product.images[0].src:''}) center no-repeat;
            background-size: cover;
            background-color: ${css.colors.wisteriasnow};
        }
        .info {
            padding-left: .5rem;
            flex-grow: 1;
        }
        .title {
            margin: 0
        }
        .text {
            margin-top: 2px;
        }
    `}</style>
</div>