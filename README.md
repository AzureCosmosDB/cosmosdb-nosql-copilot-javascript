# ChatGPT Assistant

Below is a detailed `README.md` file for your project that includes instructions on how to clone, run the application, and register the app on the Microsoft Identity Platform for MSAL authentication.

---

## Application Auth

This application is a React-based frontend that integrates with Microsoft Authentication Library (MSAL) to provide authentication using Microsoft Identity Platform (formerly known as Azure Active Directory). The application demonstrates how to sign in users and redirect authenticated users to the home page.

## Prerequisites

Before running this application, you need:

- **Node.js** installed. You can download it [here](https://nodejs.org/).
- An **Azure account**. If you don't have an Azure account, you can create a free one [here](https://azure.microsoft.com/free/).

## Cloning and Running the Application

### Step 1: Clone the repository

First, you need to clone the repository to your local machine.

```bash
git clone https://github.com/AzureCosmosDB/cosmosdb-nosql-copilot-javascript
cd cosmosdb-nosql-copilot-javascript
```

### Step 2: Install dependencies

Once inside the project directory, install the necessary dependencies by running:

```bash
npm install
```

### Step 3: Register the Application on Microsoft Identity Platform

Before running the app, you'll need to register the application with the Microsoft Identity Platform to authenticate users via MSAL. Follow these steps:

1. **Log into Azure Portal**:
   - Go to [Azure Portal](https://portal.azure.com/).
   
2. **Navigate to Azure Active Directory**:
   - In the left-hand navigation pane, select **Microsoft Entra ID**.

3. **Click Add Button**:
   - In the dropdown select **App registration**.
   - Fill in the required fields:
     - **Name**: Give your app a meaningful name, e.g., `My MSAL React App`.
     - **Supported account types**: Choose an option that fits your scenario (e.g., **Accounts in any organizational directory and personal Microsoft accounts**).
     - **Redirect URI**: 
       - For authentication with React, the redirect URI should be of type **Single-page application (SPA)**.
       - Set it to `https://localhost:5173`, as this is the default port when you run the app locally.

4. **Configure API permissions**:
   - In the **API permissions** section, add the following:
     - By default, you will have **Microsoft Graph API permissions** enabled with  User.Read Permissions.
     - This is permission is enough for this demo.

5. **Client ID and Tenant ID**:
   - After registration, you will be redirected to your app's **Overview** page.
   - Copy the **Application (client) ID** and **Directory (tenant) ID**, as these will be required in your code.

6. **Configure authentication settings**:
   - Go to **Authentication** in the left-hand menu.
   - Under **Platform configurations**, make sure that the SPA is added and `https://localhost:5173` is listed as a **Redirect URI**.
   - Enable **ID tokens** under **Implicit grant and hybrid flows**.

### Step 4: Configure the MSAL Settings

Create a `.env` file in the root directory and configure your MSAL credentials:

```bash
VITE_CLIENT_ID=your-client-id
```

Replace `your-client-id` with the values you obtained from the Azure portal.

### Step 5: Run the Application

Once the app is configured with your MSAL settings, you can run it using the following command:

```bash
npm start
```

The application should now be running at [http://localhost:3000](http://localhost:3000).

## Key Features

- **Login**: Users can sign in using their Microsoft account via the MSAL authentication.
- **Redirect on Login**: After successful login, users are redirected to the home page.
- **Handling Login Progress**: If the login is in progress, users will be notified with a loading message.

## Technologies Used

- **React**: JavaScript library for building user interfaces.
- **MSAL.js**: Microsoft Authentication Library for handling authentication.
- **Azure Active Directory**: Provides authentication via the Microsoft Identity Platform.

## Folder Structure

```bash
COSMOSDB-NOSQL-COPILOT-JAVASCRIPT/
│
├── node_modules/         # Dependencies
├── public/               # Public assets
├── src/                  # Source files for the app
│   ├── assets/           # Static assets like images
│   │   └── react.svg     # React logo
│   ├── components/       # Reusable React components
│   │   ├── Navbar.tsx       # Navigation bar component
│   │   ├── Signin.tsx       # Signin component
│   │   ├── ThemeChanger.tsx # Theme switching component
│   │   └── UserProfile.tsx  # User profile component
│   ├── config/           # Configuration files
│   │   ├── authConfig.ts       # Authentication configuration for MSAL
│   │   └── azure_openai.config.ts # Config for Azure OpenAI
│   ├── pages/            # Application pages
│   │   ├── ErrorPage.tsx       # Error page
│   │   ├── HomePage.tsx        # Home page
│   │   └── SigninPage.tsx      # Signin page
│   ├── App.tsx           # Main application component
│   ├── index.css         # Global styles
│   ├── main.tsx          # Entry point for the React app
│   └── vite-env.d.ts     # TypeScript environment declaration
├── .env.local            # Local environment variables
├── .gitignore            # Files to be ignored by Git
├── CODE_OF_CONDUCT.md    # Code of Conduct for the project
├── LICENSE               # License for the project
├── README.md             # Project documentation (this file)
├── SECURITY.md           # Security policy
├── SUPPORT.md            # Support documentation
├── eslint.config.js      # ESLint configuration
├── index.html            # Entry HTML file
├── package.json          # Project metadata and dependencies
├── package-lock.json     # Lock file for package versions
├── postcss.config.js     # PostCSS configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.app.json     # TypeScript config for the app
├── tsconfig.json         # Main TypeScript configuration
├── tsconfig.node.json    # TypeScript config for Node-related files
└── vite.config.ts        # Vite configuration file

```

## Additional Resources

- [MSAL.js Documentation](https://docs.microsoft.com/en-us/azure/active-directory/develop/msal-overview)
- [Azure Portal](https://portal.azure.com/)
- [React Documentation](https://react.dev/learn)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

This README provides clear instructions to clone, configure, and run the application, as well as the steps for registering the app in the Microsoft Identity Platform for authentication.