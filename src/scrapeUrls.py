from bs4 import BeautifulSoup
import requests
import re
import urllib2
import os
import argparse
import sys
import json
import swapi

def get_soup(url,header):
    return BeautifulSoup(urllib2.urlopen(urllib2.Request(url,headers=header)),'html.parser')

def main(starwasInfo):
	
	# Constants
	save_directory = "/Users/adanconstanzo/Downloads/StarwarsShips"
	image_type="Action"
	header={'User-Agent':"Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.134 Safari/537.36"}
	collection = swapi.get_all(starwasInfo)
	Urls = {}
	# loop through queries and dl first photo
	for x in collection.iter():
		if starwasInfo == "films":
			name = x.title.encode("utf-8")
		else:
			name = x.name.encode("utf-8")
			
		query = 'starwars ' + name
		print(query)
		search = name
		query= query.split()
		query='+'.join(query)
		url="https://www.google.co.in/search?q="+query+"&source=lnms&tbm=isch"
		soup = get_soup(url,header)
		a = soup.find("div",{"class":"rg_meta"})
		link , Type =json.loads(a.text)["ou"]  ,json.loads(a.text)["ity"]
		Urls[name] = link.encode("utf-8")
	
	with open(starwasInfo+'.JSON', 'w') as outfile:
		json.dump(Urls, outfile)
	print(Urls)

if __name__ == '__main__':
    from sys import argv
    try:
		# Options are: starships, people, films
        main("films")
    except KeyboardInterrupt:
        pass
    sys.exit()