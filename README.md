# code-for-canada
Code for Canada skills challenge 2019 - Developers

## The Task
Look at this dataset representing building code violations. Write a brief program in the language of your choice to summarize the data. Your program should calculate:
- The number of violations in each category
- The earliest and latest violation date for each category

You can use your preferred programming language, and decide on the presentation format of the resulting data.

## Build Instructions
1. Clone the repo
```
git clone git@github.com:missmatsuko/code-for-canada.git
```

2. Go into the project directory
```
cd code-for-canada
```

3. Install Node modules
```
npm install
```

4. Run a build command
```
// Build files OR,
npm run build

// Build and watch
npm start
```

### Technologies
- [Webpack](https://github.com/webpack/webpack) for build
- [Papa Parse](https://github.com/mholt/PapaParse) for parsing CSV files
- [Luxon](https://github.com/moment/luxon) for comparing and formatting dates
