import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { PostModel } from "../../models";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PostsService {
    private apiUrl = 'http://localhost:3000/api/posts?limit={0}';
    
    constructor(private httpClient: HttpClient) {}
    
    getRecentPosts(limit:number = 5): Observable<PostModel[]> {
        return this.httpClient.get<PostModel[]>(this.apiUrl.replace('{0}', limit.toString()));
    }

}