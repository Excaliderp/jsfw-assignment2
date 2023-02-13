import chalk from 'chalk';
import fs from 'fs/promises'
import { formatDistanceToNow, isAfter, isBefore, parse, format, isToday, set } from 'date-fns'
import { Command } from 'commander';
import getGitVersion from './getGitVersion.js';
import path from "path"

const gitVersion = await getGitVersion()
console.log(`git version: ${gitVersion}`);

const first = 'Timothy'
const last = 'Karlsson'
const name = `${chalk.bgGreenBright(first)} ${chalk.bgBlueBright(last)}`
console.log('name', name)

// process.env.npm_config_user_agent only works when using `npm run start` not `node index.js`
console.log(`npm & node: ${process.env.npm_config_user_agent}`)

const startOfCourse = new Date(2023, 0, 31)
console.log(formatDistanceToNow(startOfCourse))

const argumentParser = new Command();
argumentParser.option('--date')
argumentParser.parse();

const dateStringSentAsArgument = argumentParser.args[0]
const dateSentAsArgument = parse(dateStringSentAsArgument, 'yyyy-MM-dd', new Date())
const currentDate = set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
const currentDateTime = format(new Date(), "yyyy-MM-dd hh:mm")

// console.log('isToday', isToday(dateSentAsArgument))
// console.log('isAfter', isAfter(dateSentAsArgument, currentDate))
// console.log('isBefore', isBefore(dateSentAsArgument, currentDate))
// console.log(currentDate)



const fileContent = `
name: ${first} ${last}
npm & node: ${process.env.npm_config_user_agent}
git version: ${gitVersion}

Since course started: ${formatDistanceToNow(startOfCourse)}
File created/updated: ${currentDateTime}
`;

const htmlContent = `
<html>
  <head>
    <title>Assignment 2</title>
  </head>
  <body>
    <h1>Assignment 2 ${first} ${last}</h1>
    <div class="versions">
      <h2>Versions</h2>
      <p>
        npm & node: ${process.env.npm_config_user_agent}
        git version: ${gitVersion}
      </p>
    </div>
    <div class="time">
     <h2>Time</h2>
     <p>
      Since course started: ${formatDistanceToNow(startOfCourse)}
      File created/updated: ${currentDateTime}
     </p>
  </div>
  </body>
</html>
`;

await fs.writeFile('index.md', fileContent);

const filePath = path.join(__dirname, 'index.html');

await fs.writeFile(filePath, htmlContent);

