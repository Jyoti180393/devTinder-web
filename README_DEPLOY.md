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
- Copy code from devtinder/dist file to /var/www/html/ ---> sudo scp -r dist/\* /var/www/html/
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
