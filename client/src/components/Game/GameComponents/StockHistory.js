import './styles/StockHistory.css'; // Import the CSS file for styling

const StockHistory = ({ priceHistory,img }) => {
    return(
    <div className='main-stock-price-container'>
    <div className='stock-ph-info'>
        <p className='stock-ph-Title'>MSFT</p>
        <p className='stock-ph-name'>Microsoft Inc</p>
        <p className='stock-ph-desc'></p>
    </div>
    <div className='tock-ph-img'>
        <img/>
    </div>
    </div>
    )

  };
  export default StockHistory;