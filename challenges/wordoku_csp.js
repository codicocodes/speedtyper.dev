module.exports = [
    {
        name: "CSP.py",
        source: "https://raw.githubusercontent.com/prafgup/Wordoku_AI_CSP_Solver/master/CSP.py",
    },
    {
        name: "WordokuSolver_Backtracking.py",
        source: "https://raw.githubusercontent.com/prafgup/Wordoku_AI_CSP_Solver/master/WordokuSolver_Backtracking.py",
    }
  ].map((file) => ({
    ...file,
    project: "Wordoku_AI_CSP_Solver",
    projectUrl: "https://github.com/prafgup/Wordoku_AI_CSP_Solver",
    licenseUrl: "https://github.com/prafgup/Wordoku_AI_CSP_Solver/blob/master/LICENSE",
    license: "MIT",
    language: "Python",
  }));
