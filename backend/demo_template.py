import datetime
import random

names = ['Addition I', 'Addition II', 'Addition III', 'Subtraction II', 'Subtraction II', 'Subtraction III', 'Review I', 'Review II']
imgs = ['./assets/andrew-luck.png','./assets/red-car.png','./assets/cheetah.png','./assets/andrew-luck.png','./assets/red-car.png','./assets/cheetah.png','./assets/andrew-luck.png','./assets/red-car.png']

addition = [
    {
        'contents': '6 + 9 =',
        'answer': 15,
        'hint': 'Count up from 9.'
    },
    {
        'contents': '16 + 4 =',
        'answer': 20,
        'hint': 'Try 6 + 4, then add 10.'
    },
    {
        'contents': '13 + 6 =',
        'answer': 19,
        'hint': 'Try 3 + 9, then add 10'
    },
    {
        'contents': '11 + 20 =',
        'answer': 31,
        'hint': 'Stack and add.'
    }
]

subtraction = [
    {
        'contents': '6 - 9 =',
        'answer': -3,
        'hint': 'The answer is negative.'
    },
    {
        'contents': '12 - 4 =',
        'answer': 8,
        'hint': '11, 10, 9, ...'
    },
    {
        'contents': '0 - 9 =',
        'answer': -9,
        'hint': 'Negate the second number.'
    },
    {
        'contents': '32 - 32 =',
        'answer': 0,
        'hint': 'anything - anything = 0'
    }
]


def template():
    exercises = []
    start_date = datetime.datetime(datetime.datetime.today().year, datetime.datetime.today().month, datetime.datetime.today().day - 1)
    for i in range(8):
        due_date = start_date + datetime.timedelta(days=2*i)

        def make_exercise(name, img, due_date, problems):
            return {'name':name, 'path_to_img': img, 'due_date': due_date, 'problems': problems}

        if i in [0, 1, 2]: # Addition
            problems = []
            for j in range(8):
                problems.append(random.choice(addition))
            exercises.append(make_exercise(names[i], imgs[i], due_date, problems))
        if i in [3, 4, 5]: # Subtraction
            problems = []
            for j in range(8):
                problems.append(random.choice(subtraction))
            exercises.append(make_exercise(names[i], imgs[i], due_date, problems))
        if i in [6, 7]: # Both
            problems = []
            for j in range(8):
                problems.append(random.choice(random.choice([addition,subtraction])))
            exercises.append(make_exercise(names[i], imgs[i], due_date, problems))
    return exercises
