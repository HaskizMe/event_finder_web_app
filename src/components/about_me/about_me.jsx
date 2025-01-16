import './about_me.css'
import myPhoto from '../../assets/professional_pic_of_me.png'
import golfPhoto from '../../assets/golf swing.jpg'
import fallDetectionPhoto from '../../assets/fall detection pic.jpeg'
import painDrainPhoto from '../../assets/pain drain.png'
import uvuLogoPhoto from '../../assets/uvulogo.jpg'
import githubLogoPhoto from '../../assets/github logo.png'

function AboutMe() {
    return (
        <>
            <div style={{margin: 'auto', marginBottom: '200px', maxWidth: '1800px'}}>

                {/* About Me Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={myPhoto} alt="My Profile" className='img' style={{maxHeight: '300px'}}/>
                    </div>
                    <div className="section-content" style={{ flex: 3 }}>
                        <h2 style={{margin: 0}}>ABOUT ME</h2>
                        <p>My name is Bailey Haskell, and I am a dedicated student with a strong 
                            passion for technology and software development. Over the past four 
                            years, I have immersed myself in coding, constantly expanding my 
                            knowledge and honing my skills. My journey has been fueled by a particular 
                            enthusiasm for mobile app development, especially using the Flutter 
                            framework, which allows me to create dynamic, cross-platform applications 
                            that deliver seamless user experiences.</p>

                        <p>In addition to mobile development, I have also explored the exciting 
                            world of embedded systems. Working on projects that merge hardware 
                            and software has deepened my understanding of how technology can 
                            interact with the physical world, and I enjoy the challenges and 
                            problem-solving opportunities these systems provide.</p>

                        <p>As a learner who thrives on innovation, I am always seeking ways to 
                            refine my abilities and contribute to meaningful projects. Whether it’s 
                            designing intuitive mobile applications or working on complex embedded 
                            systems, I am motivated by the potential to create impactful solutions 
                            that bridge creativity and functionality.</p>

                    </div>
                </div>
                <div className='divider'></div>

                {/* Education Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 3 }}>
                            <h2 style={{margin: 0}}>Education</h2>
                            <p>I began my educational journey at Ensign College in Salt Lake City, 
                                where I earned my associate’s degree in Computer Science. During my 
                                time there, I developed a strong foundation in programming, problem-solving, 
                                and the principles of computing. Ensign College provided me with 
                                valuable hands-on learning opportunities that fueled my passion for 
                                technology and innovation.</p>

                            <p>After completing my associate’s degree, I transferred to Utah Valley University 
                                (UVU) to further my education. At UVU, I have been expanding my expertise in 
                                advanced computer science topics while engaging in projects that challenge me 
                                to think critically and apply my skills creatively. With a strong emphasis on 
                                practical application and collaboration, UVU has allowed me to refine my abilities 
                                and grow as a developer.</p>
                            
                            <p>I am on track to graduate in December 2025 with a bachelor’s degree in Computer Science, 
                                and I am excited to leverage the knowledge and experiences I’ve gained throughout 
                                my academic journey in my future endeavors.</p>

                    </div>
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={uvuLogoPhoto} alt="uvu logo" className='img'
                    />
                    </div>
                </div>
                <div className='divider'></div>

                {/* Github Projects Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={githubLogoPhoto} alt="github logo" className='img' />
                    </div>
                    <div className="section-content" style={{ flex: 3 }}>
                        <h2 style={{margin: 0}}>GitHub</h2>
                        <p>I have worked on a variety of projects, from building mobile apps with Flutter 
                            to developing intelligent systems using embedded hardware and AI models. 
                            These experiences have enhanced my technical skills and fueled my passion 
                            for solving real-world problems with innovative solutions.</p>

                        <h4 style={{marginBottom: 0}}>Golf Swing Accelerator</h4>
                        <p>I developed a mobile app that connects to an embedded system 
                            via Bluetooth to analyze a user’s golf swing. The app measures 
                            swing acceleration and position, providing real-time feedback on 
                            speed and distance to help users refine their performance.</p>

                        <h4 style={{marginBottom: 0}}>AI Fall Detection Bot</h4>
                        <p>I created an AI-powered fall detection system that uses advanced posture analysis to identify potential falls. 
                            It sends real-time alerts with confidence scores, ensuring quick responses to detected incidents.</p>

                        <h4 style={{marginBottom: 0}}>Pain Drain App</h4>
                        <p>I designed a mobile app that lets users control a PainDrain device. The app manages 
                            settings for heat, cooling, TENS, and vibration, providing targeted pain relief 
                            through a simple and intuitive interface.</p>

                        <p>Check out the source code on my GitHub! 👇</p>

                    </div>
                </div>
                <div className='github-section'>
                    <div className='github-section-content'>
                        <div className='github-section-item'>
                            <h2>Golf Swing Accelerator</h2>
                            <img src={golfPhoto} alt="golf photo" className='img'/>
                            <button className="button" onClick={() => window.open('https://github.com/HaskizMe/golf_swing_accelerator', '_blank')}>
                                Golf App
                            </button>
                        </div>
                        <div className='github-section-item'>
                            <h2>AI Fall Detection Bot</h2>
                            <img src={fallDetectionPhoto} alt="fall detection photo" className='img'/>
                            <button className="button" onClick={() => window.open('https://github.com/HaskizMe/ai_fall_detection', '_blank')}>
                                Fall Detection Bot
                            </button>
                        </div>
                        <div className='github-section-item'>
                            <h2>Pain Drain Mobile App</h2>
                            <img src={painDrainPhoto} alt="pain drain photo" className='img'/>
                            <button className="button" onClick={() => window.open('https://github.com/HaskizMe/PainDrainPhoneApp', '_blank')}>
                                Pain Drain App
                            </button>
                        </div>
                    </div>
                </div>

            </div>
            
        </>
    );
}

export default AboutMe;