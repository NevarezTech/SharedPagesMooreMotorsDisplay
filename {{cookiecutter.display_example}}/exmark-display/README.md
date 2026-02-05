# Wright Motors Service Kiosk

A touch-friendly kiosk interface for Wright Motors service center customers.

## Features

### 🏠 Kiosk Homepage
- Clean, modern interface with large touch-friendly buttons
- Four main navigation options:
  - **Customer Questionnaire** - Service needs assessment
  - **Parts Inventory** - Search and check part availability
  - **Warranty Lookup** - Check warranty status and coverage
  - **Wright Website** - Direct link to Wright Motors main website

### 📋 Customer Questionnaire
- Step-by-step guided questionnaire for service needs
- Vehicle information collection (year, make, model)
- Service type selection and symptom description
- Urgency assessment for proper scheduling
- Progress tracking with completion percentage
- Touch-friendly interface with large buttons

### 📦 Parts Inventory
- Real-time parts search and availability checking
- Search by part number, description, or manufacturer
- Category filtering (Filters, Brakes, Engine, Fluids, etc.)
- Stock status indicators (In Stock, Low Stock, Out of Stock)
- Part details including location, price, and manufacturer
- Touch-optimized search interface

### 🛡️ Warranty Lookup
- Comprehensive warranty information search
- Multiple search options:
  - Part number or description
  - Invoice number
  - Customer name
- Detailed warranty status and coverage information
- Visual status indicators (Active, Expiring, Expired)
- Coverage details and remaining warranty period

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS 4.1
- **Icons**: Lucide React
- **Build Tool**: Vite with Rolldown
- **UI Components**: Custom components optimized for touch

## Development

### Prerequisites
- Node.js 18+ 
- npm

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Kiosk Deployment

### Hardware Requirements
- Touchscreen display (recommended 15" or larger)
- Kiosk stand or wall mount
- Network connectivity for real-time data

### Browser Setup
For kiosk deployment, configure your browser to:
- Run in fullscreen/kiosk mode
- Disable right-click context menus
- Disable address bar and navigation
- Auto-refresh periodically (optional)

### Environment Configuration
The application is designed to work with mock data for demonstration. For production deployment:

1. **Backend Integration**: Connect to Wright Motors' existing inventory and warranty systems
2. **API Configuration**: Update API endpoints in the service files
3. **Database Connection**: Configure connection to parts and warranty databases
4. **Security**: Implement proper authentication for sensitive operations

## Features in Detail

### Touch-Friendly Design
- Large buttons (minimum 44px touch targets)
- High contrast colors for visibility
- Clear typography optimized for reading distance
- Intuitive navigation with back buttons
- Visual feedback for all interactions

### Accessibility
- Keyboard navigation support
- Focus indicators for screen readers
- High contrast color scheme
- Scalable text and UI elements

### Performance
- Optimized bundle size
- Fast loading times
- Smooth animations and transitions
- Responsive design for different screen sizes

## Customization

### Branding
- Update colors in `src/index.css` CSS variables
- Replace logos and icons as needed
- Modify company information in components

### Adding Features
- Create new page components in `src/components/`
- Add navigation in `src/App.tsx`
- Update routing logic as needed

### Data Integration
- Update mock data files with real API calls
- Implement proper error handling
- Add loading states and offline support

## Support

For technical support or feature requests, contact the Wright Motors IT team.

## License

Proprietary software for Wright Motors Service Center.