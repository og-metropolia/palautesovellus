import './etusivu.css';

export default function Etusivu() {
  return (
    <div className="etusivu-container">

    {/* Teacher Login Icon */}
    <div className="teacher-login">
      {/* <RouterLink to="/signin"> */}
        {/* <img src="" alt="Teacher Login" /> */}
      {/* </RouterLink> */}
    </div>

    <h1>Welcome to Rate Your Day!</h1>
    <p>The coolest way for kids to share their experiences.</p>

    {/* Features */}
    <div className="features">

      {/* Feature 1 */}
      <div className="feature">
        {/* <img src="" alt="Feature 1" /> */}
        <p>Rate your classes easily with fun emojis!</p>
      </div>

      {/* Feature 2 */}
      <div className="feature">
        {/* <img src="" alt="Feature 2" /> */}
        <p>Share your awesome trip experiences.</p>
      </div>

      {/* Feature 3 */}
      <div className="feature">
        {/* <img src="" alt="Feature 3" /> */}
        <p>Teachers can get real-time feedback.</p>
      </div>

    </div>
  </div>
  );
}
