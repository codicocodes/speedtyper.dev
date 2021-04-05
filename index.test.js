const challenges = require("./challenges");

const SUPPORTED_LANGUAGES = [
  "Bash",
  "C",
  "C#",
  "C++",
  "CSS",
  "Elm",
  "Eno",
  // "ERB / EJS",
  "Fennel",
  "Go",
  "HTML",
  "Java",
  "JavaScript",
  "Lua",
  "Markdown",
  "OCaml",
  "PHP",
  "Python",
  "Ruby",
  "Rust",
  "R",
  "S-expressions",
  "SPARQL",
  "SystemRDL",
  "Svelte",
  "TOML",
  "Turtle",
  "TypeScript",
  "Verilog",
  "VHDL",
  "Vue",
  "YAML",
  "WASM",
];
// const ACCEPTED_LICENSES = ["MIT"];
const GITHUB_URL = "https://github.com/";
const GITHUB_RAW_URL = "https://raw.githubusercontent.com/";

describe("All codesources provided are accurate", () => {
  challenges.forEach((codeSource) => {
    describe(codeSource.name, () => {
      test("properties have the correct types", () => {
        expect(typeof codeSource.name).toBe("string");
        expect(typeof codeSource.project).toBe("string");
        expect(typeof codeSource.license).toBe("string");
        expect(typeof codeSource.licenseUrl).toBe("string");
        expect(typeof codeSource.source).toBe("string");
        expect(typeof codeSource.language).toBe("string");
      });

      test("language is supported by treesitter", () => {
        expect(SUPPORTED_LANGUAGES.includes(codeSource.language)).toBe(true);
      });

      test("properties to be formatted correctly", () => {
        // projectUrl
        expect(codeSource.projectUrl.startsWith(GITHUB_URL));
        expect(
          codeSource.projectUrl.includes(codeSource.project.toLowerCase())
        );

        // license
        // expect(ACCEPTED_LICENSES.includes(codeSource.license)).toBe(true);

        // licenseUrl
        expect(codeSource.licenseUrl.startsWith(GITHUB_RAW_URL));
        expect(codeSource.licenseUrl.includes("LICENSE"));

        // source
        expect(codeSource.source.startsWith(GITHUB_RAW_URL));
        expect(codeSource.source.includes(codeSource.name.toLowerCase()));
        expect(codeSource.source.includes(codeSource.project.toLowerCase()));
      });
    });
  });
});
