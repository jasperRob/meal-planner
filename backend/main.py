from flask import Flask, jsonify, request
from flask_cors import CORS
from langchain_core.messages import HumanMessage
from model import chatbot
import os

# ensure port is supplied
API_PORT = os.getenv('API_PORT')
if not API_PORT:
    raise Exception("API_PORT not provided")

# setup flask app
app = Flask(__name__)
CORS(app)


# chat endpoint for communicating with model
@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    input = data.get('input')
    thread_id = data.get('thread_id')
    config = {"configurable": {"thread_id": thread_id}}
    output = chatbot.invoke({"messages": [HumanMessage(input)]}, config)
    return jsonify({"response": output["messages"][-1].content})


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=API_PORT, debug=True)
