import {Routes} from '@angular/router';
import {isSignedInGuard} from './auth-guards';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
    },
    {
        path: '',
        pathMatch: 'full',
        canActivate: [isSignedInGuard],
        loadComponent: () => import('./calendar/calendar.component').then(m => m.CalendarComponent),
    },
    {
        path: 'question/:id',
        canActivate: [isSignedInGuard],
        loadComponent: () => import('./question/question.component').then(m => m.QuestionComponent),
    },
    {
        path: 'leaderboard',
        canActivate: [isSignedInGuard],
        loadComponent: () =>
            import('./leaderboard/leaderboard.component').then(m => m.LeaderboardComponent),
    },
    {
        path: 'rules',
        canActivate: [isSignedInGuard],
        loadComponent: () => import('./rules/rules.component').then(m => m.RulesComponent),
    },
    {
        path: 'admin',
        canActivate: [isSignedInGuard],
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
