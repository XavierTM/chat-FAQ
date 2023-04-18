
# API Design
## Branches
### Create branch
**POST** `/api/branches`

**expects**:
```js
{
   title: String,
   body: String,
}
```

**returns**:
```js
{
   id: Number,
}
```

### Retrieve branches
**GET** `/api/branches`

**returns**:
```js
[
   {
      id: String,
      title: String,
      body: String,
      media: [
         {
            id: String,
            ext: String,
         },
         ...
      ]
   },
   ...
]
```

### Chat 
**GET** `/api/branches/:id`

**returns**:
```js
{
   name: String,
   body: String,
   media: [
      {
         id: String,
         ext: String,
      },
      ...
   ],
   branches: [
      {
         id: Number,
         title: String,
      },
      ...
   ]
},
   
```

### Delete branch
**DELETE** `/api/branches/:id`

<hr>

## Media
### Create media
**POST** `/api/media`

**expects**:
```js
{
   ext: String,
   data: String,
   branch: Number
}
```

**returns**:
```js
{
   id: Number,
}
```

### Delete media
**DELETE** `/api/media/:id`
<hr>

## Contacts
### Create contact
**POST** `/api/contacts`

**expects**:
```js
{
   name: String,
   email: String,
   phone: String,
   bio: String,
}
```

**returns**:
```js
{
   id: Number,
}
```

### Retrieve contacts
**GET** `/api/contacts`

**returns**:
```js
[
   {
      id: String,
      name: String,
      email: String,
      phone: String,
      bio: String,
   },
   ...
]
```


### Delete contact
**DELETE** `/api/contacts/:id`

<hr>
