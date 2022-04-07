module.exports = [
    {
        name: "cacheprovider.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/cacheprovider.py",
    },
    {
        name: "debugging.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/debugging.py",
    },
    {
        name: "fixtures.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/fixtures.py",
    },
    {
        name: "junitxml.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/junitxml.py",
    },
    {
        name: "monkeypatch.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/monkeypatch.py",
    },
    {
        name: "nose.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/nose.py",
    },
    {
        name: "outcomes.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/outcomes.py",
    },
    {
        name: "pastebin.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/pastebin.py",
    },
    {
        name: "runner.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/runner.py",
    },
    {
        name: "setuponly.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/setuponly.py",
    },
    {
        name: "unittest.py",
        source: "https://raw.githubusercontent.com/pytest-dev/pytest/main/src/_pytest/unittest.py",
    }
  ].map((file) => ({
    ...file,
    project: "pytest",
    projectUrl: "https://github.com/pytest-dev/pytest",
    licenseUrl: "https://github.com/pytest-dev/pytest/blob/main/LICENSE",
    license: "MIT",
    language: "Python",
  }));
