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