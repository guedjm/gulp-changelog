# gulp-changelogmd

Gulp plugin to manage changelog file.


## Usage

### Install

```
npm install gulp-changelog --save
```

## Example

```
const fs = require("fs");
const gulp = require("gulp");
const changelog = require("gulp-changelogmd");

gulp.task("changelog", function () {
  
  // Getting current project version
  const pkg = JSON.parse(fs.readFileSync("../package.json"));
  
  return gulp.src("./CHANGELOG.md")
    .pipe(changelog(pkg.version))     //Invoking gulp-changelog
    .pipe(gulp.dest("./"));
});
```

## API

### changelog(version, [user], [update]);
Run changelog plugin
* **version (string):** current project version
* **user (string):** Optional. Author of the commit
* **update (bool):** Force update


## Output
```
[14:15:40] Starting 'changelog'...
? Would you like to update the Changelog? Yes
? What is the author of the change ? guedj_m
List the changes bellow (Press enter to add another change, press two times to terminate)
? *  This is a test
? *  Another one
? *  
[14:15:59] Version : 1.0.0
[14:15:59] Author : guedj_m
[14:15:59] Changes :
[14:15:59] o  This is a test
[14:15:59] o  Another one
[14:15:59] Changelog updated
[14:15:59] Finished 'changelog' after 19 s

```

### CHANGELOG.md
```
# Changelog

## 1.0.0

* This is a test
* Another one

*guedj_m, Wed Apr 06 2016 14:15:59 GMT-0700 (PDT)*

---

```