const fs = require("fs");
const gulp = require("gulp");
const changelog = require("../src/index.js");

gulp.task("test", function () {
  
  const pkg = JSON.parse(fs.readFileSync("../package.json"));
  
  return gulp.src("./CHANGELOG.md")
    .pipe(changelog(pkg.version))
    .pipe(gulp.dest("./"));
});