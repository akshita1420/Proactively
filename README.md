# Proactive Health App

This is a responsive React Native mobile application built with Expo. It is designed to help users track their health metrics, manage appointments, and maintain daily tasks, following the specifications provided in the assignment and the given Figma design.

## Login Credentials

To access the app, use the following predefined credentials:

- Email: ethanharkinson@outlook.com  
- Password: password123

## Features Implemented

### 1. Custom Branding
- Custom app icon and splash screen configured based on the provided Figma assets.
- Seamless transition from the splash screen to the login page.

### 2. Authentication and Session Management
- Login screen accepts predefined credentials.
- If credentials are valid, a token is saved to `AsyncStorage` to persist the login session.
- On app relaunch, the stored token automatically redirects the user to the Home screen.
- Logout functionality clears the stored token and returns the user to the login screen.

### 3. Navigation
- Bottom tab navigation implemented using `@react-navigation/bottom-tabs`.
- Two tabs:  
  - Home Tab (default landing page)  
  - Account Tab (profile display and logout)

### 4. Home Screen Features
- Custom header layout matching Figma design.
- Health Score Banner with gradient progress bar and arrow indicator.
- Upcoming Appointment card showing static appointment details.
- Health Overview section with three functional cards:
  - Steps: Allows users to enter daily steps via a numeric input.
  - BMI: Takes height and weight inputs, calculates BMI, and displays it.
  - Sleep: Custom UI to add or remove sleep hours.
- To-Do List section:
  - Checklist with task items
  - Dynamic progress bar reflecting completed tasks

### 5. Local Data Persistence

Data persistence is implemented using `AsyncStorage` from `@react-native-async-storage/async-storage`. The following values are saved locally and restored on app relaunch:

- Login session token  
- User-entered Steps value  
- BMI input (height, weight) and calculated result  
- Sleep hours  
- To-Do list task states (checked/unchecked)

All data is retained across sessions to ensure a smooth user experience.

### 6. Account Tab
- Displays a placeholder profile image and the logged-in user's email.
- Logout button clears all saved session data and returns the user to the login screen.

## Project Structure

```bash
app/
├── components/          # Reusable components
├── navigation/          # Navigation configuration
├── screens/            # All screen components
├── assets/             # App assets (images, fonts, etc.)
└── App.js              # Main app component
```

## Installation and Setup

To run this project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/proactive-health-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd proactive-health-app
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npx expo start
   ```

Ensure you have all the necessary tools and emulators set up as per the Expo documentation to run the app on your desired platform (Android, iOS, or web).

## Learnings and Challenges

Throughout the development of this app, the following key learnings and challenges were encountered:

- Deepened understanding of React Native components and Expo framework.
- Learned to implement custom navigation solutions.
- Gained experience in managing app state and data persistence.
- Overcame challenges related to UI/UX design implementation based on Figma files.
- Resolved issues related to cross-platform compatibility and performance optimization.

## Future Enhancements

Potential future enhancements for the app include:

- Integrating real health data APIs for dynamic health metric tracking.
- Adding push notifications for appointment reminders and health tips.
- Implementing a premium user subscription model for advanced features.
- Expanding the app's accessibility features to support a wider range of users.
- Continuously updating the app based on user feedback and technological advancements.

## Acknowledgements

- Thanks to the Expo team for their excellent documentation and tools.
- Appreciation for the open-source community for their invaluable resources and support.
- Special thanks to the designers and developers who contributed to the Figma assets and initial project setup.

---

This README provides a comprehensive overview of the Proactive Health App, covering all essential aspects from features and installation to learnings and future enhancements.
