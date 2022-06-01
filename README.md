# 🖥 Accursed Share Ticket Flow

Configured with TypesScript, React, Webpack, Babel, Axios, React Router DOM, ES Lint, Stylelint, Jest, Testing Library, Git and, Husky.

---

# 📜 Summary

-   [Node version](#node-version)

-   [How to run this application](#how-to-run-this-application)

-   [Troubleshooting](#%EF%B8%8F-troubleshooting)

-   [To do and requirements](#to-do-and-requirements)

-   [Contacts](#contacts)

---

# Node version

In order to run this application you must have at least Node version `14.15.1`.

-   [Node JS](https://nodejs.dev/download/)

We recommend Node version `14.15.1` for more compatibility with web3 package.

To manage Node versions in your machine, we recommend installation of Node Version Manager.

-   [NVM on UBUNTU and MACOS](https://github.com/nvm-sh/nvm)

-   [NVM on WINDOWS](https://github.com/coreybutler/nvm-windows)

In addition, we recommend the installation of Visual Studio Installer with Visual Studio Build Tools 2017 and 2017.

---

# How to run this application

-   Install recommended Node version `14.15.1`:

```
    nvm install 14.15.1
```

-   Inside the project's root folder:

```
    nvm use
```

-   Install all the packages with `npm`:

```
    npm install
```

-   Run the application on development mode:

```
    npm start
```

-   Build a production version with webpack on `build` folder:

```
    npm run build
```

The `build` folder, includes all the files generated to trun this application. Including `main-[hash].js`, which is the main JS file needed
to be uploaded with this plugin, and run as a `short-code` inside the WordPress.

---

# ⚠️ Local Host HTTPS

Tutorial for Windows:

https://zeropointdevelopment.com/how-to-get-https-working-in-windows-10-localhost-dev-environment/

---

# ⚠️ Troubleshooting

-   To avoid Husky verifications on commmits use the option `--no-verify` at the end of the commit command

-   Web3 lib requires third part libraries that must be installed to run this application.

-   If you are on Windows 10-11 Pro with all Visual Studio Build packages, it must be easier to run this application.

-   Otherwise, you must try to install the app packages with `npm install`, if you already have Node JS in your machine.

-   Check the errors from installation, find and install the required package to compile the files from installation.

-   Try to install again.

-   You may need to remove `node_modules` and `package-lock.json` in order to reinstall the packages, after fix any issues from installation.

---

# To do and requirements

-   We need a WordPress `plugin` where the user can `upload` some JS and JSON files.

-   These JS and JSON files are `configurations` passed as `props` to this React application. Check the `App.tsx` file and see App and LibraryApp.

-   Once the user passed all configurations files, they should be able to `build` this React app, just like on ReactPress or similar plugins.

-   After building the application, the user should be able to add it to WordPress with `short-code` or the easiest way possible,
    such as drag-n-drop (not a priority). But it would be a nice to have.

-   The `plugin` should be available at plugins store.

-   The `build` version is pure JavaScript transpiled with Babel when Webpack builds the application.
    So we don't need TypesScript support for this plugin. Unless you are able to do it just for development environment,

---

# Contacts

-   Hugo Leonardo

    Email: `hugoleonardo.dev@gmail.com`

