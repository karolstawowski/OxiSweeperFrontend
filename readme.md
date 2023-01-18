# OxiSweeperFrontend

![Language](https://img.shields.io/badge/language-TypeScript-3993fa)
![License](https://img.shields.io/github/license/karolstawowski/OxiSweeperFrontend?color=3993fa)
![Version](https://img.shields.io/badge/version-0.0.1-3993fa) <br>

### <a href="https://github.com/karolstawowski/OxiSweeperBackend">Link to OxiSweeperBackend</a>

## Description

<b>React/TypeScript</b> implementation of popular game called 'Minesweeper' made by Robert Donner.</br>
_OxiSweeperFrontend_ implements the Minesweeper game itself and routing for users depending of theirs role.</br>
_OxiSweeperBackend_ implements application user interface and database for user authentication, authorization and record tracking.

<img src="preview.png">

## Installation and usage

### Prerequisite

To run the project you need to have followed software installed:

1. [NodeJS](https://nodejs.org/en/download/)
1. [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/karolstawowski/OxiSweeperFrontend
```

2. Install neccessery packages:

```bash
yarn
```

3. Create .env file with enviromental variables (these are default)

```bash
cp .env.example .env
```

### Project run

```bash
yarn run dev
```

## Use case example

1. User enters log in/register page
2. User logs in/creates new accout
3. User is redirected to route based on role - `/game` or `/dashboard`
4. User can log out, which redirects to `/login` page

## Authorization/authentication model

When user logs in or registers, user token is being assigned. User token is stored on the client side in cookies.
Every time user enters any page, request for user role to backend is being sent. User role is stored in frontend application's context.
Unauthorized user is being redirected to allowed path. Unauthenticated user can access `/login` path only.

## Tools and technologies

React, TypeScript, Vite, React Router, react-cookie, tabler-icons.
