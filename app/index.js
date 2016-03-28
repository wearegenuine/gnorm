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
				message: 'What is the project name (no spaces please)?',
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
				message: 'Please enter the origin repository URL (git@bitbucket.org:genuine/*.git):',
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

		// copy gulpfile.js
		this.fs.copy(
			this.templatePath('_gulpfile.js'),
			this.destinationPath('gulpfile.js')
		);

		// copy jsbeautifyrc
		this.fs.copy(
			this.templatePath('_jsbeautifyrc'),
			this.destinationPath('.jsbeautifyrc')
		);

		// copy jshintrc
		this.fs.copy(
			this.templatePath('_jshintrc'),
			this.destinationPath('.jshintrc')
		);

		// copy gulpfile.js
		this.fs.copy(
			this.templatePath('_gulpfile.js'),
			this.destinationPath('gulpfile.js')
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

		// template README.md
		this.fs.copyTpl(
			this.templatePath('_README.md'),
			this.destinationPath('README.md'),
			{
				appname: this.props.appname,
				appdescription: this.props.appdescription,
				appversion: this.props.appversion,
				generatorversion: this._globalConfig.name,
				repo_url: this.props.repo_url
			}
		);

		// template _package.json
		var removeSpaces = this.props.appname.replace(/\s/g, '-');
		this.fs.copyTpl(
			this.templatePath('_package.json'),
			this.destinationPath('package.json'),
			{
				appname: removeSpaces,
				appdescription: this.props.appdescription,
				appversion: this.props.appversion,
				repo_url: this.props.repo_url
			}
		);

	},
	install: function() {

		// install dependencies if we choose
		if (this.props.installDependencies) {
			// run npm install
			this.npmInstall();
		}

		// if we have a repo_url, automatically intialize git and add the origin remote
		if (this.props.repo_url) {
			var that = this;
			var spawnRepo = this.props.repo_url;
			this.spawnCommand('git', ['init']).on('close', function() {
				that.spawnCommand('git', ['remote', 'add', 'origin', spawnRepo]);
			});
		} else {
			// without a repo_url, atleast git init
			this.spawnCommand('git', ['init']);
		}

	},
	end: function() {

	}
});
