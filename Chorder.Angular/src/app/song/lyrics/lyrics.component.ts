import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SongMode, ViewMode } from '../models/song';
import { Part } from '../models/part';
import { Line } from '../models/line';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {

  @Input() part: Part;
  @Input() mode: SongMode;

  @Output() change = new EventEmitter();

  isEditing: boolean = false;
  isFocus: boolean = true;

  SongMode: typeof SongMode = SongMode;
  ViewMode: typeof ViewMode = ViewMode;
  
  constructor() { }

  get isEmptyLyrics(): boolean {
    return !this.part.lyrics || this.part.lyrics.trim() == '';
  }

  ngOnInit(): void {
    if (this.mode == SongMode.EDIT && this.isEmptyLyrics) {
      this.isEditing = true;
    }
  }

  onLyricsClick() {
    if (this.mode == SongMode.EDIT && !this.isEditing)
      this.isEditing = true;
  }

  onLyricsBlur() {
    if (this.isEditing && !this.isEmptyLyrics)
      this.isEditing = false;

    if (!this.isFocus)
      this.isFocus = true;
  }

  onLyricsChange($event){
    this.part.lyrics = this.beautifyLyrics(this.part.lyrics);
    this.part.lines = this.parseLines(this.part.lyrics);
    this.change.emit($event);
  }

  parseLines(text:string){
    var lines: Line[] = [];
    var textLines = text.split('\n');

    for (let i = 0; i < textLines.length; i++){
      lines.push(new Line(textLines[i]));
    }

    return lines;
  }

  beautifyLyrics(text: string){
    while (text.indexOf("  ") !== -1)
      text = text.replace("  ", " ");

    while (text.indexOf("\n\n") !== -1 )
      text = text.replace("\n\n", "\n");

    return text.trim();
  }

}
