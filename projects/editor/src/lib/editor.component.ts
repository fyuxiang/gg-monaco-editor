import { Component, forwardRef, Inject, Input, NgZone,
    ViewChild, ElementRef, Output, EventEmitter, AfterViewInit, OnDestroy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { fromEvent, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { EditorModel, CONFIG_PROVIDE, ConfigInterface } from './config.type';
import 'monaco-editor';
declare var monaco;
export const Monaco = monaco;
@Component({
    selector: 'gg-monaco-editor',
    template: '<div class="editor-container" #container></div>',
    styles: [`
    :host {
      display: block;
      height: 100%;
    }

    .editor-container {
      width: 100%;
      height: 98%;
    }
  `],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => GGMonacoEditorComponent),
        multi: true
    }]
})
export class GGMonacoEditorComponent implements ControlValueAccessor, AfterViewInit, OnDestroy {
    private _VALUE_ = '';
    private _OPTION: any;
    private Editor: any;
    protected resize: Subscription;
    @ViewChild('container')
    container: ElementRef;
    @Input('options')
    private get option() {
        return this._OPTION;
    }
    private set option(options: any) {
        this._OPTION = Object.assign({}, this.config.default, options);
        if (this.Editor) {
            this.Editor.dispose();
            this.init();
        }
    }
    constructor(private zone: NgZone, @Inject(CONFIG_PROVIDE) private config: ConfigInterface) {
    }
    ngAfterViewInit() {
        this.init();
    }
    ngOnDestroy() {
        if (this.Editor) {
            if (this.resize) {
                this.resize.unsubscribe();
            }
            this.Editor.dispose();
            this.Editor = null;
        }
    }
    writeValue(value: string = '') {
        this._VALUE_ = value;
        setTimeout(() => {
            if (this.Editor) {
                this.Editor.setValue(this._VALUE_);
            }
        });
    }
    registerOnChange(fn: (e: any) => any) {
        this.onChange = fn;
    }
    registerOnTouched(fn: () => any) { }
    init() {
        const option = this._OPTION;
        this.Editor = Monaco.editor.create(this.container.nativeElement, option);
        this.Editor.setValue(this._VALUE_);
        this.bindEvent();
        this.bindResize();
    }
    bindEvent() {
        this.Editor.onDidChangeModelContent((e: any) => {
            const value = this.Editor.getValue();
            this.onChange(value);
            this.zone.run(() => this._VALUE_ = value);
        });
        this.Editor.onDidBlurEditorWidget(() => {
            this.onTouch();
        });
    }
    onChange(e: any) {
    }
    onTouch() {
    }
    bindResize() {
        if (this.resize) {
            this.resize.unsubscribe();
        }
        this.resize = fromEvent(window, 'resize')
            .pipe(delay(300))
            .subscribe(() => {
                this.Editor.layout();
            });
    }
}
