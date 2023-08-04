import './styles/StockHistory.css'; // Import the CSS file for styling
import ChartExample from './ChartExample';

import chart from "chart.js"

const StockHistory = ({ company,img,name,prices }) => {
    return(
    <div className='main-stock-price-container'>
    <div className='stock-history-background-graph'>{}
        <ChartExample prices={prices}/>
    </div>
    <div className='stock-ph-info'>
        
        <p className='stock-ph-Title'>{company}</p>
        <p className='stock-ph-name'>{name}</p>
        <p className='stock-ph-desc'></p>
    </div>
    <div className='tock-ph-img'>
        <img src={img}
        />

    </div>
    </div>
    )
  };
  export default StockHistory;



  