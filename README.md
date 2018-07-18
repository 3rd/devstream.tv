# Devstream



[Devstream](https://devstream.tv) is a website that allows you to watch live developer streamers.

All the content comes from this repo and is updated every 5 minutes.

This project is inspired by [https://github.com/bnb/awesome-developer-streams](https://github.com/bnb/awesome-developer-streams)



#### Adding / modifying streams

Each stream has its own JSON file under [/streams](https://github.com/neculaesei/devstream.tv/tree/master/streams). You can write that manually or you can use the [online generator](https://devstream.tv/submit-content) that makes everything easier.



#### Stream config format

Each stream configuration has a predefined set of properties, make sure you respect the "schema" when you submit a pull-request.

The **links** object can contain **any number of links**, which will be mapped on devstream.tv to either certain icons (GitHub, Twitter, etc.) or the key name. 

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



#### The frontend

Devstream is built with Vue <3, you can find all the frontend code in the [/frontend](https://github.com/neculaesei/devstream.tv/tree/master/frontend) folder. Feel free to open issues on the code and contribute to that as well.



#### Requests and ideas?

I'd really like for this project to grow and turn into something awesome in the future. If you have any ideas or you think there's stuff that can be done in a better way please reach out through an issue or directly.



Here's a list of the things I have in mind and I'm already in the process of building:

- Video section (videos, video channels & learning tracks)
- Tag & Language filtering once we have enough content that it would help
  - Twitch API provides a stream's language as well
