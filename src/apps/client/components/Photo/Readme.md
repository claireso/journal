### Example

#### Centered Landscape photography

```js
const singlePhoto = {
  "id": 1,
  "title": "Single photography",
  "description": "Janvier 2019",
  "name": "01d2tf2h38pwcd953ans2f64p7.jpg",
  "position": "center",
  "portrait": false,
  "square": false,
  "created_at": "2019-02-03T19:59:00.088Z",
  "updated_at": "2019-02-03T19:59:00.088Z"
};

<Photo {...singlePhoto} />
```

#### Portrait photography aligned to right

```js
const singlePhoto = {
  "id": 1,
  "title": "Single photography",
  "description": "Janvier 2019",
  "name": "01d2tf2h38pwcd953ans2f64p7.jpg",
  "position": "right",
  "portrait": true,
  "square": false,
  "created_at": "2019-02-03T19:59:00.088Z",
  "updated_at": "2019-02-03T19:59:00.088Z"
};

<Photo {...singlePhoto} />
```

#### Square photography aligned to left

```js
const singlePhoto = {
  "id": 1,
  "title": "Single photography",
  "description": "Janvier 2019",
  "name": "01d2tf2h38pwcd953ans2f64p7.jpg",
  "position": "left",
  "portrait": false,
  "square": true,
  "created_at": "2019-02-03T19:59:00.088Z",
  "updated_at": "2019-02-03T19:59:00.088Z"
};

<Photo {...singlePhoto} />
```