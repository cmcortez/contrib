var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import { Components } from 'formiojs';
var FieldComponent = Components.components.field;
var PaymentCalculator = /** @class */ (function (_super) {
    __extends(PaymentCalculator, _super);
    function PaymentCalculator(component, options, data) {
        return _super.call(this, component, options, data) || this;
    }
    PaymentCalculator.schema = function () {
        return FieldComponent.schema({
            key: 'paymentCalculator',
            type: 'well',
            input: false,
            components: [
                {
                    key: 'columns',
                    type: 'columns',
                    input: false,
                    columns: [
                        {
                            components: [
                                {
                                    label: 'Loan Amount',
                                    currency: 'USD',
                                    key: 'loanAmount',
                                    type: 'currency',
                                    input: true,
                                },
                            ],
                            size: 'md',
                            width: 4,
                        },
                        {
                            components: [
                                {
                                    label: 'Rate',
                                    key: 'rate',
                                    type: 'number',
                                    input: true,
                                },
                            ],
                            size: 'md',
                            width: 2,
                        },
                        {
                            components: [
                                {
                                    label: 'Term',
                                    tooltip: 'Months',
                                    key: 'term',
                                    type: 'number',
                                    input: true,
                                },
                            ],
                            size: 'md',
                            width: 2,
                        },
                        {
                            components: [
                                {
                                    label: 'Monthly Payment',
                                    currency: 'USD',
                                    calculateValue: "function AM(principal, rate, period, yearOrMonth, payAtBeginning) {\n  var numerator, denominator, am;\n  var ratePerPeriod = rate / 12 / 100;\n\n  // for inputs in years\n  if (!yearOrMonth) {\n    numerator = buildNumerator(period * 12);\n    denominator = Math.pow((1 + ratePerPeriod), period * 12) - 1;\n\n    // for inputs in months\n  } else if (yearOrMonth === 1) {\n    numerator = buildNumerator(period)\n    denominator = Math.pow((1 + ratePerPeriod), period) - 1;\n\n  } else {\n    console.log('not defined');\n  }\n  am = principal * (numerator / denominator);\n  return Math.round(am * 100) / 100;\n\n  function buildNumerator(numInterestAccruals) {\n    if (payAtBeginning) {\n      //if payments are made in the beginning of the period, then interest shouldn't be calculated for first period\n      numInterestAccruals -= 1;\n    }\n    return ratePerPeriod * Math.pow((1 + ratePerPeriod), numInterestAccruals);\n  }\n};\nvar rate = row.rate1;\nvar term = row.term1;\nvar principle = row.loanAmount1;\n\ndebugger;value = AM(principle, rate, term, months = 1, false);",
                                    key: 'monthlyPayment',
                                    type: 'currency',
                                    input: true,
                                }
                            ],
                            size: 'md',
                            width: 4,
                        },
                    ],
                },
            ],
        });
    };
    PaymentCalculator.prototype.render = function (children) {
        return _super.prototype.render.call(this, this.renderTemplate);
    };
    PaymentCalculator.builderInfo = {
        title: 'Payment Calculator',
        group: 'basic',
        icon: 'fa fa-table',
        weight: 70,
        documentation: 'http://help.form.io/userguide/#table',
        schema: PaymentCalculator.schema()
    };
    return PaymentCalculator;
}(FieldComponent));
export default PaymentCalculator;
