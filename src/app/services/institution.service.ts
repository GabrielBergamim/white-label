import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject, delay, of } from "rxjs";

export interface Institution {
  name: string;
  primaryColor: string;
  serviceContract: number;
}

@Injectable({
  providedIn: 'root'
})
export class InstitutionService {

  private institutions: Subject<Institution[]> = new BehaviorSubject<Institution[]>([]);

  loadInstitutions(): Observable<Institution[]> {
    return of([
      {
        name: 'fiserv',
        primaryColor: '#FF6666',
        serviceContract: 125
      },
      {
        name: 'caixa',
        primaryColor: '#00FFFF',
        serviceContract: 149
      }
    ]).pipe(delay(500));
  }

  setInstitutions(institutions: Institution[]): void {
    this.institutions.next(institutions);
  }

  getInstitutions(): Observable<Institution[]> {
    return this.institutions.asObservable();
  }
}
