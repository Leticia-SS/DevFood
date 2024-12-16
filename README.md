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

## Screenshots

<img src="https://github.com/user-attachments/assets/e321ea3c-ba8e-4df8-9021-715433894697" alt="Screenshot 1" width="400" />
<img src="https://github.com/user-attachments/assets/fc38a9e1-f4d4-4ce7-a648-e14f120a6652" alt="Screenshot 2" width="400" />
<img src="https://github.com/user-attachments/assets/ddee41cb-8cce-413d-890b-5136dc438646" alt="Screenshot 3" width="400" />
<img src="https://github.com/user-attachments/assets/a431809c-d9a7-4f9c-bf07-2f4af7332620" alt="Screenshot 4" width="400" />
<img src="https://github.com/user-attachments/assets/e4b836e1-c09e-490a-96cc-38295f3e10f6" alt="Screenshot 5" width="400" />
<img src="https://github.com/user-attachments/assets/9a0c215f-bf68-484d-8dfd-e5d4d4d4de01" alt="Screenshot 6" width="400" />
<img src="https://github.com/user-attachments/assets/f09686e6-fdd2-4d3a-ad7f-ea06106bbf5b" alt="Screenshot 7" width="400" />
<img src="https://github.com/user-attachments/assets/b0e02efe-f0c5-465d-abe0-96c45e12f66a" alt="Screenshot 8" width="400" />
<img src="https://github.com/user-attachments/assets/21fced7e-fd97-4c6e-9a7b-bc00c6fd5422" alt="Screenshot 9" width="400" />
<img src="https://github.com/user-attachments/assets/86d72dcb-b0fc-446f-a86d-ad9b576661b6" alt="Screenshot 10" width="400" />
<img src="https://github.com/user-attachments/assets/61caba07-0e67-45c3-ac94-69ef0698a6f5" alt="Screenshot 11" width="400" />
<img src="https://github.com/user-attachments/assets/865579e4-cb96-40b9-8223-0c03eb4e39f0" alt="Screenshot 12" width="400" />
<img src="https://github.com/user-attachments/assets/dbe157de-575b-48d4-84f3-a41ebd538023" alt="Screenshot 13" width="400" />
<img src="https://github.com/user-attachments/assets/cef8d3eb-693f-420a-8562-ef5c9a2f75f7" alt="Screenshot 14" width="400" />
<img src="https://github.com/user-attachments/assets/5ba0fe2f-99b0-44d6-9090-1ca4c72480ff" alt="Screenshot 15" width="400" />
<img src="https://github.com/user-attachments/assets/67aefc69-5f0a-469f-920f-42ed33d3ef74" alt="Screenshot 16" width="400" />
<img src="https://github.com/user-attachments/assets/c8a590e5-26c6-4490-9fb2-34d7a11ab4a7" alt="Screenshot 17" width="400" />
<img src="https://github.com/user-attachments/assets/e7103c3f-0bfd-4a1a-9624-7c7066543a90" alt="Screenshot 18" width="400" />
<img src="https://github.com/user-attachments/assets/f69b9539-5a03-400e-83e7-66e192fb8156" alt="Screenshot 19" width="400" />

## License
This project is licensed under the MIT License - see the LICENSE file for details.



