
class TestPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quizDisplay: false,
      quizDisplayStudent: false,
      // 기타 필요한 상태 변수들
    };
  }

  toggleQuiz = (quiz) => {
    console.log("토글 퀴즈 열기");
    if (quiz) {
      // 필요한 로직 수행
    } else {
      this.setState({ quizDisplay: !this.state.quizDisplay });
    }
  };

  toggleQuizStudent = (answer) => {
    // 필요한 로직 수행
  };

  render() {
    return (
      <div>
        {/* 다른 컴포넌트들 */}
        <QuizModal
          display={this.state.quizDisplay}
          toggleQuiz={this.toggleQuiz}
          toggleQuizStudent={this.toggleQuizStudent}
          header="Quiz"
          quiz={{}}
          quizHistory={[]}
        />
      </div>
    );
  }
}

export default TestPage;
