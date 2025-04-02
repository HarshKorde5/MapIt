# MapIt - Case Study


## Project Description

A web application using the React framework that allows users to view a list of profiles and interactively explore the addresses of each profile on a map. The application aims to provide an intuitive and user-friendly way to navigate through profiles and visualise the geographic locations associated with each individual.


## Dependencies :
- @react-google-maps/api
- @reduxjs/toolkit
- @tailwindcss/vite
- json-server
- framer-motion
- lucide-react
- react
- react-dom
- react-icons
- react-redux
- react-router-dom

## Requirements :
#### Before youu begin, ensure that you have installed following things.

- Node.js (v18 or higher)
- npm (v9 or higher)
- A stable internet connection to fetch api data


### Installation

#### Clone the repository

    git clone https://github.com/harshkorde5/MapIt.git

#### Install dependencies

Navigate to the /project/backend/ folder and perform `npm install`

Navigate to the /project/frontend/ folder and perform `npm install`


Note : `npm install` will install all dependencies via refering to package.json file.

## JSON server :

Currently I've used dummy JSON server to fetch data for the application we can further scale it to a proper backend using MERN stack or any other tech-stack.

#### Steps to create a Dummy JSON server :

1. Create a Folder for Backend.
2. Inside the backend folder run the following command : `npm init`
3. After successful execution of above command `package.json` and `package-lock.json` files are created in your backend folder.
4. Further execute `npm install json-server` command.This command will install json-server and a node_modules folder with required depenedencies.
5. Create a `db.json` which is basically your data for the database in the form of JSON.
6. Add the following script in the `package.json` file : 
```javascript
"scripts": {
    "dev": "json-server --watch db.json --port 5000"
}
``` 
7. Open the terminal and navigate to your backend folder which has all the above setup.
8. Run the following command now : `npm run dev`.
9. The dummy JSON server is deployed, you can check by navigating to `http://localhost:5000/profiles` (for our project) on the browser, this will display the response data to the api `/api/profiles`.


## How to execute ?

**Note :**
Before executing ensure you have generated your API_KEY for Google Maps from Google Clouds Platform Console.

Create your own API Key from Google Clouds Platfom : [Console](https://console.cloud.google.com/)

Follow the steps to generate a new API Key and enable **Maps JavaScript API**.

### Start the development server for both backend and frontend using:
Note : Do it after navigating for each folder (i.e. frontend and backend seperately).

```
 npm run dev
```


### Open in browser

http://localhost:5173




### The key functionalities of the application include:
1. Profile Display: A webpage that presents a collection of profiles,
each comprising essential information such as the person's name,
photograph, and a brief description.
2. Interactive Mapping: An interactive map component that can
dynamically display addresses based on user interactions. This map will
allow users to see the geographical location associated with each profile.
3. Summary Integration: A "Summary" button adjacent to each
profile. Clicking this button should trigger the display of the map
component with a marker indicating the precise address of the selected
profile.
4. Map Services Integration: External map services like
Google Maps to integrate the mapping functionality into the
application. This entails setting up markers and correctly rendering
addresses on the map.
5. User-Friendly Experience: Ensure that the application offers a smooth and intuitive user experience, enabling users to easily navigate profiles and access mapped addresses without confusion.
6. Profile Data Management : Allow administrators to add, edit, or delete
profiles.
7. A admin panel or dashboard to manage the profile data efficiently.
8. Search and Filter Functionality : Provide users with the ability to search and filter profiles based on different criteria, such as name, location, or other attributes. This enhances the usability of the application.
9. Profile Details: Create a separate profile details view that provides more in-depth information about each profile when a user clicks on a profile card. This can include additional details like contactinformation, interests,etc.

### Outcome :
The application will offer an innovative solution for users interested in exploring the geographic distribution of profiles, enhancing user engagement and interaction.


**Contributing**

Contributions to this project are welcome! If you encounter any issues or have suggestions for improvements, please feel free to submit a pull request.

**Contact**

📧 Email: harshkorde05@gmail.com 

🌐 LinkedIn: [linkedin.com/in/harshkorde](https://www.linkedin.com/in/harshkorde)

For any further questions or inquiries, feel free to reach out. We are happy to assist you with any queries.