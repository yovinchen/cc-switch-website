# Event Management Platform

A modern, full-stack event management platform built with React, TypeScript, and Lovable Cloud. Create, discover, and manage events with an intuitive interface and powerful features.

## 🌟 Features

### Event Management
- **Create Events**: Easy-to-use form with image upload, date/time selection, and location integration
- **Edit Events**: Update your events anytime with full editing capabilities
- **Delete Events**: Remove events you've created with confirmation dialog
- **Event Discovery**: Browse all upcoming events in a beautiful card layout
- **Event Details**: Rich event pages with countdown timers, location maps, and registration

### User Authentication
- **Secure Sign Up/Login**: Email and password authentication with automatic email confirmation
- **User Profiles**: Automatic profile creation with display names
- **Protected Routes**: Secure admin and event management pages
- **Session Management**: Persistent authentication across sessions

### Location Integration
- **Google Maps Autocomplete**: Search and select locations with autocomplete suggestions
- **Interactive Maps**: Embedded Google Maps on event detail pages
- **Get Directions**: Direct links to Google Maps for navigation

### Image Management
- **Image Upload**: Drag-and-drop or click to upload event images
- **File Validation**: Automatic validation for file type (JPG, PNG, GIF, WebP) and size (max 5MB)
- **Secure Storage**: Images stored securely in cloud storage

### Admin Features
- **Admin Dashboard**: Manage all events from a centralized dashboard
- **Event Moderation**: View, edit, or delete any event
- **User Management**: Access to user profiles and event data

### SEO Optimized
- **Meta Tags**: Proper title, description, and keywords for each page
- **Semantic HTML**: Structured markup for better search engine visibility
- **Open Graph Tags**: Social media preview optimization
- **Responsive Design**: Mobile-first design that works on all devices

## Project info

**URL**: https://lovable.dev/projects/f1ba0c74-af75-4389-a8ae-60baf80911b5

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/f1ba0c74-af75-4389-a8ae-60baf80911b5) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Configuration

### Google Maps Places Autocomplete

This project uses Google Maps Places API for location autocomplete. To enable this feature:

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API (New)** in the API Library
4. Go to **Credentials** → **Create Credentials** → **API Key**
5. Copy the API key
6. Add it to your `.env` file:
   ```
   VITE_GOOGLE_MAPS_API_KEY="your-api-key-here"
   ```

**Optional but recommended:** Restrict your API key to only work with the Places API and your domain for security.

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/f1ba0c74-af75-4389-a8ae-60baf80911b5) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
