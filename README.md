# Shortly | Link Shortener

Shorten user defined link.

## API Methods

The API accect only GET method.

## API Routes

-   Base route

```http
http://localhost:3000
```

-   Shorten a link

```http
http://localhost:3000/shorten
```

Create a short link for a given URL. Requires a `url` parameter

### Example

```http
http://localhost:3000/shorten?url=example.org
```

### Response

```javascript
{
  "result": {
      "shortenId": "KCveN",
      "shortenLink": "http://localhost:3000/KCveN",
      "originalLink": "http://example.org"
  }
}
```
