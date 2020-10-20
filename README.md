## Git Repository
https://git.heroku.com/yoginodevidly.git

## App Endpoint
https://yoginodevidly.herokuapp.com/

## Database 
https://cloud.mongodb.com/v2/5f8e2ffc9d3d23705642af32#clusters

## List Api
- /api/users
- /api/genres
- /api/movies
- /api/rentals
- /api/returns

## How to Run

### Install the Dependencies
```bash
npm install
```
### Run test
```bash
npm test
```
### Set the environment variabels
On Linux or Mac:
```bash
export vidly_jwtPrivateKey=mySecureKey
```
On Windows:
```bash
set vidly_jwtPrivateKey=mySecureKey
```
### Start Server
```bash
node index.js
```