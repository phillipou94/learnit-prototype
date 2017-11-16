from flask import Flask
from flask_restful import Api, Resource, request
from flask_login import LoginManager, login_required, fresh_login_required, login_user, logout_user, current_user
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
app.config.from_object('config')
CORS(app, supports_credentials=True)
api = Api(app)
login_manager = LoginManager(app)
db = SQLAlchemy(app)

import models

class Signup(Resource):
    def post(self):
        json_data = request.form
        username = json_data['username']
        password = json_data['password']
        name = json_data['name']
        print 'Hello' + username
        try:
            new_user = models.User.create_user(name, username, password)
            if new_user == False:
                return {'error':'There was an error creating the account.'}, 400
            login_user(new_user)
            return {'id': new_user.id, 'username':new_user.username, "name": new_user.name}, 201
        except IntegrityError as e:
            errno = e.orig[0]
            if errno == 1062:
                return {'error': 'Username already in use'}, 400
            raise e

class Signin(Resource):
    def post(self):
        json_data = request.form
        username = json_data['username']
        password = json_data['password']
        _user = models.User.query.filter_by(username=username).first()
        if _user:
            if models.User.check_password(password, _user.hashed_password):
                login_user(_user)
                return {'id': _user.id, 'username': _user.username, "name": _user.name}, 200
        return {'error': 'There was an error signing in'}, 400

    @login_required
    def delete(self):
        '''
        LOGOUT function
        '''
        logout_user()
        return {'success': 1}, 200

class Home(Resource):
    decorators = [fresh_login_required]
    def get(self):
        return current_user.home_json(), 200

class Exercise(Resource):
    decorators = [fresh_login_required]
    def get(self, id):
        exercise = models.Exercise.query.get(id)
        if exercise:
            if int(exercise.user_id) == int(current_user.id):
                return exercise.json(), 200
            else:
                return {'error': 'User does not have access.'}, 400
        else:
            return {'error': 'Exercise does not exist'}, 404

class Problem(Resource):
    decorators = [fresh_login_required]
    def put(self, id):
        completed_problem = models.Problem.query.get(id)
        if completed_problem:
            if completed_problem.exercise.user.id == current_user.id:
                completed_problem.complete()
                return {'success': 1}, 200
            else:
                return {'error': 'Problem is assigned to this user.'}, 404
        else:
            return {'error': 'Problem does not exist.'}, 404

class Collections(Resource):
    decorators = [fresh_login_required]
    def get(self):
        return current_user.collection_json(), 200


api.add_resource(Signup, '/signup/')
api.add_resource(Signin, '/signin/')
api.add_resource(Home, '/home/')
api.add_resource(Exercise, '/exercises/<int:id>/')
api.add_resource(Problem, '/problems/<int:id>/')
api.add_resource(Collections, '/collections/')
