
# Palautepomppu

- [Diagrams](#diagrams)
- [Endpoints](#endpoints)
  - [Auth](#auth)
  - [Users](#users)
    - [Get users](#get-users)
    - [Create user](#create-user)
    - [Delete user](#delete-user)
  - [Session](#session)
    - [Create session](#create-session)
    - [Get Sessions](#get-sessions)
  - [Question](#question)
    - [Create Question](#create-question)
    - [Get Questions](#get-questions)
  - [Answer](#answer)
    - [Create Answer](#create-answer)
    - [Get Answers](#get-answers)



---

# Local Development

**Note:** You need to turn on Metropolia VPN to access the database.
**Note:** You need to create a `./.env` file with proper credentials. See `.env.example` for reference.

```shell
npm install
npm start
```

* http://localhost:5173 for React website:
* http://localhost:3000 for Express REST API:


# Tech and Tools
- React
- Express
- MySQL
- Vite
- Eslint
- Prettier

[And many others!](/package.json)

# REST API Documentation

**Production URL**: http://10.120.33.52/api/v0/

## Diagrams
> Note that the PDF files are not up to date, but the source files should be.
* [Activity diagram](/docs/diagrams/activity-diagram.pdf)
* [Class diagram](/docs/diagrams/class-diagram.pdf)
* [Deployment diagram](/docs/diagrams/deployment-diagram.pdf)
* [ER diagram](/docs/diagrams/er-diagram.pdf)
* [Package diagram](/docs/diagrams/package-diagram.pdf)
* [Sequence diagram](/docs/diagrams/sequence-diagram.pdf)
* [Use case diagram](/docs/diagrams/use-case-diagram.pdf)

## Endpoints

### Auth
**Endpoint**: `GET /auth/`

Payload
```json
{
  "email": "john.doe@example.com",
  "password": "foobar"
}
```
Response
```json
{
  "successful": true,
  "code": 200,
  "user_id": 1
}
```
### Users

#### Get users
Endpoint: `GET /users/`

Response
```json
[
  {
    "id": 1,
    "firstName": "John",
    "lastName": "Doe",
    "email": "john.doe@example.com",
    "joined": "2023-04-20T09:31:24.000Z"
  },
  {
    "id": 2,
    "firstName": "Jane",
    "lastName": "Smith",
    "email": "jane.smith@example.com",
    "joined": "2023-04-21T14:30:56.000Z"
  }
]
```
#### Create user
Endpoint: `POST /users/`

Payload
```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "password": "foobar",
  "email": "jane.doe@example.com"
}
```
Response
```json
{
  "message": "Record created successfully!",
  "code": 200,
  "user_id": 1
}
```
#### Delete user
Endpoint: `DELETE /users/:id`

Response
```json
{
  "code": 200,
  "message": "Record deleted successfully!"
}
```
### Session

#### Create session
Endpoint: `POST /session/`

Payload
```json
{
  "teacher_id": 1,
  "moment": "2023-04-21T14:30:56.000Z"
}
```
Response
```json
{
  "message": "Record created successfully!",
  "code": 200,
  "session_id": 1
}
```
#### Get Sessions
Endpoint: `GET /session/`

Query parameters:
* `teacher_id=2`

Response
```json
{
  "code": 200,
  "results": [
    {
      "session_id": 21,
      "teacher_id": 2,
      "moment": "2023-09-28T06:16:43.000Z"
    },
    {
      "session_id": 22,
      "teacher_id": 2,
      "moment": "2023-09-28T06:18:10.000Z"
    },
    {
      "session_id": 23,
      "teacher_id": 2,
      "moment": "2023-09-28T06:27:53.000Z"
    }
  ]
}
```
### Question

#### Create Question

Endpoint: `POST /question/`

Payload
```json
{
    "content": "What was the best thing in today’s lesson?",
  "answer_type": 1,
  "theme": 1
}
```
Response
```json
{
  "message": "Record created successfully!",
  "code": 200,
  "question_id": 1
}
```
#### Get Questions

Endpoint: `GET /question/`

Query parameters:
* `session_id=1`
Response
```json
[
    {
    "question_id": 1,
    "session_id": 1,
    "content": "Was today’s trip fun?",
    "answer_type": 1,
    "theme": 1
  },
  {
      "question_id": 2,
    "session_id": 1,
    "content": "What was your favorite animal you saw today?",
    "answer_type": 2,
    "theme": 2
  },
  {
    "question_id": 3,
    "session_id": 2,
    "content": "What was the best thing in today’s lesson?",
    "answer_type": 3,
    "theme": 6
  }
]
```
### Answer

#### Create Answer

Endpoint: `POST /answer/`

Payload
```json
{
  "question_id": 1,
  "message": "I liked drawing.",
  "responder": "8ad6253f-6f4c-4b1e-a617-70f3db74a72a"
}
```
Response
```json
{
  "message": "Record created successfully!",
  "code": 200,
  "id": 1
}
```
#### Get Answers
Endpoint: `GET /answer/`

Query parameters:
* `question_id=30`

Response
```json
{
    "code": 200,
    "results": [
        {
            "answer_id": 13,
            "question_id": 30,
            "message": "wink",
            "responder": "6ba34358-9366-4c64-a62e-5c5ce4bb8d29",
            "moment": "2023-10-03T07:48:31.000Z"
        },
        {
            "answer_id": 20,
            "question_id": 30,
            "message": "neutral",
            "responder": "c7faea62-095e-49bf-b01e-127e81b978b5",
            "moment": "2023-10-03T07:49:49.000Z"
        }
    ]
}
```
