## Getting Started

This is the source code for the website www.theworldclimate.com which is intended to be a demonstration website of climate projection capabilities. 

This is a React App using the Next.js framework. 

To run locally
```bash
npm run dev
```

Data generated for Location pages is from a combination of historical CSV files and project data from our climate data API is currently stored in source as JSON data. Data Generation code can be found in the [Data Wrangling](https://github.com/WorldClimate/DataWrangling) repo

We would like to move over to dynamic data generation for everything eventually. This dynamic retrieval is currently hosted as a python API with the source code located in the [ClimateRiskAI](https://github.com/biotic-labor/ClimateRiskAI) repo. This codebase powers the /report generation on the website.
