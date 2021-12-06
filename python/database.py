import pymongo
import time


client = pymongo.MongoClient("mongodb+srv://philiplgelinas:Shudokan2030@cluster0.mqufz.mongodb.net/Cluster0?retryWrites=true&w=majority")
db = client["YouTubeDB"]
videos_col = db["Videos"]


# Read in the text file
start = time.time()
for num in range(0, 4):
    with open(f'{num}.txt') as f:
        videos = f.readlines()
        for video in videos:
            vals = video.split()
            if len(vals) > 9:
                if vals[4] == '&':
                    vals[3] = vals[3] + vals[4] + vals[5]
                    del vals[4]
                    del vals[4]
                    json = {
                        "videoId": vals[0],
                        "uploader": vals[1],
                        "age": vals[2],
                        "category": vals[3],
                        "length": vals[4],
                        "views": vals[5],
                        "rate": vals[6],
                        "ratings": vals[7],
                        "comments": vals[8],
                        "relatedIds": vals[9:],
                        "pageRank": 1
                    }
                    result = videos_col.insert_one(json)
                    print(result)
finish = time.time()
print("Completed insertions in " + str(finish - start) + " seconds.")
