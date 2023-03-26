import React from 'react';
// import classNames from 'classnames';

import styles from './styles.module.scss';
import Figure from '../figure';
import Comparison from '../comparison';
import ExpertTip from '../expert-tip';
import HorizontalBanner from '../horizontal-banner';
import Author from '../author';
import BlogFooterAction from '../footer-action';

const HowToWriteAResume: React.FC = () => {
    return (
        <>
            <div className={styles.title}>
                All the tips, tools, templates, and examples you need to learn how to write a resume in 2023
            </div>
            <div className={styles.para}>
                Having a perfectly honed and well-written resume is like having a superpower during your job search.
            </div>
            <div className={styles.para}>
                While most people walk up the hiring ladder, you put on your crimson cape and soar upwards at supersonic speed. This how to write a resume guide outlines the most important building blocks for creating exactly this type of amazing resume.
            </div>
            <div className={styles.para}>
                There are the 10 important resume writing steps we will cover in this blog:
            </div>
            <Figure
                src="/assets/blogs/resume_writing_steps_w800.png"
                caption="How to write a resume - Resume writing 10 important steps"
                alt="resume_writing_steps_w800"
            />
            <div className={styles.para}>
                Imagine two great professionals with awesome credentials, talents and expertise. Except that one gets ignored by potential employers and stumped by automated application systems. While the other gets several interview calls each week from industry leaders.
            </div>
            <div className={styles.para}>
                What's the difference between the two people? It could be connections or circumstance. But often, the difference is a great resume that "hacks" hiring situations. Marketing is just as important for professionals as it is for businesses. Present yourself as the obvious choice for the role.
            </div>
            <div className={styles.para}>
                It's often the little things in life that matter the most.
            </div>
            <div className={styles.heading}>
                The vital starting point: where to write your resume?
            </div>
            <div className={styles.para}>
                We'll go straight to the golden rule, no beating around the bush.
            </div>
            <div className={styles.para}>
                Do not use basic text editors to write the final version of your resume. You can use them to craft your initial thoughts if you feel comfortable with them, but MS Word, Excel and similar programs have a host of potential problems that may hinder you.
            </div>
            <div className={styles.para}>
                These may include:
            </div>
            <div className={styles.list}>
                <ul>
                    <li>A difficult and time-consuming formatting process</li>
                    <li>Header/footer information not readable by other systems</li>
                    <li>Poor and bland visual designs that get lost among other resumes</li>
                    <li>Formatting that looks different in other programs</li>
                    <li>Lost or corrupted files and so on</li>
                </ul>
            </div>
            <Figure
                src="/assets/blogs/potential_problems_basic_text_editors_w800.png"
                caption="How to write a resume - Potential problems basic text editors"
                alt="potential_problems_basic_text_editors"
            />
            <div className={styles.para}>So, what's the solution?</div>
            <div className={styles.para}>The accepted standard for submitting most resumes is the PDF file format. The benefits are clear in most cases: universal formatting that doesn't change regardless of where you view it and readability by most software systems. </div>
            <Comparison
                doList={[
                    "Use professionally designed layouts and tools that have been tested with hiring managers and applicant systems.",
                ]}
                dontList={[
                    "Use old-school text editors that take hours of work and are often incompatible with the employer's software.",
                ]}
            />
            <div className={styles.para}>The ideal tools to produce clean, concise and beautiful resumes in PDF format are online builders. These web and/or software solutions are specifically made to be the perfect instrument for visually striking, technically functional and content-optimized resumes.</div>
            <div className={styles.para}>By using a service/platform that is designed specifically for resumes, you save lots of time and avoid hidden problems. With an online resume builder , what you see is what the hiring manager will see.</div>
            <Figure
                src="/assets/blogs/example_resume_builder.png"
                alt="example_resume_builder"
            />
            <div className={styles.heading}>Visual character, templates and first impressions</div>
            <div className={styles.para}>We're all visual creatures. Our first impressions are always based on aesthetics, symmetry and images.</div>
            <div className={styles.para}>We choose our clothes for an interview with care, why shouldn't we put the same effort into the appearance of our resume? It's our primary ambassador before any sort of physical meeting, a first impression that will live long in the hiring manager's memory.</div>
            <div className={styles.para}>According to a study done by TheLadders, recruiters spend an average of 6 seconds glancing at a resume before moving on to another one (as we mentioned in our profession-specific guides and examples ). During this short time, a subconscious decision is often made based on the "looks" of your resume. If it's clean and beautiful, the hiring manager will infer a number of positive traits about your personality.</div>
            <ExpertTip>
                <div className={styles.para}>By adding icons to your resume, you can draw attention to particular sections and stand out from the crowd.</div>
            </ExpertTip>
            <div className={styles.para}>You can create your own templates, but unless you're a professional designer, it may be best to rely on field-tested visuals. Templates project a certain character and mood with their design: they can emphasize creativity, dependability, discipline and other qualities.</div>
            <Comparison
                doList={[
                    "Use professional designs and templates that have been optimized for content, psychology and visual perception.",
                ]}
                dontList={[
                    "Spend hours or days creating the perfect design/layout from scratch, only to discover it has technical issues.",
                ]}
            />
            <div className={styles.para}>Resume.io templates are divided and developed based on these identities, which can be better aligned with certain professions, industries or simply the circumstances of the job opening.</div>
            <div className={styles.heading}>Resume formats: defining structure</div>
            <div className={styles.para}>Now that we're done with the visuals, let's move on to the magic of text. The most fundamental division of text in resumes is based on content format:</div>
            <div className={styles.list}>
                <ul>
                    <li>Reverse Chronological</li>
                    <li>Functional</li>
                    <li>Combined (Combination resume).</li>
                </ul>
            </div>
            <div className={styles.para}><span className={styles["strong-font"]}>The Reverse Chronological format</span> is not only the most common one, but also the most widely accepted among various employers and industries. The biggest benefit of a reverse chronological resume is its straightforward, easy to understand and linear structure. </div>
            <div className={styles.para}>It displays your professional experience and past work experience from most recent to oldest. Your most recent roles are most relevant for your application. This is great when you have a continuous history of work, and you can showcase some important recent positions. But what should you do if you're a fresh graduate or have a sizable gap in your employment history? This is where the Functional and Combination formats come in.</div>
            <ExpertTip>
                <div className={styles.para}>A Reverse Chronological order also takes advantage of short attention spans and busy schedules of recruiters by demonstrating your most recent and impressive positions first. Take advantage of those 6-7 seconds of "eye time"!</div>
            </ExpertTip>
            <div className={styles.para}><span className={styles["strong-font"]}>Functional resume format</span> leans on soft and hard skills as its main focus-point. If you lack experience as an entry level job seeker due to recently graduating college, or are in the process of moving to a new industry, the Functional format is one you might consider. You can also make the resume more robust by mentioning past projects, social initiatives, experience in other fields and so on.</div>
            <div className={styles.para}><span className={styles["strong-font"]}>A Combination format</span> places equal emphasis on skills and relevant work experience, and is therefore appropriate for many technical and technological professions (though not exclusive to them). Many modern resumes have an expanded skills section at the top of the document before the reverse-chronological employment history, so they might be considered combination format resumes.</div>
            <div className={styles.para}>For visual emphasis, check out a strong example of how resumes can be structured:</div>
            <div className={styles.para}>To take a deeper dive into how you should arrange the structure of your resume, check out our dedicated Resume Formats guide , as well as our articles on Functional and Chronological resumes!</div>
            <div className={styles.heading}>Resume sections: your professional feature list</div>
            <div className={styles.para}>There's often a lot of confusion as to which sections to include in your resume.</div>
            <div className={styles.para}>This isn't surprising, since their importance can vary depending on your profession, industry and nature of your experience. We can divide section types into necessary and optional ones. Let's assume for the time being that you're using the Reverse Chronological format (as it's used in more than 90% of resumes nowadays).</div>
            <div className={styles.para}>Necessary sections often include:</div>
            <div className={styles.list}>
                <ul>
                    <li>Contact information and basic personal information</li>
                    <li>Summary (Personal statement, Objective )</li>
                    <li>Employment history</li>
                    <li>Skills</li>
                    <li>Education</li>
                </ul>
            </div>
            <div className={styles.para}>Optional sections can include:</div>
            <div className={styles.list}>
                <ul>
                    <li>Achievements and milestones (often this is included in the Summary and Social projects and volunteer work)</li>
                    <li>Awards, certificates and organizations</li>
                    <li>Hobbies and interests</li>
                </ul>
            </div>
            <Comparison
                doList={[
                    "Include the most important sections that showcase your professional experience and are likely to impress your employer.",
                    "Analyze which sections are important to your profession. Only then - use the free white available (if any) for optional categories.",
                ]}
                dontList={[
                    "Include every section possible, expanding your resume to maximum capacity.",
                    "Include your social media profiles if they contain party pictures. Keep it to your basic contact information such as email, phone number and Linkedin profile.",
                    "List every single life milestone or activity, regardless of available space (high school education, all hobbies and personal interests etc.)",
                    "Only include cum laude or GPA on a resume if an employer explicitly asks for it or if you are applying for an entry-level job.",
                ]}
            />
            <div className={styles.para}>These are not iron-clad rules, however. Sometimes certain sections change their importance depending on the job itself. For example, in our Nurse resume guide, we highlight the fact that belonging to professional organizations is much more important than usual. Some questions to ask yourself when deciding to include or resize sections are:</div>
            <div className={styles.list}>
                <ul>
                    <li>Will this increase my chances of getting hired?</li>
                    <li>Will this provide a positive impression on the employer?</li>
                    <li>Is it appropriate for the job description?</li>
                </ul>
            </div>
            <div className={styles.para}>Your resume may be Chronological, but your decisions should be functional and pragmatic!</div>
            <div className={styles.heading}>The professional summary: your highlight, your story</div>
            <div className={styles.para}>The vital necessity of keeping your resume concise often leads some resumes feeling bland or emotionless. The Professional Summary is your biggest chance to add some color, life and personality to your resume.  It demonstrates your determination, positive outlook and brings some emotion to dry facts.</div>
            <Figure
                src="/assets/blogs/components_of_a_summary_w800.png"
                alt="components_of_a_summary"
                caption="How to write a resume - Resume writing 10 important steps"
            />
            <Comparison
                doList={[
                    "Write a Summary that has some character, energetic phrasing, action verbs and soft/hard skills integrated into your description as a professional.",
                    "Leave out lengthy grammar constructions so that the Summary is concise but your qualities and achievements \"jump out\" at the viewer.",
                ]}
                dontList={[
                    "Compose a Summary that is too dry or too rambling (in the form of a lengthy first-perspective narrative).",
                    "Forget to mention important qualities and achievements right at the beginning, quantifying with numbers and context where appropriate.",
                ]}
            />
            <div className={styles.para}>The Summary should be energetically written to capture attention. Use action verbs and strong descriptive terms. Avoid lengthy, grammatically complicated sentences. This lets the achievements and facts stand out. </div>
            <div className={styles.para}>There are some resume action verbs you may want to use in your resume:</div>
            <Figure
                src="/assets/blogs/resume_action_verbs_w800.png"
                alt="resume_action_verbs"
            />
            <div className={styles.para}>Some guides favor the Resume Objective, yet we believe that the Summary is a more robust and universal tool. </div>
            <div className={styles.para}>The Objective can have its role in certain circumstances (for example, when you lack work experience or wish to make a career change). You can also include an objective as a part of the summary but it would be rare to call this section "objective." The hiring manager understands that your objective is to get the job, otherwise why would you apply?</div>
            <div className={styles.para}>For a look at the specifics, check out our dedicated article on Personal Statements in the resume (Summaries and Objectives alike).</div>
            <Figure
                src="/assets/blogs/professional_summary_example_w1300.jpeg"
                alt="professional_summary_example"
                caption="Here's how a summary is composed and finalized in our builder tool!"
            />
            <div className={styles.heading}>Work experience: professional experience</div>
            <div className={styles.para}>If you've chosen the Reverse Chronological format (and in 9 out of 10 professions - you probably should), then this section is the backbone of your effective resume.</div>
            <div className={styles.para}>This is not only the place where you list your most impressive past employment, but you may also elaborate on each position by giving important facts, achievements and figures that describe you as a great professional. It's not necessary to include your entire employment history . Tailor your job mentions so that you impress your future employer with the most relevant work experiences for this specific job ad. This also keeps your resume short, clean and concise.</div>
            <ExpertTip>
                <div className={styles.para}>If you can name percentages, numbers or specific projects that prove your productivity in past jobs - do so. Did you help save your company money? Did you participate in a company-wide initiative? Did you lead a design team? Maybe you increased the score of user reviews for an online service. Recruiters appreciate specific data.</div>
            </ExpertTip>
            <div className={styles.para}>Each position should be outlined in the following approximate format:</div>
            <div className={styles.list}>
                <ul>
                    <li>Job title , company name, location of employment</li>
                    <li>Month and year started and left the position</li>
                    <li>Between three and six bullet points briefly outlining your results and role at the company</li>
                </ul>
            </div>
            <div className={styles.para}>It's a great idea to keep a separate file or list with you can consider to be your milestones, achievements, projects and numbers. That way, you always have an arsenal of illustrative facts ready to go. Take a deeper dive and learn more about this important section in our dedicated Work Experience guide.</div>
            <ExpertTip>
                <div className={styles.para}>Did you recently receive a promotion? Don't forget to show your promotion on your resume! </div>
            </ExpertTip>
            <div className={styles.heading}>The skills section: competencies and superpowers</div>
            <div className={styles.para}>The skills section is your professional feature list, your superpowers, your abilities.</div>
            <div className={styles.para}>This is where you pass your first "competency test". This part is more pragmatic than the Summary, because recruiters and automated systems will be appraising your skills based on a certain checklist. If something is missing from a hiring manager's wish list, you can be sure they will quiz you on your suitability during an interview.</div>
            <div className={styles.para}>Moreover, there are certain hard skills (and sometimes - even soft skills, once again, check out our Nurse or teacher guides as an example) that are absolutely necessary for a position. So here's two important pieces of advice: prioritize what you include and analyze the job description! Use the same words to describe your skills that the employer uses in the literature about the role.</div>
            <div className={styles.para}>Space is finite and you may have many skills. Make sure the ones you describe (especially at the top) are the ones that fit the job listing.</div>
            <ExpertTip>
                <div className={styles.para}>Even the most seasoned professionals often confuse hard and soft skills, as in certain job areas, the line can be blurry. The rule of thumb is that soft skills mostly relate to interpersonal interactions, emotional intelligence, organization and leadership.</div>
                <div className={styles.para}>Hard skills are pragmatic and often technical competencies that are often requirements for getting a certain dream job. For example, a certain programming language in a developer position. Or using a certain type of software for an office administrator job. They relate to your everyday duties in terms of pragmatic actions.</div>
            </ExpertTip>
            <div className={styles.para}>Need more input on how to write an amazing skills section? Here's our specific guide on describing Skills !</div>
            <Figure
                src="/assets/blogs/skill_section_demo_w1300.png"
                alt="skill_section_demo"
                caption="A demo of the Skills section in our interactive and powerful resume builder tool"
            />
            <div className={styles.heading}>Education: a story of growth and intelligence</div>
            <div className={styles.para}>The education section varies in importance depending on your profession and industry.</div>
            <div className={styles.para}>For example, in our Web Developer guide , we emphasize the fact that formal education isn't a make-it-or-break-it factor. Many developers are self-taught to a certain extent. However, no good resume is complete without some sort of education section, and many employers DO strongly value a formal degree.</div>
            <div className={styles.para}>Like in many other situations, there is no "one size fits all" approach to education sections. Professions like lawyers, doctors and hard-sciences positions (chemist, biologist etc.) will have a very strong emphasis on formal education. You may even want to include scientific or similar publications in your resume for some of these (in your Education section or in a separate category). Academic CVs will likely contain a long list of academic publications.</div>
            <ExpertTip>
                <div className={styles.para}>Reverse Chronological doesn't only apply to your Employment History. Your education should also showcase the most recent and impressive academic achievements first.</div>
            </ExpertTip>
            <div className={styles.para}>It's important to note that in our era of accessible information and technology, your education listing can include things like online certificates, bootcamps, specialized seminars or courses and so on. To understand how high to prioritize this section, check out or dedicated Education guide or take a deeper look at our Profession Guides and Examples.</div>
            <div className={styles.heading}>Technology and psychology: ATS checks and recruiters</div>
            <div className={styles.para}>We've covered a large portion of the important fundamentals you need to understand when composing a job-winning, attention-grabbing resume.</div>
            <div className={styles.para}>But there's still two vitally important aspects to making your resume that perfect professional key: interacting with Applicant Tracking Systems and understanding how a recruiter views your resume.</div>
            <div className={styles.para}>Applicant Tracking Systems (ATS) have become ubiquitous for large and medium-size employers in most developed countries around the globe. With the amount of applications and potential employees coming in each month, human specialists can't always keep up.</div>
            <div className={styles.para}>So, instead of expanding recruiting departments to ludicrous sizes, employers are using automated systems to help with hiring. The task of an ATS is to analyze, filter (and sometimes score) your resume based on keywords. It may even morph your resume into a different format for the hiring manager.</div>
            <div className={styles.para}>One of the big reasons for using online tools instead of text editors is that ATSs are often inflexible. They process your resume based on a specific algorithm. A huge percentage of resumes get filtered out regardless of their professional content due to formatting errors, images, margins , graphs, bugged out header information etc. This is why using tested tools that produce a clean resume without hidden formatting pitfalls is so critically important.</div>
            <div className={styles.para}>But how does an ATS filter and score your resume? The answer is simple: based on keywords defined by the potential employer, hiring manager or job-specific system parameters.</div>
            <div className={styles.para}>There are three methods to picking out keywords: industry knowledge, manually analyzing the job description and using word clouds.</div>
            <Comparison
                doList={[
                    "Analyze the job listing to understand what skills or other aspects to prioritize",
                    "Use online tools for formatting to avoid getting filtered out",
                    "Do basic research on the employer",
                    "Use industry knowledge",
                    "Favor the PDF format",
                    "Make your resume readable by both humans and automated systems",
                ]}
                dontList={[
                    "Ignore technological tests such as the ATS and formatting guidelines",
                    "Use basic text editors that may get you filtered out by an ATS",
                    "Submit a one-size-fits-all resume to every employer, without considering the company specifics",
                    "Artificially insert too many keywords, making the resume unreadable by a real person",
                ]}
            />
            <div className={styles.para}>Industry knowledge is based on your own expertise and research. You can rely on your experience or refer to job-specific guides. For example, in our Web Developer resume guide we emphasize what relevant skills, programming languages and interests that have been trending in the last couple of years. In our Nurse resume guide we mention the two statistically most common job skills requested by employers for this position.</div>
            <div className={styles.para}>Researching the employer's website is also always a great idea. It can hint at what the company values, what kind of language they use and so forth. Such knowledge can be the necessary "ace up your sleeve" and it demonstrates that you have taken the time to tailor your application. Generic resumes are worryingly common.</div>
            <div className={styles.para}>The job description is your most important ally in picking ATS keywords for your resume sections. Job descriptions often outline the vital requirements and soft skills for the position. Make sure to find these and include them in your resume text.</div>
            <div className={styles.para}>If the job description is too vague or too wordy, don't worry, there's a handy tool to make sense of it: Word Clouds. These are useful instruments (easily found through Google, like Wordle or Worditout.com) where you can simply copy-paste the text of a job description and get a visualization of its terminology.</div>
            <div className={styles.para}>Moving on to the human side of hiring: consider two main points on how a potential employer views your resume. First of all, understand the volume of submitted applications. Hundreds of resumes is the reality for some companies. Avoid being bland, generic or low-energy. No need to overdo it (hiring managers have a keen eye for "artificially hyped" resumes) and don't use adjectives that you can't back up with a fact.</div>
            <div className={styles.para}>You should certainly consider whether your text is too low-key - cultivate a warm conversational tone where possible.</div>
            <ExpertTip>
                <div className={styles.para}>Make sure your resume tells a story, shows you as a human being and hits all the important professional highlights. Also - understand that a potential employer will be viewing you from the standpoint of "how will this person adapt to the company?". Consider your statements in the light of a future productive employee.</div>
            </ExpertTip>
            <div className={styles.para}>Second, don't overload recruiters with technical terminology. All professions have their jargon and "inside lingo", but not all recruiters are equally knowledgeable. Highlight your technical skills , but make sure to space them out (especially in the Summary) and mention soft skills and qualities to feel relatable and human.</div>
            <div className={styles.heading}>Should you include resume references?</div>
            <div className={styles.para}>While every resume should include summary, work experience, education and skills sections, whether you should include references from previous employers is far less clear cut. Let's explore in more detail .</div>
            <div className={styles.para}>If the job description requests references on a resume, then follow it to the letter, but if references are not requested it doesn't mean that they may not contribute to your application when you write it.</div>
            <div className={styles.para}>As you should seek to use your resume space to create the optimal impact, here are a few tips about when including references might be appropriate:</div>
            <Comparison
                doList={[
                    "If the job description specifically requests references.",
                    "If your references are industry leaders / high profile.",
                    "If they show your breadth of business development contacts.",
                    "If you have less experience and extra space on the resume",
                ]}
                dontList={[
                    "If you are new to the field or your references are not relevant.",
                    "If you haven't managed to ask permission from your referees.",
                    "If you have already listed your references in an online form.",
                    "If you are more comfortable writing \"references on request.\"",
                ]}
            />
            <div className={styles.heading}>How to write a cover letter alongside a resume</div>
            <div className={styles.para}>As you consider how to write a resume, you should not forget to consider the advantages of pairing it with a well-written cover letter .</div>
            <div className={styles.para}>In actual fact, employers will request a cover letter the vast majority of the time. For good reason: there are certain aspects of a cover letter that make the content very different (and highly complementary) to a resume.</div>
            <div className={styles.para}>For a start, a cover letter is a free-form piece of writing that allows an applicant to outline the finer details of their application. It is a personal pitch to the hiring manager, it can be closely tailored to the role in question and its arguments should form the core of a future interview process.</div>
            <ExpertTip>
                <div className={styles.para}>Every sentence in your cover letter should explore the essence of your job search "why." While your resume offers the logic of why you should be hired, the cover letter offers a more emotional and personal take.</div>
            </ExpertTip>
            <div className={styles.para}>The format of a cover letter should follow the structure of any persuasive argument: the introduction sets the scene; the body of the cover letter contains the key arguments; and the conclusion ends on a high note and includes a call to action. Differentiate yourself with your story, not by breaking this widely accepted structure.</div>
            <div className={styles.para}>The cover letter distils your career story into 300-400 words of compelling and relevant copy. Your potential future boss should be able to read it and create a mental picture of how you will fit into their future plans. Everyone likes a good story, especially if they feel that it could become their story too. If you were them, what would you want to read?</div>
            <div className={styles.para}>The most important aspect to consider when writing a cover letter is whether every sentence makes an impact. How you go about outlining your accomplishments can make all the difference:</div>
            <ExpertTip>
                <div className={styles.para}>Here are some different scenarios for cover letter accomplishments:</div>
                <div className={styles.list}>
                    <ul>
                        <li>A difficult and time-consuming formatting process</li>
                        <li>Header/footer information not readable by other systems</li>
                        <li>Poor and bland visual designs that get lost among other resumes</li>
                        <li>Formatting that looks different in other programs</li>
                        <li>Lost or corrupted files and so on</li>
                    </ul>
                </div>
            </ExpertTip>
            <div className={styles.para}>Cover letters help to explain complex career issues, in a way that resumes could never manage. There has to be some degree of repetition of the core achievements, but in a cover letter you can add so much more personality and emotion to nudge your future boss in the right direction.</div>
            <div className={styles.heading}>The art of proofreading a resume</div>
            <div className={styles.para}>Once you have sent your resume in to a potential employer, there is no "edit" button. Multiple people will read it over the course of the interview process, and they will assume what you write reflects the best of what is on offer.</div>
            <div className={styles.para}>When you are considering how to write a resume, it is vital to check for careless mistakes and lazy language choices, which tend to slip in all too easily in your excitement to send the application.</div>
            <div className={styles.para}>Proofreading a section of text requires a slow-motion thought process that is forensic in its approach. Every word counts and you have to consider how they will be received by the reader rather than how they sound in your head.</div>
            <div className={styles.para}>We have written a comprehensive expert guide to proofreading your resume. Doing it right could make all the difference. Here are three of the tips that far from every candidate will consider:</div>
            <ExpertTip>
                <div className={styles.para}><span className={styles["strong-font"]} >Read your resume out loud.</span> Although it is impossible to achieve a conversational flow due to the fractured structure of a resume, it is nonetheless important to read each sentence and bullet point out loud to sense check that it "sounds" like you.</div>
                <div className={styles.para}><span className={styles["strong-font"]} >Sleep on it.</span> Creativity is often enhanced after we have walked away from a task for a while. It is tempting to send off that application immediately, but it is often worth taking a break and considering it with a fresh mindset. Potential improvements will leap off the page.</div>
                <div className={styles.para}><span className={styles["strong-font"]} >Print it out.</span> Maybe we are so used to skimming text on a screen, but somehow we tend to read text on paper that little bit slower. Print out your resume - reading it slowly with a coffee offers a new perspective.</div>
            </ExpertTip>
            <div className={styles.heading}>International vs. country-specific resumes</div>
            <div className={styles.para}>Last but not least, if you're looking to relocate or find a job abroad, consider the geographical specifics of hiring.</div>
            <div className={styles.para}>Every region or even country has cultural, ethical and technical nuances when it comes to good resumes. Asia, Europe and the United States may be drastically different in some aspects. It's a great idea to do your research on the country in general and your specific local industry too. Find expat communities, networking events and online resources to expand your knowledge.</div>
            <Comparison
                doList={[
                    "Do online research on the chosen country of employment",
                    "Connect (online or offline) with people who speak your language in the local industry",
                    "Find out whether you need a CV or a resume format",
                    "Consider cultural differences and style of presentation",
                    "Look for examples of local resumes",
                ]}
                dontList={[
                    "Use the same resume for every country of employment",
                    "Ignore local culture and view of ethical and professional norms",
                    "Assume that formatting and resume length (CV vs. resume, for example) are the same everywhere",
                ]}
            />
            <div className={styles.para}>Generally speaking, the "geographical" resume types that often come up are:</div>
            <div className={styles.list}>
                <ul>
                    <li>The international resume</li>
                    <li>The US resume</li>
                    <li>The British CV</li>
                    <li>The Spanish resume</li>
                    <li>The Asian resume</li>
                    <li>The Russian resume</li>
                </ul>
            </div>
            <ExpertTip>
                <div className={styles.para}>More than any other resume, if you're applying to a foreign country you need to be clear on your resume about your nationality, visa status, and language abilities. Whereas this isn't important if you're applying in your own country, this is critical information for international resumes.</div>
            </ExpertTip>
            <div className={styles.para}>If you're interested in the career expert tips of writing a resume for a certain geography, check out our guide on regional resume types : it includes all the categories listed above, as well as resume tips on how to write a resume as a non-native English speaker. </div>
            <div className={styles.para}>While we've provided you with the most fundamental and important information needed to create a resume that secures amazing opportunities, our useful resources don't end here!</div>
            <div className={styles.para}>You can check out our guides on additional sections and topics, once you feel like you need to polish up these areas.</div>
            <div className={styles.para}>And don't forget to take a look at all the amazing functionality of the resume.io builder tool. It's likely to save you time and effort and take your resume to the next level!</div>
            <HorizontalBanner />
            <BlogFooterAction />
            <Author
                authorName="Thai Tran, Content writer / HR Specialist"
                description="With a decade's experience of writing about job search and recruitment topics, Paul understands the power of words to influence mindsets and alter destinies. His previous recruitment career taught him that the seeds of a successful job search are sown long before you come to writing your resume. Dad of two great teenage kids and husband to a long-suffering writing widow."
                image="/assets/blogs/author_thai_tran.png"
            />
        </>
    )
};

export default HowToWriteAResume;