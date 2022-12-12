import { Text as NBText } from "native-base";
import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import I18n from "../../../../../i18n";
import { BaseTimeoutScreen } from "../../components/BaseTimeoutScreen";
import { useHardwareBackButton } from "../../../../../hooks/useHardwareBackButton";
import { cancelBonusVacanzeRequest } from "../../store/actions/bonusVacanze";

type Props = ReturnType<typeof mapDispatchToProps>;

/**
 * This screen informs that checking eligibility is taking too long and
 * will be notified when the operation is completed.
 * @constructor
 */

const renderBody = (first: string, second: string, third: string) => (
  <NBText>
    {first}
    <NBText style={{ fontWeight: "bold" }}>{second}</NBText>
    {third}
  </NBText>
);

const TimeoutEligibilityCheckInfoScreen: React.FunctionComponent<Props> =
  props => {
    const title = I18n.t("bonus.bonusVacanze.eligibility.timeout.title");
    const first = I18n.t(
      "bonus.bonusVacanze.eligibility.timeout.description.first"
    );
    const second = I18n.t(
      "bonus.bonusVacanze.eligibility.timeout.description.second"
    );
    const third = I18n.t(
      "bonus.bonusVacanze.eligibility.timeout.description.third"
    );

    useHardwareBackButton(() => {
      props.onCancel();
      return true;
    });

    return (
      <BaseTimeoutScreen
        title={title}
        body={renderBody(first, second, third)}
        onExit={props.onCancel}
      />
    );
  };

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onCancel: () => dispatch(cancelBonusVacanzeRequest())
});

export default connect(
  null,
  mapDispatchToProps
)(TimeoutEligibilityCheckInfoScreen);
