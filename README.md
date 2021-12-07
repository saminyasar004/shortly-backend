# Shortly | Link Shortener

Shorten user defined link.

## API Methods

The API accect only GET method.

## API Routes

-   Base route

```http
https://shortly-samin.herokuapp.com
```

-   Shorten a link

```http
https://shortly-samin.herokuapp.com/shorten
```

Create a short link for a given URL. Requires a `url` parameter

### Example

```http
https://shortly-samin.herokuapp.com/shorten?url=example.org
```

### Response

```javascript
{
  "result": {
      "shortenId": "kcven",
      "shortenLink": "https://shortly-samin.herokuapp.com/kcven",
      "originalLink": "http://example.org"
  }
}
```
