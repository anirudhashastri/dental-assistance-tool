# Dental Assistance Tool

## Overview
The Dental Assistance Tool is a web application designed to provide AI-powered tools for dentists. These tools are accessible over a server and can be used with a simple click, helping to save time and assist in diagnostics. This project aims to make advanced AI tools easily available and user-friendly for dental professionals.

## Features
- User Authentication (Register, Login, Logout)
- Upload and manage dental images
- AI-based image analysis tools
- Display results of AI analysis
- Secure and user-specific data handling

## Project Purpose
The primary goal of this project is to streamline the diagnostic process for dentists by providing AI tools that can analyze dental images quickly and accurately. By making these tools accessible over a server, dentists can benefit from advanced technology without needing extensive technical knowledge, thereby improving efficiency and patient care.

## Setup Instructions

### Prerequisites
- Node.js (v12.x or later)
- npm (v6.x or later)
- Python (v3.6 or later)
- MongoDB (for user data storage)
- PostgreSQL (for session management)
- `virtualenv` (Python virtual environment tool)

### Step-by-Step Setup

#### 1. Clone the Repository

######
        git clone https://github.com/yourusername/dental-assistance-tool.git

#### 2. Install Node.js Dependencies
######
        npm install

#### 3. Set Up MongoDB
1. Ensure MongoDB is installed and running on your machine.
2. Create a MongoDB database named "Your-Database".
3. Update the MongoDB connection string in the config/database.js file if necessary.

#### 4. Packages Required
Download and install anaconda Install the required packages using pip:

###### Create the environment
    conda env create -f cvs-staging.yaml
or Go to the anaconda application and upload the .yml file in your environments tab

### Running the tool
#### Start the node server
        node server.js
The application should now be running at "http://localhost:3000"

To run the python server we need to run the scripts/test.py
#### Make sure you are in the correct python evironment and run
        python test.py
The flask tool server should be running at "http://localhost:5000"


### How to Use
- Register a new account or log in if you already have one.
- Upload dental images through the Upload page.
- Navigate to the Tools page to run AI analysis on uploaded images.
- View and manage your account details from the Account page.

        
        
        
