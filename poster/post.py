import requests
import time
import random
a = []
b = 0
c = 20
# the for loop is for iterating numbers to print increasing data
for i in range(100):
    if i % 2 == 0:
        print("hei")
        b = b + 0.25
    # c is the temperature and it has little randomness to make it more realistic
    c = b + random.uniform(20, 20.3)
    # m is the post request in json
    m = {"tag": {"id": "testi"}, "data": {"temperature": c, "humidity": i+random.uniform(0, 0.5)}}
    # r = request and this line sends the data to localhost so in order it to work
    # run this locally or change the source
    r = requests.post('http://localhost:9000/api/events', json=m)
    print(r.text)
    time.sleep(0.01)