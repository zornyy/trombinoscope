# TROMBINOSCOPE EPTM

## Table of content

- [Introduction ⚡](#introduction)
- [Features 🗂️](#features)
- [Build 🏗️](#build)


## Introduction
> This project is realised during the M-431 module to better illustrate and understand the principles of projects handling and agiles methods such as scrum. 

> With this in mind, our group of four people, Nanchen Loris, Frédéric Fei Fan Shao, Arsenii Nedorezov and Zorn Alexandre, designed a project manager and started the project of a trombinoscope. 

> A trombinoscope is an piece of software, most of the times a webapp that enables it's users to store the pictures and names of different members of a group school etc. etc.


## Features
The intended features for the app are the following

>**Display peoples**\
>The app must display all the added persons and their pictures is they have one

>**Add peoples**\
>It must be possible to add a person to the trombinoscope with a picture, he will then be displayed with the others

>**Import Excel file**\
>It must be possible to import a .csv file to store all the persons stored inside of it and their pictures if they have one, the peoples loaded can then be edited in the webapp


>**Generate PDF**\
>The app must enable the users to generate a PDF file which displays all persons that have a picture to go with them in a nicely formated way

## Build

This app is built with react and vite, pocketbase is used as a backend. To start it locally, use the following commands

```bash
# Node js and npm are required

## Frontend
git clone https://github.com/zornyy/trombinoscope

cd trombinoscope

npm install

npm run dev

## Backend

# Download the pocketbase executable for your os
# Run it locally and open the webview
# From there, load the databaseSchema.pb file to get the database
```