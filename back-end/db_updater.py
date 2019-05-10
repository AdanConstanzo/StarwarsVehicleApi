from pymongo import MongoClient
import os
import swapi

class SWAP_DB():
	def __init__(self, uri):
		self.client = MongoClient(uri)
	# function that sets our vehicles to db.
	def set_to_db(self, typeOfItem):
		collection = []
		# collecting data from api
		collectionFromApi = swapi.get_all(typeOfItem)
		for x in collectionFromApi.iter():
			collection.append(x.__dict__)
		# setting to correct index of db.
		if typeOfItem == "starships":
			item_db = self.client.starwars.ships
		elif typeOfItem == "people":
			item_db = self.client.starwars.peoples
		elif typeOfItem == "films":
			item_db = self.client.starwars.films
		# inserting to db
		item_db.insert_many(collection)
	
swap_db = SWAP_DB("mongodb://localhost:27017/")
# Options are: starships, people, films
swap_db.set_to_db("starships")
swap_db.set_to_db("people")
swap_db.set_to_db("films")