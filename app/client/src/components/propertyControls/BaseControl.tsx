/***
 * Controls are rendered in the property panel from the property config
 * Controls are higher order components that update a widgets property
 */
import { Component } from "react";
import _ from "lodash";
import { ControlType } from "../../constants/PropertyControlConstants";

abstract class BaseControl<T extends ControlProps> extends Component<T> {
  updateProperty(propertyName: string, propertyValue: any) {
    if (!_.isNil(this.props.onPropertyChange))
      this.props.onPropertyChange(propertyName, propertyValue);
  }

  abstract getControlType(): ControlType;
}

export interface ControlBuilder<T extends ControlProps> {
  buildPropertyControl(controlProps: T): JSX.Element;
}

export interface ControlProps extends ControlData, ControlFunctions {
  key?: string;
}

export interface ControlData {
  id: string;
  label: string;
  propertyName: string;
  controlType: ControlType;
  propertyValue?: any;
  isValid: boolean;
}

export interface ControlFunctions {
  onPropertyChange?: (propertyName: string, propertyValue: string) => void;
}

export default BaseControl;
