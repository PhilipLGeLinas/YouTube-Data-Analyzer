import pymongo


client = pymongo.MongoClient("mongodb+srv://philiplgelinas:Shudokan2030@cluster0.mqufz.mongodb.net/Cluster0?retryWrites=true&w=majority")
db = client["YouTubeDB"]
videos_col = db["Videos"]


videos = videos_col.find()
for video in videos:
    related_ids = video['relatedIds']
    for related_id in related_ids:
        query = {"videoId": related_id}
        update = {"$inc": {"pageRank": 1 / len(related_ids)}}
        videos_col.update_one(query, update)
        print(update)

