### About
Running index.handler lambda function exports covid-19 data from github repository to an s3 bucket

https://docs.aws.amazon.com/

Data-source
https://github.com/CSSEGISandData/COVID-19
eu-west-3

neat-csv
https://github.com/sindresorhus/neat-csv

Debugging
Thundra debugger extension in VS code
https://console.thundra.io/

Setup
https://console.thundra.io/onboarding/debugger
Enable the online debugging using by adding the thundra_agent_lambda_debugger_auth_token environment variable. Then set your authentication key to this environment variable. This way, Thundra will start your function in debug mode. You will be able to connect your function from your IDE to start the debugging session.

1. Thundra: Start Debugger
2. Now invoke your AWS Lambda function to hit on the debug point.


### Updating lambda function
https://docs.aws.amazon.com/lambda/latest/dg/nodejs-package.html
https://covid-19-crawler-code.s3.eu-west-3.amazonaws.com/publish.zip