# Prototype

## Motivations

#### <b>NodeJS</b>

NodeJS single threadedness makes it a perfect candidate for I/O operations and therefore very ideal for building realtime applications. In this application, I
didn't use realtime features like websockets but considering the nature of Cointrackers application; I considered using NodeJS as it has a rich support for
realtime applications. NodeJS has a rich ecosystem for Web3 components and that was a motivation for choosing this language.

#### <b>Type system (Using TypeScript)</b>

From my technical interview with Stefan and Pavlo; I gathered that Cointracker is growing its technical team and so I found it necessary to employ a type
system. Type systems allow for efficient development and reeduces debugging time. As many engineers work on a project it becomes more difficult to manage
projects; however by using a type system, amny errors can be avoided at development time rather than at build time / run time. It not only makes engineering
teams move faster but it greater increases the efficiency of development. Less debugging in development. In addition; it allows for more engineers to contribute
to a single codebase as it provides fore robustness and more visibility into code.

<br/>

#### <b>Containerization (Using Docker) </b>

Again; from what I gathered during the technical interview with Stefan and Pavlo; Cointracker's infrastructure is growing and therefore there is a growing need
to begin to migrate the infrastructure to a more robust cloud offering (From Heroku to AWS/GCP/Azure etc). By using docker to build containers; it allows the
application to be easily portable between cloud service providers. It has been established that docker is the de-facto container run time system for many cloud
providers and many of these servers come already preconfigured with docker. Using docker greatly reduces development time as engineers will not have to spend
precious time configuring servers. Not only does precious time get saved; applications become easily migratable between cloud providers and this greatly reduces
the cognitive load that comes with application deployment.

Docker also allows for taking advantage of building distributed systems (Microservices). Since Cointracker is growing its infrastracture and is looking forward
to spltting its application into microservices; docker sits in perfectly with a microservices architecture and that is why I choose to use containerization this
application.

#### <b>12-Factor App</b>

I built this application using the [12-factors](https://12factor.net/). The 12-factor is a methodology that allows one to build a completely cloud native
suitable for deployments in any cloud platform.

<br>

## Setup

#### <b>1. Update environment variables</b>

Rename `.env.example` to `.env`. YOu may update the values or leave as the default.

#### <b>2. Install docker</b>

Ensure you hace docker installed. Installation instructions can be found [here](https://docs.docker.com/engine/install/)

#### <b>3. Build image</b>

Run the build commmand below to build your image \
`docker build . -t josephakayesi/cointracker`

#### <b>4. Run application</b>

Run the application by using docker compose `docker compose up`
