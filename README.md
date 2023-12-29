![Logo](/docs/logo.jpg)
# Soul Carneval API Documentation

Welcome to the Soul Carneval API documentation. This readme provides information about the API endpoints and functionalities. For the documentation of the Soul Carneval web app, please visit the following link: [Soul Carneval Repository](https://github.com/RogerWDavis/Soul-Carneval.git).

## Table of Content
- [Database](#database)
  * [Comment:](#comment-)
  * [Follower:](#follower-)
  * [Like:](#like-)
  * [Post:](#post-)
  * [Profile:](#profile-)
- [Testing](#testing)
  * [Languages](#languages)
  * [Frameworks](#frameworks)
  * [Database](#database-1)
  * [Tools](#tools)
  * [Supporting Libraries and Packages](#supporting-libraries-and-packages)
- [Deployment](#deployment)
  * [Django Documentation:](#django-documentation-)


## Database
The Soul Carneval utilizes the following Models:

### Comment: 
This model represents comments made by users. It is associated with the User model (as the owner of the comment) and the Post model. In addition to the content of the comment, it keeps track of the times when each comment was created and last updated.

### Follower: 
This model maintains the follower-following relationships between users. It is related to the User model twice, once for the owner of the follow (the follower) and once for the followed user. A timestamp of each follow event is also stored.

### Like: 
This model captures the likes given by users either to a post or a comment. It is linked to the User, Post, and Comment models. It also records the time when each like event was created.

### Post: 
This model represents the posts made by users. It is related to the User model as the owner of the post. It keeps track of the times when each post was created and last updated, along with the content of the post including the title, image, and location information.

### Profile: 
This model extends the User model with additional user-specific information such as their name, profile image, and other personal details. It also keeps timestamps of when each user profile was created and last updated. The creation of a Profile object is automatically triggered by the creation of a User object, thanks to the post_save signal connected to the create_profile function.

Each of these models serves a unique purpose and together they support a range of features in your application, from user registration and social networking to content creation and curation.


## Testing
All tests for the Soul Carneval API have been passed, demonstrating its readiness for deployment and public use. 

### Languages
- Python

### Frameworks
- Django: A high-level Python web framework used for building the Soul Carneval API.

### Database
- ElephantSQL: ElephantSQL is a PostgreSQL database as a service. It is used as the database for the Soul Carneval project, providing a reliable and scalable storage solution for the application's data.

### Tools
- Git: A distributed version control system used for tracking changes in the project's source code.
- GitHub: A web-based hosting service for version control repositories, used for storing and managing the project's source code.
- Gitpod: An online integrated development environment (IDE) used for developing and testing the Soul Carneval project.
- Heroku: A cloud platform that enables deployment and hosting of web applications. Heroku was used for deploying the Soul Carneval project to a live server.

### Supporting Libraries and Packages
- asgiref: A server gateway interface for Django, it acts as a translation layer between the web server and Django.
- cloudinary, django-cloudinary-storage: Used for managing the storage and delivery of images through Cloudinary, a cloud-based service.
- dj-database-url: Utility to help you load your database into your dictionary from the DATABASE_URL environment variable.
- dj-rest-auth, Django-allauth, djangorestframework-simplejwt, PyJWT, oauthlib, requests-oauthlib, python3-openid: These libraries are used for managing user authentication, providing support for JWT tokens, OAuth and OpenID.
- Django, djangorestframework, django-filter: These are core components of the Django web framework, used for building the backend of the Travel Tickr application.
- gunicorn: A Python WSGI HTTP server for UNIX, used in deploying the application.
- Pillow: An imaging library in Python, allowing support for opening, manipulating, and saving many different image file formats.
- psycopg2: PostgreSQL adapter for Python, enabling Python to connect to the PostgreSQL database.
- pytz: A Python library that enables accurate and cross-platform timezone calculations.
- sqlparse: A non-validating SQL parser module for Python, it provides support for parsing, splitting and formatting SQL statements.

## Deployment
Deploying the Django backend of the Soul Carneval application involves below steps:

1. **Create Required Accounts**: If you haven't done so yet, create accounts on Heroku, ElephantSQL, and Cloudinary. These services are necessary for hosting the application, managing the database, and storing images, respectively.

2. **Prepare the Application**: Set DEBUG to False in the settings.py file, which ensures that the application runs in production mode during deployment. Commit all changes and push your code to your GitHub repository.

3. **Create a New Application on Heroku**: From your Heroku dashboard, create a new application and select the appropriate region.

4. **Set Environment Variables**: In your local env.py file, set your environment variables including the ElephantSQL URL, Cloudinary URL, and Django Secret Key. These variables should also be added to your Heroku app settings under the Config Vars section. This ensures that these services can communicate with your Heroku app.

5. **Database Management**: Ensure that all database migrations have been made and the current state of your models is reflected in the database schema. The command python manage.py makemigrations and python manage.py migrate are usually used for this purpose in Django.

6. **Deployment Process**: In your Heroku dashboard, go to your application's deploy page. Connect your GitHub repository to your Heroku application under the "Deployment method" section. Under the "Manual deploy" section, select the branch you want to deploy and click "Deploy Branch".

7. **Verify Deployment**: Once the deployment is successful, Heroku will provide a URL to access the live application. Test the application to ensure all components are functioning properly.

Remember to avoid exposing your environment variables in your public repository. Use the Config Vars section in Heroku to securely set your environment variables.

