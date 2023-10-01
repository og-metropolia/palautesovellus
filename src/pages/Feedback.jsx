import './feedback.css';
import WriteFeedback from '../components/WriteFeedback';
import DrawFeedback from '../components/DrawFeedback';
import Question from '../components/Question';
import colors from '../constants/colors.mjs';
import EmojiFeedback from '../components/EmojiFeedback';

export default function Feedback() {
  return (
    <div className="feedback-form">
      <Question
        content="This is a question?"
        fgColor={colors.yellow}
        bgColor={colors.orange}
      />
      <DrawFeedback fgColor={colors.yellow} bgColor={colors.orange} />
      <WriteFeedback fgColor={colors.yellow} bgColor={colors.orange} />
      <EmojiFeedback fgColor={colors.yellow} bgColor={colors.yellow} />
    </div>
  );
}
