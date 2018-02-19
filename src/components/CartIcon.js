import css from '../../styles/vars'

export default ({clickHandler, visible, total}) => (
    <div className="CartIcon" onClick={clickHandler}>
        <div className="wrapper">
            <div className="icon"></div>
            {total? <div className="price"><strong>{total}</strong></div>:null}
        </div>
        <div className="frame"></div>
        {/* style */}
        <style jsx>{`
            @keyframes snap-in {
                0% { visibility: visible; transform: scale(0) }
                90% { transform: scale(1.2) }
                93% { transform: scale(0.9) } 
                98% { transform: scale(1.1) }
                100% { visibility: visible; transform: scale(1) }
            }
            .CartIcon {
                width: 64px;
                height: 64px;
                filter: drop-shadow(0px 8px 10px rgba(66,68,73,.3));
                position: fixed;
                bottom: 1.5rem;
                right: 1.5rem;
                z-index: 99;
                visibility: collapse;
                animation: snap-in .35s ease-in-out; 
                animation-fill-mode: both;
                cursor: pointer;
                overflow: hidden;
                border-radius: 100%;
            }
            .wrapper {
                height: 100%;
                transition: margin-top .25s ease-out;
            }
            .CartIcon:hover .wrapper {
                margin-top: ${total? '-100%':0};
            }
            .icon, .price {
                height: 100%;
                background: white;
            }
            .icon {
                background: url('/static/img/cart.png') center no-repeat;
                background-size: 50%;
                background-color: ${css.colors.fallleaf};
            }
            .price {
                background-color: teal;
                color: white;
                font-size: larger;
                text-align: center;
                line-height: 64px;
            }
            .frame {
                height: calc(100% + 4px);
                width: calc(100% + 4px);
                border: 7px ${css.colors.ultrawhite} solid;
                // box-sizing: content-box;
                position: absolute;
                top: -2px;
                left: -2px;
                border-radius: 100%;
            }
        `}</style>
    </div>
)