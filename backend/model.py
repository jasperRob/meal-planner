from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langgraph.graph import START, MessagesState, StateGraph
from langgraph.checkpoint.memory import MemorySaver
from langchain_core.messages import SystemMessage
from langchain_core.prompts import ChatPromptTemplate
from langchain_ollama import OllamaLLM
import os

# prompt template
system_prompt = SystemMessage("""
You are a helpful assistant used to create a meal plan and
grocery shopping list for the week.

The user should provide Special Dietary Requirements, which meals
in a day to plan for, how many people to plan for,
and any ingredients to include or exclude. If any of this info is
missing, ask the user to supply it.

Prioritize ingredients that are in season and can be used across
multiple recipes.

After recommending recipes, ask if the user would like a shopping list.

Keep the user on task if they stray.
""")

prompt_template = ChatPromptTemplate.from_messages(
    [
        system_prompt,
        MessagesPlaceholder(variable_name="messages"),
    ]
)

# ensure ollama url is suppied
OLLAMA_BASE_URL = os.getenv('OLLAMA_BASE_URL')
if not OLLAMA_BASE_URL:
    raise Exception("OLLAMA_BASE_URL not provided")

# ensure ollama model is suppied
OLLAMA_MODEL = os.getenv('OLLAMA_MODEL')
if not OLLAMA_MODEL:
    raise Exception("OLLAMA_MODEL not provided")

# init llm
llm = OllamaLLM(model=OLLAMA_MODEL, base_url=OLLAMA_BASE_URL)


# Define the function that calls the model
def call_model(state: MessagesState):
    prompt = prompt_template.invoke(state)
    response = llm.invoke(prompt)
    return {"messages": response}


# Define a new graph
workflow = StateGraph(state_schema=MessagesState)
workflow.add_edge(START, "model")
workflow.add_node("model", call_model)

# Add memory
memory = MemorySaver()
chatbot = workflow.compile(checkpointer=memory)
