import {Routes} from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent),
    },
    {
        path: 'question/:id',
        loadComponent: () => import('./question/question.component').then(m => m.QuestionComponent),
    },
    {
        path: 'leaderboard',
        loadComponent: () =>
            import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    },
    {
        path: 'rules',
        loadComponent: () => import('./rules/rules.component').then(m => m.RulesComponent),
    },
    {
        path: 'admin',
        children: [
            {
                path: 'questions',
                loadComponent: () =>
                    import('./admin/questions/questions.component').then(m => m.QuestionsComponent),
            },
            {
                path: 'answers/:id',
                loadComponent: () =>
                    import('./admin/answers/answers.component').then(m => m.AnswersComponent),
            },
        ],
    },
];
