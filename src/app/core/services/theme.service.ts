import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ThemeModel } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class ThemesService {
    private apiUrl = 'http://localhost:3000/api/themes';
    
    constructor(private httpClient: HttpClient) {}
    
    getThemes(): Observable<ThemeModel[]> {
        return this.httpClient.get<ThemeModel[]>(this.apiUrl);
    }

    getTheme(id: string): Observable<ThemeModel> {
        return this.httpClient.get<ThemeModel>(`${this.apiUrl}/${id}`);
    }

}