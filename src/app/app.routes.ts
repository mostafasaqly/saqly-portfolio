import { Routes } from '@angular/router';
import { HomePageComponent } from './features/home/pages/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
    title: 'Mostafa Saqly | Senior Angular Engineer',
  },
  {
    path: 'courses',
    loadComponent: () =>
      import('./features/courses/pages/courses-page.component').then(
        (m) => m.CoursesPageComponent
      ),
    title: 'Corporate Training Packages | Mostafa Saqly',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
