import './about_me.css'
import myPhoto from '../../assets/professional_pic_of_me.png'
import golfPhoto from '../../assets/golf swing.jpg'
import fallDetectionPhoto from '../../assets/fall detection pic.jpeg'
import painDrainPhoto from '../../assets/pain drain.png'
import uvuLogoPhoto from '../../assets/uvulogo.jpg'

function AboutMe() {
    return (
        <>
            <div style={{margin: '20px', marginBottom: '200px'}}>

                {/* About Me Section */}
                <div className="section">
                    <div className="section-content" style={{ flex: 2, alignItems: "center" }}>
                        <img src={myPhoto} alt="My Profile" className='img' />
                    </div>
                    <div className="section-content" style={{ flex: 3 }}>
                        <p>Description</p>
                        <h3 style={{margin: 0}}>ABOUT ME</h3>
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
                            <h3 style={{margin: 0}}>Education</h3>
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
                <div className='github-section'>
                    <h1 style={{color: 'gray'}}>GitHub Projects</h1>
                    <div className='github-section-content'>
                        <div className='github-section-item'>
                            <h2>Golf Swing Accelerator</h2>
                            <img src={golfPhoto} alt="golf photo" className='img'/>
                            <button className="button" onClick={() => window.open('https://github.com/HaskizMe/golf_swing_accelerator', '_blank')}>
                                Fall Detection
                            </button>
                        </div>
                        <div className='github-section-item'>
                            <h2>AI Fall Detection Bot</h2>
                            <img src={fallDetectionPhoto} alt="fall detection photo" className='img'/>
                            <button className="button" onClick={() => window.open('https://github.com/HaskizMe/ai_fall_detection', '_blank')}>
                                Fall Detection
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