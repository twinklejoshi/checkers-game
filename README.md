# Checkers game

### Live demo: 

## Description

A simple checkers game app to be played with computer.

**Technical deep dive on state management:** For parent-child state management, ```useState``` is used and for global one ```useContext``` is implemented. Redux in my opinion would have been an overkill for this one.


## Features available

* Game mechanics: taking turns, basic moves and jumps over the enemy checkers.
* Players can either click or drag-n-drop checkers using a mouse.
* For a possible move cells are hightlighted on mouse over, click and drag checker
* If there is an opportunity to capture an enemy checker - it is the only valid move
* Computer player: could make a move to any random valid cell
* Number of moves and pieces left for each of players are calculated

## Tech stack
* React
* Typescript
* Sass (Although Sass is being used here, it is not required. It is more of a preference.)

## Future enhancemenmts
* Implement win game criteria
* Allow second person as a player
* Add responsiveness for smaller screen sizes

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## References 
* https://github.com/robert-lester/React-Checkers-Game
* https://codepen.io/cjl014/pen/wVJaad
* https://github.com/Lassitek/react-js-checkers
* https://codepen.io/caleboleary/pen/qRgJLN
* https://codesandbox.io/p/sandbox/checkers-game-59l49?file=%2Fsrc%2Findex.js
* https://devindetails.com/react-function-components/
* https://mariusniemet20.medium.com/how-i-built-a-checkers-game-with-javascript-64c84ae9edd9
* https://andrea-campos.com/projects/react-checkers/
* https://github.com/tomi-lui/checkers-AI/tree/main
* https://chatgpt.com/
