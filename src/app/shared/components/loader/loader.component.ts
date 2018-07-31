import { Component, OnInit, OnDestroy, EventEmitter } from '@angular/core';
import { LoaderService } from './../../services/loader.service';

@Component({
	selector: 'loader',
	templateUrl: './loader.component.html',
	styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit, OnDestroy {

	private state: EventEmitter<any> = new EventEmitter();
	private showLoader : boolean = false;

	constructor(private LoaderService: LoaderService) {
	}

	ngOnInit() {
		this.checkState();
	}

	checkState() {

			this.state = this.LoaderService.getLoadState().subscribe((res) => {
	
				window.setTimeout(() => {
					this.showLoader = res;
				});
			});
	};

	ngOnDestroy() {
		this.state.unsubscribe();
	}

}
