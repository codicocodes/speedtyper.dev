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
    },
    {
        name: "models.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/dependencies/models.py",
    },
    {
        name: "dependencies/utils.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/dependencies/utils.py",
    },
    {
        name: "asyncexitstack.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/asyncexitstack.py",
    },
    {
        name: "cors.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/cors.py",
    },
    {
        name: "gzip.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/gzip.py",
    },
    {
        name: "httpsredirect.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/httpsredirect.py",
    },
    {
        name: "trustedhost.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/trustedhost.py",
    },
    {
        name: "wsgi.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/middleware/wsgi.py",
    },
    {
        name: "constants.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/openapi/constants.py",
    },
    {
        name: "docs.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/openapi/docs.py",
    },
    {
        name: "openapi/models.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/openapi/models.py",
    },
    {
        name: "openapi/utils.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/openapi/utils.py",
    },
    {
        name: "api_key.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/api_key.py",
    },
    {
        name: "base.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/base.py",
    },
    {
        name: "http.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/http.py",
    },
    {
        name: "oauth2.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/oauth2.py",
    },
    {
        name: "open_id_connect_url.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/open_id_connect_url.py",
    },
    {
        name: "security/utils.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/fastapi/security/utils.py",
    },
    {
        name: "scripts/docs.py",
        source: "https://raw.githubusercontent.com/tiangolo/fastapi/master/scripts/security/utils.py",
    }
  ].map((file) => ({
    ...file,
    project: "FastAPI",
    projectUrl: "https://github.com/tiangolo/fastapi",
    licenseUrl: "https://github.com/tiangolo/fastapi/raw/master/LICENSE",
    license: "MIT",
    language: "Python",
  }));
