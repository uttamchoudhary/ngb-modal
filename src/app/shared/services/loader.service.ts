import { Injectable, EventEmitter } from '@angular/core';

@Injectable()

export class LoaderService {
	
	constructor() {
	}

	private loadEvt : EventEmitter<any> = new EventEmitter();

	getLoadState() {
		return this.loadEvt;
	}

	start() {
		
		this.loadEvt.emit(true);
	}

	stop() {
		this.loadEvt.emit(false);
	}
}