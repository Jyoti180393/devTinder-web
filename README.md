# DevTinder Web

- Create a vite + react app
- remove unecessary code and push the code to Git
- INSTALL Tailwind in devDependencies
- INSTALL daisyUi and add Navbar
- Create NavBar component for seprate navbar logic
- INSTALL react-router-dom
- Create BrowserRouter > Routes > Route => /Body > ChildRoutes
- Create an outlet in your Body Component
- Create a Footer Component

- INSTALL Axios and handle the login
- Fix CORS issue from BE and FE with configuration
- Set token in browser Cookies
- INSTALL react-redux + @reduxjs/toolkit
- configureStore > provider > createSlice > add reducer to store
- Save login data to store
- Update Navbar with user profile photo and navigate to feed page
- Folder structure + constant file
- Implemented logout and navigate to login

- Retaining user data on reload if user is logged in or else redirect to /login
- Adding feed Api call in profile component
- Added feedSlice to save feed data to Store
- Added logout feature

- Added Profile edit functionality and toast message on saving and errors on validation faliure
- Fixed UI issue related to reusable UserCard

- Added connections page to see all the connection of loggedIn user
- Added requests page to see all the connection requests of loggedIn user
- Added Accept and Reject connection request feature
- Added Send/Ignore connection request feature in user card

- Added signup form with a reusable dropdown component
- Integrated /signup API and navigating to profile page

- Clear all store on logout
- Added Gender dropdown in Profile edit page
- Adding ellipse and hover in about section of Request

- Changed title and favicon and fixed some console error
- Handling the 0 feed length case
- Making base url dynamic

 <!-- TODO -->

- make an central error handler for all the API errors
- make loading feature or skeleton UI
- Add skills in signup and profile page to save in DB
- make common component for request and connection
- add pagination to get users data in the profile page

## RazorPay Payment Gateway Integration

- Signup for RazorPay and get the API Key and Secret
- Created UI for premium subscription and added a button to pay for premium
- Added a new route for payment page and added a new component for payment
- Handled payment Api call
- Once the order is created, call the RazorPay dialog box for checkout and handle the payment from BE
