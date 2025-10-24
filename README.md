# File: README.md
# AI-Powered HTML/CSS Generator and Validator (Node.js, Dockerized)

This project implements an AI agent using Node.js microservices to generate HTML/CSS based on user descriptions and validate them against W3C standards. It uses OpenAI's API for generation and is containerized with Docker for easy deployment.

## Project Structure
- `generator.js`: Express microservice that uses OpenAI's API to generate HTML and CSS.
- `validator.js`: Express microservice that validates HTML/CSS using W3C's Nu HTML Checker and CSS Validator.
- `agent.js`: Command-line script that prompts for user input, calls generator and validator services.
- `Dockerfile.generator`: Dockerfile for the Generator microservice.
- `Dockerfile.validator`: Dockerfile for the Validator microservice.
- `docker-compose.yml`: Orchestrates both microservices.
- `package.json`: Node.js dependencies.

## Prerequisites
- Node.js 22.19.0 (for running locally)
- Docker Desktop (for Windows, ensure it's running with WSL2 backend)
- OpenAI API key (get from https://platform.openai.com/api-keys)
- Install Node.js dependencies (for agent): `npm install axios`

## Setup with Docker (Windows)
1. Ensure Docker Desktop is running:
   - Open Docker Desktop from the Start menu.
   - Confirm it's active (green status in system tray).
   - If not installed, download from https://www.docker.com/products/docker-desktop.
   - Enable WSL2 backend: Run `wsl --install` in an admin Command Prompt if prompted.
2. Set your OpenAI API key:
   ```cmd
   set OPENAI_API_KEY=sk-your_key_here

# AI Agent HTML/CSS Generator & Validator

A Node.js-based AI agent system that generates HTML/CSS code from natural language descriptions and validates it using W3C standards.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
  - [Using Docker (Recommended)](#using-docker-recommended)
  - [Without Docker (Local Setup)](#without-docker-local-setup)
- [Usage](#usage)
- [Testing](#testing)
- [Stopping Services](#stopping-services)

## Features

- **AI-Powered Generation**: Generate HTML/CSS code from natural language descriptions
- **W3C Validation**: Automatic validation of generated code against W3C standards
- **Dual Setup Options**: Docker or local Node.js deployment
- **RESTful API**: HTTP endpoints for easy integration
- **Console Mode**: Command-line interface for quick testing

## Prerequisites

- **Git** with credential manager configured
- **GitHub Account** (for cloning the repository)

### For Docker Setup:
- Docker installed on your system
- Docker Compose

### For Local Setup:
- Node.js (v14 or higher)
- npm (Node Package Manager)

## Installation

### Using Docker (Recommended)

#### 1. Sign into GitHub

Visit [https://github.com/login](https://github.com/login) and sign in with your GitHub account.

Configure Git Credential Manager:
```bash
git config --global credential.helper manager
```

#### 2. Clone the Repository

```bash
git clone [Insert GitHub Repo Link Here]
cd ai_agent_html_css_generator_validator_nodejs
```

*If prompted, authenticate via Git Credential Manager.*

#### 3. Build and Start Services

```bash
docker-compose up --build -d
```

The services will be available at:
- **Generator**: http://localhost:5000
- **Validator**: http://localhost:5001

#### 4. Verify Services

```bash
docker-compose ps
```

Expected output:
```
       Name                             Command               State                 Ports
------------------------------------------------------------------------------------------------
ai_agent_html_css_generator_vali ...   node generator.js        Up      0.0.0.0:5000->5000/tcp
ai_agent_html_css_generator_vali ...   node validator.js        Up      0.0.0.0:5001->5001/tcp
```

#### 5. Install Agent Dependencies

```bash
npm install axios
```

#### 6. Run the Agent

```bash
node agent.js
```

Enter a description when prompted (e.g., "a simple login form"). The agent will generate HTML/CSS and display W3C validation results.

### Without Docker (Local Setup)

#### 1. Sign into GitHub

Visit [https://github.com/login](https://github.com/login) and sign in with your GitHub account.

Configure Git Credential Manager:
```bash
git config --global credential.helper manager
```

#### 2. Clone the Repository

```bash
git clone [Insert GitHub Repo Link Here]
cd ai_agent_html_css_generator_validator_nodejs
```

*If prompted, authenticate via Git Credential Manager.*

#### 3. Install Dependencies

```bash
npm install
```

#### 4. Start Generator Service

Open a terminal and run:
```bash
node generator.js
```

The generator will run on http://localhost:5000.

#### 5. Start Validator Service

Open another terminal and run:
```bash
node validator.js
```

The validator will run on http://localhost:5001.

#### 6. Run the Agent

Open a third terminal and run:
```bash
node agent.js
```

Enter a description when prompted (e.g., "a simple login form"). The agent will generate HTML/CSS and display W3C validation results.

## Usage

The `agent.js` script acts as the main interface:

1. Prompts for a natural language description
2. Sends the description to `generator.js`
3. Validates the generated code with `validator.js`
4. Displays the results

### Example

**Input:**
```
Enter description: a simple login form
```

**Output:**
```
Generated HTML:
<!DOCTYPE html><html><head><link rel="stylesheet" href="styles.css"></head><body><form>...</form></body></html>

Generated CSS:
form { ... }

Validation Results:
HTML Valid: true
CSS Valid: true
```

## Testing

### Test Generator Directly

**Console Mode:**
```bash
node generator.js --console
```

**HTTP Request:**
```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d "{\"description\": \"a simple login form\"}"
```

## Stopping Services

### Docker Setup

```bash
docker-compose down
```

### Local Setup

Press `Ctrl+C` in each terminal window running the services.

## Project Structure

```
ai_agent_html_css_generator_validator_nodejs/
├── agent.js          # Main agent orchestrator
├── generator.js      # HTML/CSS generation service
├── validator.js      # W3C validation service
├── docker-compose.yml
├── package.json
└── README.md
```