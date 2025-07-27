#!/bin/bash
#update system package list
sudo yum update -y

#install apache web server (httpd)
sudo yum install httpd -y

#start apache web server
sudo systemctl start httpd

#enable apache web server to start on boot 
sudo systemctl enable httpd

#check status of apache web server
sudo systemctl status httpd

#optional: create a simple HTML file to verify the web server is running
echo "<html><body><h1>Welcome to my AWS EC2 instance!</h1></body></html>">
/var/www/html/index.html


#------------------------compressed version------------------------
#!/bin/bash

sudo yum update -y
sudo yum install httpd -y
sudo systemctl start httpd
sudo systemctl enable httpd
sudo systemctl status httpd

echo "<html><body><h1>Welcome to my AWS EC2 instance!</h1></body></html>">
/var/www/html/index.html

#!/bin/bash

# Update system package list
sudo yum update -y

# Install Apache web server (httpd)
sudo yum install httpd -y

# Start Apache web server
sudo systemctl start httpd

# Enable Apache web server to start on boot
sudo systemctl enable httpd

# Check status of Apache web server
sudo systemctl status httpd

# Optional: create a simple HTML file to verify the web server is running
echo "<html><body><h1>Welcome to my AWS EC2 instance!</h1></body></html>" | sudo tee /var/www/html/index.html
