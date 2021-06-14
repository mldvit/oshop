import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObspatternComponent } from './components/obspattern/obspattern.component';
import { TrialsComponent } from './components/trials/trials.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [ObspatternComponent, TrialsComponent],
  imports: [
    RouterModule.forChild([
      { path: 'learning/RxJs', component: ObspatternComponent },
      { path: 'learning/trails', component: TrialsComponent }
    ]),
    CommonModule
  ],
  exports: [
    ObspatternComponent, TrialsComponent
  ]
})
export class LearningModule { }
