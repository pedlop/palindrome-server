# Palindrom Server - PS

Palindrome - rest api.

## Notes

### Installation

PS requires [Node.js](https://nodejs.org/) v11+ to run.

Install the dependencies and devDependencies and start the app.

```sh
$ cd palindrome-server
$ npm install
$ npm start
```

#### Errors

If the request you make doesn't go through, Mastodon will usually respond with an [Error](#error).

## Methods

### Words

#### Reading all words:

    GET /words

Returns the list [Words](#word).

#### Creating a words:

    POST /words

Form Data:

| Field        | Description   | Optional   |
| ------------ | ------------- | ---------- | 
| `first_word` | Any random word | No |
| `second_word` | Any random word | No |

Returns [Success Response](#success-response).

## Entity

### Word

| Attribute   | Description     | Nullable |
| ----------- | --------------- | -------- |
| `_id` | The word id | no | 
| `words` | The 2 words typed by user [Word Checker](#word-checker) | no | 

### Word Checker
| Attribute   | Description     | Nullable |
| ----------- | --------------- | -------- |
| `word` | Word typed by user | no | 
| `is_palindrome` | Boolean if word is palindrome or not | no |

### Success Response
| Attribute   | Description     | Nullable |
| ----------- | --------------- | -------- |
| `name` | String name text | yes |
| `message` | String message text | no |

### Error

The most important part of an error response is the HTTP status code. Standard semantics are followed. The body of an error is a JSON object with this structure:

| Attribute   | Description     | Nullable |
| ----------- | --------------- | -------- |
| `error_code` | String name text | yes |
| `error_name` | String message text | yes |
| `error_description` | String message text | yes |