var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
	prompting: function() {
		
		// appname
		// appdescription
		// appversion
		// repo_url

		var done = this.async();

		var defaultGreeting =
		'\n    .-----.         .--------------------------.' +
		'\n   /  ~  ~`\\        | Hey Guys it\'s me, GNorm! |' +
		'\n  {   0  0 ;      O |                          |' +
		'\n   \\    _\\ /    o   |    Let\'s build a web     |' +
		'\n    \\ \\_, /   .     |           site!          |' +
		'\n,---/\'---\'\\---,     \'--------------------------\'' +
		'\n\n' //**  +
		// '\n* Gnorm is just an average gnome,' +
		// '\n* but he wants to impress the lady Gnomes by doing something heroic.' +
		// '\n* So he steals the gnomes\' magic stones and' +
		// '\n* exposes them to sunlight to recharge them.' +
		// '\n* https://www.youtube.com/watch?v=ilZpE4yKFSU ' +
		// '\n**' +
		// '\n\n'
		;

		this.log(defaultGreeting);

		var prompts = [
			{
				type: 'input',
				name: 'appname',
				message: 'What is the project name?',
				default: this.appname
			},
			{
				type: 'input',
				name: 'appdescription',
				message: 'What is the project description?',
				default: this.appdescription
			},
			{
				type: 'input',
				name: 'appversion',
				message: 'What is the project version?',
				default: '0.1.0'
			},
			{
				type: 'input',
				name: 'repo_url',
				message: 'Please enter the repository URL (git@bitbucket.org:genuine/*.git):',
				default: null
			},
			{
				type: 'confirm',
				name: 'installDependencies',
				message: 'Do you want to install dependencies (npm install)?',
				default: false
			}
		];

		this.prompt(prompts, function (props) {
		
			// to access props later use this.props.someOption;
			this.props = props;

			done();

		}.bind(this));

	},
	writing: function() {

		// copy .gitignore
		this.fs.copy(
			this.templatePath('_gitignore'),
			this.destinationPath('.gitignore')
		);

		// copy Gemfile
		this.fs.copy(
			this.templatePath('_Gemfile'),
			this.destinationPath('Gemfile')
		);

		// copy gulpfile.js
		this.fs.copy(
			this.templatePath('_gulpfile.js'),
			this.destinationPath('gulpfile.js')
		);

		// copy README.md
		this.fs.copy(
			this.templatePath('_README.md'),
			this.destinationPath('README.md')
		);

		// copy gnorm/
		this.fs.copy(
			this.templatePath('gnorm/'),
			this.destinationPath('./gnorm')
		);

		// copy app/
		this.fs.copy(
			this.templatePath('app/'),
			this.destinationPath('./app')
		);

		// template _package.json
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			{ 
				appname: this.props.appname,
				appdescription: this.props.appdescription,
				appversion: this.props.appversion,
				repo_url: this.props.repo_url
			}
		);
		
	},
	install: function() {

		// install dependencies if we choose
		if (this.props.installDependencies) {
			// run npm install and bower install
			this.installDependencies();

			// run bundle install
			this.spawnCommand('bundle', ['install']);
		}

		// if we have a repo_url, automatically intialize git and add the origin remote
		if (this.props.repo_url) {
			this.spawnCommand('git', ['init']).on('close', ()=> {
				this.spawnCommand('git', ['remote', 'add', 'origin', this.props.repo_url]);
			});
		}
		
	},
	end: function() {
		
	}
});