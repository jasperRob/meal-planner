# Meal Planner

### What was my project all about?
I started with an idea in mind. One that I had been recently discussing, involving a tool to help me plan my shopping for the week around recipes that include seasonal produce. I figured this would be a great way to make use of the most fresh and cost effective produce available at the markets, and in the process save time and money by buying cheaper items in bulk.

### How well did I achieve this?
I was able to flesh out a rough concept here, but it is unpolished and there are a number of issues that would require attention before this tool became useful.

If I was to spend more time, the items I would address are as follows:
- Text streaming from the LLM to the interface for a more seamless interaction.
- Fix the duplication of responses. I suspect this issue is to do with the way that the system prompt template is setup.
- Improved markdown formatting for responses.
- Adding better support for date and location to provide more suitable recommendations.
- Experimenting with other models. I tried out a few of the smaller models including **llama3.2**, **gemma3** and **llava**, and found that **gemma3** provided the most succinct and well formed responses.
- Experimenting with other frameworks. This is the first time that I have incorporated an llm into a project, so I decided to use langchain as a means of building a somewhat agentic API, and Ollama as a means of hosting a local LLM, in particular because the documentation for both is rather good. It seems that the interaction between these two systems leaves much to be desired, or at least will require a lot more digging through documentation to create a seamless system.

### Additional Notes
I configured the `devcontainer.json` file to the best of my ability, given it is not something I have used before. It appears to me that a devcontainer is aimed at providing remote development for a single container, and so I relied more on docker-compose itself for the construction of this project, considering the multiple container config.

## Setup

Clone the repository and change into the project directory:

```sh
git clone git@github.com:jasperRob/meal-planner.git
cd meal-planner
```

Simply run the following command to start up the containers (leave the terminal window open as this will not be detached). Once Ollama has finished starting and pulling the model, you can navigate to `http://localhost:3000` in your browser.

```sh
docker-compose -f .devcontainer/docker-compose.yml up
```

