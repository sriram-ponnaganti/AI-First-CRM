from fastapi import FastAPI
from pydantic import BaseModel
from agent import app_agent
from langchain_core.messages import HumanMessage

app = FastAPI(title="AI-First CRM HCP Module")

class ChatInput(BaseModel):
    message: str

@app.post("/api/chat")
async def chat_interaction(input: ChatInput):
    # Run the LangGraph agent
    inputs = {"messages": [HumanMessage(content=input.message)]}
    result = app_agent.invoke(inputs)
    
    # Return both the AI response and the extracted structured data for the Redux store
    return {
        "reply": result["messages"][-1].content,
        "structured_data": result.get("structured_data", {})
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)