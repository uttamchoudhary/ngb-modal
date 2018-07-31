let gulp = require("gulp"),
    bump = require("gulp-bump"),
    args = require("yargs").argv,
    chalk = require("chalk"),
    packageJSON = ["./../projects/ngb-modal/package.json"];

let type;

if (!args.type || typeof args.type !== "string") {
    type = "patch";
} else {
    type = args.type;
}


// Defined method of updating: 
// Semantic 
gulp.task("default", () => {

    gulp.src(packageJSON)
        .pipe(bump({ type }))
        .pipe(gulp.dest("./../projects/ngb-modal/"));
    console.log(type);
    console.log(chalk.green("[INFO]: Version updated in package"));
});