import json
import random

# pick any company not first
# log data and see
# get date then get next date

losing_stocks = []
winning_stocks = []


def activate_bot_script(request_data, model_data):
    model_data = clean_model_data(model_data)
    print(type(request_data["money"]))
    return botMove(request_data["stockPrices"], model_data, request_data["ownedStocks"], request_data["money"])


def clean_model_data(model_data):
    data_str = model_data.decode('utf-8')
    # Load the JSON string to a Python dictionary
    data_dict = json.loads(data_str)
    for key, value in data_dict.items():
        data_dict[key] = float(value.strip('[]'))
    return data_dict


def botMove(current_prices, future_prices, owned_stocks, money):

    print("_________________")
    print(current_prices)
    print("_________________")
    print(future_prices)
    print("_________________")

    for key, value in current_prices.items():
        current_price = current_prices[key]
        future_price = future_prices[key]

        if current_price > future_price:
            losing_stocks.append({
                "key": key,
                "price": future_price
            })

        elif future_price > current_price:
            winning_stocks.append({
                "key": key,
                "price": future_price
            })
    if len(losing_stocks) >= 1 and sellStock(owned_stocks):
        return sellStock(owned_stocks)

    elif len(winning_stocks) >= 1 and buyStock(money):
        return buyStock(money)

    else:
        return {"action": "hellos"}


def buyStock(money):
    stock_data = {}
    random_stock = random.choice(winning_stocks)
    if money > random_stock["price"]:
        stock_data = {
            "action": "buy",
            "key": random_stock["key"],
            "amount": 1
        }
    else:
        print("found no stocks")
        return False

    return stock_data


def sellStock(owned_stocks):
    stock_data = {}
    random_stock = random.choice(losing_stocks)
    if owned_stocks[random_stock["key"]] > 0:
        stock_data = {
            "action": "sell",
            "key": random_stock["key"],
            "amount": 1
        }
    else:
        print("found no stocks")
        return False

    return stock_data
