import json

stocks = ["MSFT", "IBM"]
# pick any company not first
# log data and see
# get date then get next date


def activate_bot_script(request_data, model_data):
    model_data = clean_model_data(model_data)
    return botMove(request_data["stockPrices"], model_data, request_data["ownedStocks"], request_data["money"])


def clean_model_data(model_data):
    data_str = model_data.decode('utf-8')
    # Load the JSON string to a Python dictionary
    data_dict = json.loads(data_str)
    for key, value in data_dict.items():
        data_dict[key] = float(value.strip('[]'))
    return data_dict


def botMove(current_prices, future_prices, owned_stocks, money):
    print(current_prices)
    print(future_prices)
    print(owned_stocks)
    print(money)
    bot_moves = []
    for key, value in current_prices.items():
        current_price = current_prices[key]
        future_price = future_prices[key]

        if current_price > future_price:
            print("____________")
            print(current_price)
            print(future_price)
            print("____________")
            if owned_stocks[key] > 0:
                bot_moves.append(sellStock(key))

        elif future_price > current_price:
            if money > future_price:
                bot_moves.append(buyStock(key))
    print(bot_moves)
    return bot_moves


def buyStock(stock):
    stock_data = {
        "action": "buy",
        "key": stock,
        "amount": 1
    }
    return stock_data


def sellStock(stock):
    stock_data = {
        "action": "buy",
        "key": stock,
        "amount": 1
    }
    return stock_data
