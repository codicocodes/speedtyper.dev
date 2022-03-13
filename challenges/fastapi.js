module.exports = [
    {
        name: "param_function.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/param_functions.py",
    },
    {
        name: "utils.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/utils.py",
    },
    {
	name: "routing.py",
	source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/routing.py",
    }
  ].map((file) => ({
    ...file,
    project: "FastAPI",
    projectUrl: "https://github.com/tiangolo/fastapi",
    licenseUrl: "https://github.com/tiangolo/fastapi/raw/master/LICENSE",
    license: "MIT",
    language: "Python",
  }));
