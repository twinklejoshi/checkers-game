# Checkers game

### Live demo: 

## Description

A simple checkers game app to be played with computer.

**Technical deep dive on state management:** For parent-child state management, ```useState``` is used and for global one ```useContext``` is implemented. Redux in my opinion would have been an overkill for this one.


## Features available

* Game mechanics: taking turns, basic moves and jumps over the enemy checkers.
* Players can either click or drag-n-drop checkers using a mouse.
* For a possible move cells are hightlighted on mouse over and drag checker
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

## Steps to run app locally
* Clone the project: `git clone https://github.com/twinklejoshi/checkers-game.git`
* Install packages by running `npm i` (Make sure it points to the project that was cloned from git)
* Run `npm start` (Make sure it points to the project that was cloned from git)
   - This will open http://localhost:3000 to view app in the browser.

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
