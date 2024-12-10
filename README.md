# CV Builder App Setup Guide

## Getting Started

Follow these steps to set up and run the application with Vite.

---

### 1. Prerequisites

Ensure the following are installed on your system:

-   **Node.js** (v14.18+ recommended)
-   **npm** (npm comes bundled with Node.js)

---

### 2. Clone an Existing Repository

If you're starting from an existing repository, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/rightbrain/signup-node.git
    ```

2. Move into the project folder:

    ```bash
    cd /signup-node/client
    ```

3. Install the required dependencies:

    ```bash
    npm i
    ```

### 3. Set Up Environment Variables

1. In the root directory of your project, create a `.env` file:

    ```bash
    touch .env
    ```

2. Open the `.env` file and add the following variables:
    ```bash
    VITE_API_BASE_URL=http://localhost:8080/api/v1
    VITE_BASE_URL=http://localhost:8080
    ```

### 4. Start the Development Server:

Run the following command to start the development server:

```bash
npm run dev
```

Note: First set up the backend server, then run the frontend on the browser.

---

## Backend setup

1. Move to the backend directory with another terminal window:
    ```bash
    cd /server
    ```
2. Install the required dependencies:
    ```bash
    npm i
    ```

## Environment setup

1. In the root directory of your project, create a `.env` file:
    ```bash
    touch .env
    ```
2. Open the `.env` file and add the following variables:
    ```bash
    MONGODB_URI=mongodb://localhost:27017/cv_bilder_DB
    JWT_SECRET=demo_rbs123
    ```

## Install MongoDB and MongoDB Compass (Database GUI) for Ubuntu (Other platforms may require different instructions)

1. Download and install MongoDB from [https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-ubuntu/#std-label-install-mdb-community-ubuntu).

2. Verify MongoDB installation:
    ```bash
    sudo systemctl status mongod
    ```
3. Download and install MongoDB Compass from [https://www.mongodb.com/try/download/compass](https://www.mongodb.com/try/download/compass).

4. Verify MongoDB Compass installation:
    ```bash
    mongodb-compass --version
    ```

## Create a new Database

1. Open MongoDB Compass.
    ```bash
    mongodb-compass
    ```
2. Click on the new connection button (+) button.
3. With the uri set to `mongodb://localhost:27017` and set a name, finally press save & connect button.
4. Create a new database by selecting the new created connection. Enter a name for your database ( "cv_bilder_DB" in this case, so that it matches the name in the `.env` file).
5. Enter the database name and a collection name ( "users" in this case, all the other collections will be created automatically).
6. Click on the "Create Database" button.
7. You should now have a new database named "cv_bilder_DB" in MongoDB Compass.

## Start the backend server

1. Run the following command to start the backend server:

    ```bash
    npm run dev
    ```

2. The backend server should start running in the background, and you should see a message indicating that the server is running at `http://localhost:8080` in your terminal.

## View the Frontend

Open a browser and visit `http://localhost:5173`. You should see the CV Builder App running in development mode.
