# devstream.tv developer repo

[devstream.tv](https://devstream.tv) is a website that indexes developers that stream on Twitch (for now) and lets you easily see which developers are streaming right now and offers you a nice interface to watch them.

This project is inspired by [https://github.com/bnb/awesome-developer-streams](https://github.com/bnb/awesome-developer-streams)

## !!! Ideas, requests?

If you have ideas on how to make this cooler, or if you feel there is mandatory functionality missing please open an issue so we can discuss it.

### Streamer index

The streamer list and related information is in the ```data/streamers.json``` file.
Each entry has a predefined set of properties, ensure you respect the "schema" when you submit a pull-request.

The **links** object can contain **any number of links**, which will be mapped on devstream.tv to either certain icons (GitHub, Twitter, etc.) or labels of their key. 

Example:
```json
{
  "name": "Jane Doe",
  "twitch": "janewritesbeautifulcode",
  "tags": ["Web Development", "Hardware Hacking", "Node.js", "JavaScript"],
  "links": {
    "github": "https://github.com/***/",
    "website": "http://jane.example.com",
    "watch my cat": "https://instagram.com/***"
  }
}
```

### Contribuiting

If you would like to add a streamer, fork the repo, add an entry to ```data/streamers.json``` and submit a pull request. The order the streamers are organized in does not matter, as devstream.tv will sort them by online viewers.

### The source code of devstream.tv

The full source code of devstream.tv will probably be open-sourced in the near future, I just want to make it work before I prepare it for OS collaboration.
