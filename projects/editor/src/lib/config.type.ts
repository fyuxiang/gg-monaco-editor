import { InjectionToken } from '@angular/core';

export const CONFIG_PROVIDE = new InjectionToken('CONFIG_PROVIDE');
export interface ConfigInterface {
    default?: {[p: string]: any};
    onLoad?: () => any;
}
export interface EditorModel {
    value: string;
    language?: string;
}