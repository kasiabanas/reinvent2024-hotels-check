# Technical Specification for Automated Testing Project

## 1. Project Objective
The objective of this project is to automate the login and hotel availability checking process on the AWS ReInvent portal using the Playwright framework and TypeScript programming language. This automation aims to enhance efficiency and reliability in testing.

## 2. Project Scope
- User login verification.
- Navigation to the hotel booking section.
- Automation of the hotel availability checking process.

## 3. Technical Requirements

### Technologies
- **Playwright**: Automation framework.
- **TypeScript**: Programming language.
- **Node.js**: Runtime environment.
- **Git**: Version control.

### Dependencies
Install dependencies:
```bash
npm install @playwright/test
```

## 4. Test Case: Login and Booking

### Preconditions
- Valid login data (`LOGIN`, `PASSWORD`) in environment variables.
- Availability of the AWS ReInvent portal.

### Test Steps
1. Open the login page.
2. Enter login credentials.
3. Verify successful login by checking the URL.
4. Navigate to the hotel booking section.
5. Verify that the booking page loads successfully.
6. Remove the cookie banner.
7. Check hotel availability for the specified dates.

### Environment Variables
Set in the `.env` file:
```bash
BASE_URL=https://registration.awsevents.com/flow/awsevents/reinvent24/attendee-port
LOGIN="user@example.com"
PASSWORD="securepassword"
DATE_FROM="2024-12-01"
DATE_TO="2024-12-06"
```

## 5. Class Structure

### 1. LoginPage Class
- **Methods**:
  - `login()`: Logs in the user.
  - `successLoginUrlValidation()`: Validates successful login.

### 2. PortalPage Class
- **Methods**:
  - `gotoHotels()`: Navigates to the hotel section.

### 3. BookHotelPage Class
- **Methods**:
  - `validateUrl()`: Validates the booking page.
  - `removeCookieBanner()`: Removes the cookie banner.
  - `checkHotel(dateFrom, dateTo)`: Checks hotel availability.

## 6. Execution Instructions
1. Clone the repository and install dependencies:
   ```bash
   git clone https://github.com/kasiabanas/reinvent2024-hotels-check.git
   cd reinvent2024-hotels-check
   npm install
   ```

2. Configure the `.env` file with login data.

3. Run the tests:
   ```bash
   npx playwright test
   ```

## 7. Enhancements
- Implement parallel test execution.
- Cross-browser testing.
- Extend test coverage for additional scenarios.
