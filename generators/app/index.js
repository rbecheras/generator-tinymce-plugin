'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  prompting: function () {
    var done = this.async();

    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the SWAP ' + chalk.red('generator-tinymce-plugin') + ' generator!'
    ));

    this.log(
      chalk.blue('Please make sure to create a new empty github repository with a name of the form: tinymce-plugin-<PLUGIN_NAME>.')
    );

    var prompts = [{
      type: 'input',
      name: 'pluginName',
      message: 'What name for this new tinymce plugin ?',
      default: 'mce-custom-plugin'
    },{
      type: 'input',
      name: 'pluginDescription',
      message: 'What description for this new tinymce plugin ?',
      default: 'A tinymce plugin that provides awesome feature'
    },{
      type: 'input',
      name: 'keywords',
      message: 'What keywords for this new tinymce plugin ? (comma separated list)',
      default: 'tinymce,plugin'
    },{
      type: 'input',
      name: 'authorName',
      message: 'What is your full name ?',
      default: null
    },{
      type: 'input',
      name: 'authorEmail',
      message: 'What is your email ?',
      default: null
    },{
      type: 'input',
      name: 'publicUpstreamNameSpace',
      message: 'What is your github username ? (leave empty to ignore)',
      default: null
    }];

    this.prompt(prompts, function (props) {
      this.props = props;
      // To access props later use this.props.someOption;

      done();
    }.bind(this));
  },

  writing: function () {
    var pluginId = this.props.pluginName.split('-'); pluginId = pluginId[pluginId.length-1];
    var viewVars = {
      pluginName: this.props.pluginName,
      pluginId: pluginId,
      pluginDescription: this.props.pluginDescription,
      publicUpstreamNameSpace: this.props.publicUpstreamNameSpace,
      keywords: this.props.keywords.split(','),
      authorName: this.props.authorName,
      authorEmail: this.props.authorEmail
    };
    var templates = [
      ['_package.json','package.json'],
      ['bower.json','bower.json'],
      ['README.md','README.md'],
      ['plugin.js','plugin.js']
    ];
    var files = [
      ['_gitignore','.gitignore'],
      ['gruntfile.js','gruntfile.js'],
      ['LICENSE','LICENSE'],
    ];
    for (var i = 0; i < templates.length; i++) {
      this.fs.copyTpl(
        this.templatePath(templates[i][0]),
        this.destinationPath(templates[i][1]),
        viewVars
      );
    }
    for (var i = 0; i < files.length; i++) {
      this.fs.copy(
        this.templatePath(files[i][0]),
        this.destinationPath(files[i][1])
      );
    }
  },

  install: function () {
    this.installDependencies();
  }
});
