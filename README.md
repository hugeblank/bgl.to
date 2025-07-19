# bgl.to

Combined link shortener and image host

Add links with:

```sh
curl -XPOST -H "Content-type: application/json" \
-d '{"auth": <AUTH envvar>, "name": <shortened path>, "link": <target url>}' \
'localhost:5173/api/ln'
```

Add media with:

```sh
curl -XPOST -H "X-Bgl-Authorization: <AUTH envvar>" \
-F "media=@<path or - for stdin>" \
'localhost:5173/api/publish'
```

Content type is largely irrelevant, endpoint has the ability to infer it.

Response from publish endpoint is media location
