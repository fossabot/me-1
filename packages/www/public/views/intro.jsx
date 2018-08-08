import {RowBlock} from "@randy.tarampi/jsx";
import {HelloBear} from "@randy.tarampi/jsx/lib/components/bear";
import Link, {
    BlogAppLink,
    EmailLink,
    GitHubLink,
    InstagramLink,
    LinkedInLink,
    TelLink
} from "@randy.tarampi/jsx/lib/components/link";
import React from "react";
import {Col} from "react-materialize";

const Intro = () =>
    <RowBlock name="intro">
        <Col className="block__bear" l={5} m={8} s={12} offset="m2">
            <HelloBear/>
        </Col>
        <Col className="block__text" l={7} m={8} s={12} offset="m2">
            <h2>
                <span className="text">Hey!</span>
            </h2>
            <p>
                <span className="text">I'm looking for work, but you probably knew that already because let's be real, you probably clicked through to here from my <Link
                    href="/resume">resume</Link> or my <LinkedInLink useBranding={false} text="LinkedIn"/>.</span>
            </p>
            <p>
                <span className="text">If you're interested in my work check me out on <GitHubLink useBranding={false}
                                                                                                   text="GitHub"/>, look at where I've been on <InstagramLink
                    useBranding={false} text="Instagram"/> or peek in on what's going on in my life at my <BlogAppLink
                    text="blog"/>.</span>
            </p>
            <p>
                <span className="text">
                    And if you're still interested after all that, shoot me an <EmailLink useBranding={false}
                                                                                          text="email"/> or <TelLink
                    useBranding={false} text="text"/> and let's have a chat!
                </span>
            </p>
        </Col>
    </RowBlock>;

export default Intro;
