<h1 align="center">Schwordle</h1>

<p align="center">

<img src="https://img.shields.io/badge/made%20by-ayushnpatel, abhitejbokka-blue.svg" >

<img src="https://img.shields.io/badge/next.js-12.1.0-green.svg">

<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103" >

<img src="https://img.shields.io/github/stars/silent-lad/Vue2BaremetricsCalendar.svg?style=flat">

<img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat">
</p>

A Vue.js wrapper for the beautiful date-range picker made by the **[Baremetrics](https://baremetrics.com)** team._

---


Have you and your friends been obsessed with wordle recently? Itching for the new wordle at 12 am? Schwordle comes with an interactive dashboard that encapsulates the best of your wordle successes!

### Background

My friend Ayush Patel told me that there was a hackathon at Rutgers and it would have a lot of prizes so I decided to sign up on a whim. We were just chilling during the hackathon just thinking about what kind of project we could make when suddenly my friend, Dhruv Ghoniya, texted this to our groupchat:

Wordle 287 2/6

⬜🟨⬜⬜🟨                                                                                                                                                   
🟩🟩🟩🟩🟩


We had a group chat and anywhere from 12 - 1 am, a bunch of wordles would come through and we wanted to elevate this experience and see how we compared to everyone. It came out of thin air that I just wanted to see a place to see all of our wordles together without having to scroll through a groupchat. I was also wondering who was the best and like what kind of statistics we can come up with. We saw some potential free prizes and we told ourselves we have to get that Twilio prize. With an idea and just a day to code, we went right at it and created schwordle!

## Installation

First, create a .env file with the following information:
```
TWILIO_ACCOUNT_SID=...
TWILIO_AUTH_TOKEN=...
TWILIO_NUMBER=...
DATABASE_URL=...
```

To begin, run the program locally in the front-end directory

`npm run dev`

In another terminal, run ngrok as such: 

`ngrok html 3000`

Now, with the routed URL we see in ngrok, put the URL as the URL for the webhook for the number you want to be responding to in your twilio account.

## Demo of Schwordle!


[<img src="frontend/public/dashboard.jpeg">](http://www.youtube.com/watch?v=-7Tb-z57g6Y "Video Title")


## What it does

Schwordle is an application that allows users to create and join a group of people in a mini wordle leaderboard/dashboard. Twilio asks the user to send a Wordle which it would then check to see if it is legitimate and then pass onto our website where a dashboard is hosted displaying all the wordles the group has solved. Multiple people can join a group and send their wordles to be displayed.

## How we built it
     
To get started, you insert your number into a website built with Next.js & TailwindCSS we have, and then the Twilio messenger is the main form of communication between the mobile user and our program. Once submitted, the wordle data is wrapped and sent using Prisma to CockroachDB. You can then go back to the website to enter your group code and see all the wordles your group has solved.

## Challenges we ran into

Getting Twilio messaging set up was definitely a roadblock. It was a new technology we never used, but this meant a lot that we were able to learn. We were grasping the concepts of how to use cookies and use them to our advantage in finding out at what stage of the conversation each person was at with the Twilio SMS texts.

## Accomplishments that we're proud of

Some of the best things we are proud of are really the small things to appreciate. We were able to use regex to make sure the wordle was valid and could be analyzed. Finding out how to get Twilio up and running to see our texts coming in really set us up to keep going. Even just centering a div to make the dashboard look better really clean are things we are proud of.

## What we learned

We learned how to implement Twilio and CockroachDB into our project. It became a very fun aspect to use Next.js & TailwindCSS to display our wordles on a dashboard and see how seamlessly our mobile and web development meshed

## What's next for Schwordle

We definitely plan on getting a site up and running to work for anyone. We also will display statistics regarding performance to up the stakes and make it competitive.

Built with: Twilio, CockroachDB, Prisma, Next.js, TailwindCSS
