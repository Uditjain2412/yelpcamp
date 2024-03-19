# YelpCamp

YelpCamp is a web application built with Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap. It allows users to discover and share campgrounds, as well as leave reviews for campgrounds they have visited.

## Features

- User Authentication: Users can register and login to the application securely.
- Campground Management: Authenticated users can add new campgrounds, view all campgrounds, and edit or delete campgrounds they own.
- Review System: Users can leave reviews for campgrounds, which can be viewed by other users.
- Interactive Map: Users can view a clustered map of all campgrounds for easy navigation.

## Technologies Used

- **Node.js**: A JavaScript runtime for server-side development.
- **Express.js**: A web application framework for Node.js, used for building the RESTful API.
- **MongoDB**: A NoSQL database used to store campground and user data.
- **HTML/CSS/Bootstrap**: Frontend technologies used for creating the user interface and styling.

## Getting Started

To get started with YelpCamp, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Uditjain2412/yelpcamp.git
   ```

2. Install dependencies:

   ```bash
   cd yelpcamp
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following variables:

   ```plaintext
   PORT=3000
   DB_URL=your_mongodb_uri
   SECRET=your_session_secret
   MAPBOX_TOKEN=your_mapbox_token
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloudname
   CLOUDINARY_KEY=your_cloudinary_key
   CLOUDINARY_SECRET=your_cloudinary_secret
   ```

4. Run the application:

   ```bash
   npm run dev
   ```

5. Visit `http://localhost:3000` in your web browser to access YelpCamp.

## Contributing

Contributions are welcome! If you have any ideas for new features, find any bugs, or want to improve the documentation, feel free to open an issue or submit a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgements

- This project was inspired by Colt Steele's Web Developer Bootcamp on Udemy.
- Special thanks to the developers of Node.js, Express.js, MongoDB, HTML, CSS, and Bootstrap for providing the tools necessary to build this application.
