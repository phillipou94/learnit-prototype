import bcrypt
from flask_login import UserMixin

from app import db, login_manager


class User(db.Model, UserMixin):

    __tablename__ =  'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(30), unique=True)
    name = db.Column(db.String(50))
    hashed_password = db.Column(db.String(128))

    exercises = db.relationship('Exercise', backref='user', lazy='dynamic')

    def init_for_demo(self):
        from demo_template import template
        for i, exercise in enumerate(template()):
            new_exercise = Exercise(
                    path_to_img=exercise['path_to_img'],
                    name=exercise['name'],
                    number=i+1,
                    due_date=exercise['due_date'],
                    user_id=self.id
                )
            db.session.add(new_exercise)
            db.session.flush()
            for j, problem in enumerate(exercise['problems']):
                new_problem = Problem(
                        exercise_id=new_exercise.id,
                        number=j+1,
                        contents=problem['contents'],
                        answer=int(problem['answer']),
                        hint=problem['hint'],
                    )
                db.session.add(new_problem)

    def home_json(self):
        exercises_list = self.exercises.all()
        exercises = [exercise.home_json() for exercise in exercises_list]
        completed_exercises = filter(lambda curr: curr.completed_problems() == curr.total_problems(), exercises_list)
        return {'name': self.name, 'username': self.username, 'id': self.id, 'exercises': exercises, 'completed_exercises': len(completed_exercises)}

    def collection_json(self):
        completed_exercises = filter(lambda exercise: exercise.completed(), self.exercises.all())
        collections = [exercise.collection_json() for exercise in completed_exercises]
        return {'name': self.name, 'username': self.username, 'id': self.id, 'collections': collections}

    @staticmethod
    def validate_credentials(username, password):
        user = User.query.filter_by(username=username).first()
        if user:
            if User.check_password(password, user.hashed_password):
                return True

    @staticmethod
    def create_user(name, username, password):
        hashed_password = User.get_hashed_password(password)
        new_user = User(
                name=name,
                username=username,
                hashed_password = hashed_password
            )
        db.session.add(new_user)
        db.session.flush()
        new_user.init_for_demo()
        try:
            db.session.commit()
        except:
            return False
        return new_user

    @staticmethod
    def get_hashed_password(plaintext_password):
        return bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt(12))

    @staticmethod
    def check_password(plaintext_password, hashed_password):
        return bcrypt.checkpw(plaintext_password.encode('utf-8'), hashed_password.encode('utf-8'))

class Exercise(db.Model):

    __tablename__ =  'exercises'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    name = db.Column(db.String(100))
    number = db.Column(db.Integer)
    due_date = db.Column(db.DateTime)
    path_to_img = db.Column(db.String(750))

    problems = db.relationship('Problem', backref='exercise', lazy='dynamic')

    def total_problems(self):
        return len(self.problems.all())

    def completed_problems(self):
        return len(self.problems.filter_by(completed=True).all())

    def completed(self):
        return self.total_problems() == self.completed_problems()

    def json(self):
        problems = [problem.json() for problem in self.problems.all()]
        return {'id': self.id, 'name': self.name, 'number': self.number, 'problems': problems, 'path_to_img': self.path_to_img}

    def home_json(self):
        due_date = None
        if self.due_date:
            due_date = self.due_date.strftime('%B %d, %Y')
        return {'id': self.id, 'name': self.name, 'number': self.number, 'due_date': due_date, 'total_problems': self.total_problems(), 'completed_problems': self.completed_problems()}

    def collection_json(self):
        return {'path_to_img': self.path_to_img, 'name': self.name, 'number': self.number, 'id': self.id}

class Problem(db.Model):

    __tablename__ = 'problems'

    id = db.Column(db.Integer, primary_key=True)
    exercise_id = db.Column(db.Integer, db.ForeignKey('exercises.id'))

    number = db.Column(db.Integer)
    contents = db.Column(db.String(250))
    answer = db.Column(db.Integer)
    hint = db.Column(db.String(1000))

    completed = db.Column(db.Boolean, default=False)

    def complete(self):
        self.completed = True
        db.session.commit()

    def json(self):
        return {'id': self.id, 'number': self.number, 'contents':
                self.contents, 'hint': self.hint, 'completed': self.completed,
                'answer': self.answer}


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@login_manager.unauthorized_handler
def unauthorized():
    return {'error': 'No user was logged in.'}, 401

@login_manager.needs_refresh_handler
def refresh():
    return {'error': 'Unauthorized, log in again'}, 401
