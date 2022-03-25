module.exports = [
    {
        name: "applications.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/applications.py",
    },
    {
        name: "background.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/background.py",
    },
    {
        name: "concurrency.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/concurrency.py",
    },
    {
        name: "datastructures.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/datastructures.py",
    },
    {
        name: "encoders.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/encoders.py",
    },
    {
        name: "exception_handlers.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/exception_handlers.py",
    },
    {
        name: "exceptions.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/exceptions.py",
    },
    {
        name: "logger.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/logger.py",
    },
    {
        name: "param_functions.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/param_functions.py",
    },
    {
        name: "params.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/params.py",
    },
    {
        name: "requests.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/requests.py",
    },
    {
        name: "responses.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/responses.py",
    },
    {
        name: "routing.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/routing.py",
    },
    {
        name: "staticfiles.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/staticfiles.py",
    },
    {
        name: "templating.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/templating.py",
    },
    {
        name: "testclient.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/testclient.py",
    },
    {
        name: "types.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/types.py",
    },
    {
        name: "utils.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/utils.py",
    },
    {
        name: "websockets.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/websockets.py",
    }
  ].map((file) => ({
    ...file,
    project: "FastAPI",
    projectUrl: "https://github.com/tiangolo/fastapi",
    licenseUrl: "https://github.com/tiangolo/fastapi/raw/master/LICENSE",
    license: "MIT",
    language: "Python",
  }));
