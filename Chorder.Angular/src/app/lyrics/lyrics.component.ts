import { Component, OnInit, Input } from '@angular/core';
import { DisplayMode } from '../song/song';
import { Part } from '../part/part.component';

@Component({
  selector: 'app-lyrics',
  templateUrl: './lyrics.component.html',
  styleUrls: ['./lyrics.component.css']
})
export class LyricsComponent implements OnInit {
  
  @Input() isReadOnly: boolean;
  @Input() part: Part;

  isEditing: boolean = false;
  isFocus: boolean = true;
  DisplayMode: typeof DisplayMode = DisplayMode;
  constructor() { }

  get isEmptyLyrics(): boolean {
    return !this.part.lyrics || this.part.lyrics.trim() == '';
  }

  ngOnInit(): void {
    if (!this.isReadOnly && this.isEmptyLyrics) {
      this.isEditing = true;
    }
  }

  onLyricsClick() {
    if (!this.isReadOnly && !this.isEditing)
      this.isEditing = true;
  }

  onLyricsBlur() {
    if (this.isEditing && !this.isEmptyLyrics)
      this.isEditing = false;

    if (!this.isFocus)
      this.isFocus = true;
  }

}
