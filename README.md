# CRUD-Tasks

## Description

This project is a front-end web development endeavor using the Angular framework. It comprises two interconnected websites connected to a single database. One website is dedicated to administrators, while the other caters to regular users.

## User Website

The user website allows individuals to create an account and proceed to the login page. After successful authentication, users can access the homepage, which displays all the tasks assigned to them by administrators. Users have the option to mark tasks as completed by clicking the "Complete Task" button, which updates the task status for administrators. Additionally, users can click on the "Details" button to view comprehensive information about each task on a separate page.

## Administrator Website

The administrator website requires login credentials to access its features. Administrators can add, edit, or delete tasks assigned to specific users. The initial page showcases all existing tasks and provides detailed data about each task associated with individual users. Furthermore, there is a separate page that displays a list of users who have registered accounts, along with information about the number of tasks assigned to each user. Administrators have the ability to delete users and enable or disable their login access.

## Project Features

The project incorporates various features to enhance its functionality and user experience:

- Localization: The website supports both English and Arabic languages.
- Loading Page: A loading page is implemented to provide visual feedback during database communication.
- Effective Database Communication: The project utilizes APIs for efficient communication with the database.
- Security Measures: Interceptors and guards are employed to ensure secure data transmission and user authentication.
- Project Modularization and Lazy Loading: The project is divided into smaller modules and utilizes lazy loading to optimize performance.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
