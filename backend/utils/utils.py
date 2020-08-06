import requests
from bs4 import BeautifulSoup


def get_page_title(URL):
    """
    try to change this function by one that work in front-end (try libs)
    """
    response = requests.get(URL)
    print(response.ok)
    if response.ok:
        soup = BeautifulSoup(response.text, 'html.parser')
        title = soup.find('title').text
        print('from response ok', title)
        return title
    else:
        return ''
