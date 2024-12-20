import requests
from bs4 import BeautifulSoup
import time
import random
from fake_useragent import UserAgent

class JobScraper:
    def __init__(self):
        self.user_agent = UserAgent()
        self.session = requests.Session()
        self.request_delay = 10
        
    def get_headers(self):
        return {
            'User-Agent': self.user_agent.random,
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
            'Accept-Language': 'en-US,en;q=0.5',
            'Accept-Encoding': 'gzip, deflate, br',
            'Connection': 'keep-alive',
        }
        
    def random_delay(self, min_seconds=2, max_seconds=5):
        time.sleep(random.uniform(min_seconds, max_seconds))
        
    def scrape_linkedin(self, job_title, location, num_jobs=16):
        jobs = []
        start = 0
        
        while len(jobs) < num_jobs:
            url = f"https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords={job_title}&location={location}&start={start}"
            
            try:
                self.random_delay()
                response = self.session.get(url, headers=self.get_headers())
                
                if response.status_code == 200:
                    soup = BeautifulSoup(response.text, 'html.parser')
                    
                    # Find all job cards
                    job_cards = soup.find_all('div', class_='base-card')
                    
                    if not job_cards:
                        break
                        
                    for card in job_cards:
                        if len(jobs) >= num_jobs:
                            break
                            
                        try:
                            # Extract job details using the provided selectors
                            title = card.find('h3', class_='base-search-card__title').text.strip()
                            company = card.find('a', class_='hidden-nested-link').text.strip()
                            location = card.find('span', class_='job-search-card__location').text.strip()
                            link = card.find('a', class_='base-card__full-link')['href']
                            
                            jobs.append({
                                "title": title,
                                "company": company,
                                "location": location,
                                "link": link,
                                "source": "LinkedIn"
                            })
                            
                        except Exception as e:
                            print(f"Error parsing job card: {str(e)}")
                            continue
                    
                    start += 25  # LinkedIn uses 25 jobs per page
                    
                else:
                    print(f"Failed to fetch LinkedIn jobs: Status code {response.status_code}")
                    break
                    
            except Exception as e:
                print(f"Error accessing LinkedIn: {str(e)}")
                break
                
        return jobs[:num_jobs]

    
    def scrape_indeed(self, job_title, location, num_jobs=10):
        # Remove Indeed scraping as it requires different handling
        return []
    
    def close_session(self):
        if self.session:
            self.session.close()