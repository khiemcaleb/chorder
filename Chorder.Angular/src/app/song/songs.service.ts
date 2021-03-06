import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Song } from './models/song';
import { environment } from '../../environments/environment';

@Injectable()
export class SongsService {
  private url = environment.chorderApiUrl + "api/songs";

  constructor(private http: Http = null) {

  }

  getSongs() {
    return this.http.get(this.url);
  }

  getSongById(id: number) {
    return this.http.get(this.url + '/' + id);
  }

  createSong(song: Song) {
    let body = JSON.stringify(song);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.url, body, options);
  }

  updateSong(song: Song){
    let body = JSON.stringify(song);
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.url + '/' + song.id, body, options);
  }

  deleteSong(id: number){
    return this.http.delete(this.url + '/' + id);
  }
}
