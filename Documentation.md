### Register User

This endpoint is use to register a users face into the system

```endpoint
POST /api/register/
```

#### Example request body

```json
{
  "image": "file",
}
```

#### Example request header

```json
{
  "username": "John",
  "galleryname":"test"
}
```

Property | Description
---|---
`username` | (required) This property needs to be passed in the request header
`galleryname` | (required) This property needs to be passed in the request header
`image` | (required) This property needs to be passed in the request body as a formdata

#### Example Success Response

```json
{
    "status": true,
    "message": "Enregistrement réussi"
}
```

#### User Already Exist Response

```json
{
    "status": false,
    "message": "ce subjet id est deja enregistre"
}
```

#### No face detected in the image

```json
{
    "status": false,
    "message": "Aucune face detect&eacute; dans l'image"
}
```


#### More than one face in image response

```json
{
    "status": false,
    "message": "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.",
    "faces": 3
}
```


### Login User

This endpoint is use to login a user into the system

```endpoint
POST /api/verify
```

#### Example request body

```json
{
  "image": "file",
}
```

Property | Description
---|---
`image` | (required) This is the face of the user that is trying to login

#### Example Success Response

```json
{
    "status": true,
    "message": "Face reconnue dans le système",
    "name": "Test User"
}
```

#### Face Not Regocnised Response

```json
{
    "status": false,
    "message": "Face non reconnue dans le système"
}
```


#### No face detected in the image

```json
{
    "status": false,
    "message": "Aucune face detect&eacute; dans l'image"
}
```


#### More than one face in image response

```json
{
    "status": false,
    "message": "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.",
    "faces": 3
}
```




### Delete User

This endpoint is use to login a user into the system

```endpoint
POST /api/remove
```

#### Example request body

```json
{
  "image": "file",
}
```

#### Example request Header

```json
{
  "username": "name",
  "galleryname": "Test",
}
```

Property | Description
---|---
`username` | (required) This is the name of the user that you want to delete
`galleryname` | (required) This is the gallery name where the users image was stored during registration.
`image` | (required) This is the face of the user that you want to delete

#### Example Success Response

```json
{
    "message": "subject id Test User has been successfully removed",
    "status": true
}
```

#### Face Not Regocnised Response

```json
{
    "status": false,
    "message": "Face non reconnue dans le système"
}
```


#### No face detected in the image

```json
{
    "status": false,
    "message": "Aucune face detect&eacute; dans l'image"
}
```


#### More than one face in image response

```json
{
    "status": false,
    "message": "Plusieurs faces ont &eacute;t&eacute; detect&eacute; dans l'image. Veuillez vous assurer d'etre seul dans l'image.",
    "faces": 3
}
```