import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Theme } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemesService {
    private apiUrl = 'http://localhost:3000/api/themes';
    
    constructor(private httpClient: HttpClient) {}
    
    getThemes(): Observable<Theme[]> {
        return this.httpClient.get<Theme[]>(this.apiUrl);
    }

    getTheme(id: string): Observable<Theme> {
        return this.httpClient.get<Theme>(`${this.apiUrl}/${id}`);
    }

}