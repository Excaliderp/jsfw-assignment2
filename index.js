import chalk from 'chalk';
import fs from 'fs'
import {formatDistanceToNow, parse, format, set, isAfter, isBefore, isToday} from 'date-fns';
import { Command } from 'commander';
import getGitVersion from './src/getGitVersion.js';

const gitVersion = await getGitVersion()
// console.log(`git version: ${gitVersion}`);

const first = 'Timothy'
const last = 'Karlsson'
const name = `${chalk.bgGreenBright(first)} ${chalk.bgBlueBright(last)}`
// console.log('name', name)

// process.env.npm_config_user_agent only works when using `npm run start` not `node index.js`
// console.log(`npm & node: ${process.env.npm_config_user_agent}`)

const startOfCourse = new Date(2023, 0, 31)
// console.log(formatDistanceToNow(startOfCourse))

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
const today = format(new Date(), "yyyy-MM-dd hh:mm")



let isBeforeTest = isBefore(dateSentAsArgument, currentDate);
let isTodayTest = isToday(dateSentAsArgument);
let isAfterTest = isAfter(dateSentAsArgument, currentDate);

console.log(isBeforeTest)
console.log(isTodayTest)
console.log(isAfterTest)

console.log('isToday', isToday(dateSentAsArgument))
console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
console.log('isBefore', isBefore(dateSentAsArgument, currentDate))
// console.log(currentDate)

const htmlContent = `
<!DOCTYPE html>
<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<link rel="stylesheet" href="src/style.css">
    <title>Assignment 2</title>
	</head>
  <body>
    <header>
      <h1>Assignment 2</h1>
    </header>
    <main>
      <div class="contentbox">
        <h2>Versions</h2>
        <p>
          npm & node: ${process.env.npm_config_user_agent}<br>
          git version: ${gitVersion}
        </p>
      </div>

      <div class="contentbox">
       <h2>Time</h2>
       <p>
       Since course started: ${formatDistanceToNow(startOfCourse)}
       </p>
       <p>
       File created/updated: ${today}
       </p>   
      </div>

    <div class="contentbox">
      <h2>User input</h2>  
      <h3>Unlock the hidden info by putting "npm run start --date yyyy-MM-dd" into the terminal, giving a date of your choice!</h3>
      <p>Is your given date today? ${isTodayTest}</p>
      <p>Is your given date in the future? ${isAfterTest}</p>
      <p>Is your given date in the past? ${isBeforeTest}</p>
    </div>
  </main>

  <footer>
  <h2>Made by ${first} ${last}</h2>
  </footer>

  </body>
</html>
`;

const fileContent = `
name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}

Since course started: ${formatDistanceToNow(startOfCourse)}
File created/updated: ${today}

Is your given date today? ${isTodayTest}
Is your given date in the future? ${isAfterTest}
Is your given date in the past? ${isBeforeTest}
`;

await fs.promises.writeFile('index.md', fileContent);
await fs.promises.writeFile("index.html", htmlContent);

