import React, { useEffect, useState } from 'react';
import { IonIcon } from '@ionic/react';
import { chevronForwardSharp, checkmarkCircleSharp, radioButtonOffSharp, book, videocam } from 'ionicons/icons';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player';
import Button from 'react-bootstrap/Button';
import './CoursePage.css';

function CoursePage() {
    const { courseId } = useParams();
    const [sessions, setSessions] = useState([]);
    const [currentLesson, setCurrentLesson] = useState(null);
    const [courseName, setCourseName] = useState('');
    const [sessionId, setSessionId] = useState('');

    const [videoProgress, setVideoProgress] = useState(0);
    const [videoCurrentTime, setVideoCurrentTime] = useState('0:00');
    const [videoDuration, setVideoDuration] = useState('');
    const [hasVideoEnded, setHasVideoEnded] = useState(false);

    useEffect(() => {
        const fetchSessions = async () => {
            try {
                const response = await fetch(`http://localhost:9999/Sessions`);
                const result = await response.json();
                const filteredSessions = result.filter(session => session.course == courseId);
                setSessions(filteredSessions);

                if (filteredSessions.length > 0) {
                    let initialLesson = null;
                    for (let session of filteredSessions) {
                        if (session.LessonList.length > 0) {
                            initialLesson = session.LessonList[0];
                            break;
                        }
                    }
                    setCurrentLesson(initialLesson);
                }
            } catch (error) {
                console.error('Error fetching sessions:', error);
            }
        };

        const fetchCourse = async () => {
            try {
                const response = await fetch(`http://localhost:9999/Courses/`);
                const result = await response.json();
                const currentCourse = result.find(course => course.id == courseId);
                setCourseName(currentCourse.courseName);
            } catch (error) {
                console.error('Error fetching course:', error);
            }
        };

        fetchCourse();
        fetchSessions();
    }, [courseId]);

    const handleSelectLesson = (lesson, sessionId) => {
        setCurrentLesson(lesson);
        setSessionId(sessionId);

        setVideoProgress(0);
        setVideoCurrentTime('0:00');
        setVideoDuration('');
        setHasVideoEnded(false);
    };

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = Math.floor(timeInSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleVideoProgress = ({ playedSeconds, loadedSeconds, played }) => {
        const playedPercentage = played * 100;
        setVideoCurrentTime(formatTime(playedSeconds));
        setVideoDuration(formatTime(loadedSeconds));
        setVideoProgress(playedPercentage);

        if (playedPercentage >= 70 && !hasVideoEnded) {
            setHasVideoEnded(true);
            handleVideoEnd();
        }
    };

    const updateLessonType = async (lessonId, newType) => {
        try {
            const response = await fetch(`http://localhost:9999/Sessions`);
            const sessions = await response.json();
            const sessionToUpdate = sessions.find(session =>
                session.id === sessionId
            );
            const lessonToUpdate = sessionToUpdate.LessonList.find(lesson => lesson.id === lessonId);
            lessonToUpdate.type = newType;

            await fetch(`http://localhost:9999/Sessions/${sessionId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(sessionToUpdate)
            });

            setSessions(sessions.map(session => ({
                ...session,
                LessonList: session.LessonList.map(lesson =>
                    lesson.id === lessonId ? { ...lesson, type: newType } : lesson
                )
            })));

        } catch (error) {
            console.error('Error updating lesson type:', error);
        }
    };

    const handleVideoEnd = async () => {
        try {
            if (currentLesson) {
                await updateLessonType(currentLesson.id, 'watched');
                setCurrentLesson({ ...currentLesson, type: 'watched' });
            }
        } catch (error) {
            console.error('Error updating lesson type:', error);
        }
    };
    const handleRead = async () => {
        try {
            if (currentLesson) {
                await updateLessonType(currentLesson.id, 'read');
                setCurrentLesson({ ...currentLesson, type: 'read' });
            }
        } catch (error) {
            console.error('Error updating lesson type:', error);
        }
    };

    return (
        <div className="container-fluid border-bottom">
            <div className="container pt-3 pb-3" style={{ maxWidth: "1840px" }}>
                <h1>Course name: {courseName}</h1>

                {currentLesson && (
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-9 p-0" id="main">
                                {(currentLesson.type === 'watching' || currentLesson.type === "watched") && (
                                    <div>
                                        <h5 className="fw-bold">{currentLesson.name}</h5>
                                        {currentLesson.type === "watching" && (
                                            <ReactPlayer
                                                id="video"
                                                width={1100}
                                                height={600}
                                                url={currentLesson.videoUrl.path}
                                                controls
                                                onProgress={handleVideoProgress}
                                            />
                                        )}
                                        {currentLesson.type === "watched" && (
                                            <ReactPlayer
                                                id="video"
                                                width={1100}
                                                height={600}
                                                url={currentLesson.videoUrl.path}
                                                controls
                                                playing
                                            />
                                        )}
                                        <br />
                                        <p>{currentLesson.readingContent}</p>
                                    </div>
                                )}
                                {(currentLesson.type === 'reading' || currentLesson.type === "read") && (
                                    <div className="pt-5 pb-5" style={{ width: '50rem' }}>
                                        <h5 className="fw-bold">{currentLesson.name}</h5>
                                        <p>{currentLesson.readingContent}</p>
                                        {currentLesson.type === "reading" && (
                                            <Button variant="primary" onClick={() => handleRead(currentLesson.id, 'read')}>Mark as completed</Button>
                                        )}
                                        {currentLesson.type === "read" && (
                                            <Button variant="primary" >Completed</Button>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="col-3 p-0 pt-0 border-start" style={{ height: '100vh' }} id="menu">
                                {sessions.map(session => (
                                    <details className="col-12" key={session.id}>
                                        <summary className="btn btn-light w-100 text-start rounded-0 p-3 border-bottom">
                                            <h6 className="fw-bold">
                                                <IonIcon icon={chevronForwardSharp} className="fs-6" />
                                                {session.sesionTitle}
                                            </h6>
                                            <span className="fw-bold text-secondary">{session.LessonList.length} items</span>
                                        </summary>
                                        {session.LessonList.map(lesson => (
                                            <div
                                                className={`p-3 rounded-0 w-100 text-start border-bottom ${currentLesson && currentLesson.id === lesson.id && sessionId == session.id ? 'lesson-selected' : ''}`}
                                                key={lesson.id}
                                                onClick={() => handleSelectLesson(lesson, session.id)}
                                            >
                                                <h6 className="fw-bold">
                                                    <IonIcon
                                                        icon={
                                                            lesson.type === "watched" || lesson.type === "read" ?
                                                                checkmarkCircleSharp :
                                                                lesson.type === "reading" || lesson.type === "read" ?
                                                                    book :
                                                                    lesson.type === "watching" || lesson.type === "watched" ?
                                                                        videocam :
                                                                        radioButtonOffSharp
                                                        }
                                                        className="fs-5 icon-style"
                                                        style={{ color: (lesson.type === "watched" || lesson.type === "read") ? 'green' : 'black' }}
                                                    />
                                                    {lesson.name}
                                                </h6>
                                                <span className="fw-bold text-secondary">{lesson.videoUrl && lesson.videoUrl.time ? `${lesson.videoUrl.time} minutes` : ''}</span>
                                            </div>
                                        ))}
                                    </details>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default CoursePage;
