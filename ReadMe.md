# Stock Trading Game with AI Bot

Welcome to the **Stock Trading Game**! This project features a stock trading simulation where users compete against an AI bot. The bot utilizes advanced predictive algorithms to forecast future stock prices and make trading decisions based on its predictions.

## Installation

1. **Clone the Repository:** Start by cloning this repository to your local machine.

2. **Navigate to Project Directory:** Open a terminal and navigate to the `stock_trade_game` directory that you've cloned.

3. **Install Client and Server Libraries:** Install the required libraries for the client and server by executing the following commands in separate terminal windows:

   ```sh
   cd stock_trade_game/client
   npm install
   ```

   ```sh
   cd stock_trade_game/server
   npm install
   ```

4. **Install Python Libraries for Bot:** Move to the `bot` directory within the project and install the necessary Python libraries:

   ```sh
   pip install flask flask_cors pandas prophet seaborn scikit-learn nltk numpy matplotlib.pyplot azure.cosmos prophet.serialize
   ```

5. **Server Configuration:** Inside the `server` folder, you'll require a `.env` file containing your database credentials. For this file, kindly contact me at mohatech777@gmail.com.

## Usage

1. **Start the Client:** To launch the client, navigate to the `stock_trade_game/client` directory in the terminal and execute:

   ```sh
   npm start
   ```

2. **Run the Server:** Move to the `stock_trade_game/server` directory and initiate the server:

   ```sh
   npm start
   ```

3. **Activate the Bot:** Inside the `stock_trade_game/bot` directory, run the bot server by executing:

   ```sh
   python server.py
   ```

## Future Updates

This project is under active development, with significant UI improvements, enhancements to the bot's decision-making logic, and new game modes. Stay tuned for exciting updates!

For inquiries and assistance, please don't hesitate to reach out to us at mohatech777@gmail.com , marioayman2017@gmail.com , amiraabdelghany764@gmail.com
