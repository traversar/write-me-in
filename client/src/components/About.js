import React, { useState } from 'react';
import { IoCreateOutline } from "react-icons/io5";
import Header from './Header';
import Navbar from './Navbar';
import TagBar from './TagBar';


const About = () => {
    const [exampleHidden, setExampleHidden] = useState(true);

    const toggleHiddenExample = () => {
        const hiddenExample = document.getElementById('hidden-example');
        if(exampleHidden) {
            hiddenExample.style.visibility = 'visible'
        } else {
            hiddenExample.style.visibility = 'hidden'
        }
        setExampleHidden(prev => !prev);
    }

    return (
        <>
            <Header />
            <TagBar />
            <div className='app-layout'>
                <Navbar />
                <div className="ab-container">
                    <div class='ab-title-container'>
                        <h2>How to Use write.me.in</h2>
                    </div>

                    <div className='sv-post sv-post-confirmed' style={{paddingTop: '25px'}}>
                        <p>Create a new story by clicking the <IoCreateOutline /> button at the top of the page.</p>

                        <p>Or contribute to an existing story by navigating to its final page and selecting "Write New Post".</p>
                    </div>

                    <div className="sv-post sv-post-unconfirmed">
                        <p>All new contributions will appear with a blue tint until one of them is confirmed (cannonized to the story thread), either by recieving ten upvotes or through the story editor's approval (the original author of the story).</p>
                    </div>

                    <div className="sv-post sv-post-confirmed" style={{paddingTop: '25px'}}>
                        <p>Once a contribution is confirmed, it will appear white. All other unconfirmed contributions competing for the next segment of the story will be rejected. Click 'Show rejected example' for information about rejected posts.</p>
                    </div>

                    <button className='sv-rejected-btn' onClick={toggleHiddenExample}>Show rejected example</button>

                    <div id='hidden-example' style={{visibility: 'hidden'}} class='sv-post sv-post-rejected'>
                        <p>While they are hidden by default, rejected contributions are still accessible by selecting 'Show rejected' which appears in the original sequence by which all contributions were posted.</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About;
