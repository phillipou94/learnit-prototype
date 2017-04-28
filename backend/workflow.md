# LearnIt Workflow

## Endpoints

| Action | Endpoint | Request | Responses |
| :---:  |  :---:   |  :---:  |   :---:   |
| Signup for a new account. | POST `/signup/` | `{"name": <str>,"username": <str>,"password":<str>}` | <a href='#sign-up'>Here</a> |
| Sign In to your account. | POST `/signin/` | `{"username": <str>,"password":<str>}` | <a href='#sign-in'>Here</a> |
| Logout of your account. | DELETE `/signin/` | N/A | <a href='#sign-out'>Here</a> |
| Get the data for a user's homepage. | GET `/home/` | N/A | <a href='#view-home'>Here</a> |
| Get the data for a user's exercise. | GET `/exercises/<int:exercise_id>` | N/A | <a href='#view-exercise'>Here</a> |
| Get the data for a user's collections. | GET `/collections/`| N/A | <a href='#view-collection'>Here</a> |
| Mark a problem as completed. | PUT `/problems/<int:problem_id>` | N/A |  <a href='#solve-a-problem'>Here</a>|

## Responses

### Sign Up

#### Success
__Status Code:__ 201
__Response:__
```json
{"id": <int>, "username": <str>, "name": <str>}
```
Upon successfully signing up

- a user will now be validated for all further API requests on that session
- the user should be directed to the home page.


#### Failure
```
```

### Sign In

#### Success
__Status Code:__ 200
__Response:__
```json
{"id": <int>, "username": <str>, "name": <str>}
```
Upon successfully logging in

- a user will now be validated for all further API requests on that session
- the user should be directed to the home page.

#### Failure


### Sign Out

#### Success
__Status Code:__ 200
__Response:__
```json
{"success": 1}
```
Upon successfully logging out

- the user should be directed to the login page

#### Failure

### View Home

#### Success
__Status Code:__ 200
__Response:__
```json
{
    "username": <str>,
    "id": <int>,
    "name": <str>,
    "exercises": [
        {
            "id": <int>,
            "name": <str>,
            "name": <int>,
            "total_problems": <int>,
            "completed_problems": <int>
        }, ...
    ]
}
```

#### Failure

### View Exercise

#### Success
__Status Code:__ 200
__Response:__
```json
{
    "id": <int>,
    "number": <int>,
    "name": <str>,
    "path_to_img": <str>,
    "problems": [
        {
            "id": <int>,
            "number": <int>,
            "contents": <str>,
            "answer": <int>,
            "hint": <str>,
            "completed": <bool>
        }
    ]
```

#### Failure

### View Collection

#### Success
__Status Code:__ 200
__Response:__
```json
{
    "id": <int>,
    "username": <str>,
    "name": <str>,
    "collections": [
        {
            "id": <int>,
            "path_to_img": <str>,
            "name": <str>,
            "number": <int>
        }
    ]
```

#### Failure

### Solve a Problem

#### Success
__Status Code:__ 200
__Response:__
```json
{"success": 1}
```

#### Failure
