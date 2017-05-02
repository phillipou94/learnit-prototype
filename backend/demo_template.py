import datetime
template = [
    {
        'name': 'Addition 1',
        'path_to_img': '/assets/cheetah.png',
        'due_date': datetime.datetime(2017, 5, 1),
        'problems': [
            {
                'contents': '6 + 9 =',
                'answer': 15,
                'hint': 'The second digit of the sum will be one less than 6, because it\'s being added by 9.'
            },
            {
                'contents': '10 + 9 =',
                'answer': 19,
                'hint': 'The second digit of the sum will be one less than 6, because it\'s being added by 9.'
            },
            {
                'contents': '14 + 4 =',
                'answer': 18,
                'hint': 'The answer is 18.'
            },
            {
                'contents': '6 + 9 =',
                'answer': 15,
                'hint': 'The answer is 18.'
            },
            {
                'contents': '6 + 5 =',
                'answer': 11,
                'hint': 'The answer is 11'
            },
            {
                'contents': '2 + 3 + 8 =',
                'answer': 13,
                'hint': 'The answer is 13'
            },
            {
                'contents': '1 + 24 + 9 =',
                'answer': 34,
                'hint': '1 + 9 = 10'
            },
            {
                'contents': '14 + 13 =',
                'answer': 15,
                'hint': 'Stack the numbers and add straight down.'
            }
        ]
    }
]
