import {Routes} from '@angular/router';
import {isSignedInGuard} from './common/auth-guards';

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
        data: {title: 'Calendar'},
    },
    {
        path: 'chat',
        canActivate: [isSignedInGuard],
        loadComponent: () => import('./chat/chat.component').then(m => m.ChatComponent),
        data: {title: 'Chat'},
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
        data: {title: 'Leaderboard'},
    },
    {
        path: 'rules',
        canActivate: [isSignedInGuard],
        loadComponent: () => import('./rules/rules.component').then(m => m.RulesComponent),
        data: {title: 'Rules'},
    },
    {
        path: 'admin',
        canActivate: [isSignedInGuard],
        children: [
            {
                path: 'init-questions',
                loadComponent: () =>
                    import('./admin/init-questions/init-questions.component').then(
                        m => m.InitQuestionsComponent
                    ),
                data: {title: 'Create questions'},
            },
            {
                path: 'questions',
                loadComponent: () =>
                    import('./admin/questions/questions.component').then(m => m.QuestionsComponent),
                data: {title: 'Questions'},
            },
            {
                path: 'answers/:id',
                loadComponent: () =>
                    import('./admin/answers/answers.component').then(m => m.AnswersComponent),
                data: {title: 'Answers'},
            },
            {
                path: 'files',
                loadComponent: () => import('./admin/files/files.component').then(m => m.FilesComponent),
                data: {title: 'Files'},
            },
        ],
    },
];
