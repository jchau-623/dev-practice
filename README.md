This is a web app inspired by AirBnB.

# Technologies Used

<img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flask/flask-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sqlalchemy/sqlalchemy-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original-wordmark.svg" height=40 />
<img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"  height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" height=40/><img  src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"  height=40/><img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" height=40 />

- Amazon web services
- Python
- Flask
- React
- Redux
- HTML
- CSS
- Node
- Postgres
- Sequel Alchemy
- JavaScript
- Docker

Getting Started
Clone the repository

[git@github.com:jchau-623/dev-practice.git]
CD into the /app directory and install dependencies

 pipenv install
CD into the /react-app directory and install dependencies

 npm install
Create a .env file based on the example with proper settings for your development environment

Setup your PostgreSQL user, password and database and verify that it matches your .env file

Start your shell, migrate your database, seed your database, and run the flask app

 pipenv shell


 flask db upgrade


 flask seed all


 flask run
Create your AWS user and bucket:

-Create a bucket:

 (https://s3.console.aws.amazon.com/s3/home?region=us-east-1)
-Create a user with programmatic access by navigating to:

 (https://console.aws.amazon.com/iam/home?#/users)
-Set up a security policy for your user: 'Attach existing policies directly' => 'Create Policy'

-Click the JSON tab and set a policy:

   {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Sid": "Stmt1420751757000",
        "Effect": "Allow",
        "Action": ["s3:*"],
        "Resource": "arn:aws:s3:::<NAME OF BUCKET>/*"
      }
    ]
   }
-Now update your .env with your S3_BUCKET, S3_KEY, S3_SECRET

Open another terminal and change directory into /react-app and run the React app

   npm start
