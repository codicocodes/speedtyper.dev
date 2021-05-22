# speedtyper-community

This repository is a way for you to add typing challenges into [SpeedTyper.dev](https://speedtyper.dev). You can add the challenges by adding an additional file in challenges/ that exports an array of codeSources, the codeSources should also be exported in challenges/index.js.

This is an example of a formatted codeSource:

```
{
  "name": "add",
  "project": "Lodash",
  "projectUrl": "https://github.com/lodash/lodash",
  "license": "MIT",
  "licenseUrl": "https://raw.githubusercontent.com/lodash/lodash/master/LICENSE",
  "source": "https://raw.githubusercontent.com/lodash/lodash/master/add.js",
  "language": "JavaScript"
}
```

Confirm that your additions are formatted correctly by running `npm run test`

Please keep in mind that this project is a Work in Progress!

Thank you for contributing!

Only projects licensed under MIT, Public Domain, Apache License or another permissive/non-copyleft license are accepted
