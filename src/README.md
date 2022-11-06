## Endpoints

Databases
`user`
`category`
`product`
`order`
`wishlist`

--

<b>Root</b>: `http://localhost:3000`

- <b><span style="color: green"> Create </span></b>
`/api/add?_db=[database]`

- <b><span style="color: yellow"> Read </span></b>
`/api/all?_db=[database]`
`/api/user`
`/api/:id?_db=[database]`

- <b><span style="color: blue"> Update </span></b>
`/api/modify/:id?_db=[database]`

- <b><span style="color: red"> Delete </span></b>
`/api/remove/:id?_db=[database]`
