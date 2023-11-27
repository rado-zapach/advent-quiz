import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditRulesComponent} from './edit-rules.component';

describe('EditRulesComponent', () => {
    let component: EditRulesComponent;
    let fixture: ComponentFixture<EditRulesComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [EditRulesComponent],
        }).compileComponents();

        fixture = TestBed.createComponent(EditRulesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
