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

- Changed title and favicon and fixed some cconsole error

- make an central error handler for all the API errors
- make loading feature or skeleton UI
- Add skills in signup and profile page to save in DB
- make common component for request and connection
- add pagination to get users data in the profile page

## Deployement front end

- Signup to AWS
- Launch instance and make secret key to access the instance or server
- unlock the secret key file chmod 400 <secret>.pem
- start the instance ssh -i <secret>.pem ubuntu----
- Install npm and same version as project
- Git clone project
- Frontend steps
- npm install dependencies
- npm run build
- sudo apt update (update ubuntu)
- sudo apt install nginx
- sudo systemctl start nginx
- sudo systemctl enable nginx
- Copy code from devtinder/dist file to /var/www/html/
- sudo scp -r dist/\* /var/www/html/
- Enable port :80 from AWS instance -> security -> security group
- Update the base url to "/api"

# Adding a Custom Domain name

- purchase domain name from goDaddy
- signup on the cloudflare & add new domain name
- change the nameserver on goDaddy and point to cloudflare
- wait for cloudflare to update the nameserver
- In DNS -> records Edited the A records with the ip address of
  our AWS instance public IP address in content
- Enable SSL flexible for our site
