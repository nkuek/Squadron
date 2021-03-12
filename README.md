# Introducing Squadron!

## What is Squadron?
- **Squadron** is a way to link up with other gamers
- Browse, find, create, or join `squads` and play a variety of popular games with your squad mates
- Create events on your `Squad`'s page that squad mates can RSVP to
- Check on my progress [here](https://squadron-gaming.herokuapp.com/)!

## Working Feature List
- ###User Authentication
  - Registration
  - Login
  - Logout
  - Limited website functionality without logging in
- ###Game page list
  - Browse games by popularity or metacritic rating
  - Clicking on a game card will take you to the game page to display more information about the game
  - Add games from the game page list to your profile (only for logged in users
- ###Squads
  - Squads page
    - Browse squads by category: gaming, social, or trading
    - See list of the squads you've joined by clicking on `Your Squads`
    - See list of squads you've joined by category by clicking on the respective categories underneath `Your Squads`
  - Squad creation

## Technologies Used
-  React/Redux for the frontend
-  JavaScript/Express for the backend
-  CSS
-  `React Async Helmet`
  - Wraps your component in a provider which allows you to dynamically change the page's title
- `React Infinite Scroll`
  - npm package that can execute a fetch request to load more data once the user reaches a certain point  position on the page

## Challenges Faced
- Data flow
  - This was the first time I have had to work on both the frontend and backend to build an app from scratch. As my app grew larger, I found it increasingly difficult to follow the flow of data: from the frontend fetch request, to the backend API, back to the frontend. It became increasingly evident how important having a good naming scheme for variables and files as well as commenting in your code is. If you don't have good names, you'll likely get lost in your own code (which is something that unfortunately happened to me a lot).
- State management
  - This was also the first time I've gotten free reign to utilize React and Redux together. As such, I definitely noticed how difficult it was to keep track of state. A lot of the struggle in the beginning was figuring out how I can wait for the thunk action to be complete before rendering the page. Through my struggles, I figured out that this can be achieved by combining React state and Redux. You can simply wrap have a React state with an initial value of false. Then you can wrap the thunk action in a useEffect() and set the React state variable to true once the action is complete, thus triggering a rerender of the page.  Finally, all there is left to do is conditionally render the component based on the value of the React state variable.
- Styling
  - CSS and styling continue to be a struggle for me. I think I always have a pretty good idea of the layout I want on the page, but executing it in CSS is not always the easiest thing to do. This also ties back to having a good naming scheme. Coming up with unique class names for your elements is definitely, challenging, but very rewarding in the end. Also, div soup is life.
