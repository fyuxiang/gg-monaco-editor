import { Component } from '@angular/core';
import { EditorModel } from 'editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'gg-monaco-editor';
  code = '';
  options = Object.assign({}, {theme: 'vs-dark'}, { language: 'text' });
  onchange(e: string){}
}
