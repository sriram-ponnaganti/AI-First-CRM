<h1 align="center">AI-First CRM HCP Module</h1>

## Overview
This repository contains the solution for Task 1: AI-First CRM HCP Module. It features a "Log Interaction Screen" that allows Life Science field representatives to log interactions with Healthcare Professionals (HCPs) seamlessly via a structured form or an AI-powered conversational interface.

## Tech Stack
* **Frontend:** React.js, Redux Toolkit, Google Inter Font.
* **Backend:** Python, FastAPI.
* **AI Framework:** LangGraph.
* **LLM:** Groq (`gemma2-9b-it`).
* **Database:** PostgreSQL (SQLAlchemy ORM).

## LangGraph Agent Role & Tools
The LangGraph agent manages the state between the natural language chat interface and the structured database. It identifies intents, extracts entities, and invokes the following tools:
1. `log_interaction`: Extracts JSON data from text and saves to DB.
2. `edit_interaction`: Modifies existing SQL records based on chat instructions.
3. `retrieve_hcp_history`: Contextualizes queries based on past interactions.
4. `schedule_followup`: Identifies temporal data to create calendar tasks.
5. `extract_materials`: Isolates mentions of shared samples/brochures for compliance.

## Setup Instructions
1. Navigate to `/backend`, install requirements (`pip install -r requirements.txt`), set `GROQ_API_KEY` in your environment, and run `uvicorn main:app --reload`.
2. Navigate to `/frontend`, install dependencies (`npm install`), and run `npm start`.
