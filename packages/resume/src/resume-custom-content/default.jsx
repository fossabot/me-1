import {CampaignLink, ResumeNpmVersionShield, Shields} from "@randy.tarampi/jsx";
import React, {Fragment} from "react";
import {Col, Row} from "react-materialize";
import {
    ResumeCustomContent,
    ResumeCustomPrintableFooterContent,
    ResumeCustomPrintableSectionContent
} from "../lib/resumeCustomContent";

const defaultContent = new ResumeCustomContent({
    education: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p>
                <span className="text">I went to school on top of a mountain for 5 years</span>
            </p>
            <p>
                <span className="text">I remember some things better than others, like the snow days. For everything else there's <CampaignLink href="https://www.goodreads.com/book/show/29437996-copying-and-pasting-from-stack-overflow" text="StackOverflow"/></span>
            </p>
        </Fragment>
    }),
    projects: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p>
                <span className="text">Vanity seems to be in vogue and I'm not usually one for ideas, so these are all about me</span>
            </p>
            <p>
                <span className="text">Frankly, I'd much rather be outside exploring rather than on my computer in my downtime</span>
            </p>
            <p>
                <span className="text">Tried to keep myself disciplined here, but I'm a lot better when I have people actually holding me to account</span>
            </p>
            <Shields>
                <ResumeNpmVersionShield/>
            </Shields>
        </Fragment>
    }),
    skills: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p>
                <span className="text">I tend to build things with JavaScript, but Kotlin and Java are cool too</span>
            </p>
            <p>
                <span className="text">Ask me about my soft skills — those are more fun</span>
            </p>
        </Fragment>
    }),
    volunteer: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p>
                <span className="text">I never really <em>want</em> to volunteer, but when it happens it seems that I really enjoy it</span>
            </p>
            <p>
                <span className="text">People have always seen me as shy and reserved but it actually turns out that I've got a knack for leadership and mentorship</span>
            </p>
        </Fragment>
    }),
    work: new ResumeCustomPrintableSectionContent({
        descriptionNode: <Fragment>
            <p>
                <span className="text">Let's get one thing clear here, <em><strong>I didn't move my life 8000 kilometres to work long hours chasing big bucks</strong> — it's more efficient to do that back home</em></span>
            </p>
            <p>
                <span className="text">I'm here looking for something more meaningful, whether it be in the content of the work, or those I work alongside, but hopefully both</span>
            </p>
            <p>
                <span className="text">I mean, I met the CTO at Fetch Auto in 2013 as an intern at Pulse Energy and over the years he got me to come back and work with him not once, but twice and I'm looking for a place where I can settle down and build similarly close working relationships</span>
            </p>
            <p>
                <span className="text">Ask me about how I ended up learning Italian on the job, my cadres of co-op students, or when I almost <CampaignLink
                href="http://www.quickmeme.com/p/3vv8p3"
                text="brought down a busy test environment"/> as an intern</span>
            </p>
        </Fragment>
    }),
    footer: new ResumeCustomPrintableFooterContent({
        body: <Fragment>
            <Row className="row valign-wrapper center-align hide-on-screen">
                <Col s={12}>
                    <em>Print styles are hard to write and one page resumes are harder – check out the full copy
                        at <CampaignLink href={__PUBLISHED_RESUME_URL__}/></em>
                </Col>
            </Row>
            <Row className="row valign-wrapper center-align hide-on-print">
                <Col l={8} offset="l2">
                    <p>If you're going to print this out please do it in Chrome, or with a Chromium backed
                        client — I didn't work on those print styles for nothing!</p>
                    <p>It should fit neatly onto a single <CampaignLink
                        href="https://github.com/randytarampi/me.resume/raw/master/a4.pdf" text="A4"/>, <CampaignLink
                        href="https://github.com/randytarampi/me.resume/raw/master/letter.pdf" text="US Letter"/>,
                        or <CampaignLink
                            href="https://github.com/randytarampi/me.resume/raw/master/legal.pdf" text="US
                            Legal"/> sized
                        page, provided you <em>set the margins to nil</em>, <em>clear the page headers and footers</em>,
                        and for best results, <em>include background colours and images</em></p>
                </Col>
            </Row>
        </Fragment>
    })
});

let exportedDefaultContent = defaultContent; // eslint-disable-line import/no-mutable-exports

if (__BUILD_IS_PUBLISHED__) {
    exportedDefaultContent = null;
}

export default exportedDefaultContent;
