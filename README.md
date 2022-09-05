# Multi Clock web app

[See it on Heroku](https://lotsa-clocks.herokuapp.com/)

<img src="https://github.com/manderly/multi-clock/blob/main/screenshots/december-2021.png" width="600">

## To run locally:

1. Clone this repo locally and open a terminal window
2. ```npm install```
3. ```npm start``` (leave this one running)
4. In your browser go to ```localhost:3000```

### To run tests:

```npm run test:coverage```

## To deploy to Heroku:

Just update the 'main' branch and it should redeploy automatically.

## Change log

#### September 2022
* Flag emojis now appear for Windows/Chrome users
* Swapped Heroku buildpack for express based build script that is compatible with the Heroku 22 stack 
* Added static thermometer to front page for at-a-glance conversions between Celsius and Fahrenheit 

#### March 2022
* Favicon

#### January 2022
* Missing timezones added

#### December 2021
* Initial development and deployment

## About

Created by [Mandi Burley](https://majoh.dev)

[React Bootstrap](https://react-bootstrap.github.io/getting-started/introduction/)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

