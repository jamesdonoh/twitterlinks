# twitterlinks

Retrieve recent links from a Twitter user's timeline, with shortened URLs (e.g. t.co) dereferenced.

## Requirements

- A recent version of Node.js

## Usage

```
npm install
TWITTER_KEY=xxx TWITTER_SECRET=yyy node index.js
```

## Known issues/limitations

- Only retrieves first 200 most recent tweets currently
- Regex for extracting URLs from tweets is very naive
