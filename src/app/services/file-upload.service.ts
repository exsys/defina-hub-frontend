import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private teamFileSubject = new BehaviorSubject(null as any);
  public teamFileSubject$ = this.teamFileSubject.asObservable();

  constructor(
    private router: Router,
  ) { }

  loadTeam(event: any): void {
    let reader = new FileReader();

    // once uploading file is finished send the team to all subscribers.
    reader.onload = (event) => {
      let team: any;

      // error if json file contains gibberish
      try {
        team = JSON.parse(event.target?.result as string);
      } catch (error) {
        console.log(error);
        return;
      }

      // check if json file actually contains correct format
      if (!team) return;
      if (!Array.isArray(team)) return;
      if (team.length > 4) return;
      if (team.length < 1) return;

      // push team to all subscribers (hero selection container)
      this.teamFileSubject.next(team);
    };

    reader.onerror = () => {
      console.log(reader.error);
    };

    // actual reading of the uploaded file. which will trigger reader.onload
    reader.readAsText(event.target.files[0]);
  }

  loadTeamAfterRedirect(team: any): void {
    this.router.navigate(["/"]);
    // setTimeout because of ExpressionChangedAfterItHasBeenCheckedError
    setTimeout(() => {
      this.teamFileSubject.next(team);
    }, 0);
  }
}
