# Page-Hasher
This was built to find duplicate content on separate pages on a web site.
It downloads the webpages defined in _urls.txt_ , md5 hashes their contents, and outputs the result as a text file. 

## Steps to use
* Clone repo
* Install dependencies
* Add URLs to spider to urls.txt (I found these by looking @ the sitemap.xml)
* Run ```npm start```
* Output will be written to _urls.txt_
