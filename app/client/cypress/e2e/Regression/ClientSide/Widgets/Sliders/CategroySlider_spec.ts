import {
  getWidgetSelector,
  WIDGET,
} from "../../../../../locators/WidgetLocators";
import { ObjectsRegistry } from "../../../../../support/Objects/Registry";

const agHelper = ObjectsRegistry.AggregateHelper;
const ee = ObjectsRegistry.EntityExplorer;
const locator = ObjectsRegistry.CommonLocators;
const propPane = ObjectsRegistry.PropertyPane;

describe("Category Slider spec", () => {
  before(() => {
    /**
     * On the canvas we have a Category Slider
     * and a Text widget with binding {{CategorySlider1.value}}
     */
    cy.fixture("categorySliderWidgetDsl").then((dsl: string) => {
      agHelper.AddDsl(dsl);
    });
  });

  it("1. Validates Default Value", () => {
    // open the Property Pane
    ee.SelectEntityByName("CategorySlider1", "Widgets");

    propPane.UpdatePropertyFieldValue("Default value", "mdx");

    agHelper.VerifyEvaluatedErrorMessage(
      "Default value is missing in options. Please update the value.",
    );

    propPane.UpdatePropertyFieldValue("Default value", "");

    agHelper.VerifyEvaluatedErrorMessage(
      "Default value is missing in options. Please update the value.",
    );

    propPane.UpdatePropertyFieldValue("Default value", "md");

    // agHelper.VerifyEvaluatedValue("md");
  });

  it("2. Change Step Size and check if value changes", () => {
    // Assert Text widget has value 10
    agHelper.GetText(getWidgetSelector(WIDGET.TEXT)).then(($label) => {
      expect($label).to.eq("md");
    });

    // open the Property Pane
    ee.SelectEntityByName("CategorySlider1", "Widgets");

    // Change the slider value
    agHelper.GetElement(locator._sliderThumb).focus().type("{rightArrow}");

    // Assert the Text widget has value 20
    agHelper.GetText(getWidgetSelector(WIDGET.TEXT)).then(($label) => {
      expect($label).to.eq("lg");
    });

    // Change the slider value
    agHelper
      .GetElement(locator._sliderThumb)
      .focus()
      .type("{leftArrow}")
      .type("{leftArrow}");

    agHelper.Sleep(200);

    // Assert the Text widget has value 0
    agHelper.GetText(getWidgetSelector(WIDGET.TEXT)).then(($label) => {
      expect($label).to.eq("sm");
    });
  });

  it("does not crash if an invalid mark option is passed", function () {
    cy.get(".t--property-control-options .t--js-toggle").first().click();
    cy.updateCodeInput(".t--property-control-options", "[[]]");
    cy.get(".t--widget-categorysliderwidget")
      .contains("Oops, Something went wrong.")
      .should("not.exist");
  });
});
