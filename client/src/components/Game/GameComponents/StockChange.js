import "./styles/StockChange.css"; // Import the CSS file for styling

const StockChange = ({ percentage }) => {
  const cleanPercentage = percentage.slice(0, percentage.length - 1);
  // Define a variable to hold the color based on the stock change
  let color = "black";

  // Check if the stock change percentage is greater than 0, set color to blue
  if (cleanPercentage > 0) {
    color = "green";
    percentage = "+" + percentage;
  }
  // Check if the stock change percentage is less than 0, set color to red
  else if (cleanPercentage < 0) {
    color = "red";
  }

  // Use the variable in the style attribute to set the color dynamically
  return (
    <p className="stock-change" style={{ color }}>
      {percentage}
    </p>
  );
};
export default StockChange;
