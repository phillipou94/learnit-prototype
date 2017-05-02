# learnit-prototype

This is the prototype for the group project prototype in <a href='http://web.mit.edu/6.813/www/sp17/'>6.813: User Interface Design</a>.

The API running the backend of the website can be found at __<a href='https://github.com/phillipou94/learnit-prototype/tree/master/backend'>learnit-prototype/backend/</a>__

## Usage

The prototype can be found at:
http://web.mit.edu/hansonj/www/learnit-prototype/main.html

### Setup

This github repository does not include an very important file,
`/javascript/templates.js`. It changes everytime there is a change to anything
in the `handlebar/` directory, making it unnecessary to add to the github.

In order to build this file, run the command:  

`handlebars [name-of-templates-directory] -f ./[javascript-folder]/templates.js`  

In the case of this project:  

`handlebars handlebars -f ./javascript/templates.js`  

Additionally, if you would like to run the backend you would need to configure
a file `backend/config.py`. There is already a template located at
`backend/config_template.py`.
