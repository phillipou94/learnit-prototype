import datetime
import random

names = ['Addition I', 'Addition II', 'Addition III', 'Subtraction I', 'Subtraction II', 'Subtraction III', 'Review I', 'Review II']
imgs = ['./assets/andrew-luck.png','./assets/red-car.png','./assets/cheetah.png','./assets/ocean.jpg','./assets/city.jpg','./assets/snowboard.jpg','./assets/earth.jpg','./assets/fish.jpg']

addition = [
    {
        'contents': '6 + 9 =',
        'answer': 15,
        'hint': 'Count up from 9.'
    },
    {
        'contents': '34 + 4 =',
        'answer': 38,
        'hint': 'Only add the last digits.'
    },
    {
        'contents': '2 + 2 =',
        'answer': 4,
        'hint': 'Try counting with your fingers.'
    },
    {
        'contents': '100 + 32 =',
        'answer': 132,
        'hint': '32 + 00'
    },
    {
        'contents': '6 + ( -9 ) =',
        'answer': -3,
        'hint': 'Subtract with positives.'
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
        'contents': '5 - ( -10 ) =',
        'answer': 15,
        'hint': 'It\'s the same as 5 + 10'
    },
    {
        'contents': '2 - 12 =',
        'answer': -10,
        'hint': 'It\'s the negative of 12 - 2.'
    },
    {
        'contents': '20 - 12 =',
        'answer': 8,
        'hint': 'Equal to 10 - 8'
    },
    {
        'contents': '30 - 5 =',
        'answer': 25,
        'hint': 'Ends with a 5.'
    },
    {
        'contents': '32 - 32 =',
        'answer': 0,
        'hint': 'anything - anything = 0'
    }
]


def template():
    exercises = []
    _imgs = random.sample(imgs, 8)
    start_date = datetime.datetime(datetime.datetime.today().year, datetime.datetime.today().month, datetime.datetime.today().day - 1)
    for i in range(8):
        due_date = start_date + datetime.timedelta(days=i)
        def make_exercise(name, img, due_date, problems):
            return {'name':name, 'path_to_img': img, 'due_date': due_date, 'problems': problems}

        if i in [0, 1, 2]: # Addition
            problems = random.sample(addition, 8)
            exercises.append(make_exercise(names[i], _imgs[i], due_date, problems))
        if i in [3, 4, 5]: # Subtraction
            problems = random.sample(subtraction, 8)
            exercises.append(make_exercise(names[i], _imgs[i], due_date, problems))
        if i in [6, 7]: # Both
            problems = addition + subtraction
            problems = random.sample(problems, 8)
            exercises.append(make_exercise(names[i], _imgs[i], due_date, problems))
    return exercises
