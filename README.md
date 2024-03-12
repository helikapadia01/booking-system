Booking Management Application
==============================

This application is designed to facilitate the management of bookings, catering to two primary user roles: Creators and Workers. Creators are responsible for creating bookings, while Workers have the authority to accept or reject these bookings. The application includes CRUD (Create, Read, Update, Delete) operations to efficiently manage bookings and user information.

Table of Contents
-----------------

-   [Features](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#features)
-   [Technologies Used](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#technologies-used)
-   [Database Design](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#database-design)
-   [API Endpoints](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#api-endpoints)
-   [Getting Started](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#getting-started)
-   [Contributing](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#contributing)
-   [License](https://chat.openai.com/c/c0fce79a-ca03-4603-a69a-8c879ef189e9#license)

Features
--------

-   User Management: Users can register, login, and view their profiles.
-   Booking Creation: Creators can create new bookings, specifying relevant details.
-   Booking Approval: Workers can accept or reject bookings based on their availability or other criteria.
-   CRUD Operations: Creators can perform CRUD operations on bookings.
-   Role-based Access Control: Access to certain features is restricted based on the user's role (Creator or Worker).

Technologies Used
-----------------

-   Backend: Node.js with Express.js
-   Database: PostgreSQL
-   ORM: Sequelize
-   Authentication: JSON Web Tokens (JWT)
-   Testing: Jest
-   Documentation: Swagger

Database Design
---------------

The application consists of two primary tables:

1.  User: Stores information about users, including their ID, name, email, and role.

    -   Fields: `id`, `name`, `email`, `role`
    -   Role Enum: `Creator`, `Worker`
2.  Booking: Contains details about each booking created by Creators.

    -   Fields: TBD based on requirements

API Endpoints
-------------

Detailed documentation of API endpoints can be found in the Swagger documentation.

Getting Started
---------------

To get started with the Booking Management Application, follow these steps:

1.  Clone the repository: `git clone https://github.com/your/repository.git`
2.  Install dependencies: `npm install`
3.  Set up the database: [Instructions here]
4.  Configure environment variables: Create a `.env` file and populate it with necessary variables.
5.  Start the server: `npm start`

For more detailed instructions and documentation, refer to the README file in the repository.

Contributing
------------

If you have any ideas, suggestions, or improvements, feel free to open an issue.