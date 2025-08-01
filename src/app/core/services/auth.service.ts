import { Injectable, signal } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../../models";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _isLoggedIn = signal<boolean>(false);
    private _currentUser = signal<User | null>(null);
    private _users: User[] = [
        {id: '5fa64b162183ce1728ff371d', username: 'John', email: 'john@gmail.com', phone: '885 888 888'},
        {id: '5fa64b162183ce1728ff371e', username: 'Jane', email: 'jane@gmail.com', phone: '885 888 888'},
        {id: '5fa64b162183ce1728ff371f', username: 'David', email: 'david@gmail.com', phone: '885 888 888'},
    ];

    public isLoggedIn = this._isLoggedIn.asReadonly();
    public currentUser = this._currentUser.asReadonly();

    constructor() {
        const savedUser = localStorage.getItem('currentUser');
        if (savedUser) {
            const user: User = JSON.parse(savedUser);
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
        }
     }

    login(email: string, password: string): boolean {
        if(email && password) {
            const user = this._users[0];
            this._currentUser.set(user);
            this._isLoggedIn.set(true);
            localStorage.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }

    register(username: string, email: string, phone: string, password: string, rePassword: string): boolean {
        if(username && email && phone &&password && rePassword) {
            const newUser: User = {
                id: `user_${Date.now()}`,
                username,
                email,
                phone
            };
            this._users.push(newUser);
            this._currentUser.set(newUser);
            this._isLoggedIn.set(true);
            localStorage.setItem('currentUser', JSON.stringify(newUser));
            return true;
        }
        return false;
    }

    logout(): void {
        this._currentUser.set(null);
        this._isLoggedIn.set(false);
        localStorage.removeItem('currentUser');
    }

    getCurrentUserID(): string | null {
        return this._currentUser()?.id || null;
    }

    updateUser(id: string | undefined, user: User): void {
        const index = this._users.findIndex(u => u.id === id);
        if(index !== -1) {
            this._users[index] = user;
        }
        this._currentUser.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
    }
}
