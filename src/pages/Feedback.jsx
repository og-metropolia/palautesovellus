import WriteFeedback from '../components/WriteFeedback';
import DrawFeedback from '../components/DrawFeedback';
import ReadFeedback from '../components/ReadFeedback';
import Question from '../components/Question';
import colors from '../constants/colors.mjs';
import EmojiFeedback from '../components/EmojiFeedback';
import './feedback.css';

export default function Feedback() {
    return (
        <div className="feedback-form">
            <Question content="This is a question?" fgColor={colors.yellow} bgColor={colors.orange}/>
            <DrawFeedback fgColor={colors.yellow} bgColor={colors.orange} neutralColor={colors.beige} />
            <ReadFeedback/>
            <WriteFeedback fgColor={colors.yellow} bgColor={colors.orange}/>
            <EmojiFeedback fgColor={colors.yellow} bgColor={colors.yellow}/>
        </div>
    )
}
