# 🔢 Simple Calculator

## 🔧 Task

[Click here to see the task](https://drive.google.com/file/d/1S1k3Q7wTxSYUUaJYSQ6FrgcxadbLZ37y/view?usp=sharing)

## 🚀 How to run the app

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

<br/>**Cloning the Repository**

```bash
git clone git@github.com:sergey-mikhovich/simple-calculator.git
```

<br/>**Installation**

Let's install the project dependencies, in the terminal run:

```bash
npm install
```

Then install the Git hooks:

```bash
npm run install-hooks
```

<br/>**Running the Project**

Once the installation is complete, run the following command to run the project:

```bash
npm run dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

## 🌳 Project Structure:
  ```bash
├── config/                               # Contains all configuration files
│  └── build/                             # Contains parts of webpack configuration
│     ├── build-dev-server.js             # Webpack development server config
│     ├── build-loaders.js                # Webpack loaders config
│     ├── build-plugins.js                # Webpack plugins config
│     └── build-webpack.js                # Merges webpack configs
│ 
├── public/                               # Contains all static files
│  └── index.html                         # The web page structure and markup
│
├── scripts/                              # Contains all application scripts
│  ├── install-hooks.js                   # Install all Git hooks to .git/hooks folder
│  └── pre-commit.js                      # Runs actions before commit
│
├── src/                                  # Contains all application source code
│  ├── core/                              # Core functionality and domain logic
│  │  ├── calculator.js                   # Calculator computation logic
│  │  └── theme-manager.js                # Theme switching and persistence logic
│  │
│  ├── styles/                            # All CSS styling files
│  │  └── styles.css                      # Application styles
│  │
│  └── index.js                           # Entry point. Main application file that initializes and connects all modules
│
├── .gitignore                            # Specifies which files Git should ignore
├── .prettierignore                       # Specifies which files Prettier code formatter should skip
├── .prettierrc                           # Prettier config (code formating rules)
├── babel.config.json                     # Babel settings (convert modern JS to older versions)
├── eslint.config.js                      # JavaScript linting rules for code quality and consistency
├── package.json                          # Contains lists dependencies, scripts and version info
├── package-lock.json                     # Contains exact versions of installed packages (ensures consistent installs)
└── webpack.config.js                     # Contains Webpack config (how to bundle app)
  ```
