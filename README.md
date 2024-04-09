<!--### You can find Link for Auction website Here 
https://msrbidding.onrender.com/Main-->

### Welcome to AuctionSphereX

You can find the link for the Auction website [here](https://msrbidding.onrender.com/Main).

#### Running Locally

If you want to run it on your local system, follow these steps:

1. **Clone the Repository:**
    ```bash
    git clone https://github.com/Koya-Madhusudhana-Rao/AuctionSphereX.git
    ```

2. **Install Dependencies:**
    ```bash
    npm install
    ```

3. **Open in VS Code:**
    Open your preferred editor, such as Visual Studio Code, and navigate to the root directory:
    ```
    ..\.\.\AuctionSphereX>
    ```

4. **Set Up Environment Variables:**
    Create a `.env` file in the root directory and define the following variables:
    ```plaintext
    mongo_url = YOUR_MONGODB_URL
    jwt_secret = YOUR_JWT_TOKEN
    cloud_name = 
    cloud_api_key= 
    cloud_api_secret = 
    ```

5. **Start Frontend:**
    Split the terminal and navigate to the client folder:
    ```bash
    cd client
    npm install
    npm start
    ```

6. **Access the Website:**
    Once the frontend is running, you can view the website in your browser at [http://localhost:3000/login](http://localhost:3000/login).

7. **Start Backend:**
    Navigate back to the root directory and start the backend:
    ```bash
    npm start
    ```

You should see the message:

Node/Express Server started on port 5000

Mongo DB Connection Successful

Now, both frontend and backend are up and running locally.

Enjoy exploring AuctionSphereX!

