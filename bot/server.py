
import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
from prophet.serialize import model_from_json
from bot_script import activate_bot_script

app = Flask(__name__)
CORS(app)

# Define a dictionary with model names and corresponding filenames
model_files = {
    "MSFT": "MSFT_model.json",
    "JPM": "JPM_model.json",
    "META": "META_model.json",
    "TSLA": "TSLA_model.json",
    "IBM": "IBM_model.json"
}

# Load models in a loop
models = {}
for model_name, model_file in model_files.items():
    with open(model_file, 'r') as fin:
        models[model_name] = model_from_json(fin.read())

dir_path = os.path.dirname(os.path.realpath(__file__))

print(dir_path)


@app.route('/predict', methods=['POST'])
def predict_prices():

    data = request.get_json()
    # Convert the 'day' parameter to a datetime object
    day_dt = pd.to_datetime(data["date"])
    # Prepare a DataFrame with the dates for prediction
    dates_to_predict = pd.DataFrame({'ds': [day_dt]})
    # Use the models to make predictions
    forecast_json = {}
    for model_name, model in models.items():
        forecast = model.predict(dates_to_predict)
        forecast_json[model_name] = forecast['yhat'].to_json(orient='records')

    action = activate_bot_script(data, jsonify(forecast_json).data)
    print(action)
    return jsonify(action), 200


if __name__ == '__main__':
    app.run(debug=True)
