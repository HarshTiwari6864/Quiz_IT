import React from 'react';
import './Dashboard.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';

export default class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statistics: null,
            myQuizzes: []
        };
    }

    componentDidMount() {
        if (!localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/');
        } else {
            this.fetchStatistics();
            this.fetchMyQuizzes();
        }
    }

    fetchStatistics() {
        // const userId = localStorage.getItem("_ID");
        // axios
        //   .get(`/api/results/${userId}`, {
        //     headers: {
        //       Authorization: `Bearer ${localStorage.getItem("JWT_TOKEN")}`,
        //     },
        //   })
        //   .then((response) => {
        //     this.setState({ statistics: response.data });
        //   })
        //   .catch((error) => {
        //     console.error("Error fetching statistics:", error);
        //   });

          axios.get("/api/quizzes/my-scores/" + localStorage.getItem("_ID"))
          .then((res) => {
            console.log(res.data);
            this.setState({
                statistics: res.data,
            });
          });
      }
    
      fetchMyQuizzes() {
        // const userId = localStorage.getItem('_ID');
        // axios.get('/api/quizzes/my-quizzes/'+userId, {
        //     headers: {
        //         'Authorization': `Bearer ${localStorage.getItem('JWT_TOKEN')}`
        //     }
        // })
        // .then(response => {
        //     this.setState({ myQuizzes: response.data });
        // })
        // .catch(error => {
        //     console.error('Error fetching my quizzes:', error);
        // });
        axios.get("/api/quizzes/my-quizzes/" + localStorage.getItem("_ID"))
          .then((res) => {
            this.setState({
              myQuizzes: res.data,
            });
          });
      }

    renderStatistics() {
        const { statistics } = this.state;
        if (!statistics) {
            return <div>Loading statistics...</div>;
        }
        const totalQuizzes = statistics.length;
        const totalLikes = statistics.map((stats) => stats.quizId.likes).reduce((a, b) => a + b, 0); 
        const totalQuestions = statistics.map((stats) => stats.quizId.questions.length).reduce((a, b) => a + b, 0);
        return (
            <div className="statistics-section">
                <h2>Statistics</h2>
                <div className="statistics-details">
                    <div className="stat-item">
                        <span className="stat-title">Total Quizzes:</span> 
                        <span className="stat-value">{totalQuizzes}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-title">Total Likes:</span> 
                        <span className="stat-value">{totalLikes}</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-title">Total Questions:</span> 
                        <span className="stat-value">{totalQuestions}</span>
                    </div>
                </div>
            </div>
        );
    }

    renderMyQuizzes() {
        const { myQuizzes } = this.state;
        if (myQuizzes.length === 0) {
            return <div>No quizzes found.</div>;
        }

        return (
            <div id="my-quizzes-section">
                <h2>My Quizzes</h2>
                <div id="quiz-cards">
                    {myQuizzes.map(quiz => (
                        <div id="quiz-card" key={quiz._id}>
                            <img
                                src="https://d1ymz67w5raq8g.cloudfront.net/Pictures/480xany/6/5/5/509655_shutterstock_1506580442_769367.jpg"
                                alt="quiz"
                                id="quiz-image"
                            />
                            <div id="quiz-details">
                                <div id="quiz-name">Name - {quiz.name}</div>
                                <div id="quiz-category">Category - {quiz.category}</div>
                                <div id="quiz-questions">{quiz.questions.length} Questions</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    render() {
        return (
            <div className="dashboard-wrapper">
                <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="main">
                    <div className="top">
                        <div className="left">
                            {this.renderStatistics()}
                        </div>
                        <div className="right">
                            {this.renderMyQuizzes()}
                        </div>
                    </div>

                    <div className="bottom">
                        {/* Add any additional content or components here */}
                    </div>
                </div>
            </div>
        )
    }
}
