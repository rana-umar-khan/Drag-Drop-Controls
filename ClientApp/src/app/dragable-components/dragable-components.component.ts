import { Component, ElementRef, OnInit } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { ControlsMapping, FieldControl } from '../../Model/FieldControl';
import { AppService } from '../app.service';

@Component({
  selector: 'app-dragable-components',
  templateUrl: './dragable-components.component.html',
  styleUrls: ['./dragable-components.component.css']
})
export class DragableComponentsComponent implements OnInit {

  textField: FieldControl;
  numberField: FieldControl;
  textAreaField: FieldControl;

  constructor(private host: ElementRef, private appService: AppService) {
    this.textAreaField = {
      id: ControlsMapping.TextArea,
      height: 70,
      width: 400,
      top: 500,
      left: 500
    };
    this.textField = {
      id: ControlsMapping.Text,
      height: 70,
      width: 400,
      top: 300,
      left: 500
    };
    this.numberField = {
      id: ControlsMapping.Number,
      height: 70,
      width: 400,
      top: 400,
      left: 500
    };
  }

  ngOnInit(): void {
    this.appService.getControlsData().subscribe(data => {
      console.log(data);
      data.forEach(control => {
        if (control.id == ControlsMapping.Number) {
          this.numberField = control;
          this.numberResize(undefined, control);
        }
        else if (control.id == ControlsMapping.Text) {
          this.textField = control;
          this.textResize(undefined, control);
        }
        else if (control.id == ControlsMapping.TextArea) {
          this.textAreaField = control;
        }
      });
    });
  }

  getTooltip(type: number): string {
    let target = document.getElementById("text-input-container") as HTMLElement;
    if (type == ControlsMapping.Number) {
      target = document.getElementById("number-input-container") as HTMLElement;
    }
    else if (type == ControlsMapping.TextArea) {
      target = document.getElementById("text-area-container") as HTMLElement;
    }
    let dimensions = target.getBoundingClientRect();
    return 'Height: ' + (dimensions.height - 12).toString() + '\n Width: ' + (dimensions.width - 12).toString() + '\n Top: ' + (dimensions.top - 5).toString() + '\n Left: ' + (dimensions.left - 5).toString();
  }

  textResize(event?: Event, control?: FieldControl) {
    let target = document.getElementById("text-input-container") as HTMLElement;
    if (event && (event.target as HTMLElement).id !== "text-input-container")
      return;
    let inputElem = target.children[1] as HTMLElement;
    if (control) {
      inputElem.style.height = (control.height - 2).toString() + 'px';
      inputElem.style.width = (control.width - 16).toString() + 'px';
    }
    else {
      inputElem.style.height = (parseInt(target.style.height.substring(0, target.style.height.length - 2)) - 2).toString() + 'px';
      inputElem.style.width = (parseInt(target.style.width.substring(0, target.style.width.length - 2)) - 18).toString() + 'px';
      this.updateDataOnServer();
    }
  }

  numberResize(event?: Event, control?: FieldControl) {
    let target = document.getElementById("number-input-container") as HTMLElement;
    if (event && (event.target as HTMLElement).id !== "number-input-container")
      return;
    let inputElem = target.children[1] as HTMLElement;
    if (control) {
      inputElem.style.height = (control.height - 2).toString() + 'px';
      inputElem.style.width = (control.width - 16).toString() + 'px';
    }
    else {
      inputElem.style.height = (parseInt(target.style.height.substring(0, target.style.height.length - 2)) - 2).toString() + 'px';
      inputElem.style.width = (parseInt(target.style.width.substring(0, target.style.width.length - 2)) - 18).toString() + 'px';
      console.log(target.getBoundingClientRect());
      this.updateDataOnServer();
    }
  }

  textAreaResize(event: Event) {
    if ((event.target as HTMLElement).id !== "number-input-container")
      return;
    this.updateDataOnServer();
  }

  updateDataOnServer() {
    let allControls: FieldControl[] = [];
    //Text Field
    let target = document.getElementById("text-input-container") as HTMLElement;
    let dimensions = target.getBoundingClientRect();
    allControls.push({
      id: ControlsMapping.Text,
      height: dimensions.height - 12,
      width: dimensions.width - 12,
      top: dimensions.top - 5,
      left: dimensions.left - 5
    });
    //number Field
    target = document.getElementById("number-input-container") as HTMLElement;
    dimensions = target.getBoundingClientRect();
    allControls.push({
      id: ControlsMapping.Number,
      height: dimensions.height - 12,
      width: dimensions.width - 12,
      top: dimensions.top - 5,
      left: dimensions.left - 5
    });
    //Text Field
    target = document.getElementById("text-area-container") as HTMLElement;
    dimensions = target.getBoundingClientRect();
    allControls.push({
      id: ControlsMapping.TextArea,
      height: dimensions.height - 12,
      width: dimensions.width - 12,
      top: dimensions.top - 5,
      left: dimensions.left - 5
    });
    this.appService.saveControlsData(allControls).subscribe(response => {
      console.log(response);
    });
  }

}
