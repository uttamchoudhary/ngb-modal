/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { ModalComponent } from './modal.component';
import { ModalFooterComponent } from "./modal-footer.component";
import { ModalContentComponent } from "./modal-content.component";
import { ModalHeaderComponent } from "./modal-header.component";
import { CommonModule } from '@angular/common';
import { ModalManager } from './modal.service';
export class ModalModule {
    /**
     * @return {?}
     */
    static forRoot() {
        return {
            ngModule: ModalModule,
            providers: [
                ModalManager
            ]
        };
    }
}
ModalModule.decorators = [
    { type: NgModule, args: [{
                imports: [
                    CommonModule
                ],
                declarations: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent],
                exports: [ModalComponent, ModalFooterComponent, ModalContentComponent, ModalHeaderComponent]
            },] },
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kYWwubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmdiLW1vZGFsLyIsInNvdXJjZXMiOlsibGliL21vZGFsLm1vZHVsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFDbkQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFDaEUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sMkJBQTJCLENBQUM7QUFDbEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFHaEUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQy9DLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQVMvQyxNQUFNOzs7O0lBQ0osTUFBTSxDQUFDLE9BQU87UUFDWixNQUFNLENBQUM7WUFDTCxRQUFRLEVBQUUsV0FBVztZQUNyQixTQUFTLEVBQUU7Z0JBQ1QsWUFBWTthQUNiO1NBQ0YsQ0FBQztLQUNIOzs7WUFmRixRQUFRLFNBQUM7Z0JBQ1IsT0FBTyxFQUFFO29CQUNQLFlBQVk7aUJBQ2I7Z0JBQ0QsWUFBWSxFQUFFLENBQUMsY0FBYyxFQUFFLG9CQUFvQixFQUFFLHFCQUFxQixFQUFFLG9CQUFvQixDQUFDO2dCQUNqRyxPQUFPLEVBQUUsQ0FBQyxjQUFjLEVBQUUsb0JBQW9CLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLENBQUM7YUFDN0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTW9kYWxDb21wb25lbnQgfSBmcm9tICcuL21vZGFsLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNb2RhbEZvb3RlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWZvb3Rlci5jb21wb25lbnRcIjtcbmltcG9ydCB7IE1vZGFsQ29udGVudENvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWNvbnRlbnQuY29tcG9uZW50XCI7XG5pbXBvcnQgeyBNb2RhbEhlYWRlckNvbXBvbmVudCB9IGZyb20gXCIuL21vZGFsLWhlYWRlci5jb21wb25lbnRcIjtcblxuaW1wb3J0IHsgTW9kdWxlV2l0aFByb3ZpZGVycyB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE1vZGFsTWFuYWdlciB9IGZyb20gJy4vbW9kYWwuc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBDb21tb25Nb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbTW9kYWxDb21wb25lbnQsIE1vZGFsRm9vdGVyQ29tcG9uZW50LCBNb2RhbENvbnRlbnRDb21wb25lbnQsIE1vZGFsSGVhZGVyQ29tcG9uZW50XSxcbiAgZXhwb3J0czogW01vZGFsQ29tcG9uZW50LCBNb2RhbEZvb3RlckNvbXBvbmVudCwgTW9kYWxDb250ZW50Q29tcG9uZW50LCBNb2RhbEhlYWRlckNvbXBvbmVudF1cbn0pXG5leHBvcnQgY2xhc3MgTW9kYWxNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE1vZGFsTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIE1vZGFsTWFuYWdlclxuICAgICAgXVxuICAgIH07XG4gIH1cbiB9XG4iXX0=