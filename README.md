# Shortly | Link Shortener

Shorten user defined link.

## API Methods

The API accect only GET method.

## API Routes

-   Base route

```http
http://localhost:3000/api
```

-   Shorten a link

```http
http://localhost:3000/api/shorten
```

Create a short link for a given URL. Requires a `url` parameter

### Example

```http
http://localhost:3000/api/shorten?url=example.org
```

### Response

```javascript
{
  "result": {
      "code": "KCveN",
      "short_link": "localhost:3000/KCveN",
      "full_short_link": "http://localhost:3000/KCveN",
      "original_link": "http://example.org"
  }
}
```
