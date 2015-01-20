exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('login', view_login);
	framework.route('login', json_login, ['post']);
	framework.route('lastconversions', view_lastconversions);
	framework.route('converter', view_converter);
	framework.route('/converter/', json_converter, ['post']);
	framework.route('signup', view_signup);
	framework.route('signup', json_signup, ['post']);
};

function view_homepage() {
	var self = this;
	self.view('homepage');
}

function view_login() {
	var self = this;
	self.view('login');
}

function json_login() {

	var self = this;
	var users = DATABASE('users');

	users.find({name: self.post.name, password: self.post.password}).limit(10).toArray(function(err, docs) {
		
        if (docs[0] != null){

        	console.log(self.post.name + ' logged.');
			self.redirect('converter');

		} else {

			console.log('Wrong user name or password');
			docs[0] = null;
			self.view('login', docs);
		}
    });
}

function view_lastconversions() {
	var self = this;

    var conversions = DATABASE('conversions');

    conversions.find({}).limit(15).toArray(function(err, docs) {
        self.view('lastconversions', docs);
    });
}

function view_converter() {
	var self = this;
	self.view('converter');
}

function json_converter() {

	var self = this;
	console.log(self.post);
	var conversions = DATABASE('conversions');	

	conversions.insert({dec: self.post.dec, bin: self.post.bin, hex: self.post.hex, oct: self.post.oct }, {w:1}, function(err, objects) {});
	self.plain();
}

function view_signup() {
	var self = this;
	self.view('signup');
}

function json_signup() {

	var self = this;
	var users = DATABASE('users');

	users.find({name: self.post.name}).limit(10).toArray(function(err, docs) {
		
        if (docs[0] != null){
        	
			var failure = 'User ' + self.post.name + ' already exists!';
			console.log(failure);
			docs[0] = null;
			self.view('signup', docs);

		} else {
			if(self.post.password2 == self.post.password1) {

				console.log('Saving ' + self.post.name + ' into database');
				users.insert({name: self.post.name, password: self.post.password1, email: self.post.email }, {w:1}, function(err, objects) {});
				docs[0] = {state: 'OK'};
				self.view('signup', docs);
				
			} else {

				console.log('Passwords do not match');
				docs[0] = {state: 'wpw'};
				self.view('signup', docs);

			}
		}
    });
}




