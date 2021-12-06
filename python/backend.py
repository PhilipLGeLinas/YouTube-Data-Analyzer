"""Flask Application for YouTube Data Analyzer"""
from flask import Flask, request
from flask_cors import CORS, cross_origin
import pymongo

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
client = pymongo.MongoClient("mongodb+srv://philiplgelinas:Shudokan2030@cluster0.mqufz.mongodb.net/Cluster0?retryWrites=true&w=majority")
db = client["YouTubeDB"]
videos_col = db["Videos"]


@app.route("/query")
@cross_origin()
def query():
    category = request.args.get('category')
    uploader = request.args.get('uploader')
    count = request.args.get('count')
    filter = request.args.get('filter')
    return {x['videoId'] : str(x) for x in videos_col.find({
        "category" : { "$eq" : category },
        "uploader" : { "$eq" : uploader }
    }).sort(filter, -1).limit(int(count))}


@app.route("/categories")
@cross_origin()
def categories():
    return str(set([x["category"] for x in videos_col.find()]))


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0", port=3000)
