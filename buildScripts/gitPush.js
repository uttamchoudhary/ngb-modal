let gulp = require("gulp"),
    version = require("./../projects/ngb-modal/package.json").version,
    git = require("gulp-git"),
    chalk = require("chalk"),
    lastTag = require("git-tags"),
    push = require("gulp-git-push");

gulp.task("default", function() {

    lastTag.latest(function(err, commit) {

        gulp.src(["./../*", "!./../node_modules/"])
            .pipe(git.add())
            .pipe(git.commit(`updated package to verson ${version}`))
            .pipe(push('origin', 'master', { args: " -f" }, function(err) {
                if (err) throw err;
                else console.log(chalk.green("[INFO]: Pushed updated versions of package managers"));
            }, function(err) {}));

    });
});