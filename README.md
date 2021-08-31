# Desafio Tunts

## About the project :scroll:

This is a job challenge for [@Tunts](https://github.com/tunts)

With this project you can calculate students avarages, write that on a google spreadsheet and view all data in /avarages route.
## Installing the project :package:

Requeriments:
* NodeJs

Clone the github repo to your local machine

With HTTPS:
```bash
git clone https://github.com/jpbrab0/desafio-tunts.git
```

With SSH:
```bash
git clone git@github.com:jpbrab0/desafio-tunts.git
```

With Github CLI:
```bash
gh repo clone jpbrab0/desafio-tunts
```

## Running the project :runner:

1. Install dependencies with `yarn`

2. Config the Environment variables of the project(create a paste with credentials name and paste credentials.json)

3. And run with `yarn dev`

## Endpoints

### Get all student data
```http
GET /avarages?id=<spreadsheet id>
```

### Calculate all avarages and write on spreadsheet
```http
POST /calculate-avarages?id=<spreadsheet id>
```