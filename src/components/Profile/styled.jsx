import { Wrap, ResetAutofill } from '../extends';
import { mainColor, mainShadow, mainFont, accentColor } from '../vars';

export const Form = ResetAutofill.extend`
  background-color: #fff;
  padding: 20px 40px;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  box-shadow: ${mainShadow};
`;

export const ProfileStyled = Wrap.extend`
  padding-top: 20px;
  background-color: ${mainColor};
  padding-bottom: 5px;
  .head {
    margin: 0;
    text-align: center;
    font: 700 23px/1.5em ${mainFont};
    margin-bottom: 20px;
    color: ${accentColor};
  }

  .gender-title {
    font: 400 18px/1em ${mainFont};
    text-align: center;
    margin: 40px auto 20px;
  }

  .gender {
    display: flex;
    justify-content: space-between !important;
    flex-direction: column;
  }

  .remove-user {
    display: block !important;
    margin: 40px auto 0 !important;
    color: red !important;
  }
`;