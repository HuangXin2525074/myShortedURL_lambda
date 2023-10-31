# myShortedURL_lambda
Backend Tech Stack: AWS lambda, dynamo DB, serverless framework

ShortedURL approaches: To generate the shortened URL, I used Base62 conversion. This approach works because there are 62 possible characters for the hash value.
With each insertion, the count number is updated, ensuring it remains unique.
