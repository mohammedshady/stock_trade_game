import './styles/StockHistory.css'; // Import the CSS file for styling
import ibmLogo from'../../../imgs/ibmImg.png'
import msftLogo from'../../../imgs/msftImg.png'
import jpmLogo from'../../../imgs/metaImg.png'
import metaLogo from'../../../imgs/jpmImg.png'
import tslaLogo from'../../../imgs/teslaImg.png'
import ChartExample from './ChartExample';

import chart from "chart.js"

const StockHistory = ({ priceHistory,img }) => {
    return(
    <div className='main-stock-price-container'>
    <div className='stock-history-background-graph'>
        <ChartExample/>
    </div>
    <div className='stock-ph-info'>
        
        <p className='stock-ph-Title'>MSFT</p>
        <p className='stock-ph-name'>Microsoft Inc</p>
        <p className='stock-ph-desc'></p>
    </div>
    <div className='tock-ph-img'>
        <img src={msftLogo}
        />

    </div>
    </div>
    )
  };
  export default StockHistory;



  