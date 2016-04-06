const through = require("through2");
const util = require("gulp-util");
const inquirer = require("inquirer");
const colors = require("colors/safe");

function gulpchangelog(version, user, update) {
  
  var changes = [];
  if (version === undefined)
  {
    throw new util.PluginError("gulp-changelog", "Version parameter is required");
  }
  
  if (update === undefined)
  {
    update = false;
  }
  
  function changelog(file, encoding, callback) {
    if (file.isNull())
    {
      return callback(null, file);
    }
    else if (file.isStream())
    {
      this.emit('error', new util.PluginError("gulp-changelog", "Stream not supported"));
    }
    else
    {
      if (!update) {
        inquirer.prompt({type: "confirm", name: "update", message: "Would you like to update the Changelog?"}, 
        function (answer) {
          if (!answer.update)
            return callback(null, file);
          else
            return changelogstp2(file, encoding, callback);
        });
      }
      else {
        return changelogstp2(file, encoding, callback);
      }
     }       
    }
    
    function changelogstp2(file, encoding, callback) {
      if (user == undefined)
      {
        inquirer.prompt({type: "input", name: "user", message: "What is the author of the change ?", default: process.env.USER},
        function (answer) {
          user = answer.user;
          
          return changelogstp3(file, encoding, callback, 0);
        });
      }
      else
        return changelogstp3(file, encodinf, callback, 0);
      
    }
    
    function changelogstp3(file, encoding, callback, i) {
      
      if (i == 0) {
        console.log(colors.bold("List the changes bellow (Press enter to add another change, press two times to terminate)"));
      }
        inquirer.prompt({type: "input", name: "change", message: "* "},
        function (answer) {
          if (answer.change == "")
            return changelogstp4(file, encoding, callback);
          else {
            changes.push(answer.change);
            return changelogstp3(file, encoding, callback, i + 1);
          }
        });
    }
    
    function changelogstp4(file, encoding, callback) {
      
      util.log("Version :", util.colors.cyan(version));
      util.log("Author :", util.colors.cyan(user));
      util.log("Changes :");
      changes.forEach(function (elem, index, array) {
        util.log("o ", util.colors.cyan(elem));
      });
      
      var changeMd = `\n## ${version}\n\n`;
      
      changes.forEach(function (elem, i, a) {
        changeMd += `* ${elem}\n`;
      });
      
      changeMd += `\n*${user}, ${new Date()}*\n\n---`;
      
      var content = file.contents.toString('utf8');
      var prev = content.substring(12);
      var ch = `# Changelog\n${changeMd}${prev}`;
      
      file.contents = new Buffer(ch, 'utf8');
      
      util.log(util.colors.green("Changelog updated"));     
      return callback(null, file);      
    }
    
  return through.obj(changelog);
}

module.exports = gulpchangelog;