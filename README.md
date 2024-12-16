# [Dev]Food

[Dev]Food is a delivery app simulator inspired by iFood, designed for developers and tech enthusiasts to explore features like order management, restaurant integration, and delivery logistics in a controlled environment.

## Features

- **Order Management**: Users can place, view, and manage orders.
- **Restaurant Integration**: Integration with a list of restaurants, with the ability to display menus and process orders.
- **Delivery Logistics**: Map integration to show delivery routes and directions.
- **Profile Management**: Users can edit and update their profile information.
- **Real-time Data**: Uses Supabase for backend data management and user authentication.

## Libraries

- [stack-navigator](https://reactnavigation.org/docs/stack-navigator/): For managing navigation in the app.
- [expo-location](https://docs.expo.dev/versions/latest/sdk/location/): For handling location data to simulate delivery routes.
- [vector-icons](https://ionic.io/ionicons): For icons used throughout the app.
- [map-view](https://docs.expo.dev/versions/latest/sdk/map-view/): For displaying maps in the app.
- [maps-direction](https://www.npmjs.com/package/react-native-maps-directions/v/1.4.0): For integrating map directions.

## Database

- [Supabase](https://supabase.com/docs/guides/auth/quickstarts/react-native): For managing user authentication and profile data. Supabase provides real-time database capabilities and an easy-to-use API for interacting with backend services.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/DevFood.git

2. **Navigate to the project directory:**
   ```bash
   cd DevFood

3. **Install dependencies: Make sure you have Node.js installed, and then run the following command:**
   ```bash
   npm install

4. **Set up Supabase:**
  - Create a Supabase account and a new project.
  - In the Supabase dashboard, create a table for user profiles (if not already set up).
  - Retrieve the SUPABASE_URL and SUPABASE_ANON_KEY from your Supabase project settings.
  - Create a .env file in the root of your project and add the following
     ```bash
    SUPABASE_URL=your_supabase_url
    SUPABASE_ANON_KEY=your_supabase_anon_key

5. **Run the project: For an Expo project, run:**
   ```bash
   expo start

##Screenshots

##License
This project is licensed under the MIT License - see the LICENSE file for details.



