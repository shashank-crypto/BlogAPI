# BLOG API

My own blog API -

With Authentication : using jwt<br>
- Article reqs : `get` , `post` , `put`<br>
- Post
    - comment
    - like
    - star
 - Tags : <br>
   - Added automatically when posting Article
   - woking to add and remove tags when updating

### ThinkSpace

- Haven't put the expiry for JWT yet
- Add a middleware to `:articleId` 
- Add a compression middleware - gzip compression - tried 

    const compression = require('compression')
    app.use(compression())

Response size increased to `732B` from `708B`
