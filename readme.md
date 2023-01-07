# OxiSweeperFrontend
![Language](https://img.shields.io/badge/language-TypeScript-3993fa)
![License](https://img.shields.io/github/license/karolstawowski/OxiSweeperFrontend?color=3993fa)
![Version](https://img.shields.io/badge/version-0.0.1-3993fa) <br>

### <a href="https://github.com/karolstawowski/OxiSweeperBackend">Link to OxiSweeperBackend</a>

## Description

<b>React/TypeScript</b> implementation of popular game called 'Minesweeper' made by Robert Donner.</br>
*OxiSweeperFrontend* implements the Minesweeper game itself and routing for users depending of theirs role.</br>
*OxiSweeperBackend* implements application user interface and database for user authentication, authorization and record tracking.

<img src="preview.png">

## Use case example

1. User enters log in/register page
2. User logs in/creates new accout
3. User is redirected to route based on role - `/game` or `/dashboard`
4. User can log out, which redirects to `/login` page

## Authorization/authentication model

When user logs in or registers, user token is being assigned. User token is stored in client's local storage.
Every time user enters any page, request for user role to backend is being sent. User role is stored in frontend application's context.
Unauthorized user is being redirected to allowed path. Unauthenticated user can access `/login` path only.

## Tools and technologies

React, TypeScript, Vite, React Router, tabler-icons.
