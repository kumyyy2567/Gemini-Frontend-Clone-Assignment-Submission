# Gemini Frontend Clone

A modern, production-ready clone of Google's Gemini AI chat interface built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

### Authentication & Security
- **OTP-based Authentication**: Secure phone number verification with country code selection
- **Form Validation**: Comprehensive input validation using React Hook Form + Zod
- **Session Management**: Persistent authentication state with localStorage

### Chat Interface
- **Real-time Messaging**: Instant message delivery with typing indicators
- **AI Response Simulation**: Intelligent AI responses with realistic delays
- **Image Upload**: Support for image sharing with preview and file size validation
- **Message Management**: Copy-to-clipboard functionality on message hover
- **Auto-scroll**: Automatic scrolling to latest messages

### Chatroom Management
- **Create/Delete Chatrooms**: Full CRUD operations for conversation management
- **Search Functionality**: Debounced search to filter chatrooms by title
- **Conversation History**: Persistent message history across sessions

### User Experience
- **Dark/Light Mode**: System-wide theme toggle with preference persistence
- **Responsive Design**: Mobile-first design that works across all devices
- **Loading States**: Skeleton screens and loading indicators for better UX
- **Toast Notifications**: User feedback for all major actions
- **Keyboard Accessibility**: Full keyboard navigation support

### Technical Features
- **State Management**: Zustand for efficient global state management
- **Data Persistence**: localStorage integration for offline data access
- **TypeScript**: Full type safety throughout the application
- **Performance**: Optimized rendering with React best practices

## 🛠️ Tech Stack

- **Framework**: React 18 with TypeScript
- **State Management**: Zustand with persistence middleware
- **Form Handling**: React Hook Form with Zod validation
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Custom component library with accessibility
- **Icons**: Lucide React for consistent iconography
- **Notifications**: React Hot Toast for user feedback

## 📱 Responsive Design

The application is fully responsive with breakpoints optimized for:
- **Mobile**: 320px - 767px
- **Tablet**: 768px - 1023px  
- **Desktop**: 1024px+

## 🎨 Design System

### Colors
- **Primary**: Blue scale (#3B82F6)
- **Secondary**: Gray scale for neutral elements
- **Success**: Green for positive actions
- **Warning**: Yellow for cautionary actions
- **Error**: Red for destructive actions
- **Dark Mode**: Full dark theme support

### Typography
- **Font Family**: Inter with system font fallbacks
- **Scale**: Consistent type scale from 12px to 48px
- **Weights**: Regular (400), Medium (500), Semi-bold (600), Bold (700)
- **Line Height**: Optimized for readability (1.2 for headings, 1.5 for body)

### Spacing
- **Grid System**: 8px base unit for consistent spacing
- **Component Padding**: 16px, 24px, 32px for different container sizes
- **Element Margins**: 8px, 16px, 24px, 32px for content separation

## 🚦 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd gemini-frontend-clone
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open http://localhost:5173 in your browser

### Build for Production

```bash
npm run build
```

## 📖 Usage Guide

### Authentication
1. Enter your email address and phone number
2. Select your country code from the dropdown
3. Click "Send OTP" to receive verification code
4. Enter the OTP (use `123456` for demo purposes)
5. Click "Verify OTP" to complete authentication

### Creating Conversations
1. Click the "+" button in the header
2. Enter a descriptive title for your chatroom
3. Click "Create Chatroom" to start messaging

### Messaging
1. Select a chatroom from the sidebar
2. Type your message in the input field at the bottom
3. Press Enter or click the Send button
4. Upload images by clicking the image icon
5. Copy messages by hovering and clicking the copy icon

### Search & Navigation
1. Use the search bar in the header to filter conversations
2. Toggle dark mode with the theme button
3. Access user settings through the profile dropdown

## 🏗️ Architecture

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── auth/           # Authentication components
│   ├── chat/           # Chat-related components
│   ├── layout/         # Layout components
│   └── ui/             # Base UI components
├── hooks/              # Custom React hooks
├── pages/              # Top-level page components
├── stores/             # Zustand store definitions
├── types/              # TypeScript type definitions
├── utils/              # Utility functions and helpers
└── App.tsx             # Main application component
```

### State Management
- **Auth Store**: User authentication and session management
- **Chat Store**: Chatroom and message management
- **App Store**: Global application settings (theme, etc.)

### Data Flow
1. User interactions trigger store actions
2. Store updates trigger React re-renders
3. Components reflect new state automatically
4. Changes persist to localStorage

## 🔧 Customization

### Theming
Modify `tailwind.config.js` to customize colors, fonts, and spacing:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-primary-color',
        // ... other shades
      }
    }
  }
}
```

### Adding Features
1. Define new types in `src/types/index.ts`
2. Add store actions in appropriate store files
3. Create UI components in `src/components/`
4. Connect components to stores using hooks

## 🧪 Testing

The application includes comprehensive error handling and validation:
- Form validation with clear error messages
- Network error handling with retry mechanisms
- Fallback UI states for loading and error conditions
- Input sanitization and file size limits

## 🚀 Deployment

The application is optimized for deployment on:
- **Vercel**: Zero-config deployment with automatic builds
- **Netlify**: Static site hosting with form handling
- **GitHub Pages**: Static deployment with custom domain support

### Environment Variables
No external API keys required - all functionality is simulated client-side.

## 📝 API Simulation

The application simulates all backend functionality:
- **Country Data**: Mock country list with flags and dial codes  
- **OTP Generation**: Simulated OTP sending with fixed verification code
- **AI Responses**: Pre-defined response templates with random selection
- **Data Persistence**: localStorage for all user data and chat history

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Google Gemini**: Inspiration for the chat interface design
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide Icons**: Beautiful, customizable icon library
- **React Community**: Excellent ecosystem and documentation

---

**Note**: This is a frontend-only implementation with simulated backend functionality. All data is stored locally and no real API calls are made.